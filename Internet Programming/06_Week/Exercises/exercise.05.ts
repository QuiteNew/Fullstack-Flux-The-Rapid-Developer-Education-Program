// Exercise 5 — Recursive Fibonacci, with memoization
// Run with: npx tsx exercise.05.ts   (or: node exercise.05.ts)
//
// Recursion is Lecture 03 (factorial). Memoization you have done already, without the
// name: the exchange-rate cache in Lecture 05 kept results and handed them back instead
// of asking again. Here the same idea rescues a recursive function.

// ---- tiny test helper ----
let passed = 0;
let failed = 0;
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) passed++; else failed++;
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 5.1 — The naive version ----
// Straight from the definition: fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2).
let naiveCalls = 0;
function fib(n: number): number {
    naiveCalls++;
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

// ---- 5.2 — Memoized by hand ----
// fib(n - 2) is computed again inside fib(n - 1), and again, and again. Remember each
// answer the first time, and look it up after that. The Map lives in a closure, so only
// this function can see it.
let memoCalls = 0;
const fastFib = (() => {
    const known = new Map<number, number>();
    function inner(n: number): number {
        memoCalls++;
        if (n < 2) return n;
        const cached = known.get(n);
        if (cached !== undefined) return cached;
        const result = inner(n - 1) + inner(n - 2);
        known.set(n, result);
        return result;
    }
    return inner;
})();

// ---- 5.3 — memoize: the idea as a higher-order function ----
// Takes any one-argument function and returns a version that remembers its answers.
// It works only for *pure* functions: same input, same output, no side effects.
function memoize<A, R>(fn: (arg: A) => R): (arg: A) => R {
    const cache = new Map<A, R>();
    return (arg) => {
        if (cache.has(arg)) {
            return cache.get(arg)!;
        }
        const result = fn(arg);
        cache.set(arg, result);
        return result;
    };
}

// For recursion, the recursive calls must go through the memoized version too —
// so the function calls `memoFib`, not itself.
const memoFib: (n: number) => number = memoize((n: number) => (n < 2 ? n : memoFib(n - 1) + memoFib(n - 2)));

// ---- 5.4 — Why it must be pure ----
let clock = 0;
const impure = (n: number) => n + clock;      // depends on something outside its parameters
const memoImpure = memoize(impure);

// ---- checks ----
const time = (work: () => void): number => {
    const start = performance.now();
    work();
    return performance.now() - start;
};

check("5.1 first values", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(fib), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);

naiveCalls = 0;
const slowMs = time(() => fib(30));
check("5.1 fib(30)", fib(30), 832040);
naiveCalls = 0;
fib(30);
check("5.1 ... takes 2,692,537 calls", naiveCalls, 2692537);

memoCalls = 0;
const fastMs = time(() => fastFib(30));
check("5.2 the same answer", fastFib(30), 832040);
check("5.2 ... in 59 calls", memoCalls, 59 + 1);        // +1: the check above called it once more
// fib(70) is instant now; the naive version would need about 600 trillion calls.
// (Past fib(78) the answers exceed Number.MAX_SAFE_INTEGER, and the last digits are rounded.)
check("5.2 and big ones are instant", fastFib(70), 190392490709135);
console.log(`      (fib(30): naive ${slowMs.toFixed(1)} ms, memoized ${fastMs.toFixed(3)} ms)`);

check("5.3 memoize gives the same answers", [10, 20, 30].map(memoFib), [55, 6765, 832040]);
let squareCalls = 0;
const slowSquare = memoize((n: number) => { squareCalls++; return n * n; });
slowSquare(12); slowSquare(12); slowSquare(12);
check("5.3 the wrapped function runs once per input", squareCalls, 1);

check("5.4 an impure function, first call", memoImpure(1), 1);
clock = 100;
check("5.4 the real answer has changed", impure(1), 101);
check("5.4 ... but the memoized one still says 1", memoImpure(1), 1);

console.log(`\n${passed} passed, ${failed} failed`);
