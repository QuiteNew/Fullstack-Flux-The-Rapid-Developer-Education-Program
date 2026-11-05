// Exercise 3 — Higher-Order Functions: map and filter
// Run with: npx tsx exercise.03.ts   (or: node exercise.03.ts)
//
// You have called map, filter and reduce since Lecture 03. Writing them yourself shows
// there is no magic: each is a loop that takes the varying part — what to do with one
// element — as a function. That makes them higher-order functions.

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

// ---- 3.1 — map ----
// The generics say it all: from an array of T and a way to turn a T into a U,
// you get an array of U. The callback also gets the index, like the real map.
function map<T, U>(items: readonly T[], transform: (item: T, index: number) => U): U[] {
    const result: U[] = [];
    for (let i = 0; i < items.length; i++) {
        result.push(transform(items[i]!, i));
    }
    return result;
}

// ---- 3.2 — filter ----
function filter<T>(items: readonly T[], keep: (item: T, index: number) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i]!;
        if (keep(item, i)) {
            result.push(item);
        }
    }
    return result;
}

// ---- 3.3 — reduce ----
// The most general of the three: map and filter can both be written with it.
function reduce<T, A>(items: readonly T[], combine: (accumulator: A, item: T) => A, initial: A): A {
    let accumulator = initial;
    for (const item of items) {
        accumulator = combine(accumulator, item);
    }
    return accumulator;
}

const mapWithReduce = <T, U>(items: readonly T[], transform: (item: T) => U): U[] =>
    reduce(items, (acc: U[], item) => [...acc, transform(item)], []);

const filterWithReduce = <T>(items: readonly T[], keep: (item: T) => boolean): T[] =>
    reduce(items, (acc: T[], item) => (keep(item) ? [...acc, item] : acc), []);

// ---- 3.4 — Use them the way the midterm will ----
interface Book { title: string; year: number; type: "Novel" | "Novella" | "Collection"; }

const books: Book[] = [
    { title: "Dune", year: 1965, type: "Novel" },
    { title: "The Old Man and the Sea", year: 1952, type: "Novella" },
    { title: "Ficciones", year: 1944, type: "Collection" },
    { title: "Neuromancer", year: 1984, type: "Novel" },
    { title: "Animal Farm", year: 1945, type: "Novella" },
];

// "3 Novels, 2 Novellas" — counting by a key is a reduce into an object.
function countByType(list: readonly Book[]): Record<string, number> {
    return reduce(list, (counts: Record<string, number>, book) => ({
        ...counts,
        [book.type]: (counts[book.type] ?? 0) + 1,
    }), {});
}

// ---- checks ----
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

check("3.1 map", map(numbers, (n) => n * 2), [6, 2, 8, 2, 10, 18, 4, 12]);
check("3.1 same as the built-in", map(numbers, (n, i) => n * i), numbers.map((n, i) => n * i));
check("3.1 map changes the type", map(books, (b) => b.title.length), [4, 23, 9, 11, 11]);
check("3.1 the original is untouched", numbers, [3, 1, 4, 1, 5, 9, 2, 6]);

check("3.2 filter", filter(numbers, (n) => n > 3), [4, 5, 9, 6]);
check("3.2 same as the built-in", filter(numbers, (_, i) => i % 2 === 0), numbers.filter((_, i) => i % 2 === 0));
check("3.2 nothing matches", filter(numbers, (n) => n > 100), []);

check("3.3 sum with reduce", reduce(numbers, (sum, n) => sum + n, 0), 31);
check("3.3 empty array gives the initial value", reduce([] as number[], (sum, n) => sum + n, 0), 0);
check("3.3 map with reduce", mapWithReduce(numbers, (n) => n + 1), numbers.map((n) => n + 1));
check("3.3 filter with reduce", filterWithReduce(numbers, (n) => n % 2 === 1), [3, 1, 1, 5, 9]);

// Chaining: each call returns a new array, so the next one can take it.
const recentTitles = map(filter(books, (b) => b.year > 1950), (b) => b.title);
check("3.4 filter, then map", recentTitles, ["Dune", "The Old Man and the Sea", "Neuromancer"]);
check("3.4 the same with the built-ins", books.filter((b) => b.year > 1950).map((b) => b.title), recentTitles);
check("3.4 count by type", countByType(books), { Novel: 2, Novella: 2, Collection: 1 });
check("3.4 oldest year", reduce(books, (min, b) => Math.min(min, b.year), Infinity), 1944);

console.log(`\n${passed} passed, ${failed} failed`);
