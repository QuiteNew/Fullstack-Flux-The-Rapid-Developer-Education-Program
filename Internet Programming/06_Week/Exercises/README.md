# Internet Programming — Exercises #06

Detailed tasks for the seven exercises in `Exercises06.pptx`, in slide order.

**There is nothing new here.** Every exercise redoes something you have already done in
Lectures 03–05, and the point is to see it again with the right names: *encapsulation,
polymorphism, prototype, higher-order function, pure function, closure, memoization,
composition, partial application.* You will need those words in Angular, where they come up
constantly — and the midterm (Lectures 01–06) will expect you to write code like this without
looking anything up.

Keep the companion notes open: `Class11-ObjectOrientedJavaScript.md` and
`Class12-FunctionalJavaScript.md` in `Lecture06/Materials`.

**Ground rules**

- **The same project setup as Lecture 04** — see
  [`TypeScript-Setup.md`](../../Lecture04/Exercises/Group1/TypeScript-Setup.md). Everything
  runs in Node: `npx tsx exercise.03.ts`, or simply `node exercise.03.ts`.
- **`npx tsc` must pass** before you hand anything in. `strict` stays on, and no `any`.
- **Prove the compiler stops you.** Where a task says something *must not compile*, write it
  with `// @ts-expect-error` above it, inside a function you never call (as in Lecture 04).
- **Do not change your inputs.** Every function in exercises 3–7 returns new values and leaves
  its arguments alone.
- Each exercise starts with **Revisits** — where you did this before — and **Names** — the
  vocabulary it is about. Look at your earlier solution before you start.
- Hints and expected results are at the end of this sheet.

---

## Exercise 1 — Create a Class Hierarchy

**Revisits:** Lecture 04, exercise 3 (interfaces and classes); `class ApiError extends Error`
in Lecture 05, exercise 4. **Names:** abstraction, encapsulation, inheritance, polymorphism,
prototype chain, `this`.

"Define a class hierarchy representing different animals. Start with a base class `Animal` and
create subclasses like `Cat`, `Dog`, `Bird` and `Fish`." File: `exercise.01.ts`.

### 1.1 — The base class

`Animal` has:

- a `name`, which can never change after the animal is created (`readonly`)
- an energy level that starts at 10, which **no code outside the class** can set. Use a `#`
  field, and a getter `energy` so the outside can *read* it.
- `speak(): string` — but there is no sound for "an animal" in general. Make it `abstract`,
  which also makes the class `abstract`.
- `move(distance)` — lowers the energy (never below 0) and returns `"Rex walks 4 m"`. The verb
  comes from a `protected` method `movement()`, which returns `"walks"`.
- `describe()` — `"Rex the dog says woof"`. Get the kind of animal from the class itself,
  without passing it in. (Hint: every object can reach its class.)

### 1.2 — The subclasses

`Cat`, `Dog`, `Bird` and `Fish` each implement `speak()`. Birds fly and fish swim: override
`movement()` in those two, and mark it with `override`.

Then add `GuideDog extends Dog`, with an `owner`. It needs its own constructor — what must
that constructor do first? Its `describe()` adds `", and guides Ana"` to whatever a dog says,
**without copying** the dog's code.

### 1.3 — Polymorphism

Write `chorus(animals: readonly Animal[])`, which returns every animal's `describe()`. It must
not know or check which kinds of animal exist. Add a sixth kind of animal: does `chorus` need to
change?

### 1.4 — Under the hood

A `class` is built on JavaScript's prototypes. Prove it with checks:

1. `typeof Dog` — what is a class, really?
2. Which object owns the `speak` method: `rex`, or `Dog.prototype`? Use `Object.hasOwn`.
3. Do two dogs share one `speak` function, or does each have a copy?
4. Which properties are on `rex` itself? (`Object.keys`)
5. Write `chainOf(object)`, which follows `Object.getPrototypeOf` up to `null` and returns the
   class names on the way: `["GuideDog", "Dog", "Animal", "Object"]`.
6. Which of `GuideDog`, `Dog`, `Animal`, `Cat` is `buddy` an `instanceof`?

### 1.5 — Losing `this`

Write `callLater(callback)`, which simply calls `callback()` — the way `setTimeout` or
`addEventListener` would. What happens with `callLater(rex.describe)`? Explain why, then fix
it two ways: with an arrow function, and with `bind`.

### 1.6 — What must not compile

With `@ts-expect-error`: creating an `Animal`, setting `energy`, calling `movement()` from
outside, and renaming an animal. Try to write `tom.#energy = 100` outside the class too — and
notice that this one is not a *type* error at all.

---

## Exercise 2 — Library Catalog

**Revisits:** Lecture 04, exercise 8 — the library loans homework. **Names:** composition,
encapsulation, static members, custom errors.

