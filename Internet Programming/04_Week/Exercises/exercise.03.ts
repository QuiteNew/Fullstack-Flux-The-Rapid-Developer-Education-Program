// Exercise 3 — Interfaces and Classes
// Run with: npx tsc && node dist/exercise.03.js

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function checkThrows(label: string, fn: () => unknown, ErrorType: new (...args: never[]) => Error): void {
    try {
        fn();
    } catch (error) {
        const ok = error instanceof ErrorType;
        console.log(`${ok ? "PASS" : "FAIL"}  ${label}${ok ? "" : ` — threw ${String(error)}`}`);
        return;
    }
    console.log(`FAIL  ${label} — did not throw`);
}

// ---- 3.1 — Interfaces that extend one another ----
interface Book {
    readonly id: number;
    title: string;
    author: string;
    year: number;
    isbn?: string;
}

interface LibraryBook extends Book {
    borrowedBy: string | null;
    dueDate: Date | null;
}

// A third level, to show that extending chains
interface RareBook extends LibraryBook {
    readingRoomOnly: true;
}

// ---- 3.2 — An interface for the class to implement ----
interface Catalogue {
    readonly size: number;
    find(id: number): LibraryBook | undefined;
    available(): LibraryBook[];
}

// ---- 3.2 — The class ----
class Library implements Catalogue {
    readonly name: string;
    #books = new Map<number, LibraryBook>();     // truly private, even at runtime
    private loanDays = 14;                       // private to TypeScript only — see 3.4

    constructor(name: string) {
        this.name = name;
    }

    get size(): number {
        return this.#books.size;
    }

    add(book: Book): LibraryBook {
        if (this.#books.has(book.id)) {
            throw new Error(`A book with id ${book.id} is already in ${this.name}`);
        }
        const libraryBook: LibraryBook = { ...book, borrowedBy: null, dueDate: null };
        this.#books.set(book.id, libraryBook);
        return libraryBook;
    }

    find(id: number): LibraryBook | undefined {
        return this.#books.get(id);
    }

    available(): LibraryBook[] {
        return [...this.#books.values()].filter((book) => book.borrowedBy === null);
    }

    borrow(id: number, member: string, today: Date = new Date()): LibraryBook {
        const book = this.find(id);
        if (book === undefined) {
            throw new RangeError(`There is no book with id ${id}`);
        }
        if (book.borrowedBy !== null) {
            throw new Error(`"${book.title}" is already borrowed by ${book.borrowedBy}`);
        }
        if ("readingRoomOnly" in book) {
            throw new Error(`"${book.title}" can only be read in the reading room`);
        }
        book.borrowedBy = member;
        // Calendar days, not loanDays × 24 hours — those differ when the
        // clocks change (see exercise.08/catalogue.ts)
        book.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + this.loanDays);
        return book;
    }

    giveBack(id: number): void {
        const book = this.find(id);
        if (book === undefined || book.borrowedBy === null) {
            throw new Error(`Book ${id} is not on loan`);
        }
        book.borrowedBy = null;
        book.dueDate = null;
    }

    describe(book: Book): string {
        return `${book.title} by ${book.author} (${book.year})`;
    }
}

// ---- 3.3 — Structural typing ----
// Any object with the right shape is a Book — no "implements" needed.
function citation(book: Book): string {
    return `${book.author}, ${book.title}, ${book.year}.`;
}

function compileTimeChecks(): void {
    // @ts-expect-error — id is readonly
    ({ id: 1, title: "x", author: "y", year: 2000 } as Book).id = 2;

    // @ts-expect-error — an object literal written directly may not have extra properties
    citation({ id: 1, title: "x", author: "y", year: 2000, pages: 300 });

    const library = new Library("Test");
    // @ts-expect-error — TypeScript's private: not accessible outside the class
    library.loanDays;

    // `library.#books` cannot appear here even with @ts-expect-error: outside
    // the class, a #name is a JavaScript *syntax* error, and one would stop
    // this whole file from loading — even inside a function that never runs.
}

// ======================================================================

const library = new Library("UACS Library");
library.add({ id: 1, title: "Dune", author: "Frank Herbert", year: 1965 });
library.add({ id: 2, title: "Neuromancer", author: "William Gibson", year: 1984, isbn: "978-0441569595" });
library.add({ id: 3, title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", year: 1969 });

const rare: RareBook = {
    id: 4, title: "Codex Seraphinianus", author: "Luigi Serafini", year: 1981,
    borrowedBy: null, dueDate: null, readingRoomOnly: true,
};
library.add(rare);

console.log("=== 3.2 — The class ===");
check("size", library.size, 4);
check("describe", library.describe(library.find(1)!), "Dune by Frank Herbert (1965)");
check("find a missing id", library.find(99), undefined);

const borrowed = library.borrow(1, "Ana", new Date(2026, 9, 1));
check("borrowed by Ana", borrowed.borrowedBy, "Ana");
check("due in 14 days", borrowed.dueDate?.getDate(), 15);
check("available after one loan", library.available().map((b) => b.id), [2, 3, 4]);

checkThrows("borrowing a borrowed book throws", () => library.borrow(1, "Marko"), Error);
checkThrows("borrowing a missing book throws RangeError", () => library.borrow(99, "Marko"), RangeError);
checkThrows("adding a duplicate id throws", () => library.add({ id: 2, title: "x", author: "y", year: 1 }), Error);
checkThrows("a reading-room book cannot be borrowed", () => library.borrow(4, "Marko"), Error);

library.giveBack(1);
check("available again after giving back", library.available().length, 4);
checkThrows("giving back a book that is not on loan throws", () => library.giveBack(1), Error);

console.log("\n=== 3.3 — Structural typing ===");
const fromSomewhere = { id: 10, title: "Snow Crash", author: "Neal Stephenson", year: 1992, pages: 480 };
check("a plain object with the right shape is a Book", citation(fromSomewhere),
    "Neal Stephenson, Snow Crash, 1992.");

console.log("\n=== 3.4 — private versus # ===");
// TypeScript's `private` is erased: at runtime it is an ordinary property.
// The `as unknown as Record<...>` deliberately tells the compiler to look away.
const peek = library as unknown as Record<string, unknown>;
check("TS-private loanDays is still there at runtime", peek["loanDays"], 14);
check("#books cannot be reached by name at runtime", peek["#books"], undefined);
check("and is not among the object's keys", Object.keys(library).includes("books"), false);

void compileTimeChecks;
