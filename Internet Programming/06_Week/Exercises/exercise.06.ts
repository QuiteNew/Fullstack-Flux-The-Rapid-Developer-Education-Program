// Exercise 6 — Power Function
// Run with: npx tsx exercise.06.ts   (or: node exercise.06.ts)
//
// "Given an exponent, create a power function for that value." A function that returns
// a function: a higher-order function, and a closure (Lecture 03) — the returned function
// remembers the exponent. You wrote the same shape in Lecture 05: flaky(failures) and
// once(fn) both return functions that remember something.

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

// ---- 6.1 — The factory ----
function power(exponent: number): (base: number) => number {
    return (base) => base ** exponent;
}

// The same, with arrows only. Two arrows: one per argument you give it.
const powerArrow = (exponent: number) => (base: number) => base ** exponent;

// ---- 6.2 — Make some ----
const square = power(2);
const cube = power(3);
const squareRoot = power(0.5);

// ---- 6.3 — The same pattern elsewhere ----
// A function factory that builds sort comparators — the midterm's "click a column to sort".
type Direction = "asc" | "desc";

function by<T, K extends keyof T>(key: K, direction: Direction = "asc"): (a: T, b: T) => number {
    const sign = direction === "asc" ? 1 : -1;
    return (a, b) => {
        const x = a[key];
        const y = b[key];
        if (typeof x === "string" && typeof y === "string") {
            return sign * x.localeCompare(y);
        }
        return sign * (Number(x) - Number(y));
    };
}

// ---- checks ----
check("6.1 square", square(7), 49);
check("6.1 cube", cube(3), 27);
check("6.1 square root", squareRoot(81), 9);
check("6.1 each function remembers its own exponent", [square(2), cube(2), power(10)(2)], [4, 8, 1024]);
check("6.1 the arrow version", powerArrow(4)(2), 16);

check("6.2 a power function is a perfect map callback", [1, 2, 3, 4].map(square), [1, 4, 9, 16]);
check("6.2 a table of powers", [1, 2, 3].map((e) => [2, 3].map(power(e))), [[2, 3], [4, 9], [8, 27]]);

interface Author { name: string; born: number; }
const authors: Author[] = [
    { name: "Kazuo Ishiguro", born: 1954 },
    { name: "Ursula K. Le Guin", born: 1929 },
    { name: "Hilary Mantel", born: 1952 },
];
const names = (list: Author[]) => list.map((a) => a.name);

check("6.3 sort by name", names([...authors].sort(by("name"))), ["Hilary Mantel", "Kazuo Ishiguro", "Ursula K. Le Guin"]);
check("6.3 sort by year, newest first", names([...authors].sort(by("born", "desc"))), ["Kazuo Ishiguro", "Hilary Mantel", "Ursula K. Le Guin"]);
check("6.3 [...authors] — the original order is untouched", names(authors), ["Kazuo Ishiguro", "Ursula K. Le Guin", "Hilary Mantel"]);

function neverCalled(): void {
    // @ts-expect-error — "age" is not a key of Author.
    authors.sort(by<Author, "age">("age"));
}
void neverCalled;

console.log(`\n${passed} passed, ${failed} failed`);