"Create TypeScript classes to represent a library catalog. Define classes for books, authors,
and library patrons." File: `exercise.02.ts`.

In Lecture 04 you built this library from **types and functions**: the data lived in arrays, and
`borrow()` took the loans in and returned new ones. Now build it from **classes**, where each
object keeps its own data and enforces its own rules. Reuse your sample data and `addDays`.

### 2.1 — `Author` and `Book`

An `Author` has a name and a birth year. A `Book` has an id, title, year, genre — and an
`Author` *object*, not just a name. Several books by the same author point to the **same**
`Author`. Give `Book` a `toString()`, so that `` `${book}` `` gives
`"The Dispossessed" by Ursula K. Le Guin (1974)`.

### 2.2 — `Patron`

A patron has an id and a name. A patron may have **at most 3** books at a time. That limit is
the same for every patron: make it `static readonly MAX_LOANS = 3`.

### 2.3 — `LibraryError`

Make `LibraryError extends Error` with an extra field `problem`, one of
`"unknown book" | "unknown patron" | "already on loan" | "too many loans" | "not on loan"`.
Callers can then react to *which* rule was broken. Set `this.name` too.

### 2.4 — `Library`

The library keeps its books, patrons and loans in **private** `Map`s (`#books`, …), and offers:

| Method | Does |
|---|---|
| `addBook(book)`, `addPatron(patron)` | add to the catalogue |
| `size` (a getter) | the number of books |
| `booksBy(authorName)`, `available()` | queries, as in Lecture 04 |
| `isOnLoan(bookId)`, `loansOf(patron)` | queries |
| `borrow(bookId, patronId, date)` | checks every rule, throws a `LibraryError`, or records and returns the loan, due in `Library.LOAN_DAYS` (14) days |
| `giveBack(bookId)` | ends the loan, or throws `"not on loan"` |
| `overdue(today)` | loans whose due date has passed |

### 2.5 — Compare the two designs

Write a few sentences (a comment at the end of the file):

- In Lecture 04, where were the rules ("already on loan") checked, and what stopped someone
  from pushing a loan straight into the array? And now?
- Which version is easier to test? Which would be easier to save to a file and load again?
- `Library` *has* books and patrons; it does not *extend* anything. Why would
  `class Library extends Array<Book>` be a bad idea?

---

## Exercise 3 — Higher-Order Functions: `map` and `filter`

**Revisits:** Lecture 03, exercises 4 and 6 (sum three ways, filter and reduce).
**Names:** higher-order function, callback, generics, declarative versus imperative.

"Create functions that mimic the behaviour of `map` and `filter`." File: `exercise.03.ts`.

### 3.1 and 3.2 — `map` and `filter`

Write `map(items, transform)` and `filter(items, keep)` as standalone functions with a `for`
loop inside. Make them **generic**: `map` turns a `T[]` into a `U[]`. Like the built-ins, the
callback receives the element *and* its index. Check them against the built-in methods.

### 3.3 — `reduce`

Write `reduce(items, combine, initial)`. Then write `map` and `filter` again, using only your
`reduce`.

### 3.4 — Use them

With this data:

```ts
interface Book { title: string; year: number; type: "Novel" | "Novella" | "Collection"; }
const books: Book[] = [
    { title: "Dune", year: 1965, type: "Novel" },
    { title: "The Old Man and the Sea", year: 1952, type: "Novella" },
    { title: "Ficciones", year: 1944, type: "Collection" },
    { title: "Neuromancer", year: 1984, type: "Novel" },
    { title: "Animal Farm", year: 1945, type: "Novella" },
];
```

1. The titles of the books published after 1950 — with your functions, then with the
   built-ins.
2. `countByType(books)` → `{ Novel: 2, Novella: 2, Collection: 1 }`, with `reduce`.
3. The year of the oldest book, with `reduce`.

Point 2 is the heart of every "3 Novels, 2 Novellas" summary on an exam.

---

## Exercise 4 — Higher-Order Functions: Combining Functions

**Revisits:** chaining `.filter().map()` (Lecture 03), `.then()` chains (Lecture 05).
**Names:** function composition, pipe, predicate.

"Create a function that combines two other functions and returns the result." File:
`exercise.04.ts`.

### 4.1 — `compose`

`compose(f, g)` returns a function that computes `f(g(x))`. Type it with three type
parameters, so the types can change: `g` turns an `A` into a `B`, `f` turns the `B` into a `C`.
Is `compose(double, increment)` the same as `compose(increment, double)`?

### 4.2 — `pipe`

`pipe(first, second)` does the same, but lists the steps **in the order they run**. Show that
`pipe(g, f)` and `compose(f, g)` always give the same result.

### 4.3 — Any number of steps

