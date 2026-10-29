// The logic. Every function takes its data as parameters and returns new
// values instead of changing anything — easy to test, and nothing here knows
// where the data came from.
import type { Book, Genre, Loan, Member } from "./models.ts";

export const LOAN_DAYS = 14;

// Adds calendar days. NOT today.getTime() + days * 24 * 60 * 60 * 1000:
// when the clocks go back (25 October 2026 in Europe), one of those days is
// 25 hours long, and 14 × 24 hours from midnight on 19 October lands at
// 23:00 on 1 November — the wrong day. The Date constructor handles it.
export function addDays(date: Date, days: number): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function booksBy(books: readonly Book[], author: string): Book[] {
    return books.filter((book) => book.author === author);
}

export function countByGenre(books: readonly Book[]): Record<Genre, number> {
    const counts: Record<Genre, number> = {
        "science fiction": 0,
        "fantasy": 0,
        "mystery": 0,
        "non-fiction": 0,
    };
    for (const book of books) {
        counts[book.genre]++;
    }
    return counts;
}

export function isOnLoan(bookId: number, loans: readonly Loan[]): boolean {
    return loans.some((loan) => loan.bookId === bookId);
}

export function available(books: readonly Book[], loans: readonly Loan[]): Book[] {
    return books.filter((book) => !isOnLoan(book.id, loans));
}

// Returns the new list of loans — the original array is not touched.
export function borrow(
    book: Book,
    member: Member,
    loans: readonly Loan[],
    today: Date,
): Loan[] {
    if (isOnLoan(book.id, loans)) {
        throw new Error(`"${book.title}" is already on loan`);
    }
    const loan: Loan = {
        bookId: book.id,
        memberId: member.id,
        borrowedOn: today,
        dueOn: addDays(today, LOAN_DAYS),
    };
    return [...loans, loan];
}

export function overdue(loans: readonly Loan[], today: Date): Loan[] {
    return loans.filter((loan) => loan.dueOn < today);
}
