// Exercise 2 — Promise Practice
// Run with: npx tsx exercise.02.ts   (or: npx tsc && node dist/exercise.02.js)
//
// Promises with .then() / .catch() / .finally() only — async/await is exercise 3.

// ---- tiny test helper (each exercise file is self-contained) ----
let passed = 0;
let failed = 0;
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) passed++; else failed++;
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
function summary(): void {
    console.log(`\n${passed} passed, ${failed} failed`);
}
function atLeast(elapsed: number, ms: number): boolean {
    return elapsed >= ms - 1;
}

// ---- 2.1 — delay: a promise that resolves after a while ----
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ---- 2.2 — The exercise from the slide ----
// Resolves or rejects after `ms`, depending on `succeed`.
// Reject with an Error object, not a string: errors carry a stack trace.
function maybe(succeed: boolean, ms = 100): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (succeed) {
                resolve(`Succeeded after ${ms} ms`);
            } else {
                reject(new Error(`Failed after ${ms} ms`));
            }
        }, ms);
    });
}

// ---- 2.3 — Consuming a promise: then / catch / finally ----
// Turns any promise into a description of how it settled. Never rejects.
function describe(promise: Promise<unknown>): Promise<string> {
    return promise
        .then(value => `resolved: ${String(value)}`)
        .catch((error: unknown) => `rejected: ${error instanceof Error ? error.message : String(error)}`);
}

// finally runs either way, and passes the original outcome through unchanged.
function trackLoading(promise: Promise<string>, log: string[]): Promise<string> {
    log.push("loading…");
    return promise.finally(() => log.push("done"));
}

// ---- 2.4 — The Pyramid of Doom from exercise 1, as a flat chain ----
interface User { id: number; name: string; }
interface Order { id: number; userId: number; amount: number; }

const users: User[] = [{ id: 1, name: "Ana" }, { id: 2, name: "Boris" }];
const orders: Order[] = [
    { id: 10, userId: 1, amount: 1200 },
    { id: 11, userId: 1, amount: 800 },
    { id: 12, userId: 2, amount: 450 },
];

function loadUser(id: number): Promise<User> {
    return delay(20).then(() => {
        const user = users.find(u => u.id === id);
        if (user === undefined) {
            throw new Error(`No user with id ${id}`);   // throwing inside then = rejecting
        }
        return user;
    });
}

function loadOrders(user: User): Promise<Order[]> {
    return delay(20).then(() => orders.filter(o => o.userId === user.id));
}

function calculateTotal(list: Order[]): Promise<number> {
    return delay(20).then(() => list.reduce((sum, o) => sum + o.amount, 0));
}

// One level deep, one catch for the whole chain.
// The user's name is needed at the end, so it is kept in a variable on the way.
function userTotal(id: number): Promise<string> {
    let name = "";
    return loadUser(id)
        .then(user => {
            name = user.name;
            return loadOrders(user);      // return the promise, so the chain waits for it
        })
        .then(list => calculateTotal(list))
        .then(total => `${name}: ${total}`);
}

// ---- 2.5 — inSuccession from exercise 1, built on promises ----
function inSuccession(first: () => void, second: () => void, ms: number): Promise<void> {
    return delay(ms)
        .then(first)
        .then(() => delay(ms))
        .then(second);
}

// ---- 2.6 — Combinators ----
// all        — every one must succeed; fails fast on the first rejection
// allSettled — waits for every one, never rejects, reports each outcome
// race       — the first to settle wins, whether it resolved or rejected
// any        — the first to *succeed* wins; rejects only if all of them fail
function outcomes(results: PromiseSettledResult<string>[]): string[] {
    return results.map(r => r.status === "fulfilled" ? `ok: ${r.value}` : `error: ${(r.reason as Error).message}`);
}

// ---- 2.7 — A timeout, using race ----
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`Timed out after ${ms} ms`)), ms);
    });
    // Clear the timer either way: a pending timer keeps a Node program running.
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// ---- checks ----
// Every check returns a promise, and they run one after another in a single flat chain.

function check21(): Promise<void> {
    const start = Date.now();
    return delay(50).then(() => {
        check("2.1 delay waits", atLeast(Date.now() - start, 50), true);
    });
}

function check22(): Promise<void> {
    const start = Date.now();
    return maybe(true, 40)
        .then(value => {
            check("2.2 maybe(true) resolves", value, "Succeeded after 40 ms");
            check("2.2 ... after the delay", atLeast(Date.now() - start, 40), true);
            return maybe(false, 40);
        })
        .then(
            () => check("2.2 maybe(false) should reject", "resolved", "rejected"),
            (error: unknown) => {
                check("2.2 maybe(false) rejects with an Error", error instanceof Error, true);
                check("2.2 ... with a message", (error as Error).message, "Failed after 40 ms");
            },
        );
}

