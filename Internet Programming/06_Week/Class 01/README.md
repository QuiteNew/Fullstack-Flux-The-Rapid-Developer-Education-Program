# Class 11 — Object-Oriented Programming with JavaScript

Companion notes for `Class11-ObjectOrientedJavaScript.pptx`. The slides are the outline; this
is the content. Section numbers map to slide numbers.

**This class adds almost nothing new.** You have been writing object-oriented code since
Lecture 02: every `addEventListener`, every `class` in the TypeScript exercises, every
`class ApiError extends Error` in Lecture 05. What this class does is **name** those things,
explain **why** they work the way they do, and give you the vocabulary you will need when the
course moves to Angular — which is built almost entirely out of classes, decorators and
the patterns in section 7. Every section starts from code you have already written or read, and
links back to where it was.

Every example was run with Node 24, and the output shown is the real output. Type errors were
checked with the TypeScript 7 compiler (`tsc` 7.0, `--strict --target es2022`); where a line
is marked as an error, `tsc` really does reject it.

**Contents**

1. [Principles of object-oriented programming](#1-principles-of-object-oriented-programming-slide-3)
2. [Benefits of OOP](#2-benefits-of-oop-slide-4)
3. [The prototypal inheritance model](#3-the-prototypal-inheritance-model-slide-5)
4. [Constructor functions](#4-constructor-functions-slide-6)
5. [`this`, formally](#5-this-formally-slide-6)
6. [OOP in TypeScript](#6-oop-in-typescript-slide-7)
7. [Design patterns](#7-design-patterns-slide-8)
8. [Criticisms of OOP](#8-criticisms-of-oop-slide-9)
9. [Common mistakes](#9-common-mistakes)
10. [Vocabulary](#10-vocabulary)

---

## 1. Principles of object-oriented programming (slide 3)

**Object-oriented programming** (OOP) is a way of organising a program around **objects**:
bundles of **state** (data) and **behaviour** (functions that work on that data). You have
done this many times already. The quiz engine in
[Lecture 03's Exercise 10](../../Lecture03/Exercises/Group1/Exercises03-Tasks.md) keeps all
its data in one `state` object, and a set of functions — `render`, `renderQuestion`,
`renderResult` — read and change it
([`exercise.10.js`](../../Lecture03/Exercises/Group1/exercise.10.js)). The `Library` class in
[Lecture 04's Exercise 3](../../Lecture04/Exercises/Group1/Exercises04-Tasks.md) does the same
thing with the state and the functions in one `class`.

The slide lists the four classic principles. Each one is something you have already used.

### Abstraction

**Abstraction** means using something through a simple description of *what* it does, without
knowing *how*. You call `fetch(url)` without knowing anything about TCP; you call
`array.sort()` without knowing which sorting algorithm runs.

In your own code, the tool for abstraction is the **interface**. In Lecture 04's Exercise 3.2,
the `Catalogue` interface — a read-only `size`, `find(id)` and `available()` — says what any
catalogue can do. Code written against `Catalogue` works with *any* object that has those members — it does not
care whether the books are in a `Map`, an array, or behind an API. That is the abstraction.

Modules do it too. In Lecture 05's Chuck Norris exercise, the page code (`main.ts`) only calls
`getRandomJoke()` and `searchJokes()`. Everything about URLs, status codes and checking the
response stays inside
[`jokes.ts`](../../Lecture05/Exercises/Group1/exercise.04/jokes.ts).

### Encapsulation

**Encapsulation** means keeping an object's state behind its methods, so that other code
cannot change it directly — only in the ways the object allows. You have seen two ways to do
it, and they give the same result:

```js
function makeCounter() {           // Lecture 03, Class 05, section 7: a closure
  let count = 0;
  return () => ++count;
}

class Counter {                    // Lecture 04, Class 07, section 7: a #private field
  #count = 0;
  increment() { return ++this.#count; }
}

const a = makeCounter();
a(); a();
console.log(a());

const c = new Counter();
c.increment(); c.increment();
console.log(c.increment());
console.log(Object.keys(c), JSON.stringify(c));
```

```
3
3
[] {}
```

In both, `count` is unreachable from outside: the only way to change it is to call the
function or the method. `Object.keys` and `JSON.stringify` cannot even see `#count`. The
closure version is from
[Lecture 03, Class 05, section 7](../../Lecture03/Materials/Class05-FunctionsStructures.md#7-scope-and-closures-slide-19-agenda),
which called it "real encapsulation, without classes" — and it was.

TypeScript's `private` is the third option, and the weakest: it is checked by the compiler and
then erased, so at runtime the property is visible to anyone
([Lecture 04, Class 07, section 7](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md#7-interfaces-and-classes-slide-7);
you proved it in Exercise 3.4).

Why bother? Because the object can then **guarantee its own rules**. The `Account` class in
Class 07 throws a `RangeError` for a negative deposit. If `balance` were public, any code
could write `account.balance = -500` and the rule would mean nothing.

### Inheritance

**Inheritance** means one kind of object is defined as a more specific version of another,
and gets all of its behaviour for free. Your clearest example is from Lecture 05:

```ts
export class ApiError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
```

(From [`exercise.04/jokes.ts`](../../Lecture05/Exercises/Group1/exercise.04/jokes.ts); the
`HttpError` in
[Lecture 05, Class 10, section 9](../../Lecture05/Materials/Class10-WebapiFetch.md#9-managing-api-requests-slide-7)
is the same idea.) `ApiError` adds one field, `status`. Everything else — `message`, the stack
trace, the way the console prints it, the fact that `throw` and `catch` treat it as an error —
comes from `Error`. An `ApiError` **is an** `Error`, and code that expects an `Error` can use
it. Section 3 shows how this works underneath.

### Polymorphism

**Polymorphism** ("many shapes") means the same code works with different kinds of objects,
and each object responds in its own way. You have used it in at least three forms:

- **Every `catch` block.** `catch (error)` followed by `error instanceof Error ? error.message
  : String(error)` (Lecture 05) works for a `TypeError`, a `RangeError`, an `ApiError` or a
  `DOMException` alike. The code does not need to know which one it got.
- **Structural typing.** `distance(p: Point)` in
  [Lecture 04, Class 07, section 7](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md#7-interfaces-and-classes-slide-7)
  accepts *any* object with `x` and `y`.
- **The same method name, different behaviour.** Converting an object to a string calls its
  `toString` method, and different objects have different ones:

```js
const plain = {};
const numbers = [3, 1, 2];
console.log(String(plain), String(numbers));
```

```
[object Object] 3,1,2
```

Arrays have their own `toString` that joins the elements; plain objects use the general one.
Section 3 explains where those two methods live.

Discriminated unions
([Lecture 04, Class 08, section 5](../../Lecture04/Materials/Class08-AdvancedTypeScript.md#5-union-and-intersection-types-slide-7))
are polymorphism too, done the other way round: one `area(shape)` function with a `switch` on
`shape.kind`, instead of an `area()` method on each shape. Section 6 shows the class version,
so you can compare.

> **In Angular:** a component is exactly the quiz engine's shape — a class whose fields are
> the state, plus a template that renders it. Abstraction and encapsulation decide what the
> component exposes to its template and to other components.

---

## 2. Benefits of OOP (slide 4)

The slide lists five benefits. They are real, but notice where each one comes from:

| Benefit | What gives it to you | Where you already had it |
|---|---|---|
| **Modularity** | Splitting a program into parts with clear boundaries | Lecture 04's Exercise 8: `models.ts`, `catalogue.ts`, `format.ts` … |
| **Reusability** | Writing something once and using it in many places | `check.ts`, written once and imported everywhere; `extends Error` reusing all of `Error` |
| **Ease of maintenance** | Changing one part without breaking the others | Encapsulation: `#books` can become an array without changing any caller |
| **Scalability** | Code that stays understandable as it grows | Interfaces as contracts between parts |
| **Collaboration** | Several people working on different parts at once | One person on `jokes.ts`, another on `main.ts`, agreeing only on the exported functions |

Most of these come from **modules and interfaces**, not from classes as such. Lecture 04's
Exercise 8 project had all five and not a single class. That is worth remembering: OOP is one
good way to get these benefits, not the only one — Class 12 shows another.

> **In Angular:** an application is split into components and services, each in its own file
> with a clear public surface. These benefits are why the framework insists on that structure.

---

## 3. The prototypal inheritance model (slide 5)

You met the idea in
[Lecture 01, Class 02, section 2](../../Lecture01/Materials/Class02-GettingStartedJS.md#2-the-language-of-the-web-slide-4):
JavaScript objects inherit **directly from other objects**. Every object has a hidden link to
another object, its **prototype**. When you read a property the object does not have, the
engine follows that link, and keeps following it until it finds the property or reaches
`null`. That chain of links is the **prototype chain**.

That sketch said `class` is "syntactic sugar" over this. Here is what that means in practice.

### Where a class's methods live

```js
class Animal {
  constructor(type) { this.type = type; }
  describe() { return `I am a ${this.type}`; }
}

const rex = new Animal("dog");
const tom = new Animal("cat");

console.log(Object.keys(rex));
console.log(Object.hasOwn(rex, "describe"));
console.log(Object.getOwnPropertyNames(Animal.prototype));
console.log(Object.getPrototypeOf(rex) === Animal.prototype);
console.log(typeof Animal);
console.log(rex.describe === tom.describe);
```

```
[ 'type' ]
false
[ 'constructor', 'describe' ]
true
function
true
```

The object itself holds only its **data** (`type`). `describe` lives on **`Animal.prototype`**,
an ordinary object the class created, and `Object.getPrototypeOf(rex)` — the hidden link —
points there. So all animals **share one `describe`**. And a class is a **function**; section 4
explains why.

So `rex.describe()` works like this: look for `describe` on `rex` — not there; follow the link
to `Animal.prototype` — found; call it, with `this` set to `rex` (section 5).

### Why `[].map` exists on every array

The same mechanism explains every built-in method you have used:

```js
const numbers = [3, 1, 2];
console.log(Object.hasOwn(numbers, "map"));
console.log(numbers.map === Array.prototype.map);
console.log(Object.getPrototypeOf(numbers) === Array.prototype);
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));
```

```
false
true
true
true
null
```

Your array does not contain `map`, `filter` or `sort`. It has a link to `Array.prototype`,
where they all live — which is why MDN documents them as **`Array.prototype.map()`**. And
`Array.prototype` itself links to `Object.prototype`, which is why every array also has
`hasOwnProperty`. The chain for an array is:

```
numbers  →  Array.prototype  →  Object.prototype  →  null
```

Now section 1's `toString` example makes sense. `Array.prototype` has its **own** `toString`,
so the lookup stops there and never reaches the one on `Object.prototype`. A property found
earlier in the chain **shadows** the one further up. That is how an object "overrides" an
inherited method.

The DOM works the same way. The button you get from `querySelector` in Lecture 02 has a long
chain, and every link adds something:

```
HTMLButtonElement.prototype → HTMLElement.prototype → Element.prototype
  → Node.prototype → EventTarget.prototype → Object.prototype → null
```

`addEventListener` comes from `EventTarget`; `textContent` from `Node`; `querySelector`,
`classList` and `append` from `Element`; `style` and `hidden` from `HTMLElement`. That is why the same
`addEventListener` works on a button, on `document`, on `window` — and, in Lecture 05, on an
`AbortSignal`, which is an `EventTarget` too.

### `instanceof` walks the chain

`x instanceof C` asks one question: *is `C.prototype` anywhere on `x`'s prototype chain?*

```ts
const error = new ApiError(404, "No such joke");
console.log(error instanceof ApiError, error instanceof Error, error instanceof Object);
console.log(Object.getPrototypeOf(ApiError.prototype) === Error.prototype);
```

```
true true true
true
```

`extends Error` simply set `ApiError.prototype`'s link to `Error.prototype`:

```
error  →  ApiError.prototype  →  Error.prototype  →  Object.prototype  →  null
```

So `instanceof Error` is true, and that is exactly why the narrowing
`error instanceof Error ? error.message : …` from Lecture 05 accepts your own error classes,
and why `instanceof` narrows types in TypeScript
([Lecture 04, Class 07, section 6](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md#6-narrowing-slide-6)).

### Ways to create an object, and the prototype each one gets

The slide's third bullet: *several ways to create an object, with differing prototypes*.
These are all ways you have used:

| You write | The new object's prototype |
|---|---|
| `{ name: "Ana" }` | `Object.prototype` |
| `[1, 2, 3]` | `Array.prototype` |
| `new Map()`, `new Date()`, `new Animal("dog")` | `Map.prototype`, `Date.prototype`, `Animal.prototype` |
| `Object.create(animal)` | `animal` — whatever you pass |
| `Object.create(null)` | none at all |

`Object.create(animal)` is the one from the Lecture 01 sketch, and the most direct form of the
model: a new object whose prototype is *that* object, with no class in the way. You will
rarely write it, but section 4 uses it to show what `new` does.

### A correction to the slide

The slide's first bullet says **objects don't have a base class**. The intended point is
right: there are no classes underneath, only objects linked to objects. But it can be read as
"objects have nothing in common", which is not true. Almost every object's chain ends at
**`Object.prototype`** — that is where `toString` and `hasOwnProperty` come from — so in
practice it plays the role of a universal base. The exception is `Object.create(null)`, which
makes an object with no prototype at all — `Object.create(null).toString` is `undefined`.
Such objects are occasionally used as plain dictionaries, though today a `Map` is the better
choice
([Lecture 03, Class 06, section 5](../../Lecture03/Materials/Class06-DataStructures.md#5-maps-and-sets-slide-8)).
The chain is also why
[Lecture 03, Class 06, section 4](../../Lecture03/Materials/Class06-DataStructures.md#4-objects-slide-7)
warned that `for...in` includes **inherited** properties, while `Object.keys` and
`Object.hasOwn` look at the object's **own** properties only.

> **In Angular:** every component and service is a class, so every instance is an ordinary
> object with its data on itself and its methods on the class's `prototype` — nothing in
> Angular changes how the chain works.

---

## 4. Constructor functions (slide 6)

Before 2015, JavaScript had no `class` keyword. Objects of the same shape were made with an
ordinary function called with **`new`** — a **constructor function**. You saw one in
[Lecture 03, Class 06, section 4](../../Lecture03/Materials/Class06-DataStructures.md#4-objects-slide-7),
next to the `class` version. You will not write them, but they are **what the class syntax you
already use is made of**, and you will meet them in older code and libraries.

Here is the `Animal` class from section 3, spelled the old way:

```js
function Animal(type) {
  this.type = type;
}
Animal.prototype.describe = function () {
  return `I am a ${this.type}`;
};

const rex = new Animal("dog");
console.log(rex.describe());
console.log(Object.getPrototypeOf(rex) === Animal.prototype, rex instanceof Animal);
```

```
I am a dog
true true
```

Compare it with the class line by line. The `constructor` body became the function body. The
method was added **to the prototype** by hand — the slide's *using the prototype for methods*.
That is all a class does for you, plus some safety checks. And it explains section 3's
surprise: `typeof Animal` is `"function"` because a class *is* a constructor function.

### What `new` does

The slide says `this` *is bound to the object that will be created*. Precisely, `new
Animal("dog")` does four things:

1. Creates a new, empty object.
2. Sets that object's prototype to `Animal.prototype`.
3. Calls `Animal` with `this` set to the new object, so `this.type = type` fills it in.
4. Returns the new object (unless the function itself returns a different object).

You can write those steps yourself, which shows there is no magic:

```js
function construct(Fn, ...args) {
  const obj = Object.create(Fn.prototype);   // 1 + 2
  const result = Fn.apply(obj, args);        // 3
  return typeof result === "object" && result !== null ? result : obj;   // 4
}

const tom = construct(Animal, "cat");
console.log(tom.describe(), tom instanceof Animal);
```

```
I am a cat true
```

(`Fn.apply(obj, args)` calls a function with a chosen `this` — section 5 lists it with its
siblings.)

### Why `class` is better

The old spelling has one nasty trap: forget `new`, and step 3 runs with no new object.
`this` is then `undefined` (in strict code), and you get a confusing error — or, in old sloppy
code, properties quietly written onto the global object. A class refuses to be called
without `new`. Calling a strict-mode `Animal("dog")` function without `new` fails with
*Cannot set properties of undefined (setting 'type')*; calling the class version gives
*Class constructor Animal cannot be invoked without 'new'* — which says exactly what is wrong.

Classes are also always in strict mode, keep everything in one block, and make `extends` and
`super` one word each instead of several lines of prototype wiring. **Write classes; read
constructor functions.**

> **In Angular:** you never call `new` on a component or service yourself. Angular does it —
> the four steps above — and hands you the finished object (section 7, *Factory*).

---

## 5. `this`, formally (slide 6)

[Lecture 03, Class 05, section 6](../../Lecture03/Materials/Class05-FunctionsStructures.md#6-functions-slides-1923)
introduced `this` as "a special variable whose value depends on how a function is called",
and warned that arrow functions are different. Since then you have used `this` in every
class, and in the `original.call(this, ...args)` of Lecture 04's decorators. Here are the
rules in one place.

### The rules

For a regular function or method, `this` is decided **at the moment of the call**, by how the
call is written:

| The call looks like | `this` is | Where you used it |
|---|---|---|
| `obj.method()` | `obj` — whatever is left of the dot | every method call |
| `fn()` — a plain call | `undefined` in modules, classes and strict code | — (the bug below) |
| `new Fn()` | the new object | every `new`, section 4 |
| `fn.call(x, …)`, `fn.apply(x, [ … ])` | `x` | the decorators in Lecture 04, Class 08, section 6 |
| `fn.bind(x)` | a new function whose `this` is always `x` | — (one fix below) |
| a function passed to `addEventListener` | the element (or other target) | Lecture 02 |

**Arrow functions ignore every rule in the table.** They have no `this` of their own; they use
the `this` of the code around them, like any other outer variable. This is called **lexical
`this`** — the same "decided by where it is written" idea as lexical scope in
[Lecture 03, Class 05, section 7](../../Lecture03/Materials/Class05-FunctionsStructures.md#7-scope-and-closures-slide-19-agenda).

Two details. A bound function **stays bound** — not even `call` can change its `this` later.
And in an old-style, non-module script, a plain call gives the **global object** instead of
`undefined`. That is worse, not better: the bug does not crash, it just writes to the wrong
object.

### The classic bug: passing a method as a callback

The rule *"`this` is whatever is left of the dot"* has a consequence that catches everyone
once. When you pass `timer.tick` to another function, you pass **the function only** — the
`timer.` part is not passed along. When the other function calls it later, it is a plain call:

```ts
class Timer {
  seconds = 0;
  tick() {
    this.seconds++;
    console.log("seconds:", this.seconds);
  }
}

const timer = new Timer();
timer.tick();                       // a method call: this is timer

const tick = timer.tick;            // just the function
try {
  tick();                           // a plain call: this is undefined
} catch (error) {
  console.log((error as Error).message);
}

setTimeout(timer.tick, 0);          // the same mistake, later

setTimeout(() => timer.tick(), 10);         // fix 1: an arrow that makes a method call
setTimeout(timer.tick.bind(timer), 20);     // fix 2: bind
```

```
seconds: 1
Cannot read properties of undefined (reading 'seconds')
seconds: NaN
seconds: 2
seconds: 3
```

Look at the third line. `setTimeout(timer.tick, 0)` did not crash — it printed `NaN`. Node
calls a timer callback with `this` set to its internal timer object, so `this.seconds++` added
a property to *that*, starting from `undefined`. (A browser would use `window`, with the same
result.) `timer.seconds` was not touched. The silent version of the bug is the dangerous one.

You can make the same mistake anywhere a function is passed:
`button.addEventListener("click", game.next)`, `promise.then(view.render)`,
`items.forEach(this.addItem)`. That is the reason
[Lecture 03, Class 05, section 6](../../Lecture03/Materials/Class05-FunctionsStructures.md#6-functions-slides-1923)
gave the rule of thumb *"use arrows for callbacks"*: an arrow callback that calls
`timer.tick()` keeps the dot.

### Class fields holding arrow functions

The third fix is a pattern you will see often: make the method a **class field** whose value
is an arrow function. The arrow is created inside the constructor, where `this` is the new
object, and it keeps that `this` forever:

```ts
class Logger {
  prefix = "[abort]";

  report() {                          // an ordinary method
    console.log(this.prefix, "report, this is", this.constructor.name);
  }

  handle = () => {                    // a class field holding an arrow function
    console.log(this.prefix, "handle, this is", this.constructor.name);
  };
}

const logger = new Logger();
const controller = new AbortController();
controller.signal.addEventListener("abort", logger.report);
controller.signal.addEventListener("abort", logger.handle);
controller.abort();
console.log(Object.keys(logger));
```

```
undefined report, this is AbortSignal
[abort] handle, this is Logger
[ 'prefix', 'handle' ]
```

The ordinary method got the `AbortSignal` as `this` — the `addEventListener` row of the
table — so `this.prefix` was `undefined`. The arrow field kept the `Logger`.

The cost shows in the last line: `handle` is an **own property** of each object, not a shared
method on the prototype. Every `Logger` gets its own copy of the function. For a handful of
objects that does not matter; it is why ordinary methods remain the default.

> **In Angular:** a template binding like `(click)="save()"` is a method call on the
> component, so `this` is right without any of these fixes. The bug comes back when you pass
> a method to something else — a `setTimeout`, a `.subscribe(...)`, a third-party library —
> and the fixes are the same three.

---

## 6. OOP in TypeScript (slide 7)

Most of slide 7 was covered in
[Lecture 04, Class 07, section 7](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md#7-interfaces-and-classes-slide-7),
and you practised it in Exercise 3 (`Library implements Catalogue`) and Exercise 5.5 (the
generic `Queue<T>`). This section is a recap with names attached, and then a few extra words
you will meet in Angular code.

### Recap: what you already used

| Feature | Example | Meaning |
|---|---|---|
| **Field** | `seconds = 0;` | a property every instance gets, with a starting value |
| **Constructor** | `constructor(name: string) { this.name = name; }` | runs once, inside `new` (section 4) |
| **Method** | `available(): LibraryBook[] { … }` | a function on the prototype, shared by all instances |
| **`readonly`** | `readonly name: string;` | can be set in the constructor, never after |
| **`private` / `protected` / `public`** | `private loanDays = 14;` | compile-time access checks; erased at runtime |
| **`#private`** | `#books = new Map()` | private at runtime too |
| **Getter** | `get size(): number { return this.#books.size; }` | a method read like a property: `library.size` |
| **`implements`** | `class Library implements Catalogue` | the compiler checks the class matches the interface |
| **Parameter property** | `constructor(public x: number) {}` | declares and assigns a field in one go |
| **Generic class** | `class Queue<T>` | a class with a type parameter (Class 08, section 4) |

Remember that `implements` only *checks*, and that parameter properties need the compiler —
`node file.ts` cannot run them
([Class 07, section 8](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md#8-compiling-typescript-slide-8)).

### Class hierarchies: names to recognise

The slide's *class hierarchies* means classes that extend other classes. You have written one
level of it (`extends Error`). Here are the remaining words, in one small example — read it
for vocabulary, not as something to imitate:

```ts
abstract class Shape {
  abstract area(): number;
  describe(): string {
    return `${this.constructor.name} with area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  static count = 0;
  readonly radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
    Circle.count++;
  }
  override area(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  #side: number;
  constructor(side: number) {
    super();
    this.#side = side;
  }
  get side(): number { return this.#side; }
  override area(): number {
    return this.#side ** 2;
  }
  override describe(): string {
    return "A square! " + super.describe();
  }
}

const shapes: Shape[] = [new Circle(1), new Square(2), new Circle(2)];
for (const shape of shapes) {
  console.log(shape.describe());
}
console.log("circles made:", Circle.count);
```

```
Circle with area 3.14
A square! Square with area 4.00
Circle with area 12.57
circles made: 2
```

| Word | Meaning | In the example |
|---|---|---|
| **`extends`** | this class's prototype links to the parent's (section 3) | `Circle extends Shape` |
| **`super(...)`** | call the parent's constructor; required, and before any use of `this` | `super()` |
| **`super.method()`** | call the parent's version of a method you are overriding | `super.describe()` |
| **override** | a subclass method replacing an inherited one — shadowing on the chain | `area`, `describe` |
| **`override` keyword** | TypeScript: "I mean to override" — an error if the parent has no such method | `override area()` |
| **`abstract` class** | cannot be created with `new`; exists to be extended | `Shape` |
| **`abstract` method** | no body; every subclass must provide one | `abstract area()` |
| **`static`** | belongs to the class itself, not to instances | `Circle.count` |

The compiler enforces all of them:

```ts
new Shape();
// Error: Cannot create an instance of an abstract class.

class Bad extends Shape {}
// Error: Non-abstract class 'Bad' does not implement inherited abstract member area from class 'Shape'.

override perimeter(): number { return 2; }      // inside Circle
// Error: This member cannot have an 'override' modifier because it is not declared in the base class 'Shape'.
```

You have already used **static** members without the name: `AbortSignal.timeout(200)`,
`Promise.all([...])`, `Array.from(...)`, `Object.keys(...)` are all methods on the class (or
constructor) itself, not on its instances. `Array.prototype.map`, by contrast, is an instance
method.

Notice the `for` loop at the end: it calls `shape.describe()` on each shape without knowing
which kind it is, and each one answers in its own way. That is section 1's **polymorphism**, the
class version. Compare it with the discriminated-union `area(shape)` from
[Lecture 04, Class 08, section 5](../../Lecture04/Materials/Class08-AdvancedTypeScript.md#5-union-and-intersection-types-slide-7):

- **Classes** make it easy to add a new *kind* (write a new subclass; nothing else changes) and
  harder to add a new *operation* (every class needs a new method).
- **Discriminated unions** are the opposite: a new operation is one new function; a new kind
  means updating every `switch` — which the `never` check then finds for you.

Neither is "right"; they are two tools for the same job.

`protected`, the one access modifier you have not used, only makes sense with hierarchies:
a `protected balance` is usable inside `Account` **and its subclasses**, and outside them you
get *Property 'balance' is protected and only accessible within class 'Account' and its
subclasses*.

> **In Angular:** you will read lines like `export class BookList implements OnInit`, with an
> `ngOnInit()` method — `implements` against an interface Angular provides. Older Angular
> code injects services through parameter properties, `constructor(private http: HttpClient) {}`;
> newer code uses a field, `private readonly http = inject(HttpClient);`. And Angular's
> generated `tsconfig.json` turns on `noImplicitOverride`, which makes the `override` keyword
> required: *This member must have an 'override' modifier because it overrides a member in the
> base class*.

---

## 7. Design patterns (slide 8)

A **design pattern** is a named, proven solution to a problem that keeps coming up. The slide's
three bullets say it well:

- **Not a piece of code.** A pattern is an idea you implement in your own way. There is no
  "Observer library" to install.
- **Functioning solutions to common problems.** Patterns are collected, not invented: people
  noticed the same solutions appearing in many programs, and wrote them down. The classic
  catalogue is *Design Patterns: Elements of Reusable Object-Oriented Software* (1994), by
  Gamma, Helm, Johnson and Vlissides — the "Gang of Four" — with 23 patterns.
- **Shared vocabulary.** This is the most useful part for you. "The rates module is a
  singleton with a cache" says in seven words what would otherwise take a paragraph.

You have already used most of the common ones. Here they are, with their names.

### Observer

**Problem:** many parts of a program need to react when something happens, and the thing that
happens should not need to know who is listening.
**Solution:** the **subject** keeps a list of **listeners** (observers) and calls each one
when something happens. Listeners subscribe and unsubscribe themselves.

That is `addEventListener` / `removeEventListener`
([Lecture 02, Class 04, section 5](../../Lecture02/Materials/Class04-DOM.md#5-handling-events-slide-7)):
a button does not know about your handlers; it calls whatever subscribed. In Lecture 05,
`signal.addEventListener("abort", ...)` in the Exercise 6 test helper
([`exercise.06/check.ts`](../../Lecture05/Exercises/Group1/exercise.06/check.ts)) was the same
pattern on an `AbortSignal`. Underneath, it is about this much code:

```js
function createNotifier() {
  const listeners = [];
  return {
    subscribe(listener) { listeners.push(listener); },
    emit(value) { for (const listener of listeners) listener(value); },
  };
}

const saved = createNotifier();
saved.subscribe((title) => console.log("toast:", title));
saved.subscribe((title) => console.log("log:", title));
saved.emit("Dune");
```

```
toast: Dune
log: Dune
```

*In Angular:* RxJS **observables** (`.subscribe(...)`) and component **outputs** are Observer,
everywhere.

### Decorator

**Problem:** add behaviour — timing, logging, caching — to existing code without changing it.
**Solution:** wrap it in something with the same shape that does the extra work and then
calls the original.

That is your `@Duration` from Lecture 04's Exercise 7, and `@Logged` in
[Lecture 04, Class 08, section 6](../../Lecture04/Materials/Class08-AdvancedTypeScript.md#6-decorators-slide-8):
a function that takes a method and returns a wrapped one. The pattern does not need the `@`
syntax — `withTiming(search)` in the same section is a decorator too.

*In Angular:* `@Component({...})`, `@Injectable(...)` and friends use the same **syntax**, but
mostly to attach configuration to a class rather than to wrap behaviour. The `@` is the same;
the job is slightly different.

### Module and Singleton

**Problem:** some things should exist exactly once in a program — a cache, a connection, the
settings.
**Solution (Singleton):** make sure only one instance is ever created, and give everyone access
to it.

In JavaScript, **an ES module already is one**. A module's top-level code runs once, the first
time it is imported, and every importer gets the same variables. The rates cache in
[`exercise.05/rates.ts`](../../Lecture05/Exercises/Group1/exercise.05/rates.ts) — a
module-level `const cache = new Map(...)` — is created once and shared by every file that
imports `getRates`, however many of them there are. And because `cache` is not exported, no
other file can touch it except through `getRates` and `clearCache`: the module gives you
encapsulation for free
([Lecture 04, Class 08, section 8](../../Lecture04/Materials/Class08-AdvancedTypeScript.md#8-modules-slide-10)).

*In Angular:* a **service** marked `@Injectable({ providedIn: "root" })` is a singleton: one
instance, shared by every component that asks for it. That is where shared state and caches go.

### Factory

**Problem:** creating an object takes more than `new` — choices, setup, hidden state — and
callers should not have to know the details.
**Solution:** a function (or static method) whose job is to create and return objects.

You have written several: `makeCounter()` in Lecture 03; `flaky(failures)` in Lecture 05's
[`exercise.03.ts`](../../Lecture05/Exercises/Group1/exercise.03.ts), which returns a new
function with its own hidden `calls` count; the `json(data, status)` helper in Exercise 6's
`check.ts` that builds a `Response`; the `@SlowerThan(20)` decorator factory in Lecture 04's
Exercise 7.5; and `createNotifier()` just above. Built-in **static factory methods** too:
`AbortSignal.timeout(200)`, `Array.from(...)`, `Object.create(proto)`.

*In Angular:* the **dependency injection** system is one big factory — it creates your
components and services, decides which instance each one gets, and passes them in. That is why
you never write `new` for them.

### Strategy

**Problem:** an algorithm has one part that should vary — how to compare, what to keep.
**Solution:** pass that part in as an object or function.

Every comparator you gave to `sort`
([Lecture 03, Class 06, section 3](../../Lecture03/Materials/Class06-DataStructures.md#3-sorting-searching-and-iterating-slide-6))
and every predicate you gave to `filter` is a strategy. `sort` knows *how to sort*; you supply
*what "before" means* — `(a, b) => a.age - b.age` one day,
`(a, b) => a.name.localeCompare(b.name)` the next. In languages without first-class functions this pattern needs an interface and a class per
strategy. In JavaScript it is just a function argument — the `Comparator` interface in
[Lecture 04, Class 08, section 1](../../Lecture04/Materials/Class08-AdvancedTypeScript.md#1-interfaces-slide-3)
is the type of one.

*In Angular:* route guards and HTTP interceptors are functions you hand to the framework, which
calls them at the right moment.

### Iterator

**Problem:** go through the items of a collection without knowing how it stores them.
**Solution:** the collection provides an **iterator** — an object that hands out one item at a
time.

`for...of` uses it
([Lecture 03, Class 05, section 3](../../Lecture03/Materials/Class05-FunctionsStructures.md#3-for-loops-slides-712)),
which is why the same loop works on an array, a string, a `Set`, a `Map` and a DOM `NodeList`
— five completely different ways of storing items. A plain object has no iterator, which is
why `for...of` on one fails and you use `Object.entries` instead.

*In Angular:* the template's `@for (book of books; track book.id)` loops over any iterable in
the same way.

### Facade (and Adapter)

**Problem:** a subsystem is fiddly to use correctly every time.
**Solution:** a **facade** — one simpler interface in front of it.

`getJson` is a facade over `fetch`: one call instead of fetch, check `ok`, parse, translate
errors
([Lecture 05, Class 10, section 9](../../Lecture05/Materials/Class10-WebapiFetch.md#9-managing-api-requests-slide-7)).
Its close relative, the **adapter**, converts one interface into the one your code wants:
`parseRates` in `rates.ts` turns the API's `base_code` and `time_last_update_unix` into your
`RateTable` with `base` and a `Date`.

*In Angular:* a data service — `BookService.getAll()` wrapping `HttpClient` — is a facade, and
usually an adapter too.

### Summary

| Pattern | One line | You used it in | Angular |
|---|---|---|---|
| **Observer** | notify everyone who subscribed | `addEventListener`, the `abort` event | RxJS, outputs |
| **Decorator** | wrap to add behaviour | `@Duration`, `@Logged` | `@Component`, `@Injectable` (syntax) |
| **Singleton / Module** | exactly one, shared | the rates cache, every module | `providedIn: "root"` services |
| **Factory** | a function that makes objects | `makeCounter`, `flaky`, `AbortSignal.timeout` | dependency injection |
| **Strategy** | pass in the part that varies | comparators, predicates | guards, interceptors |
| **Iterator** | one item at a time, any collection | `for...of` | `@for` |
| **Facade / Adapter** | a simpler or converted interface | `getJson`, `parseRates` | data services |

---

## 8. Criticisms of OOP (slide 9)

OOP is not free, and the slide is right to say so. Short and honest:

- **Complexity.** Interfaces, abstract bases, factories: a three-line function wrapped in all
  of them is harder to read, not easier.
- **Verbosity.** Field declarations, constructors and `this.` everywhere — compare Lecture 04's
  `Library` class with Exercise 8's plain functions.
- **Overhead.** Mostly mental, not speed: the code you must read to find where a method
  actually comes from.
- **Rigidity.** A class hierarchy is a guess about the future. When a new requirement does not
  fit the tree, the tree has to be rebuilt — and a change to a base class can break
  subclasses that seemed unrelated.
- **Mutability of state.** Objects hold state and their methods change it. Anyone holding a
  reference sees the change (*objects are references*,
  [Lecture 03, Class 06, section 4](../../Lecture03/Materials/Class06-DataStructures.md#4-objects-slide-7)),
  which makes bugs hard to trace — who changed this, and when?

The slide ends with "…", and the list does go on. One more worth naming: inheritance couples a
subclass tightly to every detail of its parent.

### Composition over inheritance

The standard advice in response is **composition over inheritance**: build objects by
*giving* them other objects ("has a") rather than *extending* other classes ("is a").

You have done this already. Lecture 04's `Library` does not `extend Map` — it **has** a
`#books` `Map` inside it. That choice is why it can expose only `add`, `find` and `borrow`,
and why it could switch to an array tomorrow without breaking any caller. Had it extended
`Map`, every `Map` method — `clear`, `delete`, `set` — would be part of `Library`'s public
surface, rules or no rules.

The practical rule: **use inheritance for a true "is a", and keep it shallow** — `ApiError
extends Error` is perfect. For sharing behaviour, prefer a field holding a helper, a function,
or a module.

For mutability, the answer is a different style altogether: values that are never changed,
and functions that return new values instead. That is the subject of
[Class 12](Class12-FunctionalJavaScript.md) — and you have done it already too, in Exercise 8's
"no function changes its inputs".

> **In Angular:** components rarely extend each other. They get what they need by
> **injecting** services — composition, done by the framework.

---

## 9. Common mistakes

- **Passing a method as a callback** — `setTimeout(timer.tick)`, `addEventListener("click",
  game.next)`, `.then(view.render)` — and losing `this`. Use an arrow that calls the method,
  `bind`, or an arrow class field. Section 5.
- **Using an arrow function as a method** on an object literal, expecting `this` to be the
  object. Section 5, and Lecture 03, Class 05, section 6.
- **Forgetting `super(...)`**, or using `this` before it, in a subclass constructor. Section 6.
- **Calling a constructor function without `new`.** Classes refuse; old-style functions fail
  confusingly. Section 4.
- **Trusting TypeScript's `private` to hide data at runtime.** It is erased; use `#`.
  Section 1.
- **Expecting `instanceof` to work on plain objects from JSON.** `JSON.parse` and `fetch`
  give plain objects whose prototype is `Object.prototype` — never your class. Section 3.
- **Building deep class hierarchies** for code that needs a field or a function. Section 8.
- **Inventing a class where a function or a module would do.** Section 2.

---

## 10. Vocabulary

| Term | Meaning | Where you used it |
|---|---|---|
| **Object** | a bundle of state (properties) and behaviour (methods) | every `{ … }` since Lecture 01 |
| **Class** | a template for objects; a constructor function underneath | `Library`, `Queue<T>` (L04) |
| **Constructor** | the code that runs inside `new` to set up an instance | every `constructor(...)` |
| **Constructor function** | the pre-2015 spelling of a class | `function Person` (L03, Class 06) |
| **Method** | a function on an object, usually on the prototype | `available()`, `describe()` |
| **Prototype** | the object another object inherits from | `Array.prototype.map` |
| **Prototype chain** | the links followed when looking up a property | `[].map`, `hasOwnProperty` |
| **Own property** | a property on the object itself, not inherited | `Object.hasOwn`, `Object.keys` |
| **`this`** | the object a regular function was called on | every method; decorators' `call(this, …)` |
| **Lexical `this`** | an arrow function's `this`, taken from the surrounding code | arrow callbacks (L03) |
| **Abstraction** | using a thing through what it does, not how | the `Catalogue` interface |
| **Encapsulation** | hiding state behind methods | `#private`, closures |
| **Inheritance** | defining a type as a more specific version of another | `ApiError extends Error` |
| **Polymorphism** | one piece of code working with many kinds of object | `catch (error)`, structural typing |
| **Interface** | a named shape, checked at compile time only | `Book`, `Catalogue` (L04) |
| **`implements`** | a class promising to match an interface | `Library implements Catalogue` |
| **Access modifier** | `public`, `protected`, `private` | `private loanDays` |
| **Getter** | a method read like a property | `get size()` (L04, Exercise 3) |
| **Static member** | belongs to the class, not to instances | `AbortSignal.timeout`, `Promise.all` |
| **Override** | a subclass replacing an inherited method | `toString` on arrays |
| **`super`** | the parent class: its constructor, or its methods | `super(message)` in `ApiError` |
| **Abstract class** | a class only meant to be extended | — (you will see it in Angular) |
| **Composition** | building objects from other objects ("has a") | `Library` has a `Map` |
| **Design pattern** | a named solution to a recurring problem | section 7 |
| **Observer** | subscribers notified when something happens | `addEventListener` |
| **Decorator** | a wrapper that adds behaviour | `@Duration` |
| **Singleton** | exactly one shared instance | the module-level rates cache |
| **Factory** | a function that creates objects | `makeCounter`, `flaky` |
| **Strategy** | passing in the part of an algorithm that varies | `sort((a, b) => …)` |
| **Iterator** | hands out a collection's items one at a time | `for...of` |
| **Facade** | a simpler interface in front of a complicated one | `getJson` |

---

## Further reading

- **MDN: Inheritance and the prototype chain** —
  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain>
- **MDN: Classes** —
  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes>
- **MDN: `this`** —
  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this>
- **The TypeScript Handbook: Classes** —
  <https://www.typescriptlang.org/docs/handbook/2/classes.html>
- **Refactoring.Guru: Design patterns** — a readable catalogue with diagrams and examples —
  <https://refactoring.guru/design-patterns>

---

*Internet Programming · UACS · Lecture 06*
