// The shapes of the data. This file contains only types, so it produces an
// almost empty .js file — every import of it is an `import type`.

export type Genre = "science fiction" | "fantasy" | "mystery" | "non-fiction";

export interface Book {
    readonly id: number;
    title: string;
    author: string;
    year: number;
    genre: Genre;
}

export interface Member {
    readonly id: number;
    name: string;
    email: string;
}

export interface Loan {
    bookId: number;
    memberId: number;
    borrowedOn: Date;
    dueOn: Date;
}
