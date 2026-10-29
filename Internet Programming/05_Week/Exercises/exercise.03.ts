// Exercise 3 — Async/Await Practice
// Run with: npx tsx exercise.03.ts   (or: npx tsc && node dist/exercise.03.js)
//
// Exercises 1 and 2 again, with async functions. Compare the shape of the code:
// it reads top to bottom, like synchronous code, and errors use try/catch.

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
function atLeast(elapsed: number, ms: number): boolean {
    return elapsed >= ms - 1;
}
function messageOf(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

// The two building blocks from exercise 2. An async function can await any promise —
// it does not matter how the promise was made.
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function maybe(succeed: boolean, ms = 100): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => succeed
            ? resolve(`Succeeded after ${ms} ms`)
            : reject(new Error(`Failed after ${ms} ms`)), ms);
    });
}

// ---- 3.1 — Exercise 1, async: two callbacks in succession ----
async function inSuccession(first: () => void, second: () => void, ms: number): Promise<void> {
    await delay(ms);
    first();
    await delay(ms);
    second();
}

// ---- 3.2 — Exercise 1.2, async: any number of steps ----
// A plain for...of loop. Each await pauses the loop until the delay is over.
async function runInSequence(steps: readonly (() => void)[], ms: number): Promise<void> {
    for (const step of steps) {
        await delay(ms);
        step();
    }
}

// ---- 3.3 — Exercise 2.2, async: consuming maybe() with try / catch / finally ----
async function attempt(succeed: boolean, log: string[]): Promise<string> {
    log.push("start");
    try {
        const value = await maybe(succeed, 20);   // a rejection here jumps to catch
        return `resolved: ${value}`;
    } catch (error) {                             // error is `unknown` — narrow it
        return `rejected: ${messageOf(error)}`;
    } finally {
        log.push("finally");                      // runs on both paths
    }
}

// ---- 3.4 — The Pyramid of Doom, one last time ----
interface User { id: number; name: string; }
interface Order { id: number; userId: number; amount: number; }

const users: User[] = [{ id: 1, name: "Ana" }, { id: 2, name: "Boris" }, { id: 3, name: "Vesna" }];
const orders: Order[] = [
    { id: 10, userId: 1, amount: 1200 },
    { id: 11, userId: 1, amount: 800 },
    { id: 12, userId: 2, amount: 450 },
    { id: 13, userId: 3, amount: 300 },
];

async function loadUser(id: number): Promise<User> {
    await delay(40);
    const user = users.find(u => u.id === id);
    if (user === undefined) {
        throw new Error(`No user with id ${id}`);     // throwing = rejecting the returned promise
    }
    return user;
}

async function loadOrders(user: User): Promise<Order[]> {
    await delay(40);
    return orders.filter(o => o.userId === user.id);
}

// Every intermediate result is an ordinary local variable — no nesting, no
// variables smuggled out of callbacks.
async function userTotal(id: number): Promise<string> {
    const user = await loadUser(id);
    const list = await loadOrders(user);
    const total = list.reduce((sum, o) => sum + o.amount, 0);
    return `${user.name}: ${total}`;
}

// ---- 3.5 — Sequential versus parallel ----
// Each await waits for the previous one: 3 users x 40 ms = about 120 ms.
async function loadUsersSequential(ids: number[]): Promise<string[]> {
    const names: string[] = [];
    for (const id of ids) {
        const user = await loadUser(id);
        names.push(user.name);
    }
    return names;
}

// Start them all, then wait for all: about 40 ms.
async function loadUsersParallel(ids: number[]): Promise<string[]> {
    const loaded = await Promise.all(ids.map(id => loadUser(id)));
    return loaded.map(u => u.name);
}

// ---- 3.6 — The forEach trap ----
// forEach ignores what its callback returns — including a promise. Nothing waits.
async function forEachTrap(ids: number[]): Promise<string[]> {
    const names: string[] = [];
    ids.forEach(async id => {
        const user = await loadUser(id);
        names.push(user.name);
    });
    return names;          // returned before a single user has loaded
}

