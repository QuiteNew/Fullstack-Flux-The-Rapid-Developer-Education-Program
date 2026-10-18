// Exercise 4 — Sum of Array Elements
// Run with: node exercise.04.js   (or open runner.html?ex=04 in a browser)

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label, actual, expected) {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 4.1 — Sum, three ways ----
function sumFor(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}

function sumForOf(numbers) {
    let total = 0;
    for (const n of numbers) {
        total += n;
    }
    return total;
}

function sumReduce(numbers) {
    // The initial value 0 is what makes the empty array work
    return numbers.reduce((total, n) => total + n, 0);
}

// ---- 4.2 — Sum of squares, two ways ----
function sumOfSquaresMapReduce(numbers) {
    return numbers
        .map((n) => n * n)
        .reduce((total, square) => total + square, 0);
}

function sumOfSquares(numbers) {
    return numbers.reduce((total, n) => total + n * n, 0);
}

// ---- 4.3 — Variadic, with a rest parameter ----
function sumAll(...numbers) {
    return sumReduce(numbers);     // numbers is already a real array
}

// ======================================================================

console.log("=== 4.1 — Sum, three ways ===");
for (const sum of [sumFor, sumForOf, sumReduce]) {
    check(`${sum.name}([1, 2, 3, 4])`, sum([1, 2, 3, 4]), 10);
    check(`${sum.name}([])`, sum([]), 0);
}

console.log("\n=== 4.2 — Sum of squares ===");
for (const fn of [sumOfSquaresMapReduce, sumOfSquares]) {
    check(`${fn.name}([1, 2, 3, 4])`, fn([1, 2, 3, 4]), 30);
    check(`${fn.name}([-3])`, fn([-3]), 9);
    check(`${fn.name}([])`, fn([]), 0);
}

console.log("\n=== 4.3 — Rest and spread ===");
check("sumAll(1, 2, 3)", sumAll(1, 2, 3), 6);
check("sumAll()", sumAll(), 0);
const existing = [5, 10, 15];
check("sumAll(...existing)", sumAll(...existing), 30);

// Which is clearest? sumReduce — one line that says "combine all into a total".
// The for...of version is a close second and easier for newcomers to read.
// The classic for loop adds index bookkeeping that this task does not need.
