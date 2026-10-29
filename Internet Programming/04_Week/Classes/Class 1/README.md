# Class 07 — TypeScript Fundamentals

Companion notes for `Class07-TypeScriptFundamentals.pptx`. The slides are the outline;
this is the content. Section numbers map to slide numbers. Sections 4 and 6 expand two bullets
that the slides only name — **type inference** and **narrowing** — which are the skills you
will use most.

Every example was checked with the TypeScript 7 compiler (`tsc` 7.0) and Node 24. Where a
line is marked as an error, `tsc` really does reject it.

**Contents**

1. [What is TypeScript?](#1-what-is-typescript-slide-3)
2. [Why use TypeScript?](#2-why-use-typescript-slide-4)
3. [Variables and data types](#3-variables-and-data-types-slide-5)
4. [Type inference](#4-type-inference-slide-5)
5. [Type annotations](#5-type-annotations-slide-6)
6. [Narrowing](#6-narrowing-slide-6)
7. [Interfaces and classes](#7-interfaces-and-classes-slide-7)
8. [Compiling TypeScript](#8-compiling-typescript-slide-8)
9. [Benefits — and costs](#9-benefits--and-costs-slide-9)

---

## 1. What is TypeScript? (slide 3)

TypeScript is **JavaScript with a type system bolted on**. You write `.ts` files; a compiler
checks them for type errors, then strips the types out and produces ordinary JavaScript.

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

compiles to

```js
function greet(name) {
  return `Hello, ${name}!`;
}
```

The `: string` annotations simply disappear. That is the single most important fact about
TypeScript:

> **Types exist only at compile time.** Once compiled, nothing remains of them. The browser
> and Node never see a type, and nothing checks types while the program runs.

Everything else follows from that. TypeScript can only warn you about problems it can see in
your source code. It cannot check data that arrives while the program is running — section 9
comes back to this.

### "Any valid JavaScript is valid TypeScript"

The slide's claim is true in the sense that matters: any JavaScript *parses* as TypeScript,
so you can rename a `.js` file to `.ts` and start adding types gradually. But the compiler
may now **complain** about it:

```js
let count = 1;
count = "one";      // fine in JavaScript
                    // TypeScript: Type 'string' is not assignable to type 'number'
```

By default, `tsc` still produces the JavaScript output even when it finds type errors — it
reports them and carries on. Section 8 shows how to change that.

### Who makes it

Microsoft created TypeScript in 2012, led by Anders Hejlsberg — also the designer of C# and,
earlier, Turbo Pascal and Delphi. It is open source and has become the default for serious
JavaScript projects.

In 2025–26 the compiler itself was **rewritten in Go** for TypeScript 7, making it around ten
times faster. The language is the same; the tool got quicker.

---

## 2. Why use TypeScript? (slide 4)

### It catches mistakes before you run the code

The slide says JavaScript's dynamic typing leads to "errors and bugs in large codebases".
Lectures 01–03 were full of examples. Here is how TypeScript treats some of them:

```ts
const user = { name: "Ana", age: 21 };

user.nmae;
// Error: Property 'nmae' does not exist on type '{ name: string; age: number; }'.

const ages: number[] = [];
ages.push("21");
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.

function total(prices: number[]) { /* ... */ }
total("100");
// Error: Argument of type 'string' is not assignable to parameter of type 'number[]'.

document.querySelector("#title").textContent = "Hi";
// Error: Object is possibly 'null'.
```

That last one is the *Cannot read properties of null* error from Lecture 02 — caught while
you are still typing, before the page ever loads.

### It makes the editor much smarter

Because the editor knows the type of every value, it can offer:

- **Autocomplete** that lists the actual properties and methods available
- **Rename** a function or property everywhere it is used, safely
- **Go to definition** and **find all references**
- **Inline documentation** of what a function expects and returns

In a codebase of a few hundred files, this matters more than the error checking.

### It documents the code

```js
function createUser(data) { ... }        // JavaScript: what is data? Go and read the code.
```

```ts
function createUser(data: NewUser): User { ... }   // TypeScript: it says so.
```

The types are documentation that **cannot go out of date**, because the compiler checks
them against the code every time.

---

## 3. Variables and data types (slide 5)

### The primitive types

TypeScript uses the same primitive types as JavaScript (Lecture 01, Class 02, section 4),
written in lowercase:

```ts
let title: string = "Dune";
let year: number = 1965;
let available: boolean = true;
let big: bigint = 9007199254740993n;
let id: symbol = Symbol("id");
let nothing: null = null;
let notSet: undefined = undefined;
```

> Use the **lowercase** names: `string`, `number`, `boolean`. The capitalised `String`,
> `Number` and `Boolean` refer to JavaScript's wrapper objects, which you almost never want.

### `null` and `undefined`

With `strict` mode on — which every new project has — `null` and `undefined` are **not**
part of any other type. A `string` is always a string:

```ts
let name: string = null;
// Error: Type 'null' is not assignable to type 'string'.
```

If something might be missing, say so with a **union type** (Class 08, section 7 has the
details):

```ts
let middleName: string | null = null;    // a string, or null
```

This is the feature that eliminates the *Cannot read properties of undefined* errors from
Lecture 01: the compiler will not let you use a value that might be missing until you have
checked it.

### `any` — switching the type checker off

```ts
let anything: any = 42;
anything = "now a string";
anything.foo.bar.baz();        // no error — and a guaranteed crash at runtime
```

`any` means *"don't check this"*. It turns TypeScript back into JavaScript for that value.
Worse, it **spreads**: anything you get from an `any` is also `any`, so one `any` can quietly
switch off checking for everything it touches.

The slide lists `any` as a data type. It is better thought of as an **escape hatch** — useful
while converting old JavaScript, a warning sign anywhere else.

### `unknown` — the safe alternative

`unknown` also accepts any value, but it lets you do **nothing** with it until you have checked
what it is:

```ts
let input: unknown = getSomething();

input.toUpperCase();
// Error: 'input' is of type 'unknown'.

if (typeof input === "string") {
  input.toUpperCase();    // fine — here TypeScript knows it is a string
}
```

**Rule: when you do not know the type of something, use `unknown`, not `any`.** `any` says
"trust me"; `unknown` says "check first". Section 6 shows how to check.

### `void` and `never`

- **`void`** — a function that returns nothing useful:
  `function log(msg: string): void { console.log(msg); }`
- **`never`** — a value that can never exist. A function that always throws returns `never`,
  and Class 08, section 7 uses `never` to make the compiler check that every case of a
  `switch` is handled.

### Arrays

Two equivalent spellings:

```ts
const scores: number[] = [90, 85, 70];
const names: Array<string> = ["Ana", "Marko"];
```

Use `number[]` for simple types. `Array<string>` is a *generic* type — Class 08, section 6.

A `readonly` array cannot be modified — useful for function parameters, to promise that you
will not change the caller's array (Lecture 03, Class 06, section 2):

```ts
function average(values: readonly number[]): number {
  values.push(0);
  // Error: Property 'push' does not exist on type 'readonly number[]'.
  ...
}
```

### Tuples

A **tuple** is an array with a fixed length, where each position has its own type:

```ts
const point: [number, number] = [3, 4];
const entry: [string, number] = ["Ana", 21];

entry[0].toUpperCase();    // fine — position 0 is a string
entry[2];
// Error: Tuple type '[string, number]' of length '2' has no element at index '2'.
```

You met tuples in Lecture 03 without the name: `Object.entries()` returns an array of
`[key, value]` tuples, and `useState` in React returns one too. Positions can be named for
readability, which helps when they have the same type:

```ts
type Range = [start: number, end: number];
```

---

## 4. Type inference (slide 5)

**The last bullet on slide 5, and the most important idea in this class.**

You do not need to annotate everything. TypeScript works out the type of most values on its
own, from how they are created:

```ts
let year = 1965;              // number
let title = "Dune";           // string
const tags = ["sf", "classic"];   // string[]
const book = { title: "Dune", year: 1965 };   // { title: string; year: number }

year = "1965";
// Error: Type 'string' is not assignable to type 'number'.
```

That last line errors even though `year` has no annotation. The type was **inferred** from
its first value, and it is just as strict as a written one.

Function return types are inferred too:

```ts
function double(n: number) {
  return n * 2;               // inferred return type: number
}
```

### `const` and literal types

`let` and `const` are inferred differently:

```ts
let a = "hello";      // string — it might change later
const b = "hello";    // "hello" — it never can, so its type is that exact value
```

`"hello"` is a **literal type**: a type with exactly one value. Combined with unions, they are
very useful:

```ts
let direction: "up" | "down" | "left" | "right" = "up";
direction = "sideways";
// Error: Type '"sideways"' is not assignable to type '"down" | "left" | "right" | "up"'.
```

(The compiler lists the options alphabetically in its message, whatever order you wrote
them in.)

### So when do you annotate?

- **Function parameters — always.** TypeScript cannot infer them; without an annotation, a
  parameter is an error in strict mode (*implicitly has an 'any' type*).
- **Variables — rarely.** Only when the first value does not tell the whole story: an empty
  array (`const ids: number[] = []`), or something that starts as `null`.
- **Return types — when it helps.** Annotating the return type of an exported function
  documents it, and makes the compiler check the function body against what you promised.

Over-annotating is a beginner habit. `const count: number = 0;` adds nothing that
`const count = 0;` does not already say.

---

## 5. Type annotations (slide 6)

### Variables

```ts
let score: number;            // declared now, assigned later
score = 90;
```

### Function parameters and return types

```ts
function fullName(first: string, last: string): string {
  return `${first} ${last}`;
}

fullName("Ana");
// Error: Expected 2 arguments, but got 1.
```

That is a real change from JavaScript, where missing arguments silently become `undefined`
(Lecture 03, Class 05, section 6). TypeScript checks the number of arguments as well as their
types.

### Optional parameters

A `?` makes a parameter optional. Inside the function its type includes `undefined`, so you
must handle that case:

```ts
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}`;
  }
  return `Hello, ${name}`;
}

greet("Ana");               // fine
greet("Ana", "Dr.");        // fine
```

Optional parameters must come **after** the required ones.

### Default parameters

A default value makes the parameter optional *and* gives it a type, inferred from the
default:

```ts
function repeat(text: string, times = 1): string {    // times: number
  return text.repeat(times);
}
```

No `?` needed, and no `undefined` to handle inside — the default has taken care of it.

### Rest parameters

Typed as an array:

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
```

### Function types

Functions are values (Lecture 03, Class 05, section 6), so they have types too:

```ts
let operation: (a: number, b: number) => number;

operation = (a, b) => a + b;      // a and b are inferred as number
operation = (a, b) => `${a}${b}`;
// Error: Type 'string' is not assignable to type 'number'.
```

This is how callbacks are typed:

```ts
function applyTwice(fn: (n: number) => number, value: number): number {
  return fn(fn(value));
}
applyTwice((n) => n * 3, 2);    // 18
```

---

## 6. Narrowing (slide 6)

**Slide 6's "inferred narrowing" — the skill you will use on almost every line of real
TypeScript.**

When a value could be one of several types, TypeScript does not let you use it as any one of
them — until you have **checked**. Every check *narrows* the type for the code that follows:

```ts
function describe(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();   // here: string
  }
  return value.toFixed(2);        // here: number — the only thing left
}
```

The compiler follows the logic of your code — `if`, `return`, `else`, `switch` — and tracks
what each value can be at every point. The checks are ordinary JavaScript you already know:

| Check | Narrows by | Example |
|---|---|---|
| `typeof x === "string"` | primitive type | `string \| number` → `string` |
| `x === null`, `x !== undefined` | exact value | `string \| null` → `string` |
| `if (x)` | truthiness | removes `null`, `undefined` (and `""`, `0`!) |
| `Array.isArray(x)` | array or not | `string \| string[]` → `string[]` |
| `x instanceof Date` | class | `Date \| string` → `Date` |
| `"swim" in animal` | has property | `Fish \| Bird` → `Fish` |

The truthiness check comes with the warning from Lecture 03, Class 05, section 2: `if (count)`
also excludes a legitimate `0`. Prefer `count !== undefined`.

Guard clauses (Lecture 03, Class 05, section 1) narrow too:

```ts
function shout(message: string | undefined): string {
  if (message === undefined) {
    return "";
  }
  return message.toUpperCase();   // undefined was handled above, so: string
}
```

### When you know better: `as` and `!`

Sometimes you know something the compiler cannot:

```ts
const input = document.querySelector("#email") as HTMLInputElement;
input.value;      // fine: you told TypeScript it is an input element

const title = document.querySelector("h1")!;
title.textContent;   // fine: ! means "this is definitely not null"
```

These are **assertions**, not checks. They do nothing at runtime — they just make the error
go away. If you are wrong, the program crashes exactly as JavaScript would:

```ts
const n = "hello" as unknown as number;   // compiles
n.toFixed(2);                             // TypeError at runtime: n.toFixed is not a function
```

**Prefer a real check.** Use `as` and `!` only where you are certain, such as an element you
know is on the page.

---

## 7. Interfaces and classes (slide 7)

### Interfaces describe shapes

An **interface** names the shape of an object — which properties it has, and their types:

```ts
interface Book {
  title: string;
  year: number;
  isbn?: string;              // optional
  readonly id: number;        // cannot be changed after creation
}

const dune: Book = { id: 1, title: "Dune", year: 1965 };
dune.id = 2;
// Error: Cannot assign to 'id' because it is a read-only property.
```

Interfaces can **extend** others, adding to them:

```ts
interface LibraryBook extends Book {
  borrowedBy: string | null;
}
```

A `LibraryBook` has everything a `Book` has, plus `borrowedBy`. Class 08, section 1 covers
interfaces in more depth.

### Structural typing

TypeScript compares types by their **shape**, not their name. Anything with the right
properties fits — even if it was never declared as that type:

```ts
interface Point { x: number; y: number; }

function distance(p: Point): number {
  return Math.sqrt(p.x ** 2 + p.y ** 2);
}

const location = { x: 3, y: 4, label: "home" };
distance(location);           // 5 — fine, it has x and y
```

This is sometimes called "duck typing": if it has `x` and `y`, it is a `Point`. The
alternative — slide 7's "formal name checking" — is usually called **nominal typing**, and it
is what Java and C# do: there, a class must explicitly declare that it implements an
interface.

There is one exception. When you write an object literal *directly*, extra properties are
flagged, because they are almost always a typo:

```ts
distance({ x: 3, y: 4, label: "home" });
// Error: Object literal may only specify known properties, and 'label' does not exist in type 'Point'.
```

### Classes

Classes work as in JavaScript (Lecture 01, Class 02, section 2), with types and some
additions:

```ts
class Account {
  readonly owner: string;
  private balance = 0;               // only usable inside the class

  constructor(owner: string) {
    this.owner = owner;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new RangeError("Deposit must be positive");
    }
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new Account("Ana");
account.deposit(100);
account.balance;
// Error: Property 'balance' is private and only accessible within class 'Account'.
```

**Access modifiers:**

| Modifier | Accessible from |
|---|---|
| `public` (the default) | anywhere |
| `protected` | the class and its subclasses |
| `private` | the class only |

**`private` versus `#private`.** TypeScript's `private` is checked at compile time only — like
all types, it is erased, and at runtime the property is an ordinary, visible property.
JavaScript's own `#balance` syntax is truly private at runtime: no code outside the class can
reach it. For data that must stay hidden, use `#`.

**Parameter properties** are a shortcut that declares and assigns a property in one place:

```ts
class Point {
  constructor(public x: number, public y: number) {}
}
```

They are convenient, but they are not plain JavaScript with types attached — the compiler
has to *generate* code for them. Section 8 explains why that now matters.

### Classes implementing interfaces

A class can promise to match an interface with `implements`. The compiler then checks that
it really does:

```ts
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

`implements` only *checks*; it adds nothing to the class. Remove the `area` method and you
get an error, rather than a class that silently lacks it.

### Interface or class?

- An **interface** describes a shape. It produces no JavaScript at all.
- A **class** is a template for creating objects, with behaviour. It produces real code.

For data that just moves around — what comes back from a server, a function's options — use
an interface. Use a class when you need methods, private state, or `instanceof` checks.

---

## 8. Compiling TypeScript (slide 8)

### The compiler: `tsc`

Install TypeScript into a project, and compile:

```bash
npm install --save-dev typescript
npx tsc
```

`tsc` checks the code, reports errors, and writes `.js` files.

### `tsconfig.json`

A `tsconfig.json` in the project folder configures the compiler. With one present, running
`npx tsc` compiles the whole project. `npx tsc --init` writes a starting file.

A small, sensible configuration:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "nodenext",
    "strict": true,
    "rootDir": "src",
    "outDir": "dist",
    "noEmitOnError": true,
    "skipLibCheck": true
  }
}
```

| Option | What it does |
|---|---|
| `target` | Which version of JavaScript to produce — see below |
| `module` | Which module system to use for `import` / `export` — Class 08, section 8 |
| `strict` | Turns on all the strict checks. **Always on for new code** |
| `rootDir` / `outDir` | Where the `.ts` sources are, and where to write the `.js` output |
| `noEmitOnError` | Do not write any output if there are errors |
| `skipLibCheck` | Do not type-check library declaration files — saves time |

Two TypeScript 7 details that catch people out:

- When you set `outDir`, you must now also set **`rootDir`**, or `tsc` stops with an error.
- If a `tsconfig.json` is present, **`tsc somefile.ts` refuses to run** (error TS5112) —
  naming files on the command line would ignore the config. Add `--ignoreConfig` if you
  really want to compile a single file on its own.

### Choosing a target

`target` decides which JavaScript syntax the output may use. Newer syntax that the target
does not support is rewritten in older syntax — **downlevelled**:

| Source | `target: "es2015"` produces | `target: "es2022"` keeps |
|---|---|---|
| `2 ** 10` | `Math.pow(2, 10)` | `2 ** 10` |
| `user?.name` | `user === null \|\| user === void 0 ? void 0 : user.name` | `user?.name` |
| `a ?? b` | `a !== null && a !== void 0 ? a : b` | `a ?? b` |
| `async` / `await` | a generator-based helper function | `async` / `await` |

Two things to know about targets today:

- **ES5 and ES3 are gone.** TypeScript 7 removed them; the oldest target is **ES2015**. Every
  browser in use supports ES2015, so the old advice to "compile to ES5 for compatibility" no
  longer applies.
- **The target also decides which built-in methods the compiler knows about.** With
  `target: "es2015"`, calling `[1, [2]].flat()` is an error — `flat` arrived in ES2019 — even
  though your browser has it. Either raise the target, or set `lib` separately.

A modern browser or Node supports everything up to ES2022 and beyond, so `es2022` is a safe
default. (There is one reason not to go all the way to `esnext` — see Class 08, section 6.)

### Watching for changes

```bash
npx tsc --watch
```

Recompiles every time you save a file.

### Running TypeScript directly in Node

Recent versions of Node (22.18 and later) can run a `.ts` file directly:

```bash
node greet.ts
```

Node does this by **stripping the types out** — it does no type checking at all. A file with
type errors runs anyway. And it only works for TypeScript that is *just* JavaScript plus type
annotations. Features that need the compiler to generate code — **enums**, **namespaces**
and **parameter properties** — fail:

```
SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode
```

The `erasableSyntaxOnly` compiler option makes `tsc` report those features as errors, so you
know your code will also run in Node directly. You will see this trade-off again with enums
in Class 08.

For checking types, you still need `tsc` — typically `npx tsc --noEmit`, which checks without
writing any files.

---

## 9. Benefits — and costs (slide 9)

The slide lists the benefits: improved code quality, better tooling, static checking, and more
maintainable code. All true, and covered above. The costs deserve a mention too.

**There is a build step.** The code you write is not the code that runs. Errors in the
browser point at compiled `.js` files unless you turn on **source maps** (`"sourceMap": true`),
which let the devtools map back to your `.ts` source.

**Types can lie.** TypeScript trusts its inputs. Anything arriving from outside your program
— user input, a server response, `localStorage`, `JSON.parse` — is not checked by anyone:

```ts
interface Settings { theme: "light" | "dark"; fontSize: number; }

const settings: Settings = JSON.parse(localStorage.getItem("settings") ?? "{}");
settings.fontSize.toFixed(1);
// compiles fine — and crashes at runtime if the stored data has no fontSize
```

`JSON.parse` returns `any`, so the compiler accepts it as `Settings` without question. This is
section 1's point again: types are erased, and nothing checks them at runtime. Data from the
outside world should be treated as `unknown` and checked with the narrowing from section 6
before you rely on it.

**It takes time to learn.** The advanced type features in Class 08 are powerful, but the
fundamentals in this class cover most day-to-day work.

On balance, for anything larger than a script, the trade is overwhelmingly worth it — which
is why most of the JavaScript ecosystem, including the frameworks you will meet later, is
now written in TypeScript.

---

## Further reading

- **The TypeScript Handbook** — <https://www.typescriptlang.org/docs/handbook/intro.html>
- **TypeScript Playground** — <https://www.typescriptlang.org/play> — try code in the browser,
  and see the compiled JavaScript side by side
- **tsconfig reference** — <https://www.typescriptlang.org/tsconfig>
- **Node.js: running TypeScript natively** —
  <https://nodejs.org/api/typescript.html>

---

*Internet Programming · UACS · Lecture 04*
