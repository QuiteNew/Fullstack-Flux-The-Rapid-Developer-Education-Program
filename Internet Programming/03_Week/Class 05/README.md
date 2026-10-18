# Class 05 — Functions and Control Structures

Companion notes for `Class05-FunctionsStructures.pptx`. The slides are the outline; this is
the content. Section numbers map to slide numbers, and sections 7 and 8 cover two agenda
topics from slide 19 — scope and recursion — that have no slides of their own.

Every code result shown below was executed and verified.

> **A note on the slide code.** The code screenshots use a font with *ligatures*, which
> draws some character combinations as a single symbol. Where a slide shows `≡` or a
> wide triple bar, type **`===`** (three characters). Where it shows `⇒`, type **`=>`**
> (two characters). The code in these notes is plain text — copy it freely.

**Contents**

1. [Conditional statements](#1-conditional-statements-slides-35)
2. [Booleans: truthy and falsy](#2-booleans-truthy-and-falsy-slide-6)
3. [For loops](#3-for-loops-slides-712)
4. [While loops](#4-while-loops-slide-13)
5. [Error handling](#5-error-handling-slides-1418)
6. [Functions](#6-functions-slides-1923)
7. [Scope and closures](#7-scope-and-closures-slide-19-agenda)
8. [Recursion](#8-recursion-slide-19-agenda)

---

## 1. Conditional statements (slides 3–5)

### `if`, `else if`, `else`

```js
if (score >= 90) {
  grade = "A";
} else if (score >= 75) {
  grade = "B";
} else {
  grade = "C";
}
```

The conditions are checked **top to bottom, and the first true one wins** — the rest are
skipped entirely. Order matters: put `score >= 75` first and nobody ever gets an A.

**Always use braces**, even for one line. This is legal:

```js
if (loggedIn) showDashboard();
```

but the moment someone adds a second line, it silently stops being part of the `if`:

```js
if (loggedIn)
  showDashboard();
  loadMessages();     // runs ALWAYS — the indentation lies
```

### Guard clauses

Deeply nested `if` statements are hard to read. Often you can flip the condition and leave
early instead:

```js
// nested
function process(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.paid) {
        ship(order);
      }
    }
  }
}

// guard clauses — same logic, flat
function process(order) {
  if (!order) return;
  if (order.items.length === 0) return;
  if (!order.paid) return;
  ship(order);
}
```

Each guard handles one bad case and gets out of the way. The "happy path" is left at the
bottom, unindented.

### `switch`

```js
switch (day) {
  case "Saturday":
  case "Sunday":
    type = "weekend";
    break;
  case "Friday":
    type = "almost weekend";
    break;
  default:
    type = "weekday";
}
```

Three things about `switch` that are not obvious from its syntax:

**1. Each `case` holds a value, not a condition.** `switch` compares the expression against
each case using **strict equality (`===`)**. The slide's placeholder names
(`condition1`, `condition2`) suggest otherwise, and that leads to this common mistake:

```js
const age = 7;
switch (age) {
  case age > 5:          // this is the VALUE true
    console.log("older than five");
    break;
  default:
    console.log("default");
}
// prints "default" — because it checks 7 === true
```

If you need ranges or conditions, use `if`/`else if`. (There is a trick —
`switch (true)` — but an `if` chain says what it means more clearly.)

**2. Without `break`, execution falls through** into the next case and keeps going:

```js
switch (2) {
  case 1: console.log("one");
  case 2: console.log("two");
  case 3: console.log("three");
}
// two
// three
```

Forgetting a `break` is the classic `switch` bug. Fall-through is useful only in the
deliberate form shown above — several cases stacked with no code between them, sharing one
body (`"Saturday"` and `"Sunday"`).

**3. `default` runs when nothing matches.** It is optional, but including it makes your
intent explicit — even if it only throws an error for an unexpected value.

### The conditional (ternary) operator

```js
const label = count === 1 ? "item" : "items";
```

An *expression*, not a statement: it produces a value. Use it when you are choosing between
two values. Use `if` when you are choosing between two actions. Do not nest it.

---

## 2. Booleans: truthy and falsy (slide 6)

Any value used where a boolean is expected — an `if`, a `while`, `&&`, `||`, `!` — is
converted to `true` or `false`.

**There are exactly eight falsy values:**

```js
false   0   -0   0n   ""   null   undefined   NaN
```

The slide lists six of them. The two it leaves out are rarely seen: `-0` (negative zero,
which exists in floating point) and `0n` (zero as a `BigInt`). Everything **not** on this
list is truthy — including `[]`, `{}`, `"0"`, `"false"` and `" "`.

This was covered in depth in Class 02, section 6. The practical rules again:

```js
if (items.length) { }       // works, but means "length is not 0"
if (items.length > 0) { }   // says what you mean

if (name) { }               // false for "" — is an empty name really "missing"?
if (name !== undefined) { } // be explicit about what you are checking
```

### Converting to boolean

Two ways to get an actual `true`/`false` from any value:

```js
Boolean("hello")    // true
!!"hello"           // true
!!0                 // false
```

`!!` is the "cast-to-boolean operator" from the slide — though it is really two operators.
The first `!` converts to boolean *and* inverts; the second inverts back. `Boolean(x)` does
the same thing and is easier to read.

### Short-circuiting

`&&` and `||` stop evaluating as soon as the result is known, and they return one of their
**operands**, not necessarily a boolean:

```js
user && user.name      // if user is falsy, returns user; otherwise user.name
input || "default"     // first truthy value, or the last one
input ?? "default"     // like ||, but only replaces null and undefined
```

`??` (nullish coalescing) matters whenever `0` or `""` is a legitimate value:

```js
const volume = settings.volume || 50;   // a volume of 0 becomes 50 — bug
const volume = settings.volume ?? 50;   // 0 stays 0
```

---

## 3. For loops (slides 7–12)

### The basic `for` loop (slide 8)

```js
for (let i = 0; i < 5; i++) {
  console.log(i);    // 0 1 2 3 4
}
```

The slide calls it "most basic, commonly used, most complicated", and the three parts in the
parentheses are why:

| Part | Runs | Job |
|---|---|---|
| `let i = 0` | once, before anything | initialise the counter |
| `i < 5` | before **every** iteration | keep going while true |
| `i++` | after **every** iteration | step |

Off-by-one errors live in that middle part. For an array, `i < arr.length` is correct;
`i <= arr.length` reads one element past the end and gets `undefined`.

Use the classic `for` when you need the **index**, need to step by something other than 1,
or need to go backwards:

```js
for (let i = arr.length - 1; i >= 0; i--) { }   // backwards
for (let i = 0; i < arr.length; i += 2) { }     // every second element
```

### `for...of` (slide 10)

```js
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
```

Gives you each **value** directly. It works on anything *iterable*: arrays, strings, `Map`,
`Set`, and the `NodeList` from Class 04. This is the default choice for walking through a
collection when you do not need the index.

Need both the index and the value? Use `entries()`:

```js
for (const [index, fruit] of fruits.entries()) {
  console.log(index, fruit);    // 0 apple, 1 banana, 2 cherry
}
```

(The `[index, fruit]` syntax is *destructuring* — Class 06, section 6.)

### `for...in` (slide 9)

```js
const person = { name: "Ana", age: 21 };
for (const key in person) {
  console.log(key, person[key]);    // name Ana, age 21
}
```

Gives you the **keys** of an object. The slide says it is "not used very often, better
alternatives exist". Here is why, and what the alternatives are.

**On arrays it gives you the wrong thing:**

```js
for (const i in ["a", "b", "c"]) {
  console.log(typeof i);     // "string", three times
}
```

The keys are the *strings* `"0"`, `"1"`, `"2"`, not numbers and not the values. Code like
`i + 1` then produces `"01"`. **Never use `for...in` on an array.**

**On objects it includes inherited properties**, walking up the prototype chain (Class 02,
section 2). Usually you only want the object's own properties.

The better alternatives, covered fully in Class 06:

```js
Object.keys(person)      // ["name", "age"]
Object.values(person)    // ["Ana", 21]
Object.entries(person)   // [["name", "Ana"], ["age", 21]]

for (const [key, value] of Object.entries(person)) {
  console.log(key, value);
}
```

These return own properties only, as a real array you can use with `for...of`, `map` or
`filter`.

**Memory aid: `of` gives values, `in` gives keys.**

### `break` and `continue` (slides 11–12)

```js
for (const n of [1, 2, 3, 4, 5]) {
  if (n === 4) break;          // stop the loop entirely
  if (n % 2 === 0) continue;   // skip the rest of THIS iteration
  console.log(n);              // 1, 3
}
```

- **`break`** exits the loop immediately. Slide 11 uses it for a search: once you have
  found the target, there is no reason to keep looking.
- **`continue`** jumps straight to the next iteration. Slide 12 uses it to skip even numbers.

Both work in `for`, `for...of`, `for...in`, `while` and `do...while` loops. They do **not**
work inside a `forEach` callback (Class 06) — `forEach` has no way to stop early. If you
need to stop, use `for...of`, or a method like `find` or `some` that stops on its own.

---

## 4. While loops (slide 13)

### `while`

```js
let attempts = 0;
while (attempts < 3 && !connected) {
  connected = tryToConnect();
  attempts++;
}
```

Checks the condition **before** each iteration, so the body may run zero times.

Use `while` when you **do not know in advance how many iterations** you need — reading input
until it is valid, retrying until success, processing a queue until it is empty. When you
are counting through a known range, `for` says it better.

### `do...while`

```js
let answer;
do {
  answer = prompt("Type yes or no");
} while (answer !== "yes" && answer !== "no");
```

Checks the condition **after** each iteration, so the body always runs **at least once**.
Asking for input until it is valid is the textbook case: you have to ask before you have
anything to check.

### Infinite loops

The danger with `while` is forgetting to make progress:

```js
let i = 0;
while (i < 10) {
  console.log(i);
  // forgot i++ — this never ends
}
```

Recall from Class 02, section 2 that JavaScript is single-threaded. An infinite loop does
not just run forever in the background — it **freezes the whole page**. No clicks, no
rendering, nothing. In the browser you have to close the tab.

Before writing a `while`, ask: *what in the loop body moves me closer to the condition
becoming false?*

---

## 5. Error handling (slides 14–18)

### Why (slide 15)

The slide lists eight reasons. They boil down to two:

1. **Things go wrong that are not your fault** — the network drops, the user types letters
   into a number field, a file is missing. Your code should respond sensibly, not crash.
2. **When something does go wrong, you need to know what, and where.** A clear error close
   to the cause is worth far more than a strange result three functions later.

### The error object

When something goes wrong, JavaScript creates an **error object** and *throws* it.

```js
try {
  null.length;
} catch (error) {
  console.log(error.name);     // "TypeError"
  console.log(error.message);  // "Cannot read properties of null (reading 'length')"
  console.log(error.stack);    // where it happened, function by function
}
```

| Property | Contains |
|---|---|
| `name` | The kind of error — `TypeError`, `RangeError`, ... |
| `message` | A human-readable description |
| `stack` | The call stack at the moment it was created — your best debugging tool |

The built-in types you will meet most:

| Type | Meaning | Example |
|---|---|---|
| `TypeError` | Wrong kind of value | Calling something that is not a function |
| `ReferenceError` | Variable does not exist | A typo in a variable name |
| `RangeError` | Value outside the allowed range | `new Array(-1)`, runaway recursion |
| `SyntaxError` | Code or data could not be parsed | `JSON.parse("{bad")` |

### Catching errors: `try...catch` (slide 16)

```js
try {
  const data = JSON.parse(userInput);
  show(data);
} catch (error) {
  showMessage("That is not valid data: " + error.message);
}
```

If anything in the `try` block throws, execution jumps immediately to `catch`. The rest of
the `try` block is skipped. If nothing throws, `catch` never runs.

The slide's most important line is in capitals, and deserves explaining:

> **NEVER catch errors that you don't know how to handle.**

This is the worst thing you can do with `try...catch`:

```js
try {
  saveOrder(order);
} catch (e) {
  // ignore
}
```

The error still happened. The order still was not saved. But now nobody knows — not the
user, not you, not the logs. The program carries on as if it worked, and the problem shows
up later, somewhere else, with no clue as to the cause. This is called **swallowing** an
error, and it turns an easy bug into a very hard one.

**Only catch an error if you can do something useful about it**: show the user a message,
try a fallback, retry. Otherwise, let it propagate up to code that *can* handle it. An
uncaught error with a clear stack trace is a gift.

If you catch an error and realise you cannot handle *this* particular one, throw it again:

```js
try {
  loadSettings();
} catch (error) {
  if (error instanceof SyntaxError) {
    useDefaultSettings();      // we know how to handle this one
  } else {
    throw error;               // not ours — pass it on
  }
}
```

### Throwing errors (slide 17)

You can throw your own errors when **an invariant is violated** — when your function
receives something it cannot sensibly work with:

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}
```

Notice this function would not *crash* without the check — `1 / 0` is simply `Infinity`.
Throwing is a **design decision**: you are saying that for this function, dividing by zero
means the caller made a mistake, and you want them told about it loudly.

Use the most specific built-in type that fits:

```js
function factorial(n) {
  if (typeof n !== "number") throw new TypeError("n must be a number");
  if (n < 0 || !Number.isInteger(n)) throw new RangeError("n must be a non-negative integer");
  // ...
}
```

**Always throw `Error` objects**, never plain strings. `throw "oops"` is legal, but a string
has no `stack` property — you lose the information about where the problem happened.

### Cleaning up: `finally` (slide 18)

```js
showSpinner();
try {
  loadData();
} finally {
  hideSpinner();     // runs whether loadData succeeded or threw
}
```

`finally` runs **no matter how the `try` block ends** — normally, by throwing, or even by
`return`. It is for cleanup that must happen regardless: hiding a loading indicator,
closing a connection, releasing a lock.

All three parts can be combined, and that is the most common full form:

```js
try {
  loadData();
} catch (error) {
  showMessage("Could not load data");
} finally {
  hideSpinner();
}
```

One trap: a `return` inside `finally` **overrides** the `try` block's `return`, and even
swallows a thrown error. Never return from `finally`.

```js
function f() {
  try {
    return "from try";
  } finally {
    return "from finally";
  }
}
f();    // "from finally"
```

### What `try...catch` cannot catch

`try...catch` only catches errors thrown **while the `try` block is running**. Code
scheduled to run later — a timer, an event handler — runs after the `try` block has
finished, so its errors are not caught:

```js
try {
  setTimeout(() => {
    throw new Error("too late");    // NOT caught by the catch below
  }, 100);
} catch (e) {
  console.log("never runs");
}
```

This follows directly from the event loop in Class 02, section 2. The `try` block finished
long ago. Put the `try...catch` *inside* the callback instead. (Asynchronous error handling
gets its own treatment when we cover promises.)

---

## 6. Functions (slides 19–23)

Class 02, section 3 and Lecture 01's Exercise 6 introduced the three ways to write a
function. This section fills in the detail.

### Declarations (slide 20)

```js
function add(a, b) {
  return a + b;
}
```

The parts the slide names:

- **Name** — `add`. How you refer to it, and what appears in stack traces.
- **Parameters** — `a` and `b`. Local variables, filled in by the arguments of each call.
- **Return value** — what the call evaluates to. `return` also ends the function
  immediately.

Declarations are **hoisted**: you can call them before they appear in the file.

### Calling functions

JavaScript is relaxed about arguments — it never complains about the wrong number:

```js
function greet(name, greeting) {
  return `${greeting}, ${name}`;
}

greet("Ana", "Hello");        // "Hello, Ana"
greet("Ana");                 // "undefined, Ana"  — missing argument is undefined
greet("Ana", "Hi", "extra");  // "Hi, Ana"         — extra argument ignored
```

**Default parameters** handle missing arguments cleanly:

```js
function greet(name, greeting = "Hello") {
  return `${greeting}, ${name}`;
}
greet("Ana");                 // "Hello, Ana"
```

A default is used only when the argument is `undefined` — passing `null` or `""` does not
trigger it.

A function with no `return`, or a bare `return;`, returns `undefined`.

**Parameters are copies of the values passed in** — but remember Class 02, section 4:
for objects and arrays, the value *is a reference*. A function can modify an object passed
to it, and the caller will see the change:

```js
function addItem(list) {
  list.push("new");    // modifies the caller's array
}
const items = [];
addItem(items);
items;                 // ["new"]
```

### Function expressions (slide 21)

```js
const add = function (a, b) {
  return a + b;
};
```

"Sometimes we don't need a name." A function expression creates a function as a *value*,
which you can store in a variable — or, more often, pass straight to another function
without naming it at all. That second use is the one on slide 21, and you met it in
Class 04:

```js
button.addEventListener("click", function () {
  console.log("clicked");
});
```

A function passed to another function like this is called a **callback**.

Unlike declarations, function expressions are **not hoisted** — the variable exists, but
holds `undefined` until the assignment line runs.

### IIFE — Immediately Invoked Function Expressions (slide 22)

```js
(function () {
  const secret = "not visible outside";
  console.log("runs immediately");
})();
```

Read it from the inside out: a function expression, wrapped in parentheses so it is treated
as a value, followed by `()` to call it straight away.

**Why would you do this?** For the reasons on the slide — encapsulation and not polluting
the global scope. Variables declared inside exist only inside (section 7 explains why).
Before `let`, `const` and modules existed, this was the only way to keep a script's
variables from colliding with every other script on the page.

Today, **modules** (`<script type="module">`, Class 03, section 4) give every file its own
scope automatically, so you will write IIFEs rarely. But you will *read* them constantly in
older code and in library source, so recognise the pattern.

### Arrow functions (slide 23)

```js
const add = (a, b) => a + b;
```

"Removes the fluff." The forms you will see:

```js
const square = x => x * x;                // one parameter: parentheses optional
const random = () => Math.random();       // no parameters: () required
const add = (a, b) => a + b;              // expression body: return is implicit
const add = (a, b) => {                   // block body: return is required
  const sum = a + b;
  return sum;
};
```

With braces, you **must** write `return` — forgetting it is a common bug, and the function
quietly returns `undefined`.

**Returning an object literal needs parentheses**, because otherwise the braces are read as
a block:

```js
const makeUser = name => { name: name };    // returns undefined!
const makeUser = name => ({ name: name });  // returns { name: "..." }
```

### `this`, and why arrow functions are different

The slide mentions that arrow functions "don't bind `this`". We have not covered `this` yet,
so here is enough to make that sentence mean something.

**`this` is a special variable whose value depends on how a function is called.** In a
method called on an object, it is the object:

```js
const user = {
  name: "Ana",
  greet: function () {
    return "Hi, I am " + this.name;
  },
};
user.greet();    // "Hi, I am Ana" — called as user.greet(), so this is user
```

You met this in Class 04 too, without the name: in a `function` passed to
`addEventListener`, `this` is the element the listener is attached to.

**Arrow functions do not get their own `this`.** They use the `this` of the code around
them, as if it were an ordinary variable from the outer scope. So an arrow function makes a
poor method:

```js
const user = {
  firstName: "Ana",
  greet: () => "Hi, I am " + this.firstName,   // this is NOT user here
};
user.greet();
// in a regular <script>:    "Hi, I am undefined"
// in a module script:       TypeError — this is undefined there
```

(The example deliberately avoids a property called `name`. In a regular script, the outer
`this` is `window` — and `window.name` happens to exist, as an empty string. The bug would
still be there, just harder to spot: you would get `"Hi, I am "`.)

That same property makes arrows *ideal* inside methods, where you want the outer `this`:

```js
const timer = {
  seconds: 0,
  start: function () {
    setInterval(() => {
      this.seconds++;      // arrow: this is still timer
    }, 1000);
  },
};
```

With a `function` callback there, `this` would not be `timer`. Worse, nothing would warn
you: in a regular script, `this.seconds++` would quietly create `window.seconds` and set it
to `NaN`, while `timer.seconds` stayed at 0. Before arrow functions existed, people wrote
`const self = this;` to work around it — you will still see that in older code.

**Rule of thumb:** use regular functions (or the method shorthand, Class 06) for object
methods; use arrows for callbacks.

---

## 7. Scope and closures (slide 19, agenda)

The slide 19 agenda lists *function scope*. This section covers it, and the idea that grows
directly out of it — closures — which is one of the most important ideas in JavaScript.

### Scope: where a variable is visible

**Scope** is the region of code where a variable exists. There are three levels:

```js
const app = "global";              // global scope — visible everywhere

function f() {
  const local = "function";        // function scope — visible inside f only

  if (true) {
    const inner = "block";         // block scope — visible inside these braces only
    console.log(app, local, inner);  // all three visible
  }
  console.log(inner);              // ReferenceError: inner is not defined
}
```

`let` and `const` are **block-scoped** — any pair of braces is a scope, including `if`,
`for` and plain `{ }`. `var` is **function-scoped** and ignores blocks entirely (Class 02,
section 3), which is one of the reasons not to use it.

### Lexical scope: inner sees outer, never the reverse

Scopes nest. Code can see variables in its own scope and in **every scope that encloses
it**, all the way out to global. It cannot see into scopes nested inside it.

```js
const a = 1;
function outer() {
  const b = 2;
  function inner() {
    const c = 3;
    console.log(a, b, c);   // 1 2 3 — sees outward
  }
  inner();
  console.log(c);           // ReferenceError — cannot see inward
}
```

This is called **lexical** scope because it is determined by where the code is *written*,
not by where or how it is called. You can work out what any variable refers to just by
reading the nesting.

If an inner scope declares a variable with the same name as an outer one, the inner one
**shadows** the outer — the outer still exists, it is just hidden from that point inward.
Shadowing is legal but makes code confusing; give variables distinct names.

### Closures

Here is where it gets interesting. What happens to `count` when `makeCounter` finishes?

```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
counter();    // 1
counter();    // 2
counter();    // 3
```

`makeCounter` has returned. Its local variable `count` should be gone. Yet the returned
function still reads and updates it.

**A function remembers the scope it was created in**, and keeps those variables alive for as
long as the function itself exists. The combination of a function and the variables it
remembers is a **closure**.

Each call to `makeCounter` creates a *new* scope, so each counter is independent:

```js
const a = makeCounter();
const b = makeCounter();
a();  a();  a();     // 3
b();                 // 1 — b has its own count
```

And `count` is completely **private**. No code outside can read or reset it except through
the function. That is real encapsulation, without classes.

### You have already been using closures

Every event handler in Lecture 02 that used a variable from outside was a closure:

```js
const list = document.querySelector("#list");
let total = 0;

button.addEventListener("click", () => {
  total++;                         // remembered from the outer scope
  list.append(`Item ${total}`);    // so is list
});
```

The handler runs long after this code finished — whenever the user clicks — and `total`
and `list` are still there, because the handler closed over them.

### The loop trap

A classic bug, and the real reason `let` replaced `var`:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3, 3, 3
```

`var` is function-scoped, so there is only **one** `i`, shared by all three callbacks. By
the time they run, the loop has finished and `i` is 3.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0, 1, 2
```

`let` is block-scoped, and a `for` loop creates a **fresh `i` for every iteration**. Each
callback closes over its own copy.

---

## 8. Recursion (slide 19, agenda)

### A function that calls itself

The slide 19 agenda lists recursion, and Exercise 01 asks you to use it. A **recursive**
function solves a problem by calling itself on a smaller version of the same problem.

Factorial is the standard first example. `5!` is `5 × 4 × 3 × 2 × 1`, which is
`5 × 4!` — the same problem, one size smaller:

```js
function factorial(n) {
  if (n <= 1) {
    return 1;                      // base case — stop here
  }
  return n * factorial(n - 1);     // recursive case — smaller problem
}

factorial(5);    // 120
```

Every recursive function needs both parts:

1. **A base case** — a version of the problem small enough to answer directly, without
   recursing. Here, `0!` and `1!` are both `1`.
2. **A recursive case** — which must move **towards** the base case. Here `n - 1` gets
   closer to 1 each time.

### What actually happens: the call stack

Each call waits for the one it made to finish:

```
factorial(5)
  = 5 * factorial(4)
      = 4 * factorial(3)
          = 3 * factorial(2)
              = 2 * factorial(1)
                  = 1                ← base case reached
              = 2 * 1  = 2
          = 3 * 2      = 6
      = 4 * 6          = 24
  = 5 * 24             = 120
```

Each waiting call occupies a place on the **call stack** — the same stack you see in the
Sources tab of devtools (Class 02, section 7). Set a breakpoint on the base case and look at
the Call Stack panel: you will see `factorial` listed five times.

### Stack overflow

The stack is not infinite. Forget the base case, or write one that is never reached, and the
calls pile up until the engine gives up:

```js
function broken(n) {
  return n * broken(n - 1);    // no base case
}
broken(5);
// RangeError: Maximum call stack size exceeded
```

When you see that error, look for a missing or unreachable base case.

A base case can also *hide* a problem. The correct `factorial` above, given bad input,
does not crash at all:

```js
factorial(-1);     // 1     — -1 <= 1, so the base case answers immediately
factorial(2.5);    // 3.75  — 2.5 × 1.5 × 1, then 0.5 hits the base case
```

Both answers are nonsense, delivered silently. A crash would at least have told you
something was wrong. This is exactly why section 5's version validates its input and
throws a `RangeError` instead.

### Recursion or a loop?

Anything recursive can also be written with a loop:

```js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

For factorial, the loop is simpler and cannot overflow the stack. Recursion earns its place
when the **data itself is recursive** — when a thing contains smaller things of the same
kind. The DOM from Class 04 is exactly that: an element contains elements, which contain
elements.

```js
function countElements(node) {
  let count = 1;                          // this element
  for (const child of node.children) {
    count += countElements(child);        // plus everything inside each child
  }
  return count;
}

countElements(document.body);
```

Try writing that one with a plain loop. Folder structures, comment threads and menus with
sub-menus all have the same shape.

### How big can a factorial get?

Factorials grow astonishingly fast, and they make a good tour of how JavaScript numbers
behave (Class 02, section 4):

| n | What happens |
|---|---|
| up to 18 | Exact, and below `Number.MAX_SAFE_INTEGER` |
| 19 – 22 | Above `MAX_SAFE_INTEGER` — but still exact, by luck: factorials contain many factors of 2, which floating point stores for free |
| 23 and up | **No longer exact.** The result is close, but the last digits are wrong |
| 171 and up | `Infinity` |

"Safe" means *every* integer up to that point can be stored exactly. Beyond it, some still
can and some cannot — you can no longer rely on it.

For exact large integers, use **`BigInt`** — integer literals with an `n` suffix:

```js
function factorialBig(n) {
  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result;
}

factorialBig(25n);    // 15511210043330985984000000n — exact
```

`BigInt` and ordinary numbers cannot be mixed in arithmetic — `1n + 1` is a `TypeError`.
Convert explicitly with `BigInt(x)` or `Number(x)`.

---

## Further reading

- **MDN: Control flow and error handling** —
  <https://developer.mozilla.org/docs/Web/JavaScript/Guide/Control_flow_and_error_handling>
- **MDN: Loops and iteration** —
  <https://developer.mozilla.org/docs/Web/JavaScript/Guide/Loops_and_iteration>
- **MDN: Functions** — <https://developer.mozilla.org/docs/Web/JavaScript/Guide/Functions>
- **MDN: Closures** — <https://developer.mozilla.org/docs/Web/JavaScript/Closures>
- **javascript.info: Recursion and stack** — <https://javascript.info/recursion>

---

*Internet Programming · UACS · Lecture 03*
