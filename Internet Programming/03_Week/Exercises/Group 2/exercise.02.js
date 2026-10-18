// Exercise 2 — FizzBuzz
// Run with: node exercise.02.js   (or open runner.html?ex=02 in a browser)

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label, actual, expected) {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 2.2 — The classic, as a function that returns ----
// Order matters: test the combined case first, or 15 would stop at "Fizz".
function fizzBuzz(n) {
    if (n % 15 === 0) {
        return "FizzBuzz";
    }
    if (n % 3 === 0) {
        return "Fizz";
    }
    if (n % 5 === 0) {
        return "Buzz";
    }
    return String(n);
}

// ---- 2.3 — Data-driven ----
// Adding a rule means adding one line here, and nothing else.
const rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Bazz" },
];

function fizzBuzzRules(n, ruleList = rules) {
    let result = "";
    for (const { divisor, word } of ruleList) {
        if (n % divisor === 0) {
            result += word;
        }
    }
    return result || String(n);
}

// ======================================================================

console.log("=== 2.1 — The classic, 1 to 100 ===");
// Ten per line, so the output is readable
for (let start = 1; start <= 100; start += 10) {
    const row = [];
    for (let n = start; n < start + 10; n++) {
        row.push(fizzBuzz(n).padEnd(8));
    }
    console.log("  " + row.join(""));
}

console.log("\n=== 2.2 — Tests ===");
check("fizzBuzz(1)", fizzBuzz(1), "1");
check("fizzBuzz(9)", fizzBuzz(9), "Fizz");
check("fizzBuzz(10)", fizzBuzz(10), "Buzz");
check("fizzBuzz(15)", fizzBuzz(15), "FizzBuzz");
check("fizzBuzz(98)", fizzBuzz(98), "98");

const all = Array.from({ length: 100 }, (_, i) => fizzBuzz(i + 1));
const count = (word) => all.filter((value) => value === word).length;
check("27 × Fizz in 1..100", count("Fizz"), 27);
check("14 × Buzz in 1..100", count("Buzz"), 14);
check("6 × FizzBuzz in 1..100", count("FizzBuzz"), 6);

console.log("\n=== 2.3 — Data-driven ===");
check("fizzBuzzRules(105)", fizzBuzzRules(105), "FizzBuzzBazz");
check("fizzBuzzRules(21)", fizzBuzzRules(21), "FizzBazz");
check("fizzBuzzRules(35)", fizzBuzzRules(35), "BuzzBazz");
check("fizzBuzzRules(7)", fizzBuzzRules(7), "Bazz");
check("fizzBuzzRules(8)", fizzBuzzRules(8), "8");

// With only the first two rules it behaves exactly like the classic version
const classicRules = rules.slice(0, 2);
const agrees = all.every((value, i) => fizzBuzzRules(i + 1, classicRules) === value);
check("data-driven version with 2 rules matches the classic for 1..100", agrees, true);