// ---- 3.7 — Retry: try again a few times before giving up ----
async function retry<T>(operation: () => Promise<T>, attempts: number, waitMs: number): Promise<T> {
    for (let attempt = 1; ; attempt++) {
        try {
            return await operation();         // `return await`: a rejection is caught right here
        } catch (error) {
            if (attempt >= attempts) {
                throw error;                  // out of attempts: let the caller see the last error
            }
            await delay(waitMs);
        }
    }
}

// An operation that fails the first `failures` times it is called.
function flaky(failures: number): () => Promise<string> {
    let calls = 0;
    return async () => {
        calls++;
        if (calls <= failures) {
            throw new Error(`Failure #${calls}`);
        }
        return `Worked on call ${calls}`;
    };
}

// ---- 3.8 — return versus return await inside try ----
async function withoutAwait(): Promise<string> {
    try {
        return maybe(false, 10);              // the promise leaves the function unsettled…
    } catch {
        return "caught";                      // …so this catch never sees the rejection
    }
}

async function withAwait(): Promise<string> {
    try {
        return await maybe(false, 10);        // settles here, inside the try
    } catch {
        return "caught";
    }
}

// ---- checks ----
// Top-level await: allowed in ES modules (this project has "type": "module").
// Compare with the chain of callbacks at the bottom of exercise 1.
try {
    // 3.1
    let log: string[] = [];
    let start = Date.now();
    const done = inSuccession(() => log.push("first"), () => log.push("second"), 40);
    check("3.1 an async function returns at its first await", log, []);
    await done;
    check("3.1 order", log, ["first", "second"]);
    check("3.1 took twice the delay", atLeast(Date.now() - start, 80), true);

    // 3.2
    const numbers: number[] = [];
    start = Date.now();
    await runInSequence([() => numbers.push(1), () => numbers.push(2), () => numbers.push(3)], 30);
    check("3.2 all three ran, in order", numbers, [1, 2, 3]);
    check("3.2 took at least 3 x 30 ms", atLeast(Date.now() - start, 90), true);

    // 3.3
    log = [];
    check("3.3 success", await attempt(true, log), "resolved: Succeeded after 20 ms");
    check("3.3 failure", await attempt(false, log), "rejected: Failed after 20 ms");
    check("3.3 finally ran both times", log, ["start", "finally", "start", "finally"]);

    // 3.4
    check("3.4 user 1", await userTotal(1), "Ana: 2000");
    try {
        await userTotal(99);
        check("3.4 unknown user should throw", "no error", "error");
    } catch (error) {
        check("3.4 unknown user throws", messageOf(error), "No user with id 99");
    }

    // 3.5
    start = Date.now();
    const sequential = await loadUsersSequential([1, 2, 3]);
    const sequentialMs = Date.now() - start;
    start = Date.now();
    const parallel = await loadUsersParallel([1, 2, 3]);
    const parallelMs = Date.now() - start;
    check("3.5 same result both ways", parallel, sequential);
    check("3.5 sequential takes at least 3 x 40 ms", atLeast(sequentialMs, 120), true);
    check("3.5 parallel takes about 40 ms", parallelMs < 100, true);
    console.log(`      (sequential ${sequentialMs} ms, parallel ${parallelMs} ms)`);

    // 3.6
    const trapped = await forEachTrap([1, 2]);
    check("3.6 forEach did not wait — still empty", trapped, []);
    await delay(60);
    check("3.6 …the users arrive later, after nobody is looking", trapped, ["Ana", "Boris"]);

    // 3.7
    check("3.7 succeeds on the third try", await retry(flaky(2), 3, 10), "Worked on call 3");
    try {
        await retry(flaky(5), 3, 10);
        check("3.7 should give up", "no error", "error");
    } catch (error) {
        check("3.7 gives up after 3 tries, with the last error", messageOf(error), "Failure #3");
    }

    // 3.8
    check("3.8 return await: the catch block handles it", await withAwait(), "caught");
    try {
        await withoutAwait();
        check("3.8 return without await should reject", "resolved", "rejected");
    } catch (error) {
        check("3.8 return without await: the rejection escapes the try", messageOf(error), "Failed after 10 ms");
    }
} catch (error) {
    check("no unexpected errors", messageOf(error), "none");
} finally {
    console.log(`\n${passed} passed, ${failed} failed`);
}
