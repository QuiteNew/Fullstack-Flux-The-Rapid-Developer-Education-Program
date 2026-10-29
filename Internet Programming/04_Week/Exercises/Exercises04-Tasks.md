# Internet Programming — Exercises #04

Detailed tasks for the eight exercises in `Exercises04.pptx`, in slide order.

These exercises practise Classes 07 and 08: TypeScript's types, inference and narrowing,
interfaces and classes, enums, generics, unions and intersections, decorators, and modules.
Keep the companion notes from `Lecture04/Materials` open — `Class07-TypeScriptFundamentals.md`
and `Class08-AdvancedTypeScript.md` explain everything used here.

**Ground rules**

- **New to TypeScript tooling?** Read [`TypeScript-Setup.md`](TypeScript-Setup.md) first. It
  covers installing TypeScript and `tsx`, what each one is for, and what to do when a command
  fails.
- **Set up once, in Exercise 1**, then put every exercise in the same project folder:
  `exercise.01.ts` to `exercise.07.ts`, and a subfolder `exercise.08/` for the homework.
- **Run while you work with `npx tsx exercise.03.ts`; check with `npx tsc`.** `tsx` runs a
  `.ts` file directly but does **not** check types — only `tsc` does. Before handing anything
  in, `npx tsc` must finish without errors. To run the compiled output instead:
  `node dist/exercise.03.js`.
- **Keep `strict` mode on.** Do not reach for `any` to make an error go away; find out what the
  compiler is telling you.
- **Prove that the compiler catches mistakes.** Several tasks ask for code that *should not*
  compile. Put `// @ts-expect-error` on the line above it: the build then passes only while the
  line really is an error. Keep these lines inside a function you never call, so they do not run.
