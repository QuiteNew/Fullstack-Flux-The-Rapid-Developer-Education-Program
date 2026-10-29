// Exercise 2 — Basic Syntax
// Run with: npx tsc && node dist/exercise.02.js
// (This file uses only type annotations, so `node exercise.02.ts` works too.)

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 2.1 — Variables and a function, fully annotated ----
const courseName: string = "Internet Programming";
let enrolled: number = 42;
const isActive: boolean = true;

function formatCourse(name: string, students: number, active: boolean): string {
    return `${name}: ${students} students${active ? "" : " (inactive)"}`;
}

// ---- 2.2 — The same, relying on inference ----
// Only the function parameters need annotations — TypeScript cannot guess those.
const courseName2 = "Internet Programming";   // type: the literal "Internet Programming"
let enrolled2 = 42;                           // type: number (let can change, so it widens)
const isActive2 = true;                       // type: true

function formatCourse2(name: string, students: number, active: boolean) {   // returns string, inferred
    return `${name}: ${students} students${active ? "" : " (inactive)"}`;
}

// ---- 2.3 — Arrays and tuples ----
type Grade = [student: string, points: number];

// readonly: a promise that this function will not change the caller's array
function average(points: readonly number[]): number {
    if (points.length === 0) {
        return 0;
    }
    return points.reduce((total, p) => total + p, 0) / points.length;
}

function best(grades: readonly Grade[]): Grade | undefined {
    let top: Grade | undefined;
    for (const grade of grades) {
        if (top === undefined || grade[1] > top[1]) {
            top = grade;
        }
    }
    return top;
}

// ---- 2.4 — Optional, default and rest parameters ----
function greet(name: string, title?: string): string {
    return title ? `Hello, ${title} ${name}!` : `Hello, ${name}!`;
}

function repeat(text: string, times = 1, separator = " "): string {
    return Array.from({ length: times }, () => text).join(separator);
}

function maxOf(first: number, ...rest: number[]): number {
    let max = first;
    for (const n of rest) {
        if (n > max) {
            max = n;
        }
    }
    return max;
}

// ---- 2.5 — unknown and narrowing ----
function describeValue(value: unknown): string {
    if (value === null) {
        return "null";
    }
    if (typeof value === "string") {
        return `a string of length ${value.length}`;          // value: string here
    }
    if (typeof value === "number") {
        return Number.isNaN(value) ? "not a number" : `the number ${value}`;
    }
    if (Array.isArray(value)) {
        return `an array of ${value.length} items`;
    }
    if (value instanceof Date) {
        return `a date in ${value.getFullYear()}`;
    }
    return typeof value;                                     // "boolean", "object", "undefined", ...
}

// ---- 2.6 — Lines the compiler rejects ----
// Never called: these lines only exist to be compiled. Each @ts-expect-error
// makes the build FAIL if the line below it stops being an error — so the
// claims in the comments are checked every time you run tsc.
function compileTimeChecks(): void {
    // @ts-expect-error — enrolled is a number; a string cannot go in
    enrolled = "many";

    // @ts-expect-error — inference works too: enrolled2 was inferred as number
    enrolled2 = "many";

    // @ts-expect-error — formatCourse needs three arguments
    formatCourse("IP", 30);

    const scores: readonly number[] = [90, 80];
    // @ts-expect-error — a readonly array has no push
    scores.push(70);

    const grade: Grade = ["Ana", 95];
    // @ts-expect-error — the tuple has no element at index 2
    grade[2];

    const mystery: unknown = "text";
    // @ts-expect-error — unknown cannot be used until it is narrowed
    mystery.toUpperCase();
}

// ======================================================================

console.log("=== 2.1 / 2.2 ===");
check("formatCourse", formatCourse(courseName, enrolled, isActive), "Internet Programming: 42 students");
check("formatCourse2 (inferred) gives the same", formatCourse2(courseName2, enrolled2, isActive2),
    formatCourse(courseName, enrolled, isActive));
check("inactive course", formatCourse("Databases", 0, false), "Databases: 0 students (inactive)");

console.log("\n=== 2.3 ===");
check("average([90, 80, 70])", average([90, 80, 70]), 80);
check("average([])", average([]), 0);
const grades: Grade[] = [["Ana", 88], ["Marko", 95], ["Elena", 91]];
check("best grade", best(grades), ["Marko", 95]);
check("best of none", best([]), undefined);

console.log("\n=== 2.4 ===");
check("greet without a title", greet("Ana"), "Hello, Ana!");
check("greet with a title", greet("Ana", "Dr."), "Hello, Dr. Ana!");
check("repeat with defaults", repeat("hi"), "hi");
check("repeat 3 times", repeat("hi", 3), "hi hi hi");
check("repeat with a separator", repeat("ab", 3, "-"), "ab-ab-ab");
check("maxOf(4)", maxOf(4), 4);
check("maxOf(4, 9, 2)", maxOf(4, 9, 2), 9);

console.log("\n=== 2.5 ===");
check('describeValue("hello")', describeValue("hello"), "a string of length 5");
check("describeValue(42)", describeValue(42), "the number 42");
check("describeValue(NaN)", describeValue(NaN), "not a number");
check("describeValue([1, 2, 3])", describeValue([1, 2, 3]), "an array of 3 items");
check("describeValue(new Date(2026, 0, 1))", describeValue(new Date(2026, 0, 1)), "a date in 2026");
check("describeValue(null)", describeValue(null), "null");
check("describeValue(true)", describeValue(true), "boolean");
check("describeValue({})", describeValue({}), "object");

// Keep compileTimeChecks referenced, so it is not reported as unused
void compileTimeChecks;
