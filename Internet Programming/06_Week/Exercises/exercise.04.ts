// Exercise 4 — Higher-Order Functions: combining functions
// Run with: npx tsx exercise.04.ts   (or: node exercise.04.ts)
//
// "Create a function that combines two other functions and returns the result."
// You have been combining steps all along: a.filter(...).map(...) and promise .then chains
// feed one step's result into the next. compose and pipe do the same for plain functions —
// and RxJS's pipe(), which you will meet in Angular, is exactly this idea.

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

// ---- 4.1 — compose two functions ----
// compose(f, g)(x) is f(g(x)): g runs first, then f — the order you read in maths.
function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C {
    return (a) => f(g(a));
}

// ---- 4.2 — pipe: the same, in reading order ----
// pipe(g, f)(x) is also f(g(x)), but the steps are listed in the order they run.
function pipe<A, B, C>(first: (a: A) => B, second: (b: B) => C): (a: A) => C {
    return (a) => second(first(a));
}

// ---- 4.3 — any number of steps ----
// With several steps the types can change at each one, which TypeScript cannot follow
// through an array. So pipeAll keeps one type all the way: A → A → A.
function pipeAll<A>(...steps: ((value: A) => A)[]): (value: A) => A {
    return (value) => steps.reduce((current, step) => step(current), value);
}

// ---- 4.4 — combining predicates ----
// Filters on a page usually work together: name AND nationality AND alive.
// Each filter is a predicate; `and` combines any number of them into one.
type Predicate<T> = (item: T) => boolean;

function and<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (item) => predicates.every((p) => p(item));
}

function not<T>(predicate: Predicate<T>): Predicate<T> {
    return (item) => !predicate(item);
}

// ---- checks ----
const double = (n: number) => n * 2;
const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

check("4.1 compose: increment first, then double", compose(double, increment)(5), 12);
check("4.1 order matters", compose(increment, double)(5), 11);
check("4.1 types can change between steps", compose((s: string) => s.length, (n: number) => n.toString())(12345), 5);

check("4.2 pipe reads left to right", pipe(increment, double)(5), 12);
check("4.2 pipe and compose are mirror images", pipe(increment, double)(7), compose(double, increment)(7));

check("4.3 three steps", pipeAll(increment, double, square)(2), 36);
check("4.3 no steps returns the value unchanged", pipeAll<number>()(42), 42);

// A text clean-up pipeline, the kind every search box needs.
const normalize = pipeAll<string>(
    (s) => s.trim(),
    (s) => s.toLowerCase(),
    (s) => s.replace(/\s+/g, " "),
);
check("4.3 normalize", normalize("   Ursula   K.  LE GUIN "), "ursula k. le guin");

interface Author { name: string; nationality: string; alive: boolean; }
const authors: Author[] = [
    { name: "Ursula K. Le Guin", nationality: "American", alive: false },
    { name: "Kazuo Ishiguro", nationality: "British", alive: true },
    { name: "Hilary Mantel", nationality: "British", alive: false },
    { name: "Neil Gaiman", nationality: "British", alive: true },
];

const nameContains = (text: string): Predicate<Author> => (a) => normalize(a.name).includes(normalize(text));
const from = (country: string): Predicate<Author> => (a) => a.nationality === country;
const isAlive: Predicate<Author> = (a) => a.alive;

check("4.4 one predicate", authors.filter(from("British")).length, 3);
check("4.4 combined", authors.filter(and(from("British"), isAlive)).map((a) => a.name), ["Kazuo Ishiguro", "Neil Gaiman"]);
check("4.4 with a search text", authors.filter(and(from("British"), nameContains("  MAN "))).map((a) => a.name), ["Hilary Mantel", "Neil Gaiman"]);
check("4.4 not", authors.filter(not(isAlive)).map((a) => a.name), ["Ursula K. Le Guin", "Hilary Mantel"]);
check("4.4 and() with nothing keeps everything", authors.filter(and()).length, 4);

console.log(`\n${passed} passed, ${failed} failed`);
