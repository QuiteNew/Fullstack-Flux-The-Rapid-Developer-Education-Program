// Demo 3 — the same report, imperative and declarative.
// Run: node 03-loop-to-pipeline.ts
//
// Both versions answer: "for living authors with at least two books, newest first,
// give the name and a summary like '2 Novels, 1 Collection'".
// The first says HOW, step by step. The second says WHAT, as a pipeline of small functions.

interface Book { title: string; year: number; type: string; }
interface Author { name: string; alive: boolean; books: Book[]; }

const authors: Author[] = [
    { name: "Kazuo Ishiguro", alive: true, books: [
        { title: "The Remains of the Day", year: 1989, type: "Novel" },
        { title: "Nocturnes", year: 2009, type: "Collection" },
        { title: "Klara and the Sun", year: 2021, type: "Novel" },
    ] },
    { name: "Ursula K. Le Guin", alive: false, books: [
        { title: "The Dispossessed", year: 1974, type: "Novel" },
        { title: "The Word for World Is Forest", year: 1972, type: "Novella" },
    ] },
    { name: "Ted Chiang", alive: true, books: [
        { title: "Stories of Your Life and Others", year: 2002, type: "Collection" },
        { title: "Exhalation", year: 2019, type: "Collection" },
    ] },
    { name: "Sally Rooney", alive: true, books: [
        { title: "Normal People", year: 2018, type: "Novel" },
    ] },
];

// ---- Imperative: one function, loops and temporary variables ----
function reportImperative(list: Author[]): string[] {
    const chosen: Author[] = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i]!.alive && list[i]!.books.length >= 2) {
            chosen.push(list[i]!);
        }
    }
    // sort by the newest book, newest first — by hand
    for (let i = 0; i < chosen.length; i++) {
        for (let j = i + 1; j < chosen.length; j++) {
            let latestI = 0;
            let latestJ = 0;
            for (const b of chosen[i]!.books) if (b.year > latestI) latestI = b.year;
            for (const b of chosen[j]!.books) if (b.year > latestJ) latestJ = b.year;
            if (latestJ > latestI) {
                const swap = chosen[i]!;
                chosen[i] = chosen[j]!;
                chosen[j] = swap;
            }
        }
    }
    const lines: string[] = [];
    for (const author of chosen) {
        const counts: Record<string, number> = {};
        for (const book of author.books) {
            counts[book.type] = (counts[book.type] ?? 0) + 1;
        }
        const parts: string[] = [];
        for (const type in counts) {
            parts.push(`${counts[type]} ${type}${counts[type] === 1 ? "" : "s"}`);
        }
        lines.push(`${author.name}: ${parts.join(", ")}`);
    }
    return lines;
}

// ---- Declarative: small pure functions, each named for what it means ----
const isAlive = (a: Author) => a.alive;
const hasAtLeast = (n: number) => (a: Author) => a.books.length >= n;
const latestYear = (a: Author) => Math.max(...a.books.map((b) => b.year));
const newestFirst = (a: Author, b: Author) => latestYear(b) - latestYear(a);
const countBy = (books: Book[]) =>
    books.reduce<Record<string, number>>((counts, b) => ({ ...counts, [b.type]: (counts[b.type] ?? 0) + 1 }), {});
const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;
const summary = (a: Author) =>
    Object.entries(countBy(a.books)).map(([type, count]) => plural(count, type)).join(", ");

function reportDeclarative(list: Author[]): string[] {
    return list
        .filter(isAlive)
        .filter(hasAtLeast(2))
        .toSorted(newestFirst)
        .map((a) => `${a.name}: ${summary(a)}`);
}

console.log("imperative: ", reportImperative(authors));
console.log("declarative:", reportDeclarative(authors));
console.log("same?", JSON.stringify(reportImperative(authors)) === JSON.stringify(reportDeclarative(authors)));

// Every helper above can be tested on its own, and reused: newestFirst is a column sort,
// isAlive and hasAtLeast(2) are filters, summary is a table cell. That is the midterm.
