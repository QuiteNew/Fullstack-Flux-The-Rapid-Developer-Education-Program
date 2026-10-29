# Class 08 — Advanced TypeScript Features

Companion notes for `Class08-AdvancedTypeScript.pptx`. The slides are the outline; this is
the content. Section numbers map to slide numbers. Section 7 spends the most time on
**utility types** — the first item on slide 9, and the advanced types you will use most.

Every example was checked with the TypeScript 7 compiler (`tsc` 7.0) and Node 24. Where a
line is marked as an error, `tsc` really does reject it. These notes build on
[Class 07](Class07-TypeScriptFundamentals.md) — especially its sections on inference,
narrowing and structural typing.

**Contents**

1. [Interfaces](#1-interfaces-slide-3)
2. [Type aliases](#2-type-aliases-slide-4)
3. [Enums](#3-enums-slide-5)
4. [Generics](#4-generics-slide-6)
5. [Union and intersection types](#5-union-and-intersection-types-slide-7)
6. [Decorators](#6-decorators-slide-8)
7. [Advanced types](#7-advanced-types-slide-9)
8. [Modules](#8-modules-slide-10)

---

## 1. Interfaces (slide 3)

Class 07, section 7 introduced interfaces as names for object shapes. Here is the rest.

### Properties and methods

```ts
interface Library {
  name: string;
  books: Book[];
  open: boolean;
  find(title: string): Book | undefined;           // method
  onChange: (book: Book) => void;                  // property holding a function
}
```

The two ways of writing a function member look different but describe almost the same thing.
Use the method syntax for behaviour the object has, and the property syntax for callbacks the
caller supplies.

### Function interfaces

An interface can describe a **function** itself, using a *call signature* — a signature with
no name:

```ts
interface Comparator {
  (a: number, b: number): number;
}

const ascending: Comparator = (a, b) => a - b;
[3, 1, 2].sort(ascending);       // [1, 2, 3]
```

In practice, a type alias says this more directly (section 2):

```ts
type Comparator = (a: number, b: number) => number;
```

### Index signatures

For objects used as dictionaries, where you do not know the keys in advance:

```ts
interface Stock {
  [isbn: string]: number;          // any string key, number values
}

const stock: Stock = { "978-0441013593": 3, "978-0553293357": 0 };
```

With `noUncheckedIndexedAccess` turned on, reading `stock[someIsbn]` gives
`number | undefined` — the key might not be there. That flag is part of the `tsc --init`
defaults, and it is worth keeping: it is the compile-time version of Lecture 03's warning that
reading a missing key gives `undefined`. For a real dictionary that changes at runtime, a
`Map` (Lecture 03, Class 06, section 5) is often the better choice anyway.

### Extending

An interface can extend several others at once:

```ts
interface Timestamped { createdAt: Date; }
interface Owned { ownerId: number; }

interface Document extends Timestamped, Owned {
  title: string;
}
```

### Declaration merging

Declare the same interface twice, and the two declarations **merge**:

```ts
interface Settings { theme: string; }
interface Settings { fontSize: number; }

const s: Settings = { theme: "dark", fontSize: 14 };   // needs both
```

This exists so libraries can be extended — adding a property to a library's interface from
your own code. Within your own code it is usually an accident, and it is one of the few real
differences between interfaces and type aliases.

---

## 2. Type aliases (slide 4)

A **type alias** gives a name to any type at all:

```ts
type ID = number;
type Point = { x: number; y: number };
type Status = "draft" | "published" | "archived";
type Pair = [string, number];
type Handler = (event: Event) => void;
```

For object shapes, a type alias and an interface are nearly interchangeable:

```ts
type BookT = { title: string; year: number };
interface BookI { title: string; year: number; }
```

But a type alias can name things an interface cannot: unions, tuples, primitives, function
types, and the advanced types in section 7. That is what the slide means by "more powerful".

### Interface or type alias?

| | `interface` | `type` |
|---|:---:|:---:|
| Object shapes | ✅ | ✅ |
| Extending | `extends` | `&` (section 5) |
| Unions, tuples, primitives, function types | ✗ | ✅ |
| Declaration merging | ✅ | ✗ — a duplicate name is an error |
| Error messages | show the interface's name | sometimes show the whole expanded shape |

A sensible rule, and the one the TypeScript documentation suggests: **use `interface` for
object shapes, and `type` for everything else.** Being consistent matters more than which way
you choose.

---

## 3. Enums (slide 5)

An **enum** is a named set of constants.

### Numeric enums

```ts
enum Direction {
  Up,          // 0
  Down,        // 1
  Left,        // 2
  Right,       // 3
}

function move(direction: Direction) { ... }
move(Direction.Left);
```

Members are numbered from 0 unless you say otherwise. Numeric enums also get a **reverse
mapping** — you can go from the number back to the name:

```ts
Direction.Left        // 2
Direction[2]          // "Left"
```

Because the values are numbers, a numeric enum is also loose about what it accepts. A
literal number that is not a member is rejected — but any variable of type `number` gets
through:

```ts
move(42);
// Error: Argument of type '42' is not assignable to parameter of type 'Direction'.

const n: number = 42;
move(n);              // compiles — and 42 is not a direction
```

### String enums

```ts
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

Color.Green           // "green"
```

Every member needs an explicit value, and there is no reverse mapping. The values are
readable when you log them or store them, which numeric enums are not — a log line saying
`2` tells you nothing; `"left"` does. **Prefer string enums.**

### Enums are not just types

Unlike almost everything else in TypeScript, an enum **generates JavaScript code** — an
object that exists at runtime. Two consequences:

- `Object.values(Color)` works, which is handy for building a list of options.
- Enums cannot simply be stripped out. As Class 07, section 8 showed, Node cannot run a `.ts`
  file containing an enum directly:

  ```
  SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode
  ```

### The common alternative: `as const`

Many codebases avoid enums altogether and use a plain object plus a union type:

```ts
const Color = {
  Red: "red",
  Green: "green",
  Blue: "blue",
} as const;

type Color = (typeof Color)[keyof typeof Color];    // "red" | "green" | "blue"

function paint(color: Color) { ... }

paint(Color.Red);     // fine
paint("red");         // also fine — it is just the string
paint("purple");
// Error: Argument of type '"purple"' is not assignable to parameter of type 'Color'.
```

`as const` makes every property `readonly` and keeps the exact literal types instead of
widening them to `string`. The `type Color = ...` line uses `typeof` and `keyof` from section 7
to turn the object's values into a union. It is plain JavaScript plus types, so Node can run
it directly.

Or skip the object and use the union on its own:

```ts
type Color = "red" | "green" | "blue";
```

Which to use? An enum is fine, and you will see them in plenty of code, Angular especially.
But a union of string literals does the same job with less machinery, and it is what most
modern TypeScript code uses.

---

## 4. Generics (slide 6)

### The problem

Write a function that returns the first element of an array:

```ts
function first(items: number[]): number | undefined {
  return items[0];
}
```

That works for numbers only. Using `any` would accept everything:

```ts
function first(items: any[]): any {
  return items[0];
}

const name = first(["Ana", "Marko"]);   // any — the type information is lost
name.toFixed(2);                        // no error, crashes at runtime
```

### The solution: a type parameter

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const name = first(["Ana", "Marko"]);   // string | undefined
const year = first([1965, 1984]);       // number | undefined
```

`T` is a **type parameter** — a placeholder for a type, filled in each time the function is
called. As the slide says, think of `Array`: an `Array<string>` and an `Array<number>` are the
same structure holding different things, and `Array<T>` is how that is written.

Usually you do not write the type argument — TypeScript **infers** `T` from what you pass in.
You can still give it explicitly:

```ts
first<string>(["Ana"]);
```

Why `T | undefined` and not `T`? Because the array might be empty, and then `items[0]` is
`undefined`. With `noUncheckedIndexedAccess` turned on, the compiler insists on it.

### Constraints

Sometimes `T` cannot be just anything. `extends` limits what it may be:

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("apple", "fig");          // "apple"
longest([1, 2], [1, 2, 3]);       // [1, 2, 3]
longest(10, 20);
// Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```

Inside the function, `T` is known to have a `length`, so `a.length` is allowed.

A common and useful constraint uses `keyof` (section 7):

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const book = { title: "Dune", year: 1965 };
getProperty(book, "year");        // number
getProperty(book, "author");
// Error: Argument of type '"author"' is not assignable to parameter of type '"title" | "year"'.
```

### Generic types

Interfaces, type aliases and classes can be generic too:

```ts
interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

type BookResponse = ApiResponse<Book>;

class Stack<T> {
  #items: T[] = [];
  push(item: T): void { this.#items.push(item); }
  pop(): T | undefined { return this.#items.pop(); }
}

const numbers = new Stack<number>();
numbers.push(1);
numbers.push("two");
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

### "Powerful, but error-prone"

The slide's warning is fair. The usual mistakes:

- **A type parameter used only once.** `function log<T>(value: T): void` gains nothing over
  `function log(value: unknown): void`. A type parameter earns its place by connecting two
  things — usually an input to an output, as in `first`.
- **Generics as disguised `any`.** `function parse<T>(json: string): T` *looks* type-safe,
  but it just returns whatever type the caller asks for, with nothing checked. It is
  `JSON.parse`'s `any` with better manners (Class 07, section 9).
- **Over-engineering.** If a function only ever handles one type, it does not need to be
  generic.

Rule of thumb: **if a type parameter appears only once in a signature, you probably do not
need it.**

---

## 5. Union and intersection types (slide 7)

### Unions: one of several types

```ts
type ID = number | string;

function format(id: ID): string {
  return typeof id === "number" ? id.toString().padStart(6, "0") : id;
}
```

A value of a union type can be any one of the members. You can only do with it what is safe
for *all* of them — until you narrow it (Class 07, section 6). The slide calls this a
"commonly used pattern in JavaScript", and it is: functions that accept a string *or* an
array, a value *or* `null`, are everywhere.

### Discriminated unions

The most useful pattern in this class. Give each member of a union a common property with a
different literal value — the **discriminant**:

```ts
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };

type Shape = Circle | Rectangle | Triangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;          // shape is a Circle here
    case "rectangle":
      return shape.width * shape.height;           // a Rectangle here
    case "triangle":
      return (shape.base * shape.height) / 2;      // a Triangle here
  }
}
```

Checking `shape.kind` narrows the whole object. In the `"circle"` case, TypeScript knows
`shape.radius` exists — and that `shape.width` does not. This is what the slide means by
"discriminated unions and inference".

It models real data far better than one object with lots of optional properties. Compare:

```ts
// Everything optional: nothing stops a circle with a width and no radius
type BadShape = { kind: string; radius?: number; width?: number; height?: number; base?: number };
```

### Exhaustiveness checking with `never`

What happens when someone adds a fourth shape and forgets to update `area`? Make the compiler
tell you:

```ts
function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default: {
      const unhandled: never = shape;
      throw new Error(`Unknown shape: ${JSON.stringify(unhandled)}`);
    }
  }
}
```

When every case is handled, nothing can reach `default`, so `shape` has type `never` there and
the assignment is fine. Add `| Square` to `Shape` without a matching `case`, and `shape` in
`default` is now a `Square` — which is not assignable to `never`:

```
Error: Type 'Square' is not assignable to type 'never'.
```

The compiler now lists every `switch` you forgot to update. This is the `default` branch from
Lecture 03, Class 05, section 1, made checkable.

### Intersections: all of several types

An **intersection** `A & B` has *everything* from both:

```ts
type Timestamped = { createdAt: Date };
type Named = { name: string };

type NamedEvent = Named & Timestamped;

const launch: NamedEvent = { name: "Launch", createdAt: new Date() };   // needs both
```

The slide calls this "making a type out of different parts". It is the type-alias version of
an interface extending several others.

Intersecting types that cannot both be true gives `never` — a value that cannot exist:

```ts
type Impossible = string & number;     // never
```

**Union versus intersection, the confusing part:** a *union* of two object types accepts
objects with *fewer* guaranteed properties (only those they share are safe to use), while an
*intersection* demands *more* properties (all of both). The names describe the sets of
**values**: a union widens the set of allowed values; an intersection narrows it.

---

## 6. Decorators (slide 8)

### What they are

A **decorator** is a function that modifies a class or class member, attached with `@`:

```ts
class Report {
  @Duration
  generate(): string {
    // ... slow work ...
  }
}
```

The slide's three points are all true. Decorators address **cross-cutting concerns** —
behaviour that many unrelated methods need, such as logging, timing, caching or access
control — without copying the same code into every method. They are **easy to use**: one line
above a method. They are **hard to write**, because a decorator is a function that receives a
function and returns a function. And frameworks use them **heavily**: Angular's
`@Component`, NestJS's `@Controller`.

### Two kinds of decorator

There are two decorator systems, and examples online mix them up:

| | Standard decorators | Legacy "experimental" decorators |
|---|---|---|
| Status | The JavaScript proposal, supported since TypeScript 5.0 | TypeScript's original, older design |
| Enabled by | Nothing — on by default | `"experimentalDecorators": true` |
| Method decorator receives | `(method, context)` | `(target, propertyKey, descriptor)` |
| Used by | New code | Angular, NestJS and other older frameworks |

**These notes, and the exercise, use standard decorators.** If you copy an example with three
parameters, you are looking at the legacy kind, and it will not work without the flag.

### Writing a method decorator

A method decorator receives the original method and a **context** object describing it. It
returns a **replacement** method:

```ts
function Logged<This, Args extends unknown[], Return>(
  original: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) {
  const name = String(context.name);

  return function (this: This, ...args: Args): Return {
    console.log(`Calling ${name}(${args.join(", ")})`);
    const result = original.call(this, ...args);
    console.log(`${name} returned ${result}`);
    return result;
  };
}

class Calculator {
  @Logged
  add(a: number, b: number): number {
    return a + b;
  }
}

new Calculator().add(2, 3);
// Calling add(2, 3)
// add returned 5
```

Look past the type parameters and the shape is familiar: a function that takes a function and
returns a new function wrapping it. That is a **closure** — Lecture 03, Class 05, section 7.
The replacement remembers `original` and `name` from the scope it was created in. The type
parameters only make sure the replacement accepts and returns exactly what the original did.

Two details matter:

- **Use `original.call(this, ...)`**, not `original(...)`. The replacement is called as a
  method, so its `this` is the object. Calling `original` without passing `this` along would
  break any method that uses `this`.
- **Use a regular `function`**, not an arrow function, for the replacement — arrows do not
  get their own `this` (Lecture 03, Class 05, section 6).

### Decorators work on classes, not on plain functions

```ts
@Logged
function standalone() {}
// Error: Decorators are not valid here.
```

Decorators can be attached to classes and to their methods, fields and accessors — never to
standalone functions. For a plain function, write the wrapper directly — which is all a
decorator is underneath:

```ts
const timedSearch = withTiming(search);   // a function that returns a wrapped function
```

### Compiling decorators

No JavaScript engine runs decorators natively yet, so the compiler rewrites them into helper
functions. That has a surprising consequence:

- With `target: "es2022"`, `tsc` converts `@Duration` into ordinary JavaScript, and the output
  runs in Node and every browser.
- With `target: "esnext"`, `tsc` assumes the engine understands decorators and leaves
  `@Duration` in the output untouched. Node then fails with `SyntaxError: Invalid or
  unexpected token`.

So for code with decorators, **use `es2022` (or lower) as the target**. And for the same reason
as enums, Node cannot run a `.ts` file containing decorators directly — it has to be compiled
first.

---

## 7. Advanced types (slide 9)

These features let you build types out of other types. The slide lists them; here is what each
does, building up to the **utility types** that combine them — which you will use far more
often than you write them yourself.

### `keyof` — the keys of a type

```ts
interface Book { title: string; year: number; }

type BookKey = keyof Book;          // "title" | "year"
```

### `typeof` — the type of a value

In a type position, `typeof` gives the type of an existing variable:

```ts
const defaults = { theme: "light", fontSize: 14 };

type Defaults = typeof defaults;    // { theme: string; fontSize: number }
```

Useful when the value comes first and you want a type to match it. The enum alternative in
section 3 combined both: `(typeof Color)[keyof typeof Color]`.

### Indexed access — the type of one property

```ts
type Year = Book["year"];                 // number
type BookValue = Book[keyof Book];        // string | number

type Item = string[][number];             // string — the element type of an array
```

### Conditional types — choosing a type

```ts
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<"hello">;     // "yes"
type B = IsString<42>;          // "no"
```

It reads like the ternary operator, and works like one: *if `T` is assignable to `string`, the
type is `"yes"`, otherwise `"no"`*. With `infer`, a conditional type can pull a type *out* of
another:

```ts
type ElementOf<T> = T extends (infer E)[] ? E : never;

type N = ElementOf<number[]>;   // number
```

### Mapped types — transforming every property

A mapped type loops over the keys of another type, a little like `map` over an array:

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type DraftBook = Optional<Book>;   // { title?: string; year?: number }
```

*For every key `K` of `T`, make an optional property of the same type.* Change `?` to
`readonly`, or change `T[K]` to something else, and you get other transformations.

### Template literal types — building string types

```ts
type Size = "small" | "large";
type Colour = "red" | "blue";

type Variant = `${Size}-${Colour}`;
// "small-red" | "small-blue" | "large-red" | "large-blue"

type EventName = `on${Capitalize<"click" | "hover">}`;   // "onClick" | "onHover"
```

The same backtick syntax as Lecture 01's template literals, but producing types.

### Utility types

**The first item on slide 9, and the part of this section you will actually use every day.**
TypeScript has built-in generic types, made from the features above, for the most common
transformations:

| Utility type | Produces |
|---|---|
| `Partial<T>` | `T` with every property optional |
| `Required<T>` | `T` with every property required |
| `Readonly<T>` | `T` with every property `readonly` |
| `Pick<T, K>` | only the properties `K` of `T` |
| `Omit<T, K>` | everything in `T` except `K` |
| `Record<K, V>` | an object with keys `K` and values `V` |
| `ReturnType<F>` | the return type of a function type |
| `Parameters<F>` | the parameter types of a function, as a tuple |
| `NonNullable<T>` | `T` without `null` and `undefined` |
| `Awaited<T>` | the value inside a `Promise` |

They save you from writing near-duplicate types by hand:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Updating a user: any subset of fields, except the id
function updateUser(id: number, changes: Partial<Omit<User, "id">>) { ... }
updateUser(1, { email: "ana@uacs.edu.mk" });     // fine

// What we send to the browser: never the password
type PublicUser = Omit<User, "password">;

// A lookup table from role to permissions
type Role = "student" | "teacher" | "admin";
const permissions: Record<Role, string[]> = {
  student: ["read"],
  teacher: ["read", "grade"],
  admin: ["read", "grade", "manage"],
};
```

Forget a role in that last `Record`, and the compiler tells you which one is missing — the
same "you forgot a case" safety as the exhaustive `switch` in section 5.

`Partial` is exactly the `Optional` mapped type built above. Most utility types are one or two
lines of the features in this section — reading their definitions is a good way to understand
mapped and conditional types.

### `satisfies`

One more operator worth knowing. Annotating a value with a type *replaces* its inferred type,
and loses detail:

```ts
const palette: Record<string, string> = { primary: "#0b5cad", danger: "#c62828" };
palette.primary;      // fine
palette.primry;       // also "fine" — the typo is not caught, because any string key is allowed
```

`satisfies` *checks* the value against a type, but keeps the precise inferred type:

```ts
const palette = { primary: "#0b5cad", danger: "#c62828" } satisfies Record<string, string>;
palette.primry;
// Error: Property 'primry' does not exist on type '{ primary: string; danger: string; }'.
//        Did you mean 'primary'?
```

---

## 8. Modules (slide 10)

### Single file versus multiple files

A small program fits in one file. A real one does not, and splitting it up needs a way for
files to share code. That is what **modules** are: each file has its own scope, and shares only
what it explicitly **exports**.

Lecture 03's exercise runner had to load each exercise on a separate page, because the files
were not modules and their top-level names clashed. Modules fix exactly that problem.

### `export` and `import`

```ts
// models.ts
export interface Book {
  title: string;
  year: number;
}

export function describe(book: Book): string {
  return `${book.title} (${book.year})`;
}
```

```ts
// main.ts
import { describe, type Book } from "./models.ts";

const dune: Book = { title: "Dune", year: 1965 };
console.log(describe(dune));
```

- **Named exports** — `export function describe` — are imported by name, in braces. Prefer
  these: the name is fixed, so search and rename work across the whole project.
- **Default exports** — `export default class Library` — can be imported under any name, which
  is convenient and makes them harder to track. Many style guides avoid them.
- **`import type`** — or `type` inside the braces, as above — marks an import that is used only
  as a type. It is removed completely from the output. With `verbatimModuleSyntax` turned on
  (another `tsc --init` default), the compiler requires it for type-only imports.

Any file with a top-level `import` or `export` is a module. A file without one is a *script*,
whose top-level names are global — the Lecture 03 runner problem again. The `tsc --init`
default `"moduleDetection": "force"` treats every file as a module, which is what you want.

### File extensions in imports

This is the most confusing part of using modules in TypeScript, so here it is plainly.

When `tsc` compiles `main.ts` to `main.js`, the import must point at a file that will exist
when the **JavaScript** runs: `./models.js`. There are two ways to arrange that:

1. **Write `.js` in the TypeScript source:** `import { describe } from "./models.js";`
   This works, but looks wrong — there is no `models.js` in your source folder.
2. **Write `.ts`, and let the compiler fix it:** `import { describe } from "./models.ts";`
   with `"rewriteRelativeImportExtensions": true` in `tsconfig.json`. The compiler rewrites
   `./models.ts` to `./models.js` in the output.

The second option has a bonus: since the source imports point at real `.ts` files, Node can run
`node main.ts` directly too (Class 07, section 8). **The exercises use option 2.**

For Node to treat the compiled `.js` files as modules, the project's `package.json` needs
`"type": "module"`.

### Namespaces

```ts
namespace Geometry {
  export function area(r: number) { return Math.PI * r * r; }
}
Geometry.area(2);
```

Namespaces are TypeScript's older way of grouping code, from before JavaScript had modules.
Like enums, they generate code — so Node cannot run them directly — and modules do the same job
better. You will meet them in older code and in some library type declarations. **Do not use
them in new code; use modules.**

---

## Further reading

- **TypeScript Handbook: Everyday Types** —
  <https://www.typescriptlang.org/docs/handbook/2/everyday-types.html>
- **Handbook: Narrowing** — <https://www.typescriptlang.org/docs/handbook/2/narrowing.html>
- **Handbook: Generics** — <https://www.typescriptlang.org/docs/handbook/2/generics.html>
- **Handbook: Creating Types from Types** (section 7 of these notes) —
  <https://www.typescriptlang.org/docs/handbook/2/types-from-types.html>
- **Utility Types reference** — <https://www.typescriptlang.org/docs/handbook/utility-types.html>
- **TypeScript 5.0 release notes: Decorators** —
  <https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators>

---

*Internet Programming · UACS · Lecture 04*
