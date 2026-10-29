// Exercise 1 — Callback Hell
// Run with: npx tsx exercise.01.ts   (or: npx tsc && node dist/exercise.01.js)
//
// Callbacks only — no promises, no async/await. That is the point: feel the pain
// first, so that exercises 2 and 3 make sense.

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

// Timers may fire a millisecond early or (much) later — never assume exact times.
function atLeast(elapsed: number, ms: number): boolean {
    return elapsed >= ms - 1;
}

// ---- 1.1 — Two callbacks, in succession, with a delay ----
// first runs after `delayMs`, second runs `delayMs` after first.
function inSuccession(first: () => void, second: () => void, delayMs: number): void {
    setTimeout(() => {
        first();
        setTimeout(second, delayMs);
    }, delayMs);
}

// ---- 1.2 — Any number of callbacks, then a final `done` ----
function runInSequence(steps: readonly (() => void)[], delayMs: number, done: () => void): void {
    function runStep(index: number): void {
        const step = steps[index];
        if (step === undefined) {        // past the last step
            done();
            return;
        }
        setTimeout(() => {
            step();
            runStep(index + 1);          // schedule the next one only after this one ran
        }, delayMs);
    }
    runStep(0);
}

// ---- 1.3 — Error-first callbacks, and the Pyramid of Doom ----
// The Node.js convention: callback(error, result). Exactly one of them is meaningful.
type Callback<T> = (error: Error | null, result?: T) => void;

interface User { id: number; name: string; }
interface Order { id: number; userId: number; amount: number; }

const users: User[] = [{ id: 1, name: "Ana" }, { id: 2, name: "Boris" }];
const orders: Order[] = [
    { id: 10, userId: 1, amount: 1200 },
    { id: 11, userId: 1, amount: 800 },
    { id: 12, userId: 2, amount: 450 },
];

// Pretend these talk to a slow server.
function loadUser(id: number, callback: Callback<User>): void {
    setTimeout(() => {
        const user = users.find(u => u.id === id);
        if (user === undefined) {
            callback(new Error(`No user with id ${id}`));
        } else {
            callback(null, user);
        }
    }, 20);
}

function loadOrders(user: User, callback: Callback<Order[]>): void {
    setTimeout(() => callback(null, orders.filter(o => o.userId === user.id)), 20);
}

function calculateTotal(list: Order[], callback: Callback<number>): void {
    setTimeout(() => callback(null, list.reduce((sum, o) => sum + o.amount, 0)), 20);
}

// The pyramid: every step needs the result of the one before, so every step
// nests one level deeper, and every level repeats the same error check.
function userTotalPyramid(id: number, callback: Callback<string>): void {
    loadUser(id, (error, user) => {
        if (error || !user) {
            callback(error);
            return;
        }
        loadOrders(user, (error, list) => {
            if (error || !list) {
                callback(error);
                return;
            }
            calculateTotal(list, (error, total) => {
                if (error || total === undefined) {
                    callback(error);
                    return;
                }
                callback(null, `${user.name}: ${total}`);
            });
        });
    });
}

// ---- 1.4 — The same flow, flattened with named functions ----
// Same behaviour, but every step is a named function at the same level.
// Better to read — but the control flow is still spread over four functions.
function userTotalFlat(id: number, callback: Callback<string>): void {
    let userName = "";
    loadUser(id, afterUser);

    function afterUser(error: Error | null, user?: User): void {
        if (error || !user) return callback(error);
        userName = user.name;
        loadOrders(user, afterOrders);
    }
    function afterOrders(error: Error | null, list?: Order[]): void {
        if (error || !list) return callback(error);
        calculateTotal(list, afterTotal);
    }
    function afterTotal(error: Error | null, total?: number): void {
        if (error || total === undefined) return callback(error);
        callback(null, `${userName}: ${total}`);
    }
}

// ---- 1.5 — Inversion of control: guard against a callback called twice ----
// When you hand someone a callback, *they* decide when — and how often — it runs.
function once<A extends unknown[]>(fn: (...args: A) => void): (...args: A) => void {
    let called = false;
    return (...args: A) => {
        if (called) return;
        called = true;
        fn(...args);
    };
}

// A badly written library function that calls back twice.
function buggyLoad(callback: Callback<string>): void {
    setTimeout(() => callback(null, "first"), 5);
    setTimeout(() => callback(null, "second"), 10);
}

// ---- checks ----
// Callbacks only, so the checks run one after another — each starts the next.
// Yes, this is itself a small pyramid. Exercise 3 rewrites it.

function check11(next: () => void): void {
    const start = Date.now();
    const log: string[] = [];
    let firstAt = 0;
    inSuccession(
        () => { log.push("first"); firstAt = Date.now() - start; },
        () => {
            log.push("second");
            const secondAt = Date.now() - start;
            check("1.1 order", log, ["first", "second"]);
            check("1.1 first waited the delay", atLeast(firstAt, 50), true);
            check("1.1 second waited twice the delay", atLeast(secondAt, 100), true);
            next();
        },
        50,
    );
    check("1.1 nothing has run yet (the call returns immediately)", log, []);
}

function check12(next: () => void): void {
    const start = Date.now();
    const log: number[] = [];
    runInSequence([() => log.push(1), () => log.push(2), () => log.push(3)], 30, () => {
        check("1.2 all three ran, in order", log, [1, 2, 3]);
        check("1.2 took at least 3 x 30 ms", atLeast(Date.now() - start, 90), true);
        runInSequence([], 30, () => {
            check("1.2 empty list calls done straight away", true, true);
            next();
        });
    });
}

function check13(next: () => void): void {
    userTotalPyramid(1, (error, text) => {
        check("1.3 pyramid, user 1", [error, text], [null, "Ana: 2000"]);
        userTotalPyramid(99, (error, text) => {
            check("1.3 pyramid, unknown user gives an error", error?.message, "No user with id 99");
            check("1.3 ... and no result", text, undefined);
            next();
        });
    });
}

function check14(next: () => void): void {
    userTotalFlat(2, (error, text) => {
        check("1.4 flat, user 2", [error, text], [null, "Boris: 450"]);
        userTotalFlat(99, error => {
            check("1.4 flat, unknown user gives an error", error?.message, "No user with id 99");
            next();
        });
    });
}

function check15(next: () => void): void {
    const unguarded: string[] = [];
    const guarded: string[] = [];
    buggyLoad((_, value) => unguarded.push(value ?? ""));
    buggyLoad(once((_, value) => guarded.push(value ?? "")));
    setTimeout(() => {
        check("1.5 without once: called twice", unguarded, ["first", "second"]);
        check("1.5 with once: called once", guarded, ["first"]);
        next();
    }, 30);
}

check11(() => check12(() => check13(() => check14(() => check15(summary)))));
