# Class 12 — Functional Programming in JavaScript

Companion notes for `Class12-FunctionalJavaScript.pptx`. The slides are the outline; this is
the content. Section numbers map to slide numbers, and sections 6 and 7 cover two agenda topics
from slide 2 — immutability and functional techniques — that have no slides of their own.

**This class adds almost nothing new.** You have been writing functional JavaScript since
Lecture 02: every `addEventListener`, every `map` and `filter`, every `then`. This class
**names** those things and explains **why** they work. Each section starts from code you have
already written, gives it its proper name, and ends with a short pointer to the same idea in
Angular — which comes next, and uses this vocabulary constantly.

It is also the last class before the midterm. Section 9 shows the ideas working together on the
kind of page the midterm asks for: a table of data that can be filtered, sorted and summarised.

Every example was run with Node 24, and the output shown is the real output. Timings were
measured on a Windows laptop; yours will differ. Type errors were checked with the TypeScript 7
compiler (`tsc` 7.0) using the course's settings — `strict`, `noUncheckedIndexedAccess`,
`target: "es2022"`.

**Contents**

1. [What is functional programming?](#1-what-is-functional-programming-slide-3)
2. [Core principles](#2-core-principles-slide-4)
3. [Benefits](#3-benefits-slide-5)
4. [Higher-order functions](#4-higher-order-functions-slide-6)
5. [Pure functions](#5-pure-functions-slide-7)
6. [Immutability](#6-immutability-agenda)
7. [Functional techniques](#7-functional-techniques-agenda)
8. [Common issues](#8-common-issues-slide-8)
9. [Putting it together](#9-putting-it-together)
10. [Vocabulary](#10-vocabulary)

---

## 1. What is functional programming? (slide 3)

### Functions in the mathematical sense

In mathematics, a function maps inputs to an output: `f(x) = x²`. Calling it changes nothing,
and `f(3)` is `9` however many times you ask. A JavaScript `function` is a much looser thing: it
can change variables outside itself, modify the objects you pass it, write to the page, or
return a different answer every time. Strictly, most JavaScript functions are *procedures* —
lists of steps — that happen to be called functions.

**Functional programming** is the style of building as much of a program as possible from
functions of the mathematical kind. That is the slide's **computation as the evaluation of
mathematical functions**, and **changes to state and side effects are avoided** follows from it.

A **side effect** is anything a function does other than returning a value: changing an outside
variable or an object it was passed, writing to the DOM or the console, sending a request,
starting a timer. A program with no side effects could not show you anything, so "avoided" means
*kept to a few known places*, not *banned*. Section 5 makes that precise.

### A style, not a language

Functional programming is a **paradigm**: a way of organising code. JavaScript is
**multi-paradigm** — it supports the functional style, the object-oriented style of
[Class 11](Class11-ObjectOrientedJavaScript.md), and plain step-by-step code, and real programs
mix all three. It leans further towards the functional side than its syntax suggests: it is
"Java's syntax wrapped around Scheme's semantics"
([Lecture 01, Class 02, section 1](../../Lecture01/Materials/Class02-GettingStartedJS.md)), and
Scheme is a Lisp. The Scheme half is why functions are values in JavaScript.

### History, slightly corrected

The slide says **invented in the 1950s (LISP)**. The *ideas* are older: Alonzo Church's
**lambda calculus** (1930s) — a model of computation built only from functions, before computers
existed — is the slide's **strong mathematical background**. John McCarthy's **Lisp** (1958) was
the first *language* built on it. **Very popular after the 2010s** is right: Java 8 lambdas
(2014), JavaScript arrow functions (2015), and React and Redux took the style mainstream.

The slide's quote is xkcd #1270, "Functional", and the joke is the repetition: the power of
abstract mathematics combined with "the intuitive clarity of abstract mathematics" — that is,
none. It is a fair dig at how the subject is often taught. You need no Greek letters here;
everything below is ordinary JavaScript you have already written.

---

## 2. Core principles (slide 4)

Each of the four principles has a section below, and each is something you already do:

| Principle | What it means | Where you have done it |
|---|---|---|
| **Higher-order functions** | Functions that take or return functions | `map`, `filter`, `addEventListener`, `then` |
| **Purity of functions** | Same input, same output, no side effects | `fizzBuzz(n)`, `isPrime(n)`, `convert(...)` |
| **Immutability of state** | Make new values instead of changing old ones | `toSorted`, `{ ...person, age: 22 }` |
| **Declarative style** | Say *what* you want, not *how* | `filter(...).map(...).reduce(...)` chains |

### "Higher-order functions (i.e. first-class functions)"

The slide treats these as one thing. They are related, but different:

- **First-class functions** is a property of a *language*: functions are values, like numbers.
  You can store them, pass them, return them, put them in arrays.
  [Lecture 01, Class 02, section 4](../../Lecture01/Materials/Class02-GettingStartedJS.md) called
  them "first-class citizens".
- A **higher-order function** is a particular *function* that takes a function, returns one, or
  both. `map` is one; `Math.max` is not.

First-class functions are what make higher-order functions *possible*.

### Declarative style

[Lecture 03, Class 06, section 3](../../Lecture03/Materials/Class06-DataStructures.md)
("Chaining") showed the difference, and Exercises 4 and 6 of
[Exercises 03](../../Lecture03/Exercises/Group1/Exercises03-Tasks.md) had you write it both ways:

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Imperative: how to do it, step by step
let total = 0;
for (const n of numbers) {
  if (n % 2 === 0) {
    total += n;
  }
}
console.log(total);

// Declarative: what you want
const total2 = numbers
  .filter((n) => n % 2 === 0)
  .reduce((sum, n) => sum + n, 0);
console.log(total2);
```

```
30
30
```

The loop says *how*: a variable, a walk, a check, an update. The chain says *what*: the even
numbers, added up. Both are correct, but the chain has no variable that changes over time — no
moment when `total` holds a half-finished value. HTML and CSS are declarative too: you describe
the page, and the browser works out how to draw it.

> **In Angular:** templates are declarative. `@for (book of books(); track book.title)`
> describes the list; Angular works out which DOM elements to add, move or remove.

---

## 3. Benefits (slide 5)

All four benefits come from the principles in section 2:

- **Predictability.** A pure function (section 5) depends only on its arguments, so you can
  understand it alone. `fizzBuzz(15)` is `"FizzBuzz"`, whatever else your program did.
- **Conciseness.** Higher-order functions remove the bookkeeping — indices, temporary
  variables, `push` — and leave the part specific to your problem.
- **Maintainability.** Small functions with no hidden connections can be changed and reused
  independently. Exercise 2.3 of Exercises 03 — FizzBuzz rules as data instead of `if`s, so a new
  rule is one new line — is this in miniature.
- **Testability** (slide 7). The exercise solutions in Lectures 04 and 05 all use a small
  `check(label, actual, expected)` helper. For a pure function, a test is just that: one call,
  one comparison. For an impure one, the test first has to fake the outside world — which is why
  the checks for Exercise 5 of
  [Exercises 05](../../Lecture05/Exercises/Group1/Exercises05-Tasks.md) need a `fakeFetch`
  helper, and the checks for `convert` do not.

### Parallelism — true in general, not for your JavaScript

Slides 5 and 7 list **parallelism**. The argument is sound — functions that never change shared
data can run at the same instant on different cores without interfering — and in languages with
threads (Java, C#, Rust) it matters a lot. But your JavaScript runs on **one thread**
([Lecture 05, Class 09, section 2](../../Lecture05/Materials/Class09-AsynchronousJavaScript.md),
"Concurrent, not parallel"): a `map` over a million items does not spread over your cores,
however pure the callback. Only workers run in parallel, and they cannot share ordinary objects
at all — they send each other copies.

Where the benefit *does* show up in JavaScript is **concurrency**. Between an `await` and the
next line, other code can run and change any shared variable it can reach
([Lecture 05, Class 09, section 7](../../Lecture05/Materials/Class09-AsynchronousJavaScript.md)).
Code that shares no mutable state cannot be surprised that way.

> **In Angular:** the framework re-renders when data changes, and decides *whether* it changed as
> cheaply as it can. Pure functions and immutable data are what let it skip work safely.

---

## 4. Higher-order functions (slide 6)

### Functions that take functions

**Functions are values**
([Lecture 03, Class 05, section 6](../../Lecture03/Materials/Class05-FunctionsStructures.md)),
so they **can be passed into a function**. The function passed in is the **callback**; the one
receiving it is the **higher-order function** (HOF). You have used dozens:

| Higher-order function | Callback | Since |
|---|---|---|
| `addEventListener("click", handler)` | the handler | Lecture 02, Class 04 |
| `setTimeout(callback, ms)` | the callback | Lecture 05, Class 09, section 4 |
| `map`, `filter`, `reduce`, `find`, `some`, `sort` | the per-element function | Lecture 03, Class 06, section 3 |
| `promise.then(onFulfilled)` | the reaction | Lecture 05, Class 09, section 6 |
| `retry(operation, attempts, waitMs)` | `operation` | Exercise 3.7 of Exercises 05 |

Callbacks have names by **role**, and they are worth learning — the midterm is mostly made of
them:

| Role | Shape | Used by |
|---|---|---|
| **Predicate** | `(item) => boolean` — "does this one match?" | `filter`, `find`, `findIndex`, `some`, `every` |
| **Mapper** | `(item) => newValue` | `map` |
| **Comparator** | `(a, b) => number` — negative, zero or positive | `sort`, `toSorted` |
| **Reducer** | `(accumulator, item) => newAccumulator` | `reduce` |
| **Handler** | `(event) => void` | `addEventListener` |

The comparator's contract is in
[Lecture 03, Class 06, section 3](../../Lecture03/Materials/Class06-DataStructures.md);
[Lecture 04, Class 08, section 1](../../Lecture04/Materials/Class08-AdvancedTypeScript.md) gave
it a type.

### Why `retry` takes a function — and `withTimeout` does not

From [Exercises 05](../../Lecture05/Exercises/Group1/Exercises05-Tasks.md):
`retry(operation, attempts, waitMs)` ([exercise.03.ts](../../Lecture05/Exercises/Group1/exercise.03.ts))
is a HOF; `withTimeout(promise, ms)` ([exercise.02.ts](../../Lecture05/Exercises/Group1/exercise.02.ts))
is not — it takes a promise. That is not a matter of taste. A promise is work that has
**already started** (Class 09, section 6): you can wait for it, but not run it again. A function
is a **recipe**: `retry` can call it a second and a third time. Whenever code must decide
*when*, *whether* or *how often* something runs, it needs a function.

### Functions that return functions

The slide's second case. Every one you have met relies on a **closure**
([Lecture 03, Class 05, section 7](../../Lecture03/Materials/Class05-FunctionsStructures.md)) —
the returned function remembers the variables of the call that created it:

```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
console.log(counter(), counter(), counter());
```

```
1 2 3
```

The others you have written:

- **`adder = (a) => (b) => a + b`** in
  [Lecture 01, Class 02, section 4](../../Lecture01/Materials/Class02-GettingStartedJS.md).
  Section 7 gives it a name.
- **`flaky(failures)`** in [exercise.03.ts](../../Lecture05/Exercises/Group1/exercise.03.ts) —
  a **function factory**: configure once, get back a function to use later.
- **`once(fn)`** in [exercise.01.ts](../../Lecture05/Exercises/Group1/exercise.01.ts) both
  *takes* a function and *returns* a guarded version of it — a **wrapper**.
- **Decorators** ([Lecture 04, Class 08, section 6](../../Lecture04/Materials/Class08-AdvancedTypeScript.md),
  and `@Duration` in Exercise 7 of
  [Exercises 04](../../Lecture04/Exercises/Group1/Exercises04-Tasks.md)). A method decorator
  receives the original method and returns a replacement: a higher-order function with `@`
  syntax on top. `@SlowerThan(20)` is a factory that returns a decorator.

### Typing them

A function type reads the way it looks: `(item: Book) => boolean` is "a function from `Book` to
`boolean`" ([Lecture 04, Class 07, section 5](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md)).
**Generics** ([Lecture 04, Class 08, section 4](../../Lecture04/Materials/Class08-AdvancedTypeScript.md))
connect the callback to the data: in `firstWhere(items, predicate)` from Exercise 5.3 of
Exercises 04, whatever `T` the array holds, the predicate must accept a `T`. Exercise 3 of
Exercises 06 — your own `map` and `filter` — needs exactly this: a loop, a callback call, a new
array, and type parameters that flow from the array through the callback to the result.

> **In Angular:** RxJS, used for HTTP and events, is built on HOFs:
> `source$.pipe(filter((b) => b.year > 1950), map((b) => b.title))`. Its `filter` and `map`
> *return* functions, which `pipe` runs in order. `computed(() => ...)` takes a function that
> Angular calls whenever it needs a fresh value.

---

## 5. Pure functions (slide 7)

### The two rules

A function is **pure** if:

1. **It uses nothing except its parameters** — no outside variables that can change, no
   `Date.now()`, no `Math.random()`, no reading the page.
2. **It does nothing except return a value** — no changing outside variables or the objects it
   was given, no DOM, no `console.log`, no `fetch`.

Rule 1 makes it **entirely deterministic**: the same arguments, the same result. Rule 2 means
calling it has no consequences you could observe, apart from the result.

### Breaking rule 1 — and the fix

```js
let taxRate = 0.18;
const withTax = (price) => price * (1 + taxRate);

console.log(withTax(100));
taxRate = 0.05;
console.log(withTax(100));   // same input, different answer

const withTaxPure = (price, rate) => price * (1 + rate);
console.log(withTaxPure(100, 0.18), withTaxPure(100, 0.18));
```

```
118
105
118 118
```

The fix is to make the hidden input a parameter, and you have done it:
`getRates(base, now = Date.now())` in
[rates.ts](../../Lecture05/Exercises/Group1/exercise.05/rates.ts) takes the current time as a
parameter instead of reading the clock inside. Normal callers do not notice; a test can pass
"a day later" without waiting a day.

### Breaking rule 2

`addItem(list)` in
[Lecture 03, Class 05, section 6](../../Lecture03/Materials/Class05-FunctionsStructures.md)
("Calling functions") pushes into the caller's array. `birthday(person)` from Exercise 5.4 of
Exercises 03, which returns a *new* person, is the pure way to write that kind of function.
Section 6 is about how.

### What is pure, and what is not

| Function | Pure? | Why |
|---|---|---|
| `fizzBuzz(n)`, `isPrime(n)`, `toWords(n)` (Exercises 03) | Yes | Depend only on `n`, return a value |
| `factorialLoop(n)` (Exercises 03) | Yes | It changes `result` and `i`, but they are its own locals — invisible from outside |
| `parseRates(data)`, `convert(...)` ([rates.ts](../../Lecture05/Exercises/Group1/exercise.05/rates.ts)) | Yes | Everything comes in as parameters. Throwing for an unknown currency is still predictable. |
| `shuffle(array)` ([quiz](../../Lecture03/Exercises/Group1/exercise.10.js)) | **No** | It copies instead of changing its input — but `Math.random()` makes every result different |
| `counter()` from `makeCounter` | No | Each call changes the remembered `count` |
| `getRates(base)` | No | Network, and a cache that changes |
| `render()` (quiz, calculator) | No — on purpose | Writing to the page *is* its job |

Two lessons hide in that table. **Pure is about what can be seen from outside**: a local `let`
in a loop is fine; *shared* changeable state is not. And **non-mutating is not the same as
pure**: `shuffle` leaves its argument alone, but it is not deterministic.

### Functional core, imperative shell

A program must fetch data and draw the page, so it cannot be pure all the way through. Keep the
impure parts **thin and at the edges**, and the logic **in the middle**, pure. Exercise 5 of
Exercises 05 is built that way: `main.ts` reads the form, calls `getRates` and writes to the
page; `rates.ts` holds the pure `parseRates` and `convert`. The quiz in
[exercise.10.js](../../Lecture03/Exercises/Group1/exercise.10.js) does all its drawing in one
`render()`. The name for this shape is **functional core, imperative shell**; section 9 uses it.

### The rest of the slide

- **Comprehensive testability** and **parallelism by design** — section 3.
- **Memoization** — if `f(5)` is always the same, compute it once and remember it. Section 7
  shows you already have.

"Same input, same output, nothing else happens" has a name: **referential transparency**. You
could replace any call to a pure function with its result — `isPrime(97)` with `true` — and the
program would behave the same. Memoization does exactly that.

TypeScript cannot check purity; there is no `pure` keyword. A `readonly` parameter (section 6)
at least promises that the function will not change what it was given.

> **In Angular:** the function given to `computed()` should be pure — derive a value, change
> nothing; side effects belong in `effect()` or event handlers. Angular's **pipes** are pure by
> default, which lets Angular skip calling them when their input has not changed.

---

## 6. Immutability (agenda)

No slide covers it, but it is the principle you will feel most in Angular. **Immutable** data is
never changed after it is created. To "change" it, you make a new value with the change applied.

You know two immutable things already. Primitives
([Lecture 01, Class 02, section 4](../../Lecture01/Materials/Class02-GettingStartedJS.md)):
`"hello".toUpperCase()` returns a new string. And the non-mutating array methods
([Lecture 03, Class 06, sections 2 and 3](../../Lecture03/Materials/Class06-DataStructures.md)):
`slice`, `map`, `filter`, `toSorted`. The question that section asked of every method — *does it
change the original, or return a new one?* — is the immutability question.

### `const` is not immutability

[Lecture 01, Class 02, section 3](../../Lecture01/Materials/Class02-GettingStartedJS.md) made the
point: `const` fixes the **binding** — which value the name refers to — not the **value**.

```js
const book = { title: "Dune", year: 1965 };
book.year = 2000;          // allowed: the object is not protected
book = {};                 // TypeError: Assignment to constant variable.
```

The tools that do protect values all differ:

| Tool | Protects | Checked | How deep |
|---|---|---|---|
| `const` | the variable: always the same value | at runtime (and by `tsc`) | — the value is not protected |
| `Object.freeze(obj)` | the object's properties | at runtime | **shallow**: one level |
| `readonly`, `Readonly<T>`, `readonly T[]` | properties and arrays | at compile time only | **shallow** |
| `as const` | a literal | at compile time only | the whole literal |

### `Object.freeze` — shallow

```js
const book = Object.freeze({ title: "Dune", author: { name: "Frank Herbert" } });
book.title = "Dune II";
// TypeError: Cannot assign to read only property 'title' of object '#<Object>'
book.author.name = "Somebody";    // allowed: the nested object is not frozen
```

The `TypeError` is what a module — always in strict mode — gets. In an old-style non-module
script, the write **fails silently**: no error, and no change. Either way, only the top level is
frozen: the same shallowness as spread
([Lecture 03, Class 06, section 7](../../Lecture03/Materials/Class06-DataStructures.md)).

### `readonly` — compile time, also shallow

You met `readonly` properties in
[Lecture 04, Class 07, section 7](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md),
`readonly` arrays in section 3 of the same notes, and `Readonly<T>` and `as const` in
[Lecture 04, Class 08](../../Lecture04/Materials/Class08-AdvancedTypeScript.md) (sections 7 and 3):

```ts
interface Book {
  readonly title: string;
  readonly year: number;
  readonly author: { name: string };
}

const dune: Book = { title: "Dune", year: 1965, author: { name: "Frank Herbert" } };
dune.year = 2000;
// Error: Cannot assign to 'year' because it is a read-only property.
dune.author.name = "Somebody Else";        // no error: author's own properties are not readonly

const sortYears = (years: readonly number[]) => years.sort();
// Error: Property 'sort' does not exist on type 'readonly number[]'.

const forms = ["Novel", "Novella"] as const;
forms.push("Poem");
// Error: Property 'push' does not exist on type 'readonly ["Novel", "Novella"]'.
```

A `readonly` array simply has no mutating methods. And, like all types
([Lecture 04, Class 07, section 1](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md)),
none of it exists at runtime.

### Immutable updates: the patterns

Mostly you do not freeze anything. You just **never change** data that other code can see, and
make updated copies instead:

| Instead of (mutating) | Write (non-mutating) |
|---|---|
| `list.push(item)` | `[...list, item]` |
| `list.splice(i, 1)` | `list.filter((x) => x.id !== id)` |
| `list[i].done = true` | `list.map((x) => (x.id === id ? { ...x, done: true } : x))` |
| `list.sort(compare)` | `list.toSorted(compare)`, or `[...list].sort(compare)` |
| `list[i] = value` | `list.with(i, value)` |
| `obj.age = 22` | `{ ...obj, age: 22 }` |
| `delete obj.password` | `const { password, ...rest } = obj` (rest, Class 06, section 7) |

`toSorted`, `toReversed`, `toSpliced` and `with` (2023) run in Node 24 and every current browser,
but `tsc` knows them only with `target` or `lib` at `es2023` or later. With the course's `es2022`
it reports *Property 'toSorted' does not exist on type 'readonly number[]'* — use
`[...list].sort(...)`, or raise the target.

```js
const todos = [
  { id: 1, text: "Read the notes", done: true },
  { id: 2, text: "Do exercise 3", done: false },
];

const added = [...todos, { id: 3, text: "Study for the midterm", done: false }];
const removed = todos.filter((t) => t.id !== 1);
const toggled = todos.map((t) => (t.id === 2 ? { ...t, done: !t.done } : t));

console.log(todos.length, added.length, removed.length);
console.log(toggled[1]);
console.log(todos[1].done);                 // the original is untouched
console.log(toggled[0] === todos[0]);       // unchanged items are shared, not copied
console.log(toggled[1] === todos[1]);       // the changed one is new
```

```
2 3 1
{ id: 2, text: 'Do exercise 3', done: true }
false
true
false
```

The new array holds the **same** object for the unchanged item and a **new** one only for the
changed item. This is **structural sharing**, and it is why immutable updates are cheaper than
they sound: you copy the path to the change, not everything.

### Nested updates: copy every level you change

Exercise 5.4 of Exercises 03 again — `moveHouse`, where a plain spread changed the original
person's street. The rule: **spread every object on the path to the change**.

```js
const person = { name: "Ana", age: 21, address: { city: "Skopje", street: "Partizanska" } };

const older = { ...person, age: person.age + 1 };
console.log(older.address === person.address);    // true: shared, and fine — nobody changes it

const moved = { ...person, address: { ...person.address, street: "Ilindenska" } };
console.log(person.address.street, moved.address.street, moved.address === person.address);
```

```
true
Partizanska Ilindenska false
```

Sharing `address` is safe only because nobody mutates it. **Structural sharing and mutation do
not mix**: change a shared object in place, and every copy that shares it changes too — the bug
from Exercise 5.4.

### Why bother: "did anything change?"

Objects are compared by reference
([Lecture 03, Class 06, section 4](../../Lecture03/Materials/Class06-DataStructures.md)):

```js
const list = [1, 2, 3];
const before = list;
list.push(4);                                // mutate
const after = [...list, 5];                  // immutable update
console.log(before === list, after === list);
```

```
true false
```

After a mutation, old and new are the same object, so finding out whether anything changed
means comparing every element against a copy you had to keep. After an immutable update, one
`===` answers it. Frameworks that redraw the page when data changes rely on exactly that.

**Is mutation wrong?** No. The quiz in
[exercise.10.js](../../Lecture03/Exercises/Group1/exercise.10.js) does `state.score++` and then
`render()`, which is fine for a page that redraws everything every time. Mutation hurts when an
object is **shared** with code that does not expect it to change, and when something needs to
**detect** changes cheaply. [Class 11](Class11-ObjectOrientedJavaScript.md) shows the other
answer to "who may change this data?": objects that keep their state private and change it only
through their own methods.

> **In Angular:** signals and `OnPush` components detect change with a reference comparison.
> `items.update((list) => [...list, item])` makes a new array, and everything that depends on
> `items` hears about it. `items().push(item)` keeps the same reference, so the signal tells
> nobody — a `computed` built on it, or an `OnPush` component showing it, does not update.

---

## 7. Functional techniques (agenda)

Four techniques with names that sound advanced. Each is a name for something you have done.

### Composition — chains are composition

**Composing** functions means feeding one's output into the next: `f(g(x))`. Written as nested
calls, `dashed(words(lower(trim(text))))` reads backwards — the first step is innermost. Written
as a chain, `text.trim().toLowerCase().split(" ").join("-")`, the same composition reads left to
right, which is why chains are popular. Every chain you have written is composition: **array method chains**
([Lecture 03, Class 06, section 3](../../Lecture03/Materials/Class06-DataStructures.md);
`toPigLatin` in Exercise 9 of Exercises 03 is `split`, `map(pigWord)`, `join`), and **promise
chains**, where each `then` receives what the previous one returned
([Lecture 05, Class 09, section 6](../../Lecture05/Materials/Class09-AsynchronousJavaScript.md)).

A method chain only works when each step is a method of the previous result. Composition in
general works for *any* functions whose outputs and inputs fit. Exercise 4 of Exercises 06 asks
for a function that takes two functions and returns their combination — a HOF that takes *and*
returns functions. Running the steps left to right, like a chain, is usually called **pipe**;
right to left, as in `f(g(x))`, **compose**.

### Currying and partial application — function factories

You met `adder` in
[Lecture 01, Class 02, section 4](../../Lecture01/Materials/Class02-GettingStartedJS.md):

```js
const add = (a, b) => a + b;          // takes both at once
const adder = (a) => (b) => a + b;    // takes one, returns a function for the other

console.log(add(2, 3));
console.log(adder(2)(3));

const addTen = adder(10);             // a = 10 is fixed, remembered by the closure
console.log([1, 2, 3].map(addTen));
```

```
5
5
[ 11, 12, 13 ]
```

- **Currying** is writing a function of several arguments as a chain of one-argument functions:
  `add(a, b)` becomes `adder(a)(b)`. Named after the logician Haskell Curry.
- **Partial application** is fixing *some* arguments now and getting back a function for the
  rest. `adder(10)` is partial application of a curried function.

You have done partial application by hand every time you wrapped a call so it fit a callback
slot:

```js
const rates = { EUR: 1, MKD: 61.5, USD: 1.08 };    // made-up numbers

const convert = (amount, from, to, table) => (amount / table[from]) * table[to];

const eurToMkd = (amount) => convert(amount, "EUR", "MKD", rates);   // three arguments fixed
console.log([10, 20, 50].map(eurToMkd));
```

```
[ 615, 1230, 3075 ]
```

`ids.map((id) => loadUser(id))` in
[exercise.03.ts](../../Lecture05/Exercises/Group1/exercise.03.ts) and the
`[1, 2, 3].map((id) => getJson(...))` in
[Lecture 05, Class 10, section 10](../../Lecture05/Materials/Class10-WebapiFetch.md) are the same
move. That is why these techniques matter: **higher-order functions want callbacks of a
particular shape, and factories produce them.** `flaky(failures)` is a factory, and so is the
`by(key, direction)` comparator in section 9. Exercises 6 and 7 of Exercises 06 — a factory that
makes a power function for a given exponent, and a function that fixes the first parameter of
another — are this subsection turned into code.

In TypeScript, a curried function's type reads the way it is called:
`(a: number) => (b: number) => number`.

### Memoization — you wrote a cache

**Memoization** means remembering a function's results by input: compute once, store, and
return the stored result for the same input next time. That is `cachedGetJson` in
[Lecture 05, Class 10, section 10](../../Lecture05/Materials/Class10-WebapiFetch.md), and
`getRates` in Exercise 5.4 of Exercises 05
([rates.ts](../../Lecture05/Exercises/Group1/exercise.05/rates.ts)): look the input up in a
`Map`; if it is there, return it; otherwise compute, store, return.

Notice what those caches had to add: an **expiry time**, because rates change daily, and **no
caching of failures**, because a request can fail. Both exist because fetching is **not pure** —
the same URL can give a different answer tomorrow. For a pure function the answer for a given
input is right forever, so neither is needed. That is why slide 7 lists memoization under pure
functions: always safe for them, careful work for anything else. Two more cautions: a `Map`
compares object keys **by reference**, so two equal-looking objects are two different keys; and
the cache grows with every new input.

Exercise 5 of Exercises 06 — recursive Fibonacci — is the classic case. The straightforward
version:

```js
let calls = 0;
function fib(n) {
  calls++;
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
```

Timed with `performance.now()`:

```
fib(10) = 55: 177 calls, 0.1 ms
fib(20) = 6765: 21,891 calls, 0.6 ms
fib(30) = 832040: 2,692,537 calls, 26.3 ms
fib(35) = 9227465: 29,860,703 calls, 229.9 ms
fib(40) = 102334155: 331,160,281 calls, 2382.7 ms
```

Each step up by 5 multiplies the calls by about 11. `fib(40)` calls `fib(39)` and `fib(38)`, but
`fib(39)` calls `fib(38)` again, and so on down: only 41 distinct questions (`fib(0)` to
`fib(40)`), asked 331 million times. `fib` is pure, so remembering the answers is safe. Memoized,
on the same machine, `fib(40)` takes fewer than a hundred calls and well under a millisecond.
Making that happen is the exercise — think about which function the recursive calls go through.

### Recursion — the functional loop

Recursion was [Lecture 03, Class 05, section 8](../../Lecture03/Materials/Class05-FunctionsStructures.md),
and Exercise 1 of Exercises 03 had you write factorial both ways. It belongs here because a loop
needs a counter that changes, and purely functional languages have no changing variables;
recursion repeats without one, since each call gets its own `n`.

In JavaScript you have both, and Class 05's advice stands: **loops or array methods for flat
data, recursion for recursive data** — the DOM, folders, nested comments. One limit: a simple
recursive function in Node 24 overflowed after about 9,600 nested calls on this machine
(`RangeError: Maximum call stack size exceeded`). Functional languages avoid that with
*tail-call optimisation*; the JavaScript specification includes it, but only Safari implements
it, so do not rely on it.

> **In Angular:** composition is RxJS's `pipe()`. Memoization is built into `computed()`, which
> keeps its value until a signal it reads changes, and into pure pipes. Partial application is
> all over the forms API: `Validators.minLength(3)` fixes the length and returns a validator
> function.

---

## 8. Common issues (slide 8)

**Steep learning curve.** The *ideas* are not hard — you have used all of them. The steep part
is vocabulary, and code by people who enjoy it a little too much: one-letter names, functions
returning functions returning functions, no intermediate variables. Write for the reader; a named
intermediate constant is not a failure of style.

**Complexity.** A chain that does one thing per step is readable; a `reduce` that does five
things at once is not. Exercise 6.3 of Exercises 03 merged `filter` + `reduce` into one `reduce`
and asked which was easier to read — usually the two-step one. Use `filter` to keep some, `map`
to change each, and `reduce` to combine many into one.

### Performance

Immutable updates copy. One copy is cheap; a copy **inside a loop** is not. The classic mistake
is spreading the accumulator in `reduce`:

```js
const copied = items.reduce((acc, x) => [...acc, x * 2], []);              // copies every time
const pushed = items.reduce((acc, x) => { acc.push(x * 2); return acc; }, []);
const mapped = items.map((x) => x * 2);
```

Timed for arrays of 1,000, 10,000 and 20,000 numbers:

```
n = 1000: spread 10.4 ms, push 0.25 ms, map 0.09 ms
n = 10000: spread 143.5 ms, push 0.52 ms, map 0.42 ms
n = 20000: spread 2883.8 ms, push 2.50 ms, map 1.29 ms
```

The spread version copies the whole array at every step, so doubling the input at least
quadruples the work. The `push` version is still **pure from the outside**: the accumulator is a
fresh array that no other code can see until it is finished — section 5's rule that local,
unshared mutation is fine. (And `map` is the right tool for this job anyway.) The other common
worry — a `filter`, `map`, `reduce` chain walks the array several times — almost never matters
for the hundreds or thousands of rows a web page shows.

### Debugging

A chain is one long expression, awkward to step through, and inline arrows have no names in
stack traces. When `[{ price: 1 }, {}].map(toPrice)` fails, with
`const toPrice = (item) => item.price.toFixed(2)`, Node's trace says `at toPrice (…:1:38)`; the
same callback written inline says only `at …:3:51` — a line and column, no name. Two habits help:
name non-trivial callbacks, and when a chain misbehaves, split it into named constants and inspect
each one in the debugger
([Lecture 01, Class 02, section 7](../../Lecture01/Materials/Class02-GettingStartedJS.md)).

> **In Angular:** RxJS has an operator for exactly this: `tap((x) => console.log(x))` inside a
> `pipe` shows the values going past without changing them.

---

## 9. Putting it together

The midterm page is a classic shape: fetch a JSON array, show it as a table, sort by clicking
column headers, combine several filters, and show derived values. Everything except the fetch
and the drawing can be **pure functions** — comparators, predicates and reductions — composed
together. Here is the toolkit on a small, invented data set. It is not an exam solution.

### The data

```ts
type Form = "Novel" | "Novella" | "Collection";

interface Book {
  readonly title: string;
  readonly author: string;
  readonly year: number;
  readonly form: Form;
}

const books: readonly Book[] = [
  { title: "Dune", author: "Frank Herbert", year: 1965, form: "Novel" },
  { title: "Dune Messiah", author: "Frank Herbert", year: 1969, form: "Novel" },
  { title: "The Sun Also Rises", author: "Ernest Hemingway", year: 1926, form: "Novel" },
  { title: "Men Without Women", author: "Ernest Hemingway", year: 1927, form: "Collection" },
  { title: "A Farewell to Arms", author: "Ernest Hemingway", year: 1929, form: "Novel" },
  { title: "The Old Man and the Sea", author: "Ernest Hemingway", year: 1952, form: "Novella" },
  { title: "Animal Farm", author: "George Orwell", year: 1945, form: "Novella" },
  { title: "Nineteen Eighty-Four", author: "George Orwell", year: 1949, form: "Novel" },
  { title: "Of Mice and Men", author: "John Steinbeck", year: 1937, form: "Novella" },
  { title: "The Long Valley", author: "John Steinbeck", year: 1938, form: "Collection" },
  { title: "The Grapes of Wrath", author: "John Steinbeck", year: 1939, form: "Novel" },
];
```

Everything is `readonly`: nothing below changes the data, and the compiler would say so if it
tried.

### Sorting: a comparator factory

```ts
type Direction = "asc" | "desc";
type Comparator<T> = (a: T, b: T) => number;

function by<T, K extends keyof T>(key: K, direction: Direction = "asc"): Comparator<T> {
  const sign = direction === "asc" ? 1 : -1;
  return (a, b) => {
    const x = a[key];
    const y = b[key];
    if (typeof x === "string" && typeof y === "string") {
      return sign * x.localeCompare(y);
    }
    return sign * (Number(x) - Number(y));
  };
}
```

`by` returns a comparator that closes over `key` and `sign`. Strings use `localeCompare`,
numbers subtraction ([Lecture 03, Class 06, section 3](../../Lecture03/Materials/Class06-DataStructures.md)),
and the direction is just a sign. `K extends keyof T` is the `getProperty` constraint from
[Lecture 04, Class 08, section 4](../../Lecture04/Materials/Class08-AdvancedTypeScript.md):
`[...books].sort(by("pages"))` does not compile — *Argument of type '"pages"' is not assignable
to parameter of type 'keyof Book'*. TypeScript infers `T` from where the comparator is used, so
you never write `by<Book>`.

### Filtering: predicates, combined

```ts
type Predicate<T> = (item: T) => boolean;

const ofForm = (form: Form | ""): Predicate<Book> =>
  form === "" ? () => true : (book) => book.form === form;

const publishedBetween = (from: number, to: number): Predicate<Book> =>
  (book) => book.year >= from && book.year <= to;

const titleContains = (text: string): Predicate<Book> => {
  const needle = text.trim().toLowerCase();
  return (book) => book.title.toLowerCase().includes(needle);
};

function allOf<T>(...predicates: Predicate<T>[]): Predicate<T> {
  return (item) => predicates.every((matches) => matches(item));
}

books.filter(allOf(ofForm("Novella"), publishedBetween(1940, 1960))).map((b) => b.title);
// [ 'The Old Man and the Sea', 'Animal Farm' ]
```

Each filter control becomes one predicate factory. "No filter selected" is not a special case:
`ofForm("")` returns a predicate that accepts everything, and so does `titleContains("")`,
because every string includes `""`. `allOf` composes any number of predicates into one, so a
fourth filter is one more argument.

### Aggregating: `reduce`

```ts
function countBy<T>(items: readonly T[], keyOf: (item: T) => string): Record<string, number> {
  return items.reduce<Record<string, number>>((counts, item) => {
    const key = keyOf(item);
    counts[key] = (counts[key] ?? 0) + 1;     // a fresh object that only this call can see
    return counts;
  }, {});
}

const plural = (count: number, word: string): string =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

const describeCounts = (counts: Record<string, number>): string =>
  Object.entries(counts)
    .map(([word, count]) => plural(count, word))
    .join(", ");

function summarize(name: string, all: readonly Book[], currentYear: number) {
  const own = all.filter((book) => book.author === name);
  const years = own.map((book) => book.year);
  const first = Math.min(...years);
  const last = Math.max(...years);
  return {
    name,
    works: describeCounts(countBy(own, (book) => book.form)),
    active: first === last ? `${first}` : `${first}–${last}`,
    yearsSinceLast: currentYear - last,
  };
}

const authors = [...new Set(books.map((book) => book.author))];
console.table(authors.map((name) => summarize(name, books, 2026)));
```

```
┌─────────┬────────────────────┬─────────────────────────────────────┬─────────────┬────────────────┐
│ (index) │ name               │ works                               │ active      │ yearsSinceLast │
├─────────┼────────────────────┼─────────────────────────────────────┼─────────────┼────────────────┤
│ 0       │ 'Frank Herbert'    │ '2 Novels'                          │ '1965–1969' │ 57             │
│ 1       │ 'Ernest Hemingway' │ '2 Novels, 1 Collection, 1 Novella' │ '1926–1952' │ 74             │
│ 2       │ 'George Orwell'    │ '1 Novella, 1 Novel'                │ '1945–1949' │ 77             │
│ 3       │ 'John Steinbeck'   │ '1 Novella, 1 Collection, 1 Novel'  │ '1937–1939' │ 87             │
└─────────┴────────────────────┴─────────────────────────────────────┴─────────────┴────────────────┘
```

- `countBy` is the grouping `reduce` from
  [Lecture 03, Class 06, section 3](../../Lecture03/Materials/Class06-DataStructures.md),
  counting instead of collecting. Mutating its own fresh accumulator is fine (section 8).
- The span is a minimum and a maximum — the "best so far" idea of `findOldest` in Exercise 7 of
  Exercises 03.
- `currentYear` is a **parameter**, not `new Date().getFullYear()` inside — the `now` trick from
  `getRates` (section 5). The output stays the same next year, and a test can pass any year.
- `new Set(...)` removes duplicate authors
  ([Lecture 03, Class 06, section 5](../../Lecture03/Materials/Class06-DataStructures.md)).

### The view: state in, rows out

The pieces compose into one pure function from the page's **state** to the rows to show, plus
one for what a header click does to the state:

```ts
interface TableState {
  readonly sortKey: keyof Book;
  readonly direction: Direction;
  readonly form: Form | "";
  readonly search: string;
}

function visibleBooks(state: TableState, all: readonly Book[]): Book[] {
  const matches = allOf(ofForm(state.form), titleContains(state.search));
  return all
    .filter(matches)                                // a new array...
    .sort(by(state.sortKey, state.direction));      // ...so sorting it in place is safe
}

// Clicking a column header: same column flips the direction, a new column starts ascending
function sortedBy(state: TableState, key: keyof Book): TableState {
  if (state.sortKey === key) {
    return { ...state, direction: state.direction === "asc" ? "desc" : "asc" };
  }
  return { ...state, sortKey: key, direction: "asc" };
}

let state: TableState = { sortKey: "title", direction: "asc", form: "", search: "" };
state = { ...state, form: "Novel", search: "the" };
state = sortedBy(state, "year");
console.log(state.direction, visibleBooks(state, books).map((b) => `${b.year} ${b.title}`));
state = sortedBy(state, "year");
console.log(state.direction, visibleBooks(state, books).map((b) => `${b.year} ${b.title}`));
```

```
asc [ '1926 The Sun Also Rises', '1939 The Grapes of Wrath' ]
desc [ '1939 The Grapes of Wrath', '1926 The Sun Also Rises' ]
```

`filter` already returned a new array, so sorting it in place changes nothing anyone else can
see; `books` keeps its order. All of this ran in Node with no page at all — every piece can be
checked with a line of test code before there is any HTML.

### The impure shell

What is left for the browser is thin:

```js
let state = { sortKey: "title", direction: "asc", form: "", search: "" };

function render() {
  const rows = visibleBooks(state, books);
  tbody.replaceChildren(...rows.map(toRow));     // toRow builds one <tr>
}

thead.addEventListener("click", (event) => {
  const th = event.target.closest("th[data-key]");
  if (th) {
    state = sortedBy(state, th.dataset.key);
    render();
  }
});
```

It is the structure of the quiz in
[exercise.10.js](../../Lecture03/Exercises/Group1/exercise.10.js) and of the calculator in
Exercise 5.3 of [Exercises 02](../../Lecture02/Exercises/Group1/Exercises02-Tasks.md): **all the
state in one place; every event changes the state, then one `render()` draws the page from it.**
The difference is that the state is replaced rather than changed in place, and every decision —
what matches, in which order, with which totals — lives in pure functions that `render` merely
calls. `render` has nothing left to decide, and so nowhere for a bug to hide.

That is **state → filter → sort → render**: a functional core with an imperative shell.

> **In Angular:** the state lives in signals, the view is
> `computed(() => visibleBooks(state(), books()))`, and a header click does
> `state.update((s) => sortedBy(s, key))`. The pure functions do not change at all.

---

## 10. Vocabulary

| Term | Meaning | Where you used it |
|---|---|---|
| **First-class functions** | A language feature: functions are values | Lecture 01, Class 02, section 4 |
| **Higher-order function** | Takes or returns a function | `map`, `addEventListener`, `then`, `retry`, `once` |
| **Callback** | A function passed to another function, to be called by it | Every event handler; Lecture 05, Class 09, section 5 |
| **Closure** | A function plus the variables it remembers from where it was created | `makeCounter`, `flaky`, every factory |
| **Predicate** | A callback that returns `true` or `false` | `filter`, `find`, `some`; `allOf` in section 9 |
| **Comparator** | `(a, b) => number`: negative, zero or positive | `sort((a, b) => a - b)`; `by` in section 9 |
| **Reducer** | `(accumulator, item) => accumulator` | `reduce`; Exercises 4 and 6 of Exercises 03 |
| **Side effect** | Anything a function does besides returning a value | `console.log`, DOM updates, `fetch`, `push` on an argument |
| **Pure function** | Uses only its parameters; only returns a value | `fizzBuzz`, `isPrime`, `convert` |
| **Referential transparency** | A call can be replaced by its result | Why memoization is safe |
| **Immutability** | Never changing data; making updated copies instead | `toSorted`, `{ ...person, age: 22 }` |
| **Shallow / deep** | Whether a copy, freeze or `readonly` reaches nested objects | Spread vs `structuredClone`; Exercise 5.4 of Exercises 03 |
| **Structural sharing** | An updated copy reuses the parts that did not change | `todos.map(...)` in section 6 |
| **Declarative** | Saying *what* you want, not *how* | Method chains; HTML; Angular templates |
| **Composition** | Feeding one function's output into another: `f(g(x))` | Array method chains, promise chains |
| **Currying** | One argument at a time: `f(a)(b)` instead of `f(a, b)` | `adder`, Lecture 01, Class 02, section 4 |
| **Partial application** | Fixing some arguments now, the rest later | `(id) => loadUser(id)`, `eurToMkd` |
| **Function factory** | A function that builds and returns a configured function | `flaky(failures)`, `by(key, direction)` |
| **Memoization** | Remembering results by input | The promise cache in Exercise 5.4 of Exercises 05; `cachedGetJson` |
| **Recursion** | A function calling itself on a smaller problem | Factorial, Exercise 1 of Exercises 03 |
| **Functional core, imperative shell** | Pure logic in the middle; I/O and DOM at the edges | `rates.ts` vs `main.ts`; the quiz's `render()` |

---

## Further reading

- **MDN: Functions** —
  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions>
- **MDN: First-class function** —
  <https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function>
- **MDN: `Object.freeze()`** —
  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze>
- **MDN: Array — copying methods and mutating methods** —
  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods>
- **xkcd #1270: Functional** — <https://xkcd.com/1270/>
- **Brian Lonsdorf: *Professor Frisby's Mostly Adequate Guide to Functional Programming*** — a
  free book, in JavaScript, for going further —
  <https://mostly-adequate.gitbook.io/mostly-adequate-guide/>
- **Angular: Signals** — <https://angular.dev/guide/signals>
- **RxJS: Operators** — <https://rxjs.dev/guide/operators>

---

*Internet Programming · UACS · Lecture 06*
