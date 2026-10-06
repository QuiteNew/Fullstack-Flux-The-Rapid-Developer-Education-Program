# Class 02 — Getting Started with JavaScript

Companion notes for `Class02-GettingStartedJS.pptx`. The slides list the topics; this
explains them. Section numbers map to slide numbers.

Every code result shown below was executed and verified — if something looks like a typo,
it is probably JavaScript.

**Contents**

1. [History of JavaScript](#1-history-of-javascript-slide-3)
2. [The language of the web](#2-the-language-of-the-web-slide-4)
3. [Basic syntax](#3-basic-syntax-slide-5)
4. [Data types](#4-data-types-slide-6)
5. [Operators](#5-operators-slide-7)
6. [The weirdness: type coercion](#6-the-weirdness-type-coercion-slide-8)
7. [When things go wrong](#7-when-things-go-wrong-slide-9)

---

## 1. History of JavaScript (slide 3)

JavaScript's strangeness is not accidental. Almost every oddity in this document traces
directly back to the circumstances of its creation, so the history is worth knowing.

### The first browser war

By 1995 Netscape Navigator dominated the web, and Microsoft was coming for it. Netscape
decided its browser needed a scripting language so pages could do more than sit still —
and it needed one *immediately*, to ship in the next release.

### Ten days in May

**Brendan Eich** was hired to build it. He was given roughly **ten days**.

The brief was contradictory by design. Management wanted something that "looked like Java",
because Java was the industry's great hope in 1995 and Netscape had a partnership with Sun.
Eich personally wanted a functional language in the tradition of Scheme. What emerged was
a hybrid: **Java's syntax wrapped around Scheme's semantics, with a prototype-based object
model borrowed from Self.**

That is the whole explanation for the language's split personality. It has C-style braces
and `for` loops, but functions are values you pass around, and objects inherit from other
objects rather than from classes.

Ten days also explains the rough edges. There was no time to reconsider `typeof null`, or
what `==` should do with mismatched types. Those decisions, made in a fortnight under
deadline, are now permanent — because of the rule in the next paragraph.

### Mocha, then LiveScript, then JavaScript

The language was called **Mocha** internally, shipped as **LiveScript** in September 1995,
and renamed **JavaScript** that December as part of the marketing agreement with Sun.

**JavaScript has essentially nothing to do with Java.** The name was a marketing decision,
and it has confused students for thirty years. The usual line: *Java is to JavaScript as
ham is to hamster.*

### JScript and the standards war

Microsoft reverse-engineered the language for Internet Explorer 3 in 1996 and — unable to
use the trademarked name — called it **JScript**. Two near-identical but subtly different
languages now existed, and developers wrote branching code to handle both.

The fix was standardisation. The language was submitted to **Ecma International**, and the
first edition of **ECMA-262** appeared in June 1997. The standard needed a vendor-neutral
name, and since "JavaScript" was Sun's trademark, the specification was called
**ECMAScript** — a name Eich later described as sounding like a skin disease.

So: *ECMAScript* is the specification; *JavaScript* is the language everyone actually says.

### The long stall, then the renaissance

- **ES3 (1999)** — the baseline that held for a decade.
- **ES4** — ambitious, contentious, and **abandoned**. It would have added classes and
  static typing. The community split, and the proposal collapsed.
- **ES5 (2009)** — modest but important: `strict mode`, JSON support, array methods.
- **ES6 / ES2015** — the big one. `let` and `const`, arrow functions, classes, modules,
  promises, template literals, destructuring. Modern JavaScript starts here.
- **ES2016 onward** — the committee switched to **annual releases** with smaller features,
  which is why versions are now named by year.

Two developments pulled the language out of its stall:

**AJAX (2005)** — the term was coined for a technique using `XMLHttpRequest` (a Microsoft
invention from IE5) to fetch data *without reloading the page*. Gmail and Google Maps
proved web pages could behave like desktop applications. JavaScript suddenly mattered.

**V8 (2008)** — Google shipped Chrome with an engine that compiled JavaScript to native
machine code. The language became perhaps a hundred times faster, effectively overnight.
Everything that follows depends on this.

### Beyond the browser

**Node.js (2009)** — Ryan Dahl took V8 out of the browser and wrapped it in an I/O library.
JavaScript became a server language, and for the first time one language could cover an
entire stack. **Deno (2020)**, from the same author, is a rethink with security and
TypeScript built in. **Bun (2022)** targets raw speed.

### The ecosystem today

jQuery (2006) smoothed over browser differences and was ubiquitous for a decade; most of
what it provided is now native. AngularJS (2010), React (2013) and Vue (2014) moved the
industry to component-based UIs. **TypeScript (2012)** added the static type system ES4
failed to deliver, as a layer on top — and is now the default for serious projects.

**The one rule that explains everything.** The web's prime directive is
**don't break the web**. A page written in 1996 should still load today. The committee
therefore can almost never *remove* or *fix* anything — only add. Every quirk in section 6
is permanent, not because anyone defends it, but because somewhere a page depends on it.

---

## 2. The language of the web (slide 4)

### Scripting / interpreted language

Historically, JavaScript was interpreted: source text in, execution out, with no separate
compilation step. You still experience it that way — edit the file, reload, done.

Internally this has not been true for years. Modern engines use **JIT (Just-In-Time)
compilation**: code starts in a fast interpreter, and functions that run repeatedly get
compiled to optimised machine code, with assumptions about the types they have been seeing.
If those assumptions are violated — you suddenly pass a string where there was always a
number — the engine *deoptimises* and falls back.

Practical consequence: **consistent types make code faster**, even though the language does
not require them.

### Where it runs

| Runtime | Context | Notable |
|---|---|---|
| **Browsers** | Chrome/Edge (V8), Firefox (SpiderMonkey), Safari (JavaScriptCore) | DOM, `fetch`, `localStorage` |
| **Node.js** | Server | Files, networking, huge package ecosystem |
| **Deno** | Server | Secure by default, native TypeScript |
| **Bun** | Server | Speed-focused, bundler and test runner included |

The *language* is the same everywhere; the **APIs differ**. There is no `document` in
Node.js and no filesystem access in a browser. Confusing language features with environment
APIs is a common beginner error — `console.log` is not part of the language at all, it is
something the host environment provides.

### Dynamic typing

Values have types; **variables do not**.

```js
let x = 42;        // x holds a number
x = "hello";       // now a string — perfectly legal
x = [1, 2, 3];     // now an array
```

Say this one carefully, because the slide does: **dynamic is not the same as typeless.**
Every *value* has a definite, checkable type. What is absent is a compile-time guarantee
about what a *variable* will hold. The type check still happens — just at runtime, when it
is most expensive and least convenient.

This is exactly what TypeScript addresses: it adds compile-time checking and then compiles
to ordinary JavaScript.

### Prototypal inheritance

Most languages you have met use **class-based** inheritance: a class is a blueprint, and
objects are instances of it. JavaScript does something different — **objects inherit
directly from other objects.**

Every object has a hidden link to another object, its **prototype**. Look up a property,
and if it is not on the object itself, the engine follows that link, and keeps following it
until the property is found or the chain ends at `null`. This is the **prototype chain**.

```js
const animal = {
  describe() { return `I am a ${this.type}`; }
};

const dog = Object.create(animal);
dog.type = "dog";

dog.describe();   // "I am a dog"
```

`dog` has no `describe` method of its own. The lookup walks up to `animal` and finds it
there.

ES6 added `class` syntax:

```js
class Animal {
  constructor(type) { this.type = type; }
  describe() { return `I am a ${this.type}`; }
}
class Dog extends Animal {
  constructor() { super("dog"); }
}
```

This is **syntactic sugar**. There are no real classes underneath — it is the same
prototype machinery with a friendlier face. Knowing that explains behaviour that otherwise
seems arbitrary.

### Single-threaded execution

**JavaScript runs your code on exactly one thread.** There is one call stack. Two pieces of
your code never run simultaneously.

The consequence is blunt: **if your code does not finish, nothing else happens.** No
rendering, no clicks, no scrolling. An infinite loop does not slow the page down — it
freezes it completely.

```js
// Never do this in a browser.
const end = Date.now() + 5000;
while (Date.now() < end) { /* spin */ }
// The page is frozen solid for five seconds.
```

The upside is that you never deal with the race conditions, locks and deadlocks that plague
multithreaded code. A function runs to completion without another function modifying its
data mid-flight. That guarantee is worth a great deal.

### Event-driven

So how does a single-threaded language handle a network request taking 300ms without
freezing? It does not wait. It **registers a callback and moves on**.

The **event loop**:

1. Run everything on the **call stack** until it is empty.
2. Meanwhile, the environment handles slow things — timers, network, user input — *outside*
   your thread.
3. When one completes, its callback is placed in a **queue**.
4. The moment the stack empties, the loop takes the next callback from the queue and runs it.

```js
console.log("first");
setTimeout(() => console.log("third"), 0);
console.log("second");

// first
// second
// third
```

Even with a delay of `0`, the callback cannot run until the current code finishes. This is
the single most important mental model for asynchronous JavaScript, and it explains why
`setTimeout(fn, 0)` is a real technique — it means "run this after the current work is
done".

---

## 3. Basic syntax (slide 5)

### Declaring variables

Three keywords, in historical order:

```js
var  oldStyle = 1;   // pre-ES6. Function-scoped. Avoid.
let  changeable = 2; // ES6. Block-scoped.
const fixed = 3;     // ES6. Block-scoped, cannot be reassigned.
```

**Use `const` by default, `let` when you must reassign, and `var` never.** That is not
style preference — `var` has two genuinely harmful behaviours.

**Scope.** `let` and `const` are block-scoped (confined to the nearest `{ }`). `var` is
function-scoped, and leaks:

```js
function f() {
  if (true) {
    var leaked = "visible outside the if";
    let contained = "not visible outside the if";
  }
  console.log(leaked);     // works
  console.log(contained);  // ReferenceError
}
```

**Hoisting.** Declarations are processed before any code runs, but `var` and `let` behave
differently:

```js
console.log(v); var v = 1;   // undefined — hoisted and auto-initialised
console.log(l); let l = 1;   // ReferenceError: Cannot access 'l' before initialization
```

`let` and `const` are hoisted too, but sit in the **temporal dead zone** until their
declaration is reached. The error is a feature: it catches a genuine mistake instead of
silently handing you `undefined`.

**What `const` actually protects.** It freezes the *binding*, not the value:

```js
const o = { a: 1 };
o.a = 2;        // fine — the object is mutable
o = { a: 3 };   // TypeError: Assignment to constant variable.
```

`const` means "this name will always point at this value", not "this value cannot change".
For genuine immutability you need `Object.freeze()`.

### Functions

Three forms, which are not quite equivalent:

```js
function square(n) { return n * n; }       // declaration — hoisted entirely
const square = function (n) { return n * n; };  // expression — not hoisted
const square = n => n * n;                 // arrow — concise, implicit return
```

A *declaration* can be called before it appears in the file. An *expression* cannot — the
variable exists but holds `undefined` until the assignment runs.

Arrow functions are shorter, but differ in two real ways: they have no `arguments` object,
and they do not bind their own `this` (they inherit it from the enclosing scope). That
second point becomes important later; for now, note that arrows are not merely shorthand.

### Conditionals and loops

Standard C-family syntax:

```js
if (x > 10) { } else if (x > 5) { } else { }

switch (value) {
  case "a": doThing(); break;   // forget `break` and execution falls through
  default: other();
}

for (let i = 0; i < 10; i++) { }
for (const item of array) { }      // values — use this for arrays
for (const key in object) { }      // keys — use this for objects
while (condition) { }
```

`for...of` versus `for...in` trips people up constantly: **`of` gives you values, `in`
gives you keys.** Using `for...in` on an array gives you `"0"`, `"1"`, `"2"` — index
*strings*, not elements.

### Objects and methods

```js
const student = {
  name: "Ana",
  year: 2,
  greet() {
    return `Hi, I am ${this.name}`;
  }
};

student.greet();      // "Hi, I am Ana"
student["name"];      // "Ana" — same thing, dynamic key
student.email;        // undefined — missing properties are not an error
```

Objects are the workhorse of JavaScript. Note that reading a property that does not exist
returns `undefined` rather than throwing — convenient, and a frequent source of bugs that
surface far from their cause.

The backtick string is a **template literal**, which supports `${}` interpolation and
spans multiple lines. Prefer it to `+` concatenation.

### Execution environment APIs

The language itself is small. Most of what you use comes from the host:

| Source | Examples |
|---|---|
| **The language (ECMAScript)** | `Math`, `JSON`, `Array`, `Promise`, `Date` |
| **The browser** | `document`, `window`, `fetch`, `localStorage`, `console` |
| **Node.js** | `fs`, `http`, `process`, `require` |

When you look something up on MDN, check which category it falls into. Code using
`document` will never run in Node.js, and that is not a bug in your code.

---

## 4. Data types (slide 6)

### Primitives

The slide lists five. Modern JavaScript has **seven**:

| Type | Example | Notes |
|---|---|---|
| `number` | `42`, `3.14`, `NaN` | One type for all numbers |
| `string` | `"hello"` | One type; no separate char type |
| `boolean` | `true`, `false` | |
| `undefined` | `undefined` | "No value assigned" |
| `null` | `null` | "Deliberately empty" |
| `symbol` | `Symbol("id")` | ES6. Unique property keys |
| `bigint` | `10n` | ES2020. Arbitrarily large integers |

Primitives are **immutable**. `"hello".toUpperCase()` does not change the original string;
it returns a new one.

**Number** — there is no `int` or `float`. Every number is a 64-bit IEEE 754
double-precision float, the same representation `double` has in Java or C#. Consequences:

```js
0.1 + 0.2                 // 0.30000000000000004
0.1 + 0.2 === 0.3         // false
Number.MAX_SAFE_INTEGER   // 9007199254740991
1 / 0                     // Infinity
0 / 0                     // NaN
```

The first line is not a JavaScript bug — it is how binary floating point works everywhere,
and 0.1 simply has no exact binary representation. **Never use floating point for money.**
Store cents as integers, or use a decimal library.

`NaN` ("Not a Number") deserves special attention:

```js
typeof NaN      // "number"   ← it is a number, confusingly
NaN === NaN     // false      ← the only value not equal to itself
```

Because `NaN` is not equal to itself, you cannot test for it with `===`. Use
`Number.isNaN(x)`.

**String** — UTF-16, immutable, and interchangeable with single or double quotes. There is
no character type; a character is a string of length 1.

**undefined vs null** — the distinction the slide flags as "two slightly different values":

- `undefined` — *the system* has no value here. An unassigned variable, a missing
  parameter, a property that does not exist.
- `null` — *you* deliberately put nothing here.

```js
let a;                   // undefined — never assigned
let b = null;            // null — explicitly empty
({}).missing             // undefined — no such property
```

Rule of thumb: never assign `undefined` yourself. Let it mean "the system did this", and
use `null` when you mean "intentionally empty".

### Complex types

Everything that is not a primitive is an **object** — including arrays and functions.

```js
const obj = { a: 1 };
const arr = [1, 2, 3];
const fn  = function () {};

typeof obj   // "object"
typeof arr   // "object"   ← arrays are objects
typeof fn    // "function" ← special-cased
```

**Arrays** are objects with numeric keys and a `length`. They are dynamically sized and
may hold mixed types: `[1, "two", true, null, [5]]` is valid.

**Functions** are objects too — "first-class citizens", in the slide's phrase. They can be
assigned to variables, passed as arguments, returned from other functions, and given
properties. This is the Scheme half of the language's parentage, and it is what makes
callbacks, event handlers and the entire functional style possible.

```js
const greet = name => `Hello, ${name}`;     // stored in a variable
[1, 2, 3].map(n => n * 2);                  // passed as an argument
const adder = a => b => a + b;              // returned from a function
adder(2)(3);                                // 5
```

### Reference vs value

Primitives are copied **by value**; objects are copied **by reference**:

```js
let a = 1, b = a;
b = 2;
a;                 // 1 — unaffected

let x = { n: 1 }, y = x;
y.n = 2;
x.n;               // 2 — same object!
```

`y` was never a copy; it is a second name for the same object. This catches everyone at
least once. Equality follows the same rule — two separately created objects are never
`===`, even with identical contents:

```js
({ a: 1 }) === ({ a: 1 })   // false — different objects
```

(The parentheses are required. Without them, a `{` at the start of a statement is parsed as
a *block*, not an object literal, and you get a `SyntaxError` — another small wart worth
recognising when it bites you in the console.)

### Checking types

`typeof` is unreliable for objects, so:

| Goal | Use |
|---|---|
| Primitive type | `typeof x` |
| Is it an array? | `Array.isArray(x)` |
| Is it null? | `x === null` |
| Is it NaN? | `Number.isNaN(x)` |

---

## 5. Operators (slide 7)

### Arithmetic

`+` `-` `*` `/` `%` `**`

```js
7 / 2      // 3.5  — no integer division
7 % 2      // 1    — remainder
2 ** 10    // 1024 — exponentiation
```

`+` is overloaded: with any string operand it means **concatenation**, not addition. This
is the root of half of section 6.

### Assignment

`=` `+=` `-=` `*=` `/=` `%=` `**=`, plus `++` and `--`.

### Comparison

`==` `!=` `===` `!==` `<` `>` `<=` `>=`

**Use `===` and `!==`. Always.** `==` performs type coercion before comparing, with rules
complex enough that even experienced developers misremember them. Section 6 covers why.

### Logical

`&&` `||` `!` — and they do not return booleans.

```js
"a" && "b"    // "b"  — returns the last evaluated operand
"" || "def"   // "def"
```

They **short-circuit**: `&&` stops at the first falsy operand, `||` at the first truthy
one. This is used deliberately:

```js
const name = userInput || "Anonymous";      // fallback for falsy
isLoggedIn && showDashboard();              // conditional execution
```

Careful with `||` as a default: it triggers on *any* falsy value, so a legitimate `0` or
`""` gets replaced. ES2020's **nullish coalescing** `??` fixes this by reacting only to
`null` and `undefined`:

```js
0 || 100     // 100  — probably not what you wanted
0 ?? 100     // 0    — correct
```

### Ternary

```js
const label = count === 1 ? "item" : "items";
```

The only operator taking three operands. Excellent for simple either/or choices; do not
nest it.

### Bitwise

`&` `|` `^` `~` `<<` `>>` `>>>` — operate on 32-bit integer representations. Rare in web
development; mostly seen in graphics, hashing and flags. Mentioned so you recognise them,
and so you do not confuse `&` with `&&`.

---

## 6. The weirdness: type coercion (slide 8)

The famous part. Every result below was verified by running it.

### What coercion is

When an operator receives operands of types it did not expect, JavaScript does not raise an
error — it **converts them** and proceeds. The conversion rules are well-defined but
unintuitive, and they are permanent, because of "don't break the web".

### Equality by value: `==`

`==` converts operands to a common type, then compares:

```js
"" == 0            // true   — "" becomes 0
"0" == false       // true   — both become 0
[] == false        // true   — [] → "" → 0, false → 0
null == undefined  // true   — special-cased
null === undefined // false
null == 0          // false  — null is NOT converted to a number
undefined == 0     // false
NaN == NaN         // false  — NaN equals nothing, not even itself
```

The one to stare at:

```js
[] == ![]          // true
```

`![]` is `false` (objects are truthy, so `!` gives `false`). Then `[] == false` coerces the
array to `""`, `""` to `0`, and `false` to `0`. `0 == 0` is true. An empty array equals its
own negation.

Note also that `==` is **not transitive**, which should disqualify it from being called
equality at all:

```js
"0" == 0      // true
0 == ""       // true
"0" == ""     // false  ← !
```

### Equality by type and value: `===`

`===` compares type first. Different types, different values — no conversion, no surprises.

```js
"" === 0      // false
"0" === 0     // false
null === undefined  // false
```

The only quirk it keeps is `NaN !== NaN`.

**Use `===` everywhere.** The single defensible exception is `x == null`, which checks for
`null` *or* `undefined` in one go — and even that is better written explicitly.

### Truthy and falsy

In a boolean context, every value becomes `true` or `false`. **There are exactly eight
falsy values:**

```js
false, 0, -0, 0n, "", null, undefined, NaN
```

**Everything else is truthy**, including the ones that look empty:

```js
Boolean([])        // true  — an empty array is an object
Boolean({})        // true
Boolean("0")       // true  — a non-empty string
Boolean("false")   // true  — still a non-empty string
Boolean(" ")       // true  — a space is a character
```

The practical trap:

```js
if (count) { }          // skipped when count is 0 — probably a bug
if (count > 0) { }      // say what you mean
if (name) { }           // skipped when name is "" — probably a bug
if (name !== "") { }    // better
```

### Adding up things

`+` means concatenation if *either* operand is a string, and addition otherwise. Every
other arithmetic operator has no string meaning, so it converts to numbers:

```js
"5" + 3      // "53"   — concatenation
"5" - 3      // 2      — subtraction forces numbers
"5" * "2"    // 10
true + true  // 2      — true becomes 1
true + "1"   // "true1"
```

With objects, JavaScript converts to a primitive first — usually via `toString()`:

```js
[] + []        // ""                 — both arrays stringify to ""
[] + {}        // "[object Object]"
[1,2] + [3,4]  // "1,23,4"           — "1,2" + "3,4"
```

And the classic:

```js
"b" + "a" + +"a" + "a"    // "baNaNa"
```

Reading it: `+"a"` is unary plus applied to `"a"`, which is `NaN`. Concatenating gives
`"b" + "a" + NaN + "a"` → `"baNaNa"`.

### Comparison chaining

```js
1 < 2 < 3    // true
3 > 2 > 1    // false
```

Both look obviously true mathematically. Comparison is **left-associative**, so:

- `1 < 2 < 3` → `(1 < 2) < 3` → `true < 3` → `1 < 3` → **`true`** (accidentally correct)
- `3 > 2 > 1` → `(3 > 2) > 1` → `true > 1` → `1 > 1` → **`false`**

JavaScript does not have chained comparison. Write `2 > 1 && 3 > 2`.

### Explicit conversion

When you need a conversion, do it deliberately:

```js
Number("")          // 0
Number(" ")         // 0
Number("12abc")     // NaN     — all or nothing
Number(null)        // 0
Number(undefined)   // NaN
parseInt("12abc")   // 12      — parses as far as it can
parseInt("0.9")     // 0       ← stops at the dot
parseFloat("0.9ab") // 0.9
+"5"                // 5       — unary plus
String(123)         // "123"
(123).toString()    // "123"
```

`parseInt("0.9") === 0` is a genuine source of production bugs. `parseInt` reads characters
until it hits one it cannot use; `.` is not a digit, so it stops. Use `Number()` unless you
specifically want trailing-garbage tolerance.

### How to stay out of trouble

1. Always `===`, never `==`.
2. Convert explicitly — `Number(x)`, `String(x)` — rather than relying on coercion.
3. Compare explicitly: `if (arr.length > 0)`, not `if (arr.length)`.
4. `Number.isNaN()` for NaN, `Array.isArray()` for arrays, `=== null` for null.
5. Consider TypeScript for anything substantial. Most of this section becomes a
   compile-time error instead of a 3 a.m. production incident.

---

## 7. When things go wrong (slide 9)

Open devtools with **F12** or **Ctrl+Shift+I**. Learning these tools well is worth more
than learning any framework.

### Console tab

Where errors appear and where you experiment.

```js
console.log(value);              // the workhorse
console.table(arrayOfObjects);   // tabular — excellent for data
console.error("broke");          // red, with a stack trace
console.warn("careful");         // yellow
console.dir(domElement);         // the object, not the rendered element
console.log({ x, y, z });        // shorthand: logs names *and* values
console.time("t"); /*...*/ console.timeEnd("t");   // timing
```

That `console.log({ x, y, z })` trick is worth adopting immediately — it prints
`{x: 1, y: 2, z: 3}` with the names attached, instead of three anonymous values.

**Read the error message.** Beginners see red and panic; the message is usually precise:

| Error | Means |
|---|---|
| `ReferenceError: x is not defined` | No such variable. Typo, or out of scope |
| `TypeError: x is not a function` | It exists but is not callable. Typo, or wrong type |
| `TypeError: Cannot read properties of undefined (reading 'y')` | You did `x.y` and `x` was `undefined` |
| `SyntaxError: Unexpected token` | The parser failed. Usually a missing bracket *above* the reported line |
| `Uncaught (in promise)` | An async operation rejected with nothing catching it |

The third one is the most common error in all of JavaScript. It tells you exactly what was
`undefined` and what you tried to read from it — read it carefully rather than guessing.

Click the file:line reference on the right of any error to jump straight to the source.

### Network tab

Every request the page makes. Covered in Class 01, section 6, and in Exercise 4.

Watch for: status codes (red rows), the *Size* column (`from disk cache` versus a real
transfer), the *Timing* breakdown, and the request/response headers. If a `fetch` is not
working, this tab tells you whether the request was even sent, and what came back.

### Sources tab

Where you stop using `console.log` for everything.

Set a **breakpoint** by clicking a line number. When execution reaches it, the page pauses
and you can inspect every variable in scope at that moment, then step through:

| Control | Does |
|---|---|
| **Resume** (F8) | Continue to the next breakpoint |
| **Step over** (F10) | Next line, without entering function calls |
| **Step into** (F11) | Next line, entering the call |
| **Step out** (Shift+F11) | Run to the end of the current function |

Also available: **conditional breakpoints** (right-click a line — pause only when
`i === 42`), the **Scope** panel showing live variable values, and the **Call Stack**
showing how you arrived.

A debugger beats `console.log` because you see *everything* at a moment in time, rather than
the one value you thought to print. Learn it early; it compounds.

### Elements tab

Not on the slide, but you will use it constantly. It shows the **live DOM** — not your HTML
file. Inspect any element to see which CSS rules apply, which are overridden (struck
through), and the box model as rendered. If your CSS "is not working", this tab shows you
what beat it.

---

## Further reading

- **MDN JavaScript Guide** — <https://developer.mozilla.org/docs/Web/JavaScript/Guide>
- **javascript.info** — <https://javascript.info> — the best structured free course
- **You Don't Know JS Yet**, Kyle Simpson — free on GitHub; the deep explanation of
  everything in section 6
- **TC39 proposals** — <https://github.com/tc39/proposals> — what is coming next

---

*Internet Programming · UACS · Lecture 01*
