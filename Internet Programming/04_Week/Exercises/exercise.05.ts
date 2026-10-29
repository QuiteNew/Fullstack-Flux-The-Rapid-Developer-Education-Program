// Exercise 5 — Generics
// Run with: npx tsc && node dist/exercise.05.js

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 5.1 — The first element ----
// The return type includes undefined: the array might be empty. With
// noUncheckedIndexedAccess on, items[0] is already T | undefined, so the
// compiler would insist on it anyway.
function first<T>(items: readonly T[]): T | undefined {
    return items[0];
}

// For comparison — what `any` loses
function firstAny(items: any[]): any {
    return items[0];
}

// ---- 5.3 — More of the same idea ----
function last<T>(items: readonly T[]): T | undefined {
    return items[items.length - 1];
}

function firstWhere<T>(items: readonly T[], predicate: (item: T) => boolean): T | undefined {
    for (const item of items) {
        if (predicate(item)) {
            return item;
        }
    }
    return undefined;
}

// ---- 5.4 — Constraints ----
// K must be one of T's keys, and the result has that property's type.
function pluck<T, K extends keyof T>(items: readonly T[], key: K): T[K][] {
    return items.map((item) => item[key]);
}

function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}

// ---- 5.5 — A generic class ----
class Queue<T> {
    #items: T[] = [];

    enqueue(item: T): void {
        this.#items.push(item);
    }

    dequeue(): T | undefined {
        return this.#items.shift();
    }

    peek(): T | undefined {
        return this.#items[0];
    }

    get size(): number {
        return this.#items.length;
    }
}

// ---- 5.2 / 5.6 — What the compiler infers, and what it rejects ----
interface Student { name: string; year: number; }

function compileTimeChecks(): void {
    const name = first(["Ana", "Marko"]);       // string | undefined
    // @ts-expect-error — it might be undefined, so it must be checked first
    name.toUpperCase();
    if (name !== undefined) {
        name.toUpperCase();                      // fine after the check
    }

    const fromAny = firstAny(["Ana", "Marko"]); // any — the type is gone
    fromAny.toFixed(2);                         // no error at all; would crash at runtime

    const students: Student[] = [];
    // @ts-expect-error — "age" is not a key of Student
    pluck(students, "age");

    // @ts-expect-error — numbers have no length
    longest(10, 20);

    const queue = new Queue<number>();
    // @ts-expect-error — a Queue<number> only takes numbers
    queue.enqueue("three");
}

// ======================================================================

console.log("=== 5.1 / 5.2 — first ===");
check("first of numbers", first([10, 20, 30]), 10);
check("first of strings", first(["Ana", "Marko"]), "Ana");
check("first of objects", first([{ name: "Ana", year: 2 }]), { name: "Ana", year: 2 });
check("first of an empty array", first([]), undefined);

console.log("\n=== 5.3 — last and firstWhere ===");
check("last([1, 2, 3])", last([1, 2, 3]), 3);
check("last([])", last([]), undefined);
check("first even number", firstWhere([1, 3, 4, 6], (n) => n % 2 === 0), 4);
check("no match", firstWhere(["a", "b"], (s) => s === "z"), undefined);

console.log("\n=== 5.4 — Constraints ===");
const students: Student[] = [{ name: "Ana", year: 2 }, { name: "Marko", year: 3 }];
check("pluck names", pluck(students, "name"), ["Ana", "Marko"]);
check("pluck years", pluck(students, "year"), [2, 3]);
check('longest("apple", "fig")', longest("apple", "fig"), "apple");
check("longest of two arrays", longest([1, 2], [1, 2, 3]), [1, 2, 3]);

console.log("\n=== 5.5 — Queue<T> ===");
const queue = new Queue<string>();
queue.enqueue("first");
queue.enqueue("second");
check("size after two", queue.size, 2);
check("peek", queue.peek(), "first");
check("dequeue order", [queue.dequeue(), queue.dequeue()], ["first", "second"]);
check("dequeue from empty", queue.dequeue(), undefined);

void compileTimeChecks;
