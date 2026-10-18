// Exercise 1 — Factorial
// Run with: node exercise.01.js   (or open runner.html?ex=01 in a browser)

// ---- tiny test helper (each exercise file is self-contained) ----
const show = (value) => typeof value === "bigint" ? `${value}n` : JSON.stringify(value);
const same = (a, b) => typeof a === "bigint" || typeof b === "bigint"
    ? a === b
    : Object.is(a, b) || JSON.stringify(a) === JSON.stringify(b);

function check(label, actual, expected) {
    if (same(actual, expected)) {
        console.log(`PASS  ${label}`);
    } else {
        console.log(`FAIL  ${label} — expected ${show(expected)}, got ${show(actual)}`);
    }
}

function checkThrows(label, fn, ErrorType) {
    try {
        fn();
    } catch (error) {
        const ok = error instanceof ErrorType;
        console.log(`${ok ? "PASS" : "FAIL"}  ${label}${ok ? "" : ` — threw ${error.name}, expected ${ErrorType.name}`}`);
        return;
    }
    console.log(`FAIL  ${label} — did not throw`);
}

// ---- 1.3 — validation, shared by every version ----
function validate(n) {
    if (typeof n !== "number") {
        throw new TypeError(`n must be a number, got ${typeof n}`);
    }
    if (!Number.isInteger(n) || n < 0) {
        throw new RangeError(`n must be a non-negative integer, got ${n}`);
    }
}

// ---- 1.1 — With a loop ----
function factorialLoop(n) {
    validate(n);
    let result = 1;               // not 0 — anything times 0 is 0
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// ---- 1.2 — With recursion ----
function factorialRecursive(n) {
    validate(n);
    if (n <= 1) {
        return 1;                             // base case: 0! = 1! = 1
    }
    return n * factorialRecursive(n - 1);     // recursive case: one step smaller
}

// The recursive version *without* validation, kept only to answer 1.3
function factorialUnchecked(n) {
    return n <= 1 ? 1 : n * factorialUnchecked(n - 1);
}

// ---- 1.4 — BigInt version ----
function factorialBig(n) {
    validate(n);
    let result = 1n;
    for (let i = 2n; i <= BigInt(n); i++) {
        result *= i;
    }
    return result;
}

// ======================================================================

console.log("=== 1.1 / 1.2 — Loop and recursion ===");
for (const [n, expected] of [[0, 1], [1, 1], [5, 120], [10, 3628800]]) {
    check(`factorialLoop(${n})`, factorialLoop(n), expected);
    check(`factorialRecursive(${n})`, factorialRecursive(n), expected);
}

console.log("\n=== 1.3 — Bad input ===");
console.log("Without validation:");
console.log(`  factorialUnchecked(-1)  = ${factorialUnchecked(-1)}`);
console.log(`  factorialUnchecked(2.5) = ${factorialUnchecked(2.5)}`);
// Answer: neither crashes. -1 hits the base case straight away and returns 1;
// 2.5 computes 2.5 × 1.5 and stops at 0.5. Both answers are silently wrong,
// which is worse than an error — nothing tells you there is a problem.

checkThrows("factorialLoop(-1) throws RangeError", () => factorialLoop(-1), RangeError);
checkThrows("factorialRecursive(2.5) throws RangeError", () => factorialRecursive(2.5), RangeError);
checkThrows('factorialLoop("5") throws TypeError', () => factorialLoop("5"), TypeError);

// The caller catches only the errors it knows how to handle, and rethrows the rest.
function printFactorial(input) {
    try {
        console.log(`  ${input}! = ${factorialRecursive(input)}`);
    } catch (error) {
        if (error instanceof RangeError || error instanceof TypeError) {
            console.log(`  Cannot compute the factorial of ${show(input)}: ${error.message}`);
        } else {
            throw error;
        }
    }
}

console.log("Caller with try...catch:");
for (const input of [6, -3, 4.2, "seven"]) {
    printFactorial(input);
}

console.log("\n=== 1.4 — How far can it go? ===");
console.log(`  MAX_SAFE_INTEGER = ${Number.MAX_SAFE_INTEGER}`);
// BigInt(asNumber) prints every digit the Number really holds — printing the
// Number itself would switch to exponent notation from 1e21 and hide them.
for (let n = 15; n <= 25; n++) {
    const asNumber = BigInt(factorialLoop(n));
    const truth = factorialBig(n);
    const safe = factorialLoop(n) <= Number.MAX_SAFE_INTEGER ? "safe  " : "UNSAFE";
    const exact = asNumber === truth ? "exact" : "WRONG";
    const correction = asNumber === truth ? "" : `   (should be ${truth})`;
    console.log(`  ${String(n).padStart(2)}!  ${safe}  ${exact}  ${asNumber}${correction}`);
}
console.log(`  170! = ${factorialLoop(170)}`);
console.log(`  171! = ${factorialLoop(171)}`);
console.log(`  25! as BigInt = ${factorialBig(25)}`);
console.log(`  25! as Number = ${BigInt(factorialLoop(25))}`);

let firstWrong = 0;
while (BigInt(factorialLoop(firstWrong)) === factorialBig(firstWrong)) {
    firstWrong++;
}
console.log(`  The two versions first disagree at n = ${firstWrong}`);
check("first disagreement is at 23", firstWrong, 23);
check("factorialLoop(171) is Infinity", factorialLoop(171), Infinity);
check("factorialBig(25)", factorialBig(25), 15511210043330985984000000n);
// Answer: from 19! the result is above MAX_SAFE_INTEGER, but it stays exact
// until 22! — factorials contain many factors of 2, which floating point
// stores for free. "Safe" means *every* integer up to that point is exact;
// beyond it, some still are and some are not. From 23! the Number is wrong.
