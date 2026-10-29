// Turning data into text. Kept apart from catalogue.ts, so the logic can be
// reused with a different presentation — a web page, say — without changes.
import type { Book, Loan, Member } from "./models.ts";

export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}.${date.getFullYear()}`;
}

export function formatBook(book: Book): string {
    return `${book.title} — ${book.author} (${book.year})`;
}

export function formatLoan(loan: Loan, books: readonly Book[], members: readonly Member[]): string {
    const book = books.find((b) => b.id === loan.bookId);
    const member = members.find((m) => m.id === loan.memberId);
    const title = book?.title ?? `book #${loan.bookId}`;
    const name = member?.name ?? `member #${loan.memberId}`;
    return `${title}, borrowed by ${name}, due ${formatDate(loan.dueOn)}`;
}
