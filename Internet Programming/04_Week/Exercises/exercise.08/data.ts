// Sample data. `import type` — these names are only used as types, so the
// import disappears completely from the compiled JavaScript.
import type { Book, Loan, Member } from "./models.ts";

export const books: readonly Book[] = [
    { id: 1, title: "Dune", author: "Frank Herbert", year: 1965, genre: "science fiction" },
    { id: 2, title: "Neuromancer", author: "William Gibson", year: 1984, genre: "science fiction" },
    { id: 3, title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", year: 1968, genre: "fantasy" },
    { id: 4, title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", year: 1969, genre: "science fiction" },
    { id: 5, title: "Murder on the Orient Express", author: "Agatha Christie", year: 1934, genre: "mystery" },
    { id: 6, title: "A Brief History of Time", author: "Stephen Hawking", year: 1988, genre: "non-fiction" },
];

export const members: readonly Member[] = [
    { id: 1, name: "Ana", email: "ana@uacs.edu.mk" },
    { id: 2, name: "Marko", email: "marko@uacs.edu.mk" },
];

export const loans: readonly Loan[] = [
    { bookId: 2, memberId: 1, borrowedOn: new Date(2026, 8, 20), dueOn: new Date(2026, 9, 4) },
    { bookId: 5, memberId: 2, borrowedOn: new Date(2026, 9, 10), dueOn: new Date(2026, 9, 24) },
];
