// Exercise 2 — Library Catalog
// Run with: npx tsx exercise.02.ts   (or: node exercise.02.ts)
//
// The Lecture 04 homework built a library with *types and functions*: the data lived in
// arrays, and every function took the data in and handed new data back. This is the same
// library built with *classes*: each object keeps its own data and guards its own rules.
// Same problem, the other paradigm — compare the two at the end.

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

// ---- 2.1 — Authors and books ----
class Author {
    readonly name: string;
    readonly born: number;

    constructor(name: string, born: number) {
        this.name = name;
        this.born = born;
    }
}

type Genre = "science fiction" | "fantasy" | "mystery" | "non-fiction";

class Book {
    readonly id: number;
    readonly title: string;
    readonly author: Author;          // a Book *has* an Author: composition, not inheritance
    readonly year: number;
    readonly genre: Genre;

    constructor(id: number, title: string, author: Author, year: number, genre: Genre) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
    }

    toString(): string {              // used whenever a Book is turned into text
        return `"${this.title}" by ${this.author.name} (${this.year})`;
    }
}

// ---- 2.2 — Patrons ----
class Patron {
    static readonly MAX_LOANS = 3;    // static: belongs to the class, the same for every patron

    readonly id: number;
    readonly name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

// ---- 2.3 — Errors with a reason ----
// Like ApiError in Lecture 05: extending Error gives a message and a stack trace for free,
// and the extra field lets the caller react to *which* rule was broken.
type LibraryProblem = "unknown book" | "unknown patron" | "already on loan" | "too many loans" | "not on loan";

class LibraryError extends Error {
    readonly problem: LibraryProblem;
    constructor(problem: LibraryProblem, message: string) {
        super(message);
        this.name = "LibraryError";
        this.problem = problem;
    }
}

// ---- 2.4 — The library ----
interface Loan {
    readonly book: Book;
    readonly patron: Patron;
    readonly borrowedOn: Date;
    readonly dueOn: Date;
}

class Library {
    static readonly LOAN_DAYS = 14;

    // Private: nobody outside can push a book into the catalogue, or delete a loan,
    // without going through the methods below — which check the rules.
    readonly #books = new Map<number, Book>();
    readonly #patrons = new Map<number, Patron>();
    readonly #loans = new Map<number, Loan>();    // book id → loan

    addBook(book: Book): void {
        this.#books.set(book.id, book);
    }

    addPatron(patron: Patron): void {
        this.#patrons.set(patron.id, patron);
    }

    get size(): number {
        return this.#books.size;
    }