- Write **functions that return values**, and test them against the tables given.
- For quick experiments, the **TypeScript Playground** (<https://www.typescriptlang.org/play>)
  shows your code and the compiled JavaScript side by side.
- Stuck? Each exercise has hints and expected results at the end of this sheet.

---

## Exercise 1 — Compiling TypeScript

**Practises:** setting up a project, `tsconfig.json`, targets.

### 1.1 — Set up a project

In a new folder:

```bash
npm init -y
npm install --save-dev typescript tsx
npx tsc --init
```

Then:

1. In `package.json`, set `"type": "module"`.
2. Open the generated `tsconfig.json`. For each setting it contains, find out from Class 07,
   section 8 or the tsconfig reference what it does.
3. Set `"rootDir": "."` and `"outDir": "dist"`, so the compiled files go into their own folder.

### 1.2 — Write something worth compiling

Create `exercise.01.ts` with a few functions that use syntax from different JavaScript
versions. Include at least:

- optional chaining `?.` and nullish coalescing `??`
- the exponent operator `**`
- a class with a field declared in the class body — `count = 0;`
- an `async` function that uses `await`

Write checks that call them and print the results.

### 1.3 — Compile and run

```bash
npx tsc
node dist/exercise.01.js
```

### 1.4 — Different targets

Compile the same file for three targets, each into its own folder, and compare the output:

| Source | `es2015` | `es2022` | `esnext` |
|---|---|---|---|
| `a ** b` | | | |
| `a?.b` | | | |
| `a ?? b` | | | |
| `async` / `await` | | | |
| a class field | | | |

Does the program print the same results for every target?

### 1.5 — Things to try

Write down what happens, and why, for each:

1. Compile for `--target es5`.
2. Add `[[1], [2]].flat()` to the file, and compile for `es2015`.
3. Add a deliberate type error, such as `const n: number = "one";`, and run `npx tsc`. Is a
   `.js` file still produced? What does `"noEmitOnError": true` change?

**Deliverable:** `exercise.01.ts`, your `tsconfig.json`, the completed table from 1.4, and your
answers to 1.5.

---

## Exercise 2 — Basic Syntax

**Practises:** annotations, inference, arrays and tuples, parameters, `unknown` and narrowing.

### 2.1 — Annotated

Declare at least three variables — a `string`, a `number` and a `boolean` — and a function
`formatCourse(name, students, active)` that returns a string such as
`"Internet Programming: 42 students"`, with `" (inactive)"` added when not active. Annotate
**everything**: each variable, each parameter, the return type.

### 2.2 — Inferred

Write the same again, removing every annotation that TypeScript can work out on its own. Which
annotations are left? For each variable, hover over it in the editor and write down the
inferred type. Why is a `const` string inferred differently from a `let` string?

### 2.3 — Arrays and tuples

1. Write `average(points)` taking a **readonly** array of numbers. It returns `0` for an empty
   array.
2. Define a tuple type `Grade` holding a student's name and points, with named positions.
   Write `best(grades)` returning the `Grade` with the most points — or `undefined` for an
   empty array.

### 2.4 — Parameters

| Function | Behaviour |
|---|---|
| `greet(name, title?)` | `greet("Ana")` → `"Hello, Ana!"` · `greet("Ana", "Dr.")` → `"Hello, Dr. Ana!"` |
| `repeat(text, times = 1, separator = " ")` | `repeat("hi", 3)` → `"hi hi hi"` · `repeat("ab", 3, "-")` → `"ab-ab-ab"` |
| `maxOf(first, ...rest)` | `maxOf(4)` → `4` · `maxOf(4, 9, 2)` → `9` |

### 2.5 — `unknown` and narrowing

Write `describeValue(value: unknown): string`:

| Call | Result |
|---|---|
| `describeValue("hello")` | `"a string of length 5"` |
| `describeValue(42)` | `"the number 42"` |
| `describeValue(NaN)` | `"not a number"` |
| `describeValue([1, 2, 3])` | `"an array of 3 items"` |
| `describeValue(new Date(2026, 0, 1))` | `"a date in 2026"` |
| `describeValue(null)` | `"null"` |
| `describeValue(true)` | `"boolean"` |
| `describeValue({})` | `"object"` |

### 2.6 — Prove the compiler stops you

Inside a function you never call, write each of these, with `// @ts-expect-error` above it, and
make sure the build passes:

1. assigning a string to your `number` variable — once for an annotated one, once for an
   inferred one
2. calling `formatCourse` with two arguments
3. calling `push` on a readonly array
4. reading index 2 of a `Grade`
5. calling `.toUpperCase()` on an `unknown`

Then delete one of the mistakes, leaving its `@ts-expect-error` behind. What does the build say?

**Deliverable:** `exercise.02.ts`, and your answers to 2.2 and 2.6.

---

## Exercise 3 — Interfaces and Classes

**Practises:** interfaces, `extends`, `readonly`, classes, `implements`, access modifiers,
structural typing.

### 3.1 — Interfaces that extend each other

- `Book`: a `readonly id`, `title`, `author`, `year`, and an optional `isbn`
- `LibraryBook extends Book`: adds `borrowedBy` (a name, or `null`) and `dueDate` (a `Date`,
  or `null`)
- `RareBook extends LibraryBook`: adds `readingRoomOnly: true`

### 3.2 — A class that implements an interface

Write an interface `Catalogue` with a read-only `size`, `find(id)` and `available()`. Then a
class `Library implements Catalogue`:

| Member | Behaviour |
|---|---|
| `constructor(name)` | stores a `readonly name` |
| `add(book)` | stores the book as a `LibraryBook`; throws if the id is already used |
| `size` | a getter: how many books |
| `find(id)` | the book, or `undefined` |
| `available()` | the books not on loan |
| `borrow(id, member, today?)` | marks the book borrowed, due **14 days** later; throws a `RangeError` for an unknown id, and an `Error` if already borrowed or a `RareBook` |
| `giveBack(id)` | marks it returned; throws if it was not on loan |

Store the books in a **`#private`** field, and the loan length in a TypeScript-`private` field.

### 3.3 — Structural typing

Write `citation(book: Book)`. Call it with an object that was never declared as a `Book` but has
the right properties — plus one more. Then call it with the same object written *directly* as a
literal in the call. Explain the difference.

### 3.4 — `private` versus `#`

At runtime, try to read both private fields from outside the class, getting past the compiler
with `as unknown as Record<string, unknown>`. Which one can you see? Why?

**Deliverable:** `exercise.03.ts`, and your answers to 3.3 and 3.4.

---

## Exercise 4 — Enums

**Practises:** string and numeric enums, exhaustive `switch`, the `as const` alternative.

### 4.1 — The enum

A **string** enum `Color` with six colours: red, orange, yellow, green, blue, purple. Each
member's value is its lowercase name.

### 4.2 — Use it

1. `toHex(color: Color): string` — a `switch` returning a hex code for each colour. Make it
   **exhaustive**: if someone adds a colour to the enum and forgets to update the `switch`, the
   build must fail (Class 08, section 5).
2. `isWarm(color)` — true for red, orange and yellow.

### 4.3 — Enums exist at runtime

Use `Object.values` to get every colour, and check that each one has a hex code.

### 4.4 — A numeric enum

`enum Priority { Low, Medium, High }`. Write `label(priority)` returning `"Medium priority"`,
using the enum's **reverse mapping**. Then find the loophole: a value that is not a valid
priority, but compiles anyway. What does `label` return for it?

### 4.5 — Without an enum

Rewrite the colours as an `as const` object, plus a union type made from it with `typeof` and
`keyof`. Compare the two versions: which of them accepts a plain string like `"red"`?

### 4.6 — Running it

Run `node exercise.04.ts` directly. What happens, and why does `node exercise.02.ts` work?
Then run `npx tsx exercise.04.ts`. Why does that work, when plain `node` did not?

**Deliverable:** `exercise.04.ts`, and your answers to 4.4, 4.5 and 4.6.

---

## Exercise 5 — Generics

**Practises:** type parameters, inference, constraints, generic classes.

### 5.1 — The first element

Write `first(items)` that returns the first element of an array of **any** type — with the
right type. What should it return for an empty array, and what does that mean for its return
type?

### 5.2 — What gets inferred

Call `first` with an array of numbers, of strings, of objects, and an empty array. For each,
write down the inferred type of the result. Then write the same function with `any` instead of a
type parameter. What do you lose?

### 5.3 — More of the same

- `last(items)` — the last element
- `firstWhere(items, predicate)` — the first element for which `predicate` returns `true`

### 5.4 — Constraints

1. `pluck(items, key)` — returns an array of that property from every item:
   `pluck(students, "name")` → `["Ana", "Marko"]`. Passing a key the items do not have must
   not compile.
2. `longest(a, b)` — returns whichever of the two has the larger `length`. It must work for
   strings and arrays, and refuse numbers.

### 5.5 — A generic class

`Queue<T>`, with `enqueue(item)`, `dequeue()`, `peek()`, and a `size` getter. A
`Queue<number>` must refuse a string.

**Deliverable:** `exercise.05.ts`, and your answers to 5.1 and 5.2.

---

## Exercise 6 — Union and Intersection Types

**Practises:** unions, narrowing, discriminated unions, exhaustiveness, intersections, utility
types.

### 6.1 — A union

`type Id = number | string`. Write `formatId(id)`: numbers become `#` plus five digits —
`formatId(42)` → `"#00042"` — and strings become uppercase.

### 6.2 — A discriminated union

```ts
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; a: number; b: number; c: number };   // three side lengths
type Shape = Circle | Rectangle | Triangle;
```

Write `area(shape)` and `perimeter(shape)`, each with a `switch` on `kind`. For the triangle's
area, use **Heron's formula**.

| Call | Result |
|---|---|
| `area` of a circle, radius 2 | `12.57` (rounded to 2 decimals) |
| `area` of a 3 × 4 rectangle | `12` |
| `area` of a triangle with sides 3, 4, 5 | `6` |
| `perimeter` of a 3 × 4 rectangle | `14` |
| `perimeter` of a triangle with sides 3, 4, 5 | `12` |

### 6.3 — Add a shape

Make both functions exhaustive with a `never` check. Then add a `Square` to the `Shape` union,
build, and write down exactly what the compiler reports. Add the missing cases.

### 6.4 — An intersection

Write `type Named = { name: string }` and `type Timestamped = { createdAt: Date }`. Then write a
generic `stamp(item)` that returns a copy of any object with `createdAt` added. What is its
return type?

### 6.5 — Utility types

```ts
interface User { id: number; name: string; email: string; password: string; }
type Role = "student" | "teacher" | "admin";
```

1. `toPublic(user)` returns the user **without** the password. Its return type must not include
   `password` — use `Omit`.
2. `update(user, changes)` returns an updated copy. `changes` may contain any fields **except
   `id`** — use `Partial` and `Omit` together.
3. A `permissions` table from each `Role` to its allowed actions, using `Record`. Forgetting a
   role must not compile.

**Deliverable:** `exercise.06.ts`, and what the compiler said in 6.3.

---

## Exercise 7 — Decorators *(very scary)*

**Practises:** decorators, closures, `this`, `try`/`finally` thinking.

Use **standard** decorators, which TypeScript supports without any special setting. Set your
`target` to **`es2022`** — Class 08, section 6 explains why `esnext` fails here.

### 7.1 — `@Duration`

Write a method decorator `Duration` that logs how long each call takes:

```
sumTo finished after 8.52 ms
```

Use `performance.now()` for the timing.

### 7.2 — Change nothing else

A decorated method must behave exactly like the original: same arguments, same return value,
and the same `this`. Test it with a class whose decorated method uses `this`.

### 7.3 — When the method throws

If the decorated method throws, `@Duration` must still log the time — with `threw` instead of
`finished` — and the error must still reach the caller.

### 7.4 — Stretch: `async` methods

An `async` method returns a Promise at once, so timing until it *returns* measures nothing
useful. Make `@Duration` report when the Promise **settles**, with `resolved` or `rejected`.

### 7.5 — Stretch: a decorator factory

Write `@SlowerThan(20)`, which reports only calls that take longer than the given number of
milliseconds:

```
SLOW: slow took 30.02 ms (limit 20 ms)
```

**Deliverable:** `exercise.07.ts`, with checks that prove 7.2 and 7.3.

---

## Exercise 8 — Homework: A Project in Several Files

**Practises:** modules, `export` and `import`, `import type`, organising code.

Build a small library-loans program, split by responsibility:

| File | Contains |
|---|---|
| `models.ts` | the types only: `Book`, `Member`, `Loan`, and a `Genre` union |
| `data.ts` | sample data — at least six books, two members, two loans |
| `catalogue.ts` | the logic: `booksBy(author)`, `countByGenre()`, `isOnLoan()`, `available()`, `borrow()`, `overdue(today)` |
| `format.ts` | turning data into text: `formatDate()` (`19.10.2026`), `formatBook()`, `formatLoan()` |
| `check.ts` | your test helper — written once, imported wherever it is needed |
| `main.ts` | imports everything, prints a report, and runs the checks |

Requirements:

- **No function changes its inputs.** `borrow()` returns a *new* array of loans and leaves the
  original alone; it throws if the book is already on loan. A loan is due **14 days** after it
  is made.
- **Use `import type`** wherever an import is only used as a type.
- **Named exports only.**
- Write imports with the **`.ts`** extension, and set `"rewriteRelativeImportExtensions": true`
  so the compiled output points at `.js` files (Class 08, section 8).
- Use only type annotations — no enums, namespaces or parameter properties — so that the
  project runs both ways:
  ```bash
  npx tsc && node dist/exercise.08/main.js
  node exercise.08/main.ts
  ```

**Deliverable:** the `exercise.08/` folder.

---

## Hints

Stuck? Open the hints for the exercise you are on. Each hint nudges you towards the next step,
and the **Check** lines tell you what result to expect. Try for a while before you open them.

<details>
<summary><strong>Exercise 1 — Compiling TypeScript</strong></summary>

- **1.1** `npm init -y` writes `"type": "commonjs"` — change it to `"module"`. Without it, Node
  treats the compiled files as old-style CommonJS, and `import` / `export` and top-level `await`
  will not work.
- **1.1** If `tsc` complains that *"the 'rootDir' setting must be explicitly set"*, that is
  TypeScript 7 insisting you say where your sources are whenever you set `outDir`.
- **1.4** With a `tsconfig.json` in the folder, `npx tsc exercise.01.ts --target es2015` fails
  with error **TS5112**. Add `--ignoreConfig`, and give each target its own output folder:
  `--outDir targets/es2015`.
- **1.4** **Check:** with `es2015`, `n ** 2` becomes `Math.pow(n, 2)`, and the `async`
  function becomes a generator wrapped in a helper called `__awaiter`. `es2022` and `esnext`
  produce identical output for this file. All three print the same results.
- **1.5** **Check:** `--target es5` gives error **TS5108** — think about what happened to ES5
  support in TypeScript 7. The `flat()` error says *"Do you need to change your target
  library?"* — read the rest of that message.

</details>

<details>
<summary><strong>Exercise 2 — Basic Syntax</strong></summary>

- **2.2** Function parameters are the one place you always need annotations — TypeScript cannot
  guess what callers will pass.
- **2.2** Hover over `const a = "hi"` and `let b = "hi"`. A `const` can never change, so its
  type can be the exact value.
- **2.3** A tuple type with named positions: `type Grade = [student: string, points: number];`
- **2.4** `Array.from({ length: times }, () => text)` builds an array of copies, ready to be
  `join`ed.
- **2.5** Check for `null` *first*: `typeof null` is `"object"` (Lecture 01, Class 02).
  `Array.isArray` and `instanceof Date` narrow too.
- **2.6** **Check:** an unused `@ts-expect-error` is itself an error — *"Unused
  '@ts-expect-error' directive"*. That is what makes it a reliable test.

</details>

<details>
<summary><strong>Exercise 3 — Interfaces and Classes</strong></summary>

- **3.1** `readingRoomOnly: true` is a *literal type* — the only value it allows is `true`.
- **3.2** A getter looks like a method with `get` in front: `get size(): number { ... }`. It is
  read like a property: `library.size`, no parentheses.
- **3.2** To turn a `Book` into a `LibraryBook`, spread it and add the two new fields:
  `{ ...book, borrowedBy: null, dueDate: null }`.
- **3.2** To tell whether a book is a `RareBook`, use the `in` operator:
  `"readingRoomOnly" in book` narrows it.
- **3.2** **Check:** a book borrowed on 1 October 2026 is due on **15 October**. Add *days*, not
  milliseconds — see the Exercise 8 hints for why that matters.
- **3.3** **Check:** passing a variable works; the same object written directly in the call is
  an error mentioning *"Object literal may only specify known properties"*.
- **3.4** You cannot write `library.#books` outside the class at all — not even after
  `@ts-expect-error`. It is a JavaScript *syntax* error, and it would stop the whole file from
  loading.

</details>

<details>
<summary><strong>Exercise 4 — Enums</strong></summary>

- **4.2** In the `switch`, add a `default` that assigns the value to a variable of type `never`.
  Then try commenting out one `case` and building.
- **4.3** `Object.values(Color)` gives the enum's values as an array.
- **4.4** `Priority[1]` is `"Medium"`. For the loophole, try passing a number that is stored in a
  variable of type `number`, rather than a literal. **Check:** `label` then returns
  `"undefined priority"`.
- **4.5** `type Colour = (typeof Colour)[keyof typeof Colour];` — read it from the inside out:
  the type of the object, its keys, and the types of the values at those keys.
- **4.6** **Check:** Node reports `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`. Class 07, section 8
  explains which features Node cannot simply strip out — and `TypeScript-Setup.md`,
  section 2, explains what `tsx` does differently.

</details>

<details>
<summary><strong>Exercise 5 — Generics</strong></summary>

- **5.1** `function first<T>(items: readonly T[]): T | undefined`. `readonly` lets it accept
  readonly arrays too.
- **5.2** **Check:** for an empty array, the inferred `T` is `never` — there is no element type
  to infer — so the result's type is simply `undefined`.
- **5.4** `K extends keyof T` limits the key to the keys of the items, and `T[K]` is the type of
  that property. The result is `T[K][]`.
- **5.4** For `longest`, the constraint is `T extends { length: number }`.
- **5.5** Store the items in a `#items: T[]` field. `shift()` removes from the front of an array
  (Lecture 03, Class 06, section 2).

</details>

<details>
<summary><strong>Exercise 6 — Union and Intersection Types</strong></summary>

- **6.1** `String(id).padStart(5, "0")`
- **6.2** Heron's formula: with `s = (a + b + c) / 2`, the area is
  `Math.sqrt(s * (s - a) * (s - b) * (s - c))`.
- **6.3** A small helper keeps every `switch` short:
  `function assertNever(value: never): never { throw new Error(...); }` — call it from each
  `default`.
- **6.4** `function stamp<T extends object>(item: T): T & Timestamped` — spread the item and add
  the field.
- **6.5** Destructuring with a rest element drops a property neatly:
  `const { password, ...rest } = user;` (Lecture 03, Class 06, section 7).
- **6.5** **Check:** a `Record<Role, ...>` missing the `admin` key gives *"Property 'admin' is
  missing in type"*.

</details>

<details>
<summary><strong>Exercise 7 — Decorators</strong></summary>

- **7.1** A standard method decorator is `function Duration(original, context)`, and it
  **returns** a replacement function. `context.name` is the method's name.
- **7.1** The full type signature is long. Class 08, section 6 has a `@Logged` decorator with
  exactly the shape you need — start from that.
- **7.2** Return a regular `function`, not an arrow, and call the original with
  `original.call(this, ...args)`.
- **7.3** Wrap the call in `try`. In `catch`, log the time and then `throw` the same error again
  (Lecture 03, Class 05, section 5).
- **7.4** Check whether the result is a Promise with `result instanceof Promise`. If so, log
  from its `.then` — and return the Promise unchanged.
- **7.5** A decorator factory is a function that *returns* a decorator:
  `function SlowerThan(limit: number) { return function (original, context) { ... }; }`
- **Testing** — to check what was logged, temporarily replace `console.log` with a function
  that collects the messages into an array, and restore it in a `finally`.

</details>

<details>
<summary><strong>Exercise 8 — A Project in Several Files</strong></summary>

- Start with `models.ts`. Everything else imports from it, and it imports nothing.
- `countByGenre` can return `Record<Genre, number>`. Start with every genre at `0`, so the
  compiler checks that none is missing.
- **Dates:** add *calendar days*, not milliseconds:
  `new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)`.
  Adding `14 * 24 * 60 * 60 * 1000` milliseconds goes wrong when the clocks change.
  **Check:** a loan made on **19 October 2026** is due on **2 November 2026**. If you get
  1 November, look at what happens on 25 October.
- **Check:** `formatDate(new Date(2026, 9, 19))` is `"19.10.2026"`, and `models.js` in
  `dist/` contains almost nothing — only types were in it.
- Put the pass/fail counters inside `check.ts` and export a `summary()` function. Other files
  can read the totals, but cannot change them — a module keeps its own variables private.

</details>
