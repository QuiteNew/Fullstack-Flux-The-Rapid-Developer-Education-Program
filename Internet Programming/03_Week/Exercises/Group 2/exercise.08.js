// Exercise 8 — Numbers to Words
// Run with: node exercise.08.js   (or open runner.html?ex=08 in a browser)
// Implements all four levels: 0 to ±999 999 999.

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label, actual, expected) {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
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

// ---- Lookup tables ----
const SMALL = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const LIMIT = 999_999_999;

// The same 0–19 lookup as a switch, for the comparison the sheet asks for.
function smallWordSwitch(n) {
    switch (n) {
        case 0: return "zero";
        case 1: return "one";
        case 2: return "two";
        case 3: return "three";
        case 4: return "four";
        case 5: return "five";
        case 6: return "six";
        case 7: return "seven";
        case 8: return "eight";
        case 9: return "nine";
        case 10: return "ten";
        case 11: return "eleven";
        case 12: return "twelve";
        case 13: return "thirteen";
        case 14: return "fourteen";
        case 15: return "fifteen";
        case 16: return "sixteen";
        case 17: return "seventeen";
        case 18: return "eighteen";
        case 19: return "nineteen";
        default: throw new RangeError(`${n} is not between 0 and 19`);
    }
}
// switch or table? The array. It is one line per row of data instead of
// two, it cannot suffer a forgotten `break`, and SMALL[n] says exactly what
// it does. A switch fits when each case runs different *code*; here every
// case only picks a different *value*.

// ---- Level 1 — 1 to 999 (zero is handled by the caller) ----
function underThousand(n) {
    const parts = [];
    const hundreds = Math.floor(n / 100);
    const rest = n % 100;

    if (hundreds > 0) {
        parts.push(`${SMALL[hundreds]} hundred`);
    }
    if (rest > 0 && rest < 20) {
        parts.push(SMALL[rest]);
    } else if (rest >= 20) {
        const tens = TENS[Math.floor(rest / 10)];
        const units = rest % 10;
        parts.push(units > 0 ? `${tens}-${SMALL[units]}` : tens);
    }
    return parts.join(" ");
}

// ---- Levels 2–4 ----
function toWords(n) {
    if (typeof n !== "number" || !Number.isInteger(n) || Math.abs(n) > LIMIT) {
        throw new RangeError(`Can only spell integers from -${LIMIT} to ${LIMIT}, got ${n}`);
    }
    if (n === 0) {
        return "zero";
    }
    if (n < 0) {
        return `minus ${toWords(-n)}`;        // level 4: recursion does the rest
    }

    // Split into groups of three digits, and reuse underThousand for each
    const millions = Math.floor(n / 1_000_000);
    const thousands = Math.floor(n / 1000) % 1000;
    const rest = n % 1000;

    const parts = [];
    if (millions > 0) {
        parts.push(`${underThousand(millions)} million`);
    }
    if (thousands > 0) {
        parts.push(`${underThousand(thousands)} thousand`);
    }
    if (rest > 0) {
        parts.push(underThousand(rest));
    }
    return parts.join(" ");
}

// ======================================================================

console.log("=== The test table ===");
const table = [
    [0, "zero"],
    [7, "seven"],
    [13, "thirteen"],
    [40, "forty"],
    [42, "forty-two"],
    [100, "one hundred"],
    [105, "one hundred five"],
    [999, "nine hundred ninety-nine"],
    [1000, "one thousand"],
    [1001, "one thousand one"],
    [120000, "one hundred twenty thousand"],
    [999999, "nine hundred ninety-nine thousand nine hundred ninety-nine"],
    [1000000, "one million"],
    [2000017, "two million seventeen"],
    [-7, "minus seven"],
];
for (const [n, expected] of table) {
    check(`toWords(${n})`, toWords(n), expected);
}
checkThrows("toWords(1.5) throws RangeError", () => toWords(1.5), RangeError);
checkThrows("toWords(1_000_000_000) throws RangeError", () => toWords(1_000_000_000), RangeError);
checkThrows('toWords("12") throws RangeError', () => toWords("12"), RangeError);

console.log("\n=== switch versus table ===");
let agree = true;
for (let n = 0; n < 20; n++) {
    agree = agree && smallWordSwitch(n) === SMALL[n];
}
check("switch and array agree for 0..19", agree, true);

console.log("\n=== A few more ===");
for (const n of [345678, 10_000_010, -999_999_999]) {
    console.log(`  ${n} → ${toWords(n)}`);
}