`pipeAll(...steps)` runs any number of steps in turn (`reduce` does the work). Keep it simple:
every step takes and returns the same type. Build `normalize`, a pipeline that trims a string,
lowercases it, and collapses repeated spaces:
`normalize("   Ursula   K.  LE GUIN ")` → `"ursula k. le guin"`.

### 4.4 — Combining predicates

A *predicate* is a function that returns a boolean — what `filter` takes. Write
`and(...predicates)` and `not(predicate)`, each returning a new predicate. Then filter a list
of authors with several conditions at once: British **and** alive; British **and** a name
containing `"  MAN "` (normalised). This is how a page with several filters works.

---

## Exercise 5 — Recursive Fibonacci

**Revisits:** Lecture 03, exercise 1 (factorial with recursion); the rate cache in Lecture 05,
exercise 5.4. **Names:** recursion, memoization, pure function, cache.

"Develop a recursive TypeScript function that calculates the Fibonacci number, and use
memoization to optimize it." File: `exercise.05.ts`.

### 5.1 — The naive version

`fib(0) = 0`, `fib(1) = 1`, `fib(n) = fib(n - 1) + fib(n - 2)`. Write it exactly like that.
Count the calls it makes for `fib(30)`, and time it with `performance.now()`. Draw the calls
for `fib(5)` as a tree: which values are computed more than once?

### 5.2 — Memoized by hand

Keep every answer in a `Map` the first time, and look it up after that. Hide the `Map` in a
closure, so that nothing else can touch it. How many calls does `fib(30)` take now? How long?
Try `fib(70)`.

### 5.3 — `memoize`

Write `memoize(fn)`, a **higher-order function** that takes any one-argument function and
returns a version that remembers its answers. Prove that the wrapped function runs only once
per input. Then build a memoized `fib` with it — careful: the recursive calls must go through
the memoized version too.

### 5.4 — Only for pure functions

Memoize a function that uses a variable from outside its parameters. Change that variable.
What does the memoized version return now? Write the rule this demonstrates in one sentence.

---

## Exercise 6 — Power Function

**Revisits:** closures (Lecture 03); `once(fn)` and `flaky(failures)` (Lecture 05,
exercises 1 and 3). **Names:** function factory, closure, higher-order function.

"Develop a function that when given an exponent, creates a power function for that value."
File: `exercise.06.ts`.

### 6.1 — `power`

`power(2)` returns a function that squares; `power(3)` one that cubes. Write it with
`function`, then as `const powerArrow = (exponent) => (base) => …`. What does each returned
function remember, and where is it kept?

### 6.2 — Use them

`[1, 2, 3, 4].map(square)`. Then a table: for exponents 1 to 3, the powers of 2 and 3 —
`[[2, 3], [4, 9], [8, 27]]` — with two `map`s and `power`.

### 6.3 — The same shape, for sorting

Write `by(key, direction = "asc")`, a factory for **sort comparators**: it returns the function
that `sort` needs. Strings compare with `localeCompare`, numbers by subtraction. Type `key` so
that only real keys of the object are accepted (`K extends keyof T`). Then sort a list of
authors by name, and by birth year newest first — without changing the original array.

This is the whole of "click a column header to sort" on the midterm.

---

## Exercise 7 — Currying and Partial Application *(scary)*

**Revisits:** `bind` (Lecture 03, and exercise 1.5 above); `power` (exercise 6).
**Names:** partial application, currying, tuple types.

"Create a TypeScript function that fixes the first parameter of a given function." File:
`exercise.07.ts`.

### 7.1 — `partial`

`partial(fn, first)` returns a function that takes the *remaining* parameters and calls
`fn(first, ...rest)`. The JavaScript is one line. The type is the scary part: the remaining
parameters are a **tuple type** `Rest extends unknown[]`. Check that `partial` keeps the types —
`partial(add, 10)` must refuse a string, and must still need its second number.

Then apply `partial` to the result of `partial`.

### 7.2 — `bind` does it too

`add.bind(null, 10)` — what does it return? Compare it with `partial(add, 10)`.

### 7.3 — `curry`

Currying turns `f(a, b)` into `f(a)(b)`. Write `curry` for two-parameter functions, and
`uncurry` to undo it. Use a curried function directly as a `map` callback:
`[1, 2, 3].map(curriedAdd(100))`.

Finally, write one general `log(level, area, message)` function and build specialised loggers
from it with `partial`: `warn`, then `apiWarn`.

---

## Hints

<details>
<summary><strong>Exercise 1 — Class Hierarchy</strong></summary>

- **1.1** `this.constructor.name` is the class name of whatever object `this` is — `"Dog"` for a
  dog, even though `describe` is written in `Animal`.
- **1.1** `abstract speak(): string;` — no body. A class with an abstract member must itself be
  `abstract class Animal`.
- **1.2** A subclass constructor must call `super(name)` **before** it uses `this`.
  `super.describe()` calls the parent's version.
