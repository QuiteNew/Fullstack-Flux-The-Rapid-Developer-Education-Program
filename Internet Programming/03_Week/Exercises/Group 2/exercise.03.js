// Exercise 3 — Check for a Prime Number
// Run with: node exercise.03.js   (or open runner.html?ex=03 in a browser)
// Note: 3.3 deliberately runs a slow version — expect a pause of a couple of seconds.

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label, actual, expected) {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 3.1 / 3.2 — The slow version: tries every divisor below n ----
function isPrimeSlow(n) {
    if (!Number.isInteger(n) || n < 2) {
        return false;
    }
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;         // 3.2 — stop at the first divisor
        }
    }
    return true;
}

// ---- 3.3 — The fast version: only tries divisors up to √n ----
// Divisors come in pairs: if a × b = n and a ≤ b, then a × a ≤ n, so a ≤ √n.
// If nothing up to √n divides n, nothing above it can either — its partner
// would have to be below √n, and we already checked those.
function isPrime(n) {
    if (!Number.isInteger(n) || n < 2) {
        return false;             // guard clauses: non-integers, 1, 0, negatives
    }
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

function time(fn) {
    const start = performance.now();
    const result = fn();
    return { result, ms: performance.now() - start };
}

// ======================================================================

console.log("=== 3.1 — Test table ===");
const table = [[2, true], [9, false], [97, true], [1, false], [0, false], [-7, false], [2.5, false]];
for (const [n, expected] of table) {
    check(`isPrime(${n})`, isPrime(n), expected);
    check(`isPrimeSlow(${n})`, isPrimeSlow(n), expected);
}

console.log("\n=== 3.3 — Timing on 1,000,000,007 ===");
const slow = time(() => isPrimeSlow(1_000_000_007));
const fast = time(() => isPrime(1_000_000_007));
console.log(`  every divisor below n: ${slow.result}  in ${slow.ms.toFixed(0)} ms`);
console.log(`  divisors up to √n:     ${fast.result}  in ${fast.ms.toFixed(2)} ms`);
check("both agree it is prime", slow.result && fast.result, true);

console.log("\n=== 3.4 — All primes below 100 ===");
const primes = Array.from({ length: 100 }, (_, i) => i).filter(isPrime);
console.log("  " + primes.join(", "));
check("25 primes below 100", primes.length, 25);
check("the largest is 97", primes.at(-1), 97);
