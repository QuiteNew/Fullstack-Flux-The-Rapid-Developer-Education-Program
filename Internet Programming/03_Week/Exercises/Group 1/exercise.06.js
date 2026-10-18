// Exercise 6 — Filter and Reduce
// Run with: node exercise.06.js   (or open runner.html?ex=06 in a browser)

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label, actual, expected) {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 6.1 — filter, then reduce ----
// The initial value 0 matters: when filter returns an empty array, reduce
// without an initial value throws a TypeError.
function sumOfEvens(numbers) {
    return numbers
        .filter((n) => n % 2 === 0)
        .reduce((total, n) => total + n, 0);
}

// ---- 6.2 — The other half ----
// The naive "odd" test. In JavaScript the remainder takes the sign of the
// dividend, so -3 % 2 is -1 — never 1 — and negative odd numbers are missed.
function sumOfOddsNaive(numbers) {
    return numbers
        .filter((n) => n % 2 === 1)
        .reduce((total, n) => total + n, 0);
}

// Correct: "odd" means "not even", which works for any sign.
function sumOfOdds(numbers) {
    return numbers
        .filter((n) => n % 2 !== 0)
        .reduce((total, n) => total + n, 0);
}

// ---- 6.3 — One pass with reduce alone ----
function sumOfEvensOnePass(numbers) {
    return numbers.reduce((total, n) => (n % 2 === 0 ? total + n : total), 0);
}

// ======================================================================

console.log("=== 6.1 — sumOfEvens ===");
const table = [
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 30],
    [[1, 3, 5], 0],
    [[], 0],
    [[-4, -3], -4],
];
for (const [input, expected] of table) {
    check(`sumOfEvens(${JSON.stringify(input)})`, sumOfEvens(input), expected);
    check(`sumOfEvensOnePass(${JSON.stringify(input)})`, sumOfEvensOnePass(input), expected);
}

console.log("\n=== 6.2 — sumOfOdds ===");
console.log(`  -3 % 2 = ${-3 % 2}`);
console.log(`  naive version on [-3, -1, 2]: ${sumOfOddsNaive([-3, -1, 2])}   ← wrong`);
check("sumOfOdds([-3, -1, 2])", sumOfOdds([-3, -1, 2]), -4);
check("sumOfOdds([1, 2, 3])", sumOfOdds([1, 2, 3]), 4);
check("sumOfOdds([])", sumOfOdds([]), 0);

// 6.3 — Which reads better? The filter-then-reduce version: each step does
// one job and says so. The one-pass version is marginally faster, which only
// matters for very large arrays.