- **1.3** `chorus` does not change at all when you add an animal. That is polymorphism.
- **1.4** `typeof Dog` is `"function"`. The methods live once on `Dog.prototype`, so
  `Object.hasOwn(rex, "speak")` is `false` and every dog shares the same function; the fields
  (`name`) are on each object. `#energy` does not show up in `Object.keys` at all.
- **1.5** `callLater(rex.describe)` passes the function alone; called plainly, it has
  `this === undefined` and fails with a `TypeError`. Fixes: `() => rex.describe()` or
  `rex.describe.bind(rex)`.
- **1.6** `tom.#energy` outside the class is a **SyntaxError**: the file does not even load,
  so `@ts-expect-error` cannot help. `#` privacy is enforced by JavaScript itself.

</details>

<details>
<summary><strong>Exercise 2 — Library Catalog</strong></summary>

- **2.1** Template strings call `toString()` automatically.
- **2.2** `Patron.MAX_LOANS` — a static member is read through the class, not through a patron.
- **2.4** `[...this.#books.values()]` turns the map's values into an array, so you can `filter`.
- **2.4** Check the rules in this order: book exists, patron exists, book free, patron under the
  limit.
- **2.4 Check:** a loan made on 19 October 2026 is due on 2 November 2026 (the clocks change on
  25 October — use calendar days, as in Lecture 04).
- **2.5** With classes, the rules live next to the data, and `#` makes it impossible to skip
  them. With plain data and functions, everything is easy to test and to `JSON.stringify` —
  but nothing stops other code from changing the arrays directly. Inheriting from `Array` would
  give the library `push`, `splice` and `length = 0` — every way around your rules.

</details>

<details>
<summary><strong>Exercise 3 — map and filter</strong></summary>

- **3.1** `function map<T, U>(items: readonly T[], transform: (item: T, index: number) => U): U[]`
- **3.1** With `noUncheckedIndexedAccess`, `items[i]` is `T | undefined` inside the loop — you
  know it is in range, so `items[i]!` is fine here.
- **3.3** Map with reduce: start from `[]`, and for every item return `[...acc, transform(item)]`.
- **3.4** Counting: start from `{}`, and return `{ ...counts, [book.type]: (counts[book.type] ?? 0) + 1 }`.
- **3.4** The oldest year: start from `Infinity`, and keep `Math.min`.

</details>

<details>
<summary><strong>Exercise 4 — Combining Functions</strong></summary>

- **4.1** `return (a) => f(g(a));` — `compose(double, increment)(5)` is 12;
  `compose(increment, double)(5)` is 11.
- **4.3** `steps.reduce((current, step) => step(current), value)`. With no steps, the value
  comes back unchanged.
- **4.4** `and` uses `every`: `(item) => predicates.every((p) => p(item))`. With no predicates,
  `every` returns `true`, so everything is kept — check that this is what you want.

</details>

<details>
<summary><strong>Exercise 5 — Fibonacci</strong></summary>

- **5.1 Check:** `fib(30)` is 832 040, reached in **2 692 537** calls.
- **5.2** With memoization `fib(30)` takes **59** calls. `fib(70)` is 190 392 490 709 135 —
  the naive version would need about 600 trillion calls.
- **5.2** Past `fib(78)` the numbers exceed `Number.MAX_SAFE_INTEGER` and are no longer exact.
  (`BigInt` would fix that; not needed here.)
- **5.3** `const memoFib = memoize((n: number) => n < 2 ? n : memoFib(n - 1) + memoFib(n - 2));`
  — TypeScript needs `memoFib`'s type written out, because it is used inside its own definition.
- **5.4** Memoization returns the *remembered* answer — correct only if the function always
  gives the same answer for the same input. That is exactly what "pure" means.

</details>

<details>
<summary><strong>Exercise 6 — Power Function</strong></summary>

- **6.1** Each returned function remembers its own `exponent`: it is kept in the closure created
  by that call to `power`.
- **6.3** `function by<T, K extends keyof T>(key: K, direction: "asc" | "desc" = "asc"): (a: T, b: T) => number`.
  For descending, multiply the result by `-1`.
- **6.3** `sort` changes the array it is called on. Sort a copy: `[...authors].sort(by("name"))`.

</details>

<details>
<summary><strong>Exercise 7 — Partial Application</strong></summary>

- **7.1** `function partial<F, Rest extends unknown[], R>(fn: (first: F, ...rest: Rest) => R, first: F): (...rest: Rest) => R`
  — and the body is `return (...rest) => fn(first, ...rest);`
- **7.2** `bind`'s first argument is the `this` value; the ones after it are fixed arguments.
  For a function that does not use `this`, pass `null`.
- **7.3** `curry = (fn) => (a) => (b) => fn(a, b)`. A curried function is partial application
  one argument at a time.

</details>