    booksBy(authorName: string): Book[] {
        return [...this.#books.values()].filter((book) => book.author.name === authorName);
    }

    isOnLoan(bookId: number): boolean {
        return this.#loans.has(bookId);
    }

    available(): Book[] {
        return [...this.#books.values()].filter((book) => !this.isOnLoan(book.id));
    }

    loansOf(patron: Patron): Loan[] {
        return [...this.#loans.values()].filter((loan) => loan.patron === patron);
    }

    borrow(bookId: number, patronId: number, on: Date): Loan {
        const book = this.#books.get(bookId);
        const patron = this.#patrons.get(patronId);
        if (book === undefined) throw new LibraryError("unknown book", `No book with id ${bookId}`);
        if (patron === undefined) throw new LibraryError("unknown patron", `No patron with id ${patronId}`);
        if (this.isOnLoan(bookId)) throw new LibraryError("already on loan", `${book} is already on loan`);
        if (this.loansOf(patron).length >= Patron.MAX_LOANS) {
            throw new LibraryError("too many loans", `${patron.name} already has ${Patron.MAX_LOANS} books`);
        }
        const loan: Loan = { book, patron, borrowedOn: on, dueOn: addDays(on, Library.LOAN_DAYS) };
        this.#loans.set(bookId, loan);
        return loan;
    }

    giveBack(bookId: number): void {
        if (!this.#loans.delete(bookId)) {
            throw new LibraryError("not on loan", `Book ${bookId} is not on loan`);
        }
    }

    overdue(today: Date): Loan[] {
        return [...this.#loans.values()].filter((loan) => loan.dueOn < today);
    }
}

// The same helper as in Lecture 04: add calendar days, not 24-hour blocks.
function addDays(date: Date, days: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

// ---- checks ----
const leGuin = new Author("Ursula K. Le Guin", 1929);
const christie = new Author("Agatha Christie", 1890);
const pratchett = new Author("Terry Pratchett", 1948);

const library = new Library();
library.addBook(new Book(1, "The Dispossessed", leGuin, 1974, "science fiction"));
library.addBook(new Book(2, "A Wizard of Earthsea", leGuin, 1968, "fantasy"));
library.addBook(new Book(3, "Murder on the Orient Express", christie, 1934, "mystery"));
library.addBook(new Book(4, "Guards! Guards!", pratchett, 1989, "fantasy"));
library.addBook(new Book(5, "Small Gods", pratchett, 1992, "fantasy"));
library.addBook(new Book(6, "And Then There Were None", christie, 1939, "mystery"));

const ana = new Patron(1, "Ana");
const boris = new Patron(2, "Boris");
library.addPatron(ana);
library.addPatron(boris);

function problemOf(action: () => unknown): string {
    try {
        action();
        return "no error";
    } catch (error) {
        return error instanceof LibraryError ? error.problem : `unexpected: ${String(error)}`;
    }
}

const oct19 = new Date(2026, 9, 19);

// 2.1
check("2.1 toString is used in template strings", `${library.available()[0]}`, '"The Dispossessed" by Ursula K. Le Guin (1974)');
check("2.1 booksBy", library.booksBy("Terry Pratchett").map((b) => b.title), ["Guards! Guards!", "Small Gods"]);
check("2.1 every Le Guin book points at the same Author object", library.booksBy("Ursula K. Le Guin").every((b) => b.author === leGuin), true);

// 2.4 — borrowing
const loan = library.borrow(3, 1, oct19);
check("2.4 due 14 calendar days later, across the clock change", loan.dueOn.toDateString(), new Date(2026, 10, 2).toDateString());
check("2.4 now on loan", [library.isOnLoan(3), library.available().length], [true, 5]);
check("2.3 cannot borrow it twice", problemOf(() => library.borrow(3, 2, oct19)), "already on loan");
check("2.3 unknown book", problemOf(() => library.borrow(99, 1, oct19)), "unknown book");
check("2.3 unknown patron", problemOf(() => library.borrow(1, 99, oct19)), "unknown patron");

library.borrow(1, 1, oct19);
library.borrow(2, 1, oct19);
check("2.2 Ana has three books", library.loansOf(ana).length, 3);
check("2.3 a fourth is refused", problemOf(() => library.borrow(4, 1, oct19)), "too many loans");
check("2.3 Boris is not affected", library.borrow(4, 2, oct19).patron.name, "Boris");

library.giveBack(3);
check("2.4 after giving one back, Ana may borrow again", library.borrow(5, 1, oct19).book.title, "Small Gods");
check("2.3 giving back a book that is not on loan", problemOf(() => library.giveBack(6)), "not on loan");

check("2.4 overdue on 3 November", library.overdue(new Date(2026, 10, 3)).length, 4);
check("2.4 nothing overdue on 2 November", library.overdue(new Date(2026, 10, 2)).length, 0);

// 2.3 — the error is a real Error
const error = (() => { try { library.borrow(99, 1, oct19); } catch (e) { return e; } })();
check("2.3 instanceof Error and LibraryError", [error instanceof Error, error instanceof LibraryError], [true, true]);
check("2.3 message and name", [(error as Error).name, (error as Error).message], ["LibraryError", "No book with id 99"]);

// 2.5 — encapsulation is real
check("2.5 the private maps are invisible from outside", Object.keys(library), []);
check("2.5 static members are on the class", [Library.LOAN_DAYS, Patron.MAX_LOANS], [14, 3]);

function neverCalled(): void {
    // @ts-expect-error — size has no setter.
    library.size = 0;
    // @ts-expect-error — readonly property.
    ana.name = "Anna";
    // @ts-expect-error — MAX_LOANS is static: it is on the class, not on each patron.
    ana.MAX_LOANS;
}
void neverCalled;

console.log(`\n${passed} passed, ${failed} failed`);
