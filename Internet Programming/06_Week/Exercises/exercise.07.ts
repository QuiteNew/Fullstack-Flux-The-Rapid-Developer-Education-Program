// Exercise 7 — Currying and Partial Application (scary)
// Run with: npx tsx exercise.07.ts   (or: node exercise.07.ts)
//
// "Create a function that fixes the first parameter of a given function." That is
// partial application. You have seen it twice already: power(2) in exercise 6 fixes the
// exponent, and bind(), from Lecture 03 and exercise 1, can fix arguments as well as `this`.
// The scary part is only the types.

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

// ---- 7.1 — partial: fix the first argument ----
// Read the type: given a function whose first parameter is F and whose other parameters
// are Rest, and a value for F, return a function that takes only Rest.
// Rest is a tuple type — the same tuples as in Lecture 04.
function partial<F, Rest extends unknown[], R>(fn: (first: F, ...rest: Rest) => R, first: F): (...rest: Rest) => R {
    return (...rest) => fn(first, ...rest);
}

// ---- 7.2 — bind does the same ----
// fn.bind(thisValue, arg1) fixes `this` AND the first argument. For a function that does
// not use `this`, pass null.

// ---- 7.3 — curry: one argument at a time ----
// Currying turns f(a, b) into f(a)(b). Every call fixes one argument and returns a function
// waiting for the next — so every curried function is ready for partial application.
function curry<A, B, R>(fn: (a: A, b: B) => R): (a: A) => (b: B) => R {
    return (a) => (b) => fn(a, b);
}

function uncurry<A, B, R>(fn: (a: A) => (b: B) => R): (a: A, b: B) => R {
    return (a, b) => fn(a)(b);
}

// ---- checks ----
const add = (a: number, b: number) => a + b;
const greet = (greeting: string, name: string, punctuation: string) => `${greeting}, ${name}${punctuation}`;

const addTen = partial(add, 10);
check("7.1 partial(add, 10)", addTen(5), 15);
const hello = partial(greet, "Hello");
check("7.1 with three parameters, two are left", hello("Ana", "!"), "Hello, Ana!");
const helloAna = partial(hello, "Ana");
check("7.1 partial of a partial", helloAna("?"), "Hello, Ana?");

check("7.2 bind(null, 10) — the same as partial", add.bind(null, 10)(5), 15);
check("7.2 bind with two fixed arguments", greet.bind(null, "Hi", "Boris")("."), "Hi, Boris.");

const curriedAdd = curry(add);
check("7.3 curried: one argument at a time", curriedAdd(2)(3), 5);
check("7.3 a curried function partially applied", [1, 2, 3].map(curriedAdd(100)), [101, 102, 103]);
check("7.3 uncurry undoes curry", uncurry(curriedAdd)(2, 3), add(2, 3));

// A real use: one generic logger, partially applied into specific ones.
const lines: string[] = [];
const log = (level: string, area: string, message: string) => lines.push(`[${level}] ${area}: ${message}`);
const warn = partial(log, "WARN");
const apiWarn = partial(warn, "api");
apiWarn("slow response");
warn("ui", "button disabled");
check("7.3 specialised loggers", lines, ["[WARN] api: slow response", "[WARN] ui: button disabled"]);

function neverCalled(): void {
    // @ts-expect-error — partial keeps the types: addTen takes a number.
    addTen("5");
    // @ts-expect-error — hello still needs a name and the punctuation.
    hello("Ana");
}
void neverCalled;

console.log(`\n${passed} passed, ${failed} failed`);
