// Exercise 8 — A project in several files
//
// Build and run:
//     npx tsc
//     node dist/exercise.08/main.js
//
// Because this project uses only type annotations — no enums, namespaces or
// parameter properties — Node can also run the sources directly:
//     node exercise.08/main.ts
//
// The imports name the real .ts files. With rewriteRelativeImportExtensions
// on (see tsconfig.json), tsc rewrites them to .js in dist/.
//
//   models.ts     the types              (imported with `import type`)
//   data.ts       sample data            (imports models)
//   catalogue.ts  the logic              (imports models)
//   format.ts     turning data into text (imports models)
//   check.ts      the test helper        (shared by everything that tests)
//   main.ts       this file: wires it together and checks it

import { books, loans, members } from "./data.ts";
import { addDays, available, booksBy, borrow, countByGenre, isOnLoan, LOAN_DAYS, overdue } from "./catalogue.ts";
import { formatBook, formatDate, formatLoan } from "./format.ts";
import { check, checkThrows, summary } from "./check.ts";
import type { Book, Member } from "./models.ts";

const today = new Date(2026, 9, 19);     // 19 October 2026

// ---- A report, using every module ----
console.log(`Library report for ${formatDate(today)}`);
console.log(`\nAvailable (${available(books, loans).length} of ${books.length}):`);
for (const book of available(books, loans)) {
    console.log(`  ${formatBook(book)}`);
}
console.log("\nOn loan:");
for (const loan of loans) {
    console.log(`  ${formatLoan(loan, books, members)}`);
}
console.log("\nOverdue:");
for (const loan of overdue(loans, today)) {
    console.log(`  ${formatLoan(loan, books, members)}`);
}

// ---- Checks ----
console.log("\n=== Checks ===");
check("formatDate", formatDate(today), "19.10.2026");
check("formatBook", formatBook(books[0] as Book), "Dune — Frank Herbert (1965)");
check("two books by Le Guin", booksBy(books, "Ursula K. Le Guin").map((b) => b.id), [3, 4]);
check("count by genre", countByGenre(books), { "science fiction": 3, "fantasy": 1, "mystery": 1, "non-fiction": 1 });
check("book 2 is on loan", isOnLoan(2, loans), true);
check("four books available", available(books, loans).map((b) => b.id), [1, 3, 4, 6]);
check("one loan is overdue", overdue(loans, today).map((l) => l.bookId), [2]);

const ana = members[0] as Member;
const dune = books[0] as Book;
const after = borrow(dune, ana, loans, today);
check("borrowing adds a loan", after.length, 3);
check("the original loans are unchanged", loans.length, 2);
check(`the new loan is due in ${LOAN_DAYS} days`, formatDate(after[2]!.dueOn), "02.11.2026");
// 19 October + 14 days crosses the change from summer time on 25 October
check("addDays across the clock change", formatDate(addDays(today, 14)), "02.11.2026");
checkThrows("borrowing a book that is on loan throws", () => borrow(books[1] as Book, ana, loans, today));

console.log(`\n${summary()}`);