function check23(): Promise<void> {
    const log: string[] = [];
    return describe(maybe(true, 10))
        .then(text => check("2.3 describe a success", text, "resolved: Succeeded after 10 ms"))
        .then(() => describe(maybe(false, 10)))
        .then(text => check("2.3 describe a failure", text, "rejected: Failed after 10 ms"))
        .then(() => trackLoading(maybe(true, 10), log))
        .then(value => {
            check("2.3 finally ran", log, ["loading…", "done"]);
            check("2.3 finally passes the value through", value, "Succeeded after 10 ms");
            return describe(trackLoading(maybe(false, 10), log));
        })
        .then(text => {
            check("2.3 finally ran on failure too", log, ["loading…", "done", "loading…", "done"]);
            check("2.3 finally passes the rejection through", text, "rejected: Failed after 10 ms");
        });
}

function check24(): Promise<void> {
    return userTotal(1)
        .then(text => check("2.4 chain, user 1", text, "Ana: 2000"))
        .then(() => describe(userTotal(99)))
        .then(text => check("2.4 one catch handles a failure anywhere", text, "rejected: No user with id 99"));
}

function check25(): Promise<void> {
    const log: string[] = [];
    const start = Date.now();
    let firstAt = 0;
    const done = inSuccession(() => { log.push("first"); firstAt = Date.now() - start; },
                              () => log.push("second"), 40);
    check("2.5 nothing has run yet", log, []);
    return done.then(() => {
        check("2.5 order", log, ["first", "second"]);
        check("2.5 first waited", atLeast(firstAt, 40), true);
        check("2.5 second waited twice as long", atLeast(Date.now() - start, 80), true);
    });
}

function check26(): Promise<void> {
    const start = Date.now();
    return Promise.all([maybe(true, 30), maybe(true, 60), maybe(true, 45)])
        .then(values => {
            check("2.6 all: values in input order, not finishing order", values,
                ["Succeeded after 30 ms", "Succeeded after 60 ms", "Succeeded after 45 ms"]);
            check("2.6 all: runs in parallel — about 60 ms, not 135", Date.now() - start < 120, true);
            return describe(Promise.all([maybe(true, 30), maybe(false, 10)]));
        })
        .then(text => {
            check("2.6 all: one failure rejects everything", text, "rejected: Failed after 10 ms");
            return Promise.allSettled([maybe(true, 10), maybe(false, 20)]);
        })
        .then(results => {
            check("2.6 allSettled: reports both", outcomes(results),
                ["ok: Succeeded after 10 ms", "error: Failed after 20 ms"]);
            return describe(Promise.race([maybe(false, 10), maybe(true, 30)]));
        })
        .then(text => {
            check("2.6 race: the first to settle wins, even a failure", text, "rejected: Failed after 10 ms");
            return Promise.any([maybe(false, 10), maybe(true, 30)]);
        })
        .then(value => {
            check("2.6 any: the first success wins", value, "Succeeded after 30 ms");
            return Promise.any([maybe(false, 10), maybe(false, 20)]).then(
                () => "resolved",
                (error: unknown) => error instanceof AggregateError ? `${error.errors.length} errors` : "?");
        })
        .then(text => check("2.6 any: all failed gives an AggregateError", text, "2 errors"));
}

function check27(): Promise<void> {
    return withTimeout(maybe(true, 20), 100)
        .then(value => check("2.7 fast enough", value, "Succeeded after 20 ms"))
        .then(() => describe(withTimeout(maybe(true, 200), 50)))
        .then(text => check("2.7 too slow", text, "rejected: Timed out after 50 ms"));
}

// The executor runs immediately — only then/catch callbacks are deferred.
function check28(): Promise<void> {
    const log: string[] = [];
    const promise = new Promise<void>(resolve => {
        log.push("executor");
        resolve();
    });
    promise.then(() => log.push("then"));
    log.push("after");
    return delay(0).then(() => check("2.8 executor is synchronous, then is not", log,
        ["executor", "after", "then"]));
}

check21()
    .then(check22)
    .then(check23)
    .then(check24)
    .then(check25)
    .then(check26)
    .then(check27)
    .then(check28)
    .catch((error: unknown) => check("no unexpected errors", String(error), "none"))
    .finally(summary);
