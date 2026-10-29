# Class 09 — Asynchronous JavaScript

Companion notes for `Class09-AsynchronousJavaScript.pptx`. The slides are the outline; this is
the content. Section numbers map to slide numbers. Section 4, on the **event loop**, is the
foundation for everything after it — if callbacks, promises or `await` ever surprise you, the
answer is almost always there.

Every example was run with Node 24, and the output shown is the real output. Timings were
measured on a Windows laptop; yours will differ by a few milliseconds. Type errors were
checked with the TypeScript 7 compiler (`tsc` 7.0). The examples are TypeScript where the
types help, and plain JavaScript where they would only add noise — Node runs both directly
(`node file.ts`, see [Lecture 04, Class 07, section 8](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md)).

These notes build on two earlier ones: the event loop sketch in
[Lecture 01, Class 02, section 2](../../Lecture01/Materials/Class02-GettingStartedJS.md), and
functions, closures and `try...catch` in
[Lecture 03, Class 05](../../Lecture03/Materials/Class05-FunctionsStructures.md).

**Contents**

1. [Synchronous code execution](#1-synchronous-code-execution-slide-3)
2. [Asynchronous code execution](#2-asynchronous-code-execution-slide-4)
3. [Common asynchronous scenarios](#3-common-asynchronous-scenarios-slide-5)
4. [The JavaScript event loop](#4-the-javascript-event-loop-slide-6)
5. [Callbacks](#5-callbacks-slide-7)
6. [Promises](#6-promises-slide-8)
7. [Async/await](#7-asyncawait-slide-9)
8. [Common mistakes](#8-common-mistakes)

---

## 1. Synchronous code execution (slide 3)

**Synchronous** code runs one statement at a time, in the order it is written. Each statement
finishes before the next one starts — everything you have written in this course so far. The
slide's bullets about linear order and being **easy to comprehend** are exactly right: you can
read synchronous code top to bottom and know what happens when.

### Blocking

The cost is that a slow statement **blocks** everything after it. Node can read a file either
way, which makes the difference easy to see:

```ts
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";

console.log("1. reading synchronously");
const a = readFileSync("settings.json", "utf8");
console.log("2. got", a.length, "chars — nothing else could run meanwhile");

console.log("3. reading asynchronously");
readFile("settings.json", "utf8").then((b) => console.log("5. got", b.length, "chars"));
console.log("4. readFile returned immediately");
```

```
1. reading synchronously
2. got 52 chars — nothing else could run meanwhile
3. reading asynchronously
4. readFile returned immediately
5. got 52 chars
```

`readFileSync` makes the program stand still until the disk answers. `readFile` starts the
read, returns at once, and delivers the result later. For a small file the difference is a
millisecond; for a network request that takes two seconds, it is the difference between a
working page and a frozen one. That is the slide's **can lead to unresponsiveness**: in the
browser, the page is redrawn and clicks are handled on the same single thread as your code
(section 4), so while your code waits, nothing else happens.

### "Easy to scale" — not quite

The slide lists **easy to scale** as an advantage. That is true of the *code* — a long
sequence of steps stays readable as it grows — but not of the *program*. A server that handles
a request synchronously can do nothing else while it waits for the database, so serving many
users needs many threads or processes, each mostly idle. Waiting without blocking is exactly
why Node's asynchronous model handles many connections well. For anything that waits on
input/output, synchronous code **scales badly**.

---

## 2. Asynchronous code execution (slide 4)

**Asynchronous** code starts an operation and moves on without waiting for it. The result
arrives later, and some code you provided runs then. In the example above, `readFile` was
asynchronous: line 4 printed before line 5.

The slide's points:

- **Does not block subsequent tasks** — correct, and the whole reason to do it.
- **Very useful when working with external devices** — correct. The disk, the network, the
  keyboard and the mouse are all slow compared to the processor. Asynchronous code lets the
  program do useful work instead of waiting for them.
- **Hard to comprehend** — at first, yes. Code no longer runs in the order it is written.
  Sections 6 and 7 are about getting that readability back.

### Concurrent, not parallel

The slide says asynchronous tasks run **concurrently** and are **easy to parallelize**. These
words are often used as synonyms. They are not, and the difference matters in JavaScript:

| | Meaning | JavaScript |
|---|---|---|
| **Concurrent** | Several tasks are *in progress* at the same time; their steps take turns | Yes — this is what async code gives you |
| **Parallel** | Several tasks are *executing* at the same instant, on different processor cores | Not your JavaScript code, unless you use workers |

When you start three network requests, the **waiting** happens in parallel — the operating
system and the browser's network stack handle all three at once. But your JavaScript that
handles each response runs **one at a time**, on the one thread. Async code does not make a
slow calculation faster: two CPU-heavy functions still run one after the other.

For real parallel JavaScript you need a second thread: **Web Workers** in the browser,
**`worker_threads`** in Node. Each runs its own code on its own thread and talks to the main
thread by sending messages — the right tool for heavy computation, and outside this class.

### "Hard to synchronize"

With threads, "synchronization" means stopping two threads changing the same data at once.
Single-threaded JavaScript never has that problem (section 4). What *is* hard is
**coordinating order**: do this after both of those finish; give up after five seconds; if one
of three requests fails, what then? Section 6 has the tools — `Promise.all` and friends.

---

## 3. Common asynchronous scenarios (slide 5)

Anything that waits for the outside world is asynchronous in JavaScript:

| Scenario | Browser | Node |
|---|---|---|
| **Network requests** | `fetch()` — Class 10 | `fetch()`, HTTP servers |
| **File operations** | Reading a file the user picked: `await file.text()` | `node:fs/promises` |
| **User interfaces** | Animations, `requestAnimationFrame`, timers | — |
| **Event handling** | Clicks, key presses, `load` — Lecture 02, Class 04, section 5 | Incoming requests, streams |
| **Parallel processing** | Web Workers | `worker_threads` |
| **Timers** | `setTimeout`, `setInterval` | the same, plus `node:timers/promises` |

Timers are missing from the slide, but they are the simplest asynchronous API there is, and
the examples in these notes use them constantly to stand in for "something slow".

### Event handlers are callbacks — but dispatch can be synchronous

An event listener (Lecture 02, Class 04, section 5) is the oldest form of asynchronous
callback: you register it now; it runs whenever the user clicks. One detail surprises people:
when **your code** fires an event — `button.click()` or `dispatchEvent(...)` — the listeners
run **immediately**, synchronously, before that call returns. Only a real click from the user
arrives from outside, through the task queue in section 4.

---

## 4. The JavaScript event loop (slide 6)

### Single-threaded, by design

**Your JavaScript code runs on one thread.** There is one call stack, and only one function is
ever executing at a time
([Lecture 01, Class 02, section 2](../../Lecture01/Materials/Class02-GettingStartedJS.md)).
The browser and Node themselves use many threads — for networking, disk access, rendering — but
the code *you* write gets only one.

That is why, as the slide says, JavaScript **must be asynchronously oriented**: on a single
thread, any waiting would freeze everything. So JavaScript never waits. It asks the
environment to do the slow thing and to call back when it is done.

### Run-to-completion

A consequence that you can rely on: **once a function starts, nothing interrupts it.** No timer,
click or network response can run in the middle of your code. They wait until the call stack is
empty:

```ts
let counter = 0;

setTimeout(() => console.log("timer sees", counter), 0);

for (let i = 0; i < 1_000_000; i++) {
  counter++;
}
console.log("loop done", counter);
```

```
loop done 1000000
timer sees 1000000
```

The timer was due almost immediately, but it could only run after the loop and everything
else in the script had finished. This is **run-to-completion**, and it is why JavaScript has
no data races: between two of your statements, no other JavaScript can sneak in and change
your variables. (Inside an `async` function, an `await` is the exception — the function pauses
there, and other code can run. Section 7.)

### The pieces

| Piece | What it is |
|---|---|
| **Call stack** | The functions currently running ([Lecture 03, Class 05, section 8](../../Lecture03/Materials/Class05-FunctionsStructures.md)) |
| **Task queue** (also called the *macrotask* or *callback* queue) | Callbacks for things that have happened: timers that expired, clicks, network data arriving |
| **Microtask queue** | Promise reactions (`.then`, `.catch`, `await` resuming) and `queueMicrotask` callbacks |
| **Event loop** | The mechanism that moves work from the queues onto the stack |

The slide's description — *when a task is ready, it enters a task queue; the event loop takes
tasks from the task queue* — is right, but there are **two** queues, and the difference is the
key to every ordering puzzle. One turn of the loop goes:

1. Take **one** task from the task queue and run it to completion.
2. Then run **every** microtask in the microtask queue — including any microtasks that those
   microtasks add — until it is empty.
3. In the browser: redraw the page if needed.
4. Repeat.

The script itself counts as the first task. So:

> **Microtasks always run before the next task.** Every `.then` callback that is ready runs
> before any `setTimeout` callback, however short the delay.

### The classic puzzle

What does this print?

```ts
console.log("1: script start");

setTimeout(() => console.log("2: setTimeout 0"), 0);

Promise.resolve().then(() => console.log("3: promise.then"));

queueMicrotask(() => console.log("4: queueMicrotask"));

console.log("5: script end");
```

```
1: script start
5: script end
3: promise.then
4: queueMicrotask
2: setTimeout 0
```

Step by step:

1. The script is the current task. It logs `1`, registers a timer, queues the `.then`
   callback and the `queueMicrotask` callback as **microtasks**, and logs `5`.
2. The script ends. Before anything else, all microtasks run, in the order they were queued:
   `3`, then `4`.
3. Only now does the loop take the next task — the expired timer: `2`.

A harder one. Work it out before you read the answer:

```ts
console.log("A");
setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => console.log("C"));
}, 0);
setTimeout(() => console.log("D"), 0);
Promise.resolve()
  .then(() => console.log("E"))
  .then(() => console.log("F"));
console.log("G");
```

```
A
G
E
F
B
C
D
```

`E` and `F` both run before the first timer: `F`'s microtask is queued while `E`'s runs, and
the queue is drained until it is empty. Then the first timer runs (`B`), and the microtask it
queued (`C`) runs **before the second timer** (`D`) — microtasks are drained after every task,
not just after the script.

A warning that follows from rule 2: since the loop keeps draining microtasks until none are
left, a microtask that keeps queuing another microtask never lets the loop move on. Timers
never fire, and the page never repaints — as frozen as an infinite loop.

### `setTimeout`: a minimum, not a promise

```ts
setTimeout(callback, delayInMs);
```

`setTimeout` asks for `callback` to be put in the task queue **after at least** `delayInMs`
milliseconds. The delay is a **minimum**. The callback runs only once the delay has passed
*and* the call stack is empty *and* every task ahead of it has run.

Block the thread, and the timer has to wait:

```ts
const start = Date.now();

setTimeout(() => {
  console.log(`timer fired after ${Date.now() - start} ms`);
}, 100);

// Busy loop: keep the thread occupied for 1 second
while (Date.now() - start < 1000) {
  // spin
}
console.log(`loop finished after ${Date.now() - start} ms`);
```

```
loop finished after 1000 ms
timer fired after 1004 ms
```

Asked for 100 ms, got 1004 ms. In a browser, that same second also means no repainting, no
scrolling, and clicks that do nothing until the loop ends — then all fire at once. This is why
heavy computation does not belong on the main thread.

Even with nothing blocking, the delay is not exact:

- **`setTimeout(fn, 0)` does not mean "now"**, but "after the current task and its
  microtasks". In Node, a delay below 1 is treated as 1 ms.
- **Browsers clamp nested timers** to at least 4 ms once they are nested five deep. Measured in
  Chrome, ten nested `setTimeout(fn, 0)` calls took 0.7, 14.6, 3.7, 0.9, 0.0, 0.0, 5.0, 4.4,
  4.2 and 4.2 ms — the last four are the clamp.
- **The operating system matters.** The same chain in Node on Windows took about 15 ms per
  step — Windows' timer granularity. **Background tabs** are throttled harder still.

Use timers for "later", never for precise timing. To know how much time really passed,
measure it with `Date.now()` or `performance.now()`.

### `setInterval`

`setInterval` runs a callback repeatedly, every so many milliseconds, until you stop it with
`clearInterval`:

```ts
let n = 0;
const id = setInterval(() => {
  n++;
  console.log(`tick ${n}`);
  if (n === 3) {
    clearInterval(id);
    console.log("stopped");
  }
}, 500);
```

```
tick 1
tick 2
tick 3
stopped
```

`setTimeout` returns an id too; `clearTimeout(id)` cancels a timer that has not fired yet.
Every tick follows the same "minimum, not a guarantee" rule. An interval nobody clears runs —
and in Node keeps the process alive — forever.

---

## 5. Callbacks (slide 7)

### A function to call later

A **callback** is, as the slide says, a piece of code that should be executed later, when
something happens. In JavaScript that means a function, passed as an argument — functions are
values ([Lecture 03, Class 05, section 6](../../Lecture03/Materials/Class05-FunctionsStructures.md)).
You have used them since Lecture 02: every `addEventListener` and every `setTimeout` takes one.

Callbacks that run later usually rely on **closures**
([Lecture 03, Class 05, section 7](../../Lecture03/Materials/Class05-FunctionsStructures.md)):
the callback remembers the variables around it from when it was created, and can still use
them when it finally runs.

### The error-first convention

Node's original APIs all use the same shape: the callback's **first** parameter is an error
(or `null` if there was none), and the result comes after it:

```ts
import { readFile } from "node:fs";

readFile("missing.json", "utf8", (error, text) => {
  if (error) {
    console.log("Could not read:", error.code);
    return;
  }
  console.log(text);
});

console.log("readFile called, waiting...");
```

```
readFile called, waiting...
Could not read: ENOENT
```

The last line prints **first** — the read was only started. And **every** callback must check
`error` first, and `return` after handling it. Forget the `return`, and the code carries on
with a result that does not exist.

Errors have to be passed this way because `try...catch` cannot catch them: by the time the
callback runs, the `try` block has long finished
([Lecture 03, Class 05, section 5](../../Lecture03/Materials/Class05-FunctionsStructures.md),
"What `try...catch` cannot catch").

### Responsibility inversion

The slide's **responsibility inversion** — more often called **inversion of control** — is the
real problem with callbacks. When you pass a callback to someone else's function, *they*
decide when it is called, how often, and with what. You have handed over control of the rest
of your program. You are trusting them to call it:

- **exactly once** — not zero times, not twice;
- **with the right arguments**;
- **consistently** — always asynchronously, or always synchronously.

Here is what "twice" looks like. A third-party payment function forgets one `return`:

```js
// A third-party "payment" function with a bug: on error it calls back twice
function charge(amount, callback) {
  setTimeout(() => {
    if (amount > 100) {
      callback(new Error("Limit exceeded"));
    }
    callback(null, `charged ${amount}`);   // missing return above!
  }, 10);
}

charge(500, (error, receipt) => {
  if (error) {
    console.log("Payment failed:", error.message);
    return;
  }
  console.log("Shipping order:", receipt);
});
```

```
Payment failed: Limit exceeded
Shipping order: charged 500
```

Your code was correct. The order ships anyway. "Never" is the opposite bug — a library that
swallows an error and never calls back leaves your program waiting forever, with no message
at all.

**Sometimes-sync, sometimes-async** is the subtlest one. This function answers from a cache
immediately if it can, and asynchronously otherwise:

```ts
const cache = new Map<string, string>();

// BAD: sometimes calls back synchronously, sometimes asynchronously
function getUser(id: string, callback: (name: string) => void): void {
  const cached = cache.get(id);
  if (cached) {
    callback(cached);                 // synchronously, right now
    return;
  }
  setTimeout(() => {                  // asynchronously, later
    cache.set(id, `User ${id}`);
    callback(`User ${id}`);
  }, 10);
}

function show(id: string) {
  let label = "loading";
  getUser(id, (name) => console.log(`${name} (label was: ${label})`));
  label = "ready";
}

show("42");                           // first call: not cached
setTimeout(() => show("42"), 50);     // second call: cached
```

```
User 42 (label was: ready)
User 42 (label was: loading)
```

The same call behaves differently depending on whether the cache was warm — the code after
`getUser` runs either before or after the callback. Bugs like this appear only sometimes, and
are miserable to track down. The Node community nicknamed it **"releasing Zalgo"**. The rule:
**a function that takes a callback should always call it asynchronously, or always
synchronously — never sometimes one and sometimes the other.**

Promises fix all three problems by design (section 6).

### Callback hell — the pyramid of doom

Each asynchronous step that depends on the previous one needs its own callback, nested inside
the previous one. Three steps — get a user, then their courses, then a grade:

```js
getUser(1, (error, user) => {
  if (error) return console.error(error);
  getCourses(user.id, (error, courses) => {
    if (error) return console.error(error);
    getGrade(user.id, courses[0], (error, grade) => {
      if (error) return console.error(error);
      console.log(`${user.name}: ${courses[0]} -> ${grade}`);
    });
  });
});
```

```
Ana: Internet Programming -> 10
```

(`getUser`, `getCourses` and `getGrade` each wait 100 ms with `setTimeout` and then call back
with fake data.) Each new step adds a level of indentation, and the code drifts right into the
**pyramid** shape that gives it its name. The error check is repeated at every level. Adding
a loop — "the grades for *every* course" — or running two steps at once is much harder still.
This is what the slide means by **hard to understand, hard to maintain**.

### Flattening it with named functions

Much of the pyramid comes from writing every callback inline. Give each step a name, and the
nesting disappears (same output as above):

```js
function report(userId) {
  getUser(userId, onUser);

  function onUser(error, user) {
    if (error) return console.error(error);
    getCourses(user.id, (error, courses) => onCourses(error, user, courses));
  }

  function onCourses(error, user, courses) {
    if (error) return console.error(error);
    getGrade(user.id, courses[0], (error, grade) => onGrade(error, user, courses[0], grade));
  }

  function onGrade(error, user, course, grade) {
    if (error) return console.error(error);
    console.log(`${user.name}: ${course} -> ${grade}`);
  }
}
```

Flatter, and each step reads on its own. But data still has to be passed along by hand, the
error checks are still repeated, and inversion of control is untouched. A good habit — but the
real fix is promises.

---

## 6. Promises (slide 8)

### What a promise is

A **promise** is an object that stands for a result that is not available yet. Instead of
passing a callback *in*, an asynchronous function hands a promise *back* — and you decide what
to do with it.

A promise is always in one of three **states**:

| State | Meaning |
|---|---|
| **pending** | Not finished yet |
| **fulfilled** | Finished successfully, with a **value** |
| **rejected** | Failed, with a **reason** — normally an `Error` |

A promise that is fulfilled or rejected is **settled**. Settling happens **once**: after that,
the state and value never change.

```ts
console.log(delay(100));                 // Promise { <pending> }
console.log(Promise.resolve(42));        // Promise { 42 }
```

That once-only rule is what fixes inversion of control. Whoever creates the promise can settle
it only once, and every callback you attach is called at most once, always asynchronously (as a
microtask, section 4). Here is the buggy payment function from section 5, rewritten with a
promise and with **the same missing `return`**:

```js
function charge(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount > 100) {
        reject(new Error("Limit exceeded"));
      }
      resolve(`charged ${amount}`);        // same bug — but ignored: already settled
    }, 10);
  });
}

charge(500)
  .then((receipt) => console.log("Shipping order:", receipt))
  .catch((error) => console.log("Payment failed:", error.message));
```

```
Payment failed: Limit exceeded
```

The order does not ship.

### The `Promise` constructor

You create a promise with `new Promise`, passing an **executor** function. The executor
receives two functions: call `resolve(value)` to fulfil the promise, or `reject(reason)` to
reject it.

```ts
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

That two-line `delay` is the most useful promise you will write, and the examples below use
it constantly. The type `Promise<void>` says: *a promise that, when fulfilled, holds nothing
useful*. A promise holding a number is `Promise<number>` — a generic type, like the ones in
[Lecture 04, Class 08, section 4](../../Lecture04/Materials/Class08-AdvancedTypeScript.md).

Two facts about the executor that surprise people:

```ts
console.log("before");
const p = new Promise<string>((resolve) => {
  console.log("inside executor");
  resolve("done");
  resolve("again");
  console.log("still running after resolve");
});
p.then((v) => console.log("then:", v));
console.log("after");
```

```
before
inside executor
still running after resolve
after
then: done
```

- **The executor runs immediately and synchronously**, inside `new Promise`. A promise does not
  make code asynchronous by itself — only the *reactions* (`then`) are always asynchronous.
- **`resolve` does not stop the executor**, and calling it again is silently ignored. The
  first call wins.

You will write `new Promise` less than you might think. Most promises come from APIs that
already return them — `fetch`, `node:fs/promises` — or from other promises. Its main use is
**wrapping an old callback API**, below.

### Consuming promises: `then` and `catch`

```ts
promise.then(onFulfilled);        // runs with the value, if the promise fulfils
promise.catch(onRejected);        // runs with the reason, if the promise rejects
promise.finally(onSettled);       // runs either way, with no argument
```

For the rest of these notes, `getUser`, `getCourses` and `getGrade` are promise-returning
versions of section 5's functions — `getUser(id): Promise<User>` and so on — each waiting
100 ms. `getGrade` fails for one course:

```ts
export function getGrade(userId: number, course: string): Promise<number> {
  return delay(100).then(() => {
    if (course === "Databases") throw new Error(`No grade yet for ${course}`);
    return 10;
  });
}
```

Throwing inside a `then` callback **rejects** the promise that `then` returned. Inside promise
code, `throw` and `reject` mean the same thing.

### Chaining

**`then` always returns a new promise.** That is what makes chaining work. What the new promise
holds depends on what your callback does:

| Your callback… | The promise returned by `then`… |
|---|---|
| returns a plain value | fulfils with that value |
| returns a promise | waits for that promise, and settles the same way |
| throws | rejects with the thrown error |
| returns nothing | fulfils with `undefined` |

So the pyramid of doom becomes a flat list of steps:

```ts
let user: User;
getUser(1)
  .then((u) => {
    user = u;
    return getCourses(u.id);           // returning a promise: the next then waits for it
  })
  .then((courses) => getGrade(user.id, courses[0]!))
  .then((grade) => grade * 10)         // returning a plain value: passed straight on
  .then((score) => console.log(`${user.name}: ${score} points`))
  .catch((error) => console.error("Something failed:", error.message));
```

```
Ana: 100 points
```

One `catch` at the end handles a failure in **any** step: a rejection skips every `then` below
it until it reaches a `catch`. Compare that with section 5's three repeated error checks.

(Keeping `user` in an outer variable so a later step can use it is a little awkward. That
awkwardness is one of the things `await` removes — section 7.)

### The forgotten `return`

The most common promise bug:

```ts
getUser(1)
  .then((user) => {
    getCourses(user.id);               // BUG: no return
  })
  .then((courses) => console.log("courses:", courses));
```

```
courses: undefined
```

Without `return`, the callback returns `undefined`, the chain does not wait for `getCourses`,
and its result — or its error — is lost. TypeScript helps a little: it types `courses` as
`void`, so using it as an array is an error:

```
Property 'length' does not exist on type 'void'.
```

But just logging it, as above, compiles fine. With braces, always ask yourself: *did I return
the promise?* Arrow functions without braces — `(u) => getCourses(u.id)` — return
automatically, which is one reason chains are usually written that way.

### Where you put `catch` matters

A `catch` **handles** the error. Whatever it returns becomes the value of the chain from then
on, and the chain carries on as if nothing had gone wrong:

```ts
getGrade(1, "Databases")
  .then((grade) => {
    console.log("got grade", grade);    // skipped: the promise rejected
    return grade;
  })
  .catch((error) => {
    console.log("recovered from:", error.message);
    return 0;                           // the chain continues with this value
  })
  .then((grade) => console.log("final grade:", grade))
  .finally(() => console.log("done, either way"));
```

```
recovered from: No grade yet for Databases
final grade: 0
done, either way
```

- A `catch` **at the end** is a safety net for the whole chain.
- A `catch` **in the middle** recovers from errors above it, with a fallback value. Only do
  that if a fallback really makes sense — otherwise you are swallowing the error
  ([Lecture 03, Class 05, section 5](../../Lecture03/Materials/Class05-FunctionsStructures.md)).
  To handle an error partly and still fail, `throw` it again from inside the `catch`.
- **`finally`** runs whether the chain succeeded or failed — the place to hide a loading
  spinner. It receives no argument, and (unless it throws) it passes the previous result
  through unchanged.

In TypeScript, the `error` parameter of a `.catch` callback is typed **`any`**, so
`error.message` compiles without any check. It may not be an `Error` at all — anyone can
`reject("a string")`. The `try...catch` version in section 7 is stricter.

### Unhandled rejections

A rejected promise that nobody handles is an **unhandled rejection**. What happens next depends
on where the code runs.

**In Node 24, the process crashes:**

```ts
getGrade(1, "Databases").then((grade) => console.log(grade));   // no catch
setTimeout(() => console.log("this never prints"), 1000);
```

```
file:///.../school.ts:17
    if (course === "Databases") throw new Error(`No grade yet for ${course}`);
                                      ^

Error: No grade yet for Databases
    at file:///.../school.ts:17:39

Node.js v24.18.0
```

(Path shortened; the helper functions live in `school.ts`.) The exit code is 1, and the timer never fires — the whole program is gone. If
the reason was not an `Error` (say, `Promise.reject("oops")`), Node wraps it in an
`UnhandledPromiseRejection` error with the code `ERR_UNHANDLED_REJECTION`. For a server, one
forgotten `catch` can take down every user's connection.

**In the browser, the page keeps running**, and the console shows an error:

```
Uncaught (in promise) Error: nobody caught me
```

Easy to miss — which is worse, not better. Either way:

> **Every promise chain must end in a `catch`** — or be `await`ed inside a `try` (section 7), or
> be returned to a caller that does one of those.

### Promisifying a callback API

To use a callback-based function with promises, wrap it in `new Promise`, calling `reject` on
error and `resolve` on success:

```ts
import { readFile } from "node:fs";

function readText(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (error, text) => {
      if (error) {
        reject(error);
      } else {
        resolve(text);
      }
    });
  });
}

readText("settings.json").then((text) => console.log(text.length, "chars"));   // 52 chars
```

For any error-first function, Node does this for you: `promisify(readFile)` from `node:util`
returns a promise-returning `readFile`. Usually you need neither — modern Node ships promise
versions of its APIs. Use `node:fs/promises` instead of `node:fs`, and `node:timers/promises`
for a ready-made `delay`:

```ts
import { setTimeout as sleep } from "node:timers/promises";

console.log("waiting...");
await sleep(500);
console.log("half a second later");
const value = await sleep(100, "hello");
console.log(value);
```

```
waiting...
half a second later
hello
```

(It is imported under another name so it does not hide the global `setTimeout`. The `await`
is section 7.)

### Running several promises: `all`, `allSettled`, `race`, `any`

Four static methods take a list of promises and combine them into one. In each example,
`after(ms, value)` fulfils after `ms` milliseconds, and `failAfter(ms, message)` rejects:

```ts
Promise.all([after(300, "a"), after(100, "b"), after(200, "c")]);
// fulfilled: [ 'a', 'b', 'c' ]   (313 ms)

Promise.all([after(300, "a"), failAfter(100, "b failed"), after(200, "c")]);
// rejected: Error: b failed   (105 ms)

Promise.allSettled([after(100, "a"), failAfter(200, "b failed")]);
// fulfilled, after 201 ms, with:
// [ { status: 'fulfilled', value: 'a' }, { status: 'rejected', reason: Error: b failed } ]

Promise.race([after(300, "slow"), after(100, "fast")]);
// fulfilled: fast   (106 ms)

Promise.race([after(300, "slow"), failAfter(100, "fast failure")]);
// rejected: Error: fast failure   (106 ms)

Promise.any([failAfter(100, "x"), after(200, "ok"), after(300, "late")]);
// fulfilled: ok   (213 ms)

Promise.any([failAfter(100, "x"), failAfter(200, "y")]);
// rejected: AggregateError: All promises were rejected   (201 ms)
```

| Method | Fulfils when | Rejects when | Use it for |
|---|---|---|---|
| `Promise.all` | **all** fulfil — with an array of values, in the original order | **any** rejects — immediately, with that error | Several things you need *all* of: load a user, their grades and their schedule |
| `Promise.allSettled` | all have settled, whatever happened — with a status for each | never | Independent jobs where some may fail: send ten notifications, report which failed |
| `Promise.race` | the **first** to settle fulfils | the first to settle rejects | Timeouts: race the real work against a timer that rejects |
| `Promise.any` | the **first** to fulfil | **all** reject — with an `AggregateError` holding every reason | Trying several sources — mirror servers — and taking whichever answers |

Notes:

- `Promise.all` keeps the **original order**, not the order they finished in — `'a'` comes
  first though it was the slowest. And it took 313 ms, not 600: the three waits overlapped.
- When `Promise.all` rejects, the other promises **keep running**; their results are simply
  ignored. Promises cannot be cancelled. To stop real work, see `AbortController` below.
- These take promises that **already exist**. The work starts when each promise is created —
  `after(300, "a")` — not when it is passed to `Promise.all`. Section 7 shows why that matters.

### `Promise.withResolvers`

Sometimes the code that settles a promise is not in a convenient place to put inside an
executor — an event handler set up elsewhere, say. `Promise.withResolvers()` (ES2024, in Node
24 and every current browser) creates a promise and hands you its `resolve` and `reject` as
ordinary variables:

```ts
const { promise, resolve } = Promise.withResolvers<string>();
setTimeout(() => resolve("resolved from outside"), 100);
console.log(await promise);
```

```
resolved from outside
```

With `target: "es2022"` (as suggested in
[Lecture 04, Class 07, section 8](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md)),
`tsc` reports *Property 'withResolvers' does not exist on type 'PromiseConstructor'* and
suggests changing `lib` to `es2024` or later. Raise `target` (or `lib`) to `es2024`.

### Cancelling: `AbortController`, briefly

Promises cannot be cancelled, but many APIs accept an **`AbortSignal`** that tells them to
give up. `AbortSignal.timeout(ms)` creates one that fires after a delay:

```ts
import { setTimeout as sleep } from "node:timers/promises";

try {
  await sleep(5000, "too slow", { signal: AbortSignal.timeout(200) });
} catch (error) {
  console.log((error as Error).name, "—", (error as Error).message);
}
```

```
AbortError — The operation was aborted
```

`fetch` accepts the same `signal` option. Class 10 covers it properly.

---

## 7. Async/await (slide 9)

The slide's title says "Await/Async"; the feature is usually called **async/await**, since you
need `async` first. It is the modern way to write promise code, and the one you should use by
default.

### `async` functions always return a promise

Put `async` before a function, and it **always** returns a promise — whatever you return is
wrapped in one:

```ts
async function answer() {
  return 42;
}

const result = answer();
console.log(result);
console.log(result instanceof Promise);
result.then((value) => console.log("value:", value));
```

```
Promise { 42 }
true
value: 42
```

A `throw` inside an `async` function **rejects** that promise rather than throwing at the
caller.

In TypeScript, the return type of an `async` function is always `Promise<…>`, and the compiler
will not let you mix up the promise and its value:

```ts
async function count(): number { return 1; }
// Error: The return type of an async function or method must be the global Promise<T> type.
//        Did you mean to write 'Promise<number>'?

async function load(): Promise<string> { return "data"; }
const text: string = load();
// Error: Type 'Promise<string>' is not assignable to type 'string'.
```

### `await` unwraps a promise

Inside an `async` function, `await` takes a promise and gives you its value — or, if the
promise rejects, **throws** its reason right there:

```ts
async function report(userId: number): Promise<string> {
  const user = await getUser(userId);
  const courses = await getCourses(user.id);
  const grades: string[] = [];
  for (const course of courses) {
    try {
      const grade = await getGrade(user.id, course);
      grades.push(`${course}: ${grade}`);
    } catch (error) {
      grades.push(`${course}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return `${user.name} — ${grades.join(", ")}`;
}

console.log(await report(1));
```

```
Ana — Internet Programming: 10, Databases: No grade yet for Databases
```

This is the slide's **sync-looking code that behaves asynchronously**. It reads top to bottom
like section 1's code: ordinary variables, an ordinary `for` loop, ordinary `try...catch` —
none of which is easy with `then` chains. And `user` is just a local variable that every later
line can use, no outer `let` needed.

TypeScript knows what `await` produces: `await getUser(1)` is a `User`, not a `Promise<User>`.
The utility type `Awaited<T>`
([Lecture 04, Class 08, section 7](../../Lecture04/Materials/Class08-AdvancedTypeScript.md))
names that unwrapping: `Awaited<Promise<User>>` is `User`.

### `await` pauses the function — not the program

This is the most important thing to understand about `await`. It does **not** block the thread
(section 4 says nothing ever does that). It **suspends that one function**, and returns control
to whoever called it. When the promise settles, the function resumes where it left off, as a
microtask:

```ts
async function work() {
  console.log("2. work starts");
  await delay(100);
  console.log("4. work resumes after the await");
}

console.log("1. before calling work");
work().then(() => console.log("5. work's promise fulfilled"));
console.log("3. after calling work — the caller did not wait");
```

```
1. before calling work
2. work starts
3. after calling work — the caller did not wait
4. work resumes after the await
5. work's promise fulfilled
```

An `async` function runs **synchronously up to its first `await`** — line 2 prints before
line 3. Then it pauses, and the caller carries on. Even `await null`, with nothing to wait
for, pauses the function; it resumes as a **microtask**, so section 4's ordering rules apply
unchanged — it still resumes before any pending `setTimeout(…, 0)`.

This is also where run-to-completion (section 4) has its one exception: **between an `await`
and the line after it, other code can run** and change shared variables. Within the stretches
between `await`s, your function still runs uninterrupted.

### "Syntactic sugar, does not really exist" — what is true

The slide calls async/await syntactic sugar. That is the right instinct: **there is nothing
async/await can do that promises cannot.** Every `async` function returns a promise, every
`await` waits on one, and you can mix the two styles freely. These two functions are
equivalent:

```ts
async function firstCourse(id: number): Promise<string> {
  const user = await getUser(id);
  const courses = await getCourses(user.id);
  return `${user.name}: ${courses[0]}`;
}

function firstCourseThen(id: number): Promise<string> {
  return getUser(id).then((user) =>
    getCourses(user.id).then((courses) => `${user.name}: ${courses[0]}`),
  );
}
```

Both print `Ana: Internet Programming`.

But "does not really exist" goes too far. `async` and `await` are real JavaScript syntax,
supported natively by every engine since 2017. What they add is something `then` alone cannot
express directly: the ability to **pause a function in the middle and resume it later**, with
all its local variables, loops and `try` blocks intact. Rewriting the `for` loop with a
`try...catch` inside it from `report` above as a `then` chain is a real restructuring, not a
mechanical translation. When `tsc` compiles `async` code for an old target, it has to emulate
that pause with **generator functions** — the "generator-based helper" in
[Lecture 04, Class 07, section 8](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md).
Engines also give `async` functions better stack traces, which show the `await` chain that led
to an error.

So: **sugar over promises, in the sense that no new capability is added — but real syntax,
with real engine support, that does something `then` callbacks cannot spell as simply.**

### Error management: `try` / `catch` / `finally`

A rejected promise becomes a thrown error at the `await`, so you handle it exactly as in
[Lecture 03, Class 05, section 5](../../Lecture03/Materials/Class05-FunctionsStructures.md) —
which finally makes the "What `try...catch` cannot catch" problem from those notes go away:

```ts
async function showGrade(course: string): Promise<void> {
  console.log("spinner on");
  try {
    const grade = await getGrade(1, course);
    console.log(`${course}: ${grade}`);
  } catch (error) {
    // error is unknown — narrow before use
    const message = error instanceof Error ? error.message : String(error);
    console.log("Could not load grade:", message);
  } finally {
    console.log("spinner off");
  }
}

await showGrade("Internet Programming");
await showGrade("Databases");
```

```
spinner on
Internet Programming: 10
spinner off
spinner on
Could not load grade: No grade yet for Databases
spinner off
```

In TypeScript with `strict` on, the `catch` variable is **`unknown`**, not `any` — write
`e.message` without checking and you get *'e' is of type 'unknown'*. That is honest: anything
can be thrown, not just `Error` objects. Narrow it first with `instanceof Error`
([Lecture 04, Class 07, section 6](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md)),
as above. A promise's `.catch((error) => ...)` gives you `any` instead, with no check enforced.

The same rule as always: only catch what you can handle. A `try` around every `await` that
just logs and carries on is swallowing errors. Often the right thing is to let the rejection
propagate to the caller, and catch once, at the top.

### `return` versus `return await` inside `try`

Usually `return somePromise` and `return await somePromise` from an `async` function do the
same thing. Inside a `try` block, they do not:

```ts
async function withoutAwait(): Promise<number> {
  try {
    return getGrade(1, "Databases");          // returns the promise, unsettled
  } catch {
    console.log("withoutAwait: caught");      // never runs
    return 0;
  }
}

async function withAwait(): Promise<number> {
  try {
    return await getGrade(1, "Databases");    // waits here, so a rejection throws here
  } catch {
    console.log("withAwait: caught");
    return 0;
  }
}
```

```
withAwait: caught
withAwait result: 0
withoutAwait rejected: No grade yet for Databases
```

Without `await`, the function hands the promise back and leaves the `try` block before the
promise has rejected — so the `catch` never sees the error. **Inside `try`, write
`return await`.** (Note also `catch { … }` with no variable — allowed when you do not need the
error.)

### Sequential versus parallel: the accidental waterfall

Each `await` waits before the next line runs. When the operations depend on each other — you
need the user's `id` to get their courses — that is exactly right. When they do **not**, it
wastes time:

```ts
async function fetchProfile() { await delay(300); return "profile"; }
async function fetchGrades() { await delay(300); return "grades"; }
async function fetchSchedule() { await delay(300); return "schedule"; }

// Sequential: each await waits before the next request even starts
let start = performance.now();
const profile = await fetchProfile();
const grades = await fetchGrades();
const schedule = await fetchSchedule();
console.log(`sequential: ${Math.round(performance.now() - start)} ms`);

// Parallel: start all three, then wait for all of them
start = performance.now();
const [profile2, grades2, schedule2] = await Promise.all([
  fetchProfile(),
  fetchGrades(),
  fetchSchedule(),
]);
console.log(`parallel:   ${Math.round(performance.now() - start)} ms`);
```

```
sequential: 921 ms
parallel:   304 ms
```

Three independent 300 ms operations: about 900 ms one after another, about 300 ms at once. This
is the **waterfall** bug, and it is very easy to write by accident, because the sequential
version looks so natural. With real network requests it is the difference between a page that
loads in one second and one that loads in three.

> **Await dependent operations one after another. Start independent operations together, and
> await them with `Promise.all`.**

The key is *when the work starts*. Calling `fetchGrades()` starts it; `await` only waits. So
this is also parallel:

```ts
const profilePromise = fetchProfile();     // started
const gradesPromise = fetchGrades();       // started, without waiting for the first
const profile = await profilePromise;
const grades = await gradesPromise;
```

— but there is a trap. If `gradesPromise` rejects while you are still awaiting
`profilePromise`, nothing is handling it yet. Tested with the grades failing after 100 ms and
the profile taking 300 ms, Node 24 crashed with an unhandled rejection — **even with both
`await`s inside a `try...catch`**. `Promise.all` handles every promise from the start, and
says what you mean. Prefer it.

### `await` in loops

The same choice appears in loops. A `for...of` loop with `await` inside processes the items
**one at a time**; `Promise.all` with `map` processes them **all at once**:

```ts
async function getGrade(course: string): Promise<number> {
  await delay(200);
  return course.length;
}
const courses = ["Internet Programming", "Databases", "Algorithms"];

const one: number[] = [];
for (const course of courses) {
  one.push(await getGrade(course));          // one at a time
}

const all = await Promise.all(courses.map((course) => getGrade(course)));   // all at once
```

```
for...of + await: [ 20, 9, 10 ] 632 ms
Promise.all + map: [ 20, 9, 10 ] 210 ms
```

Use the sequential loop when order matters or each step needs the previous one — or
deliberately, to avoid sending a server a thousand requests at once. Otherwise use
`Promise.all`.

### `forEach` does not wait

There is a third option that looks right and is not:

```ts
const broken: number[] = [];
courses.forEach(async (course) => {
  broken.push(await getGrade(course));
});
console.log("forEach + async:", broken);
```

```
forEach + async: [] 0 ms
```

`forEach` calls the `async` callback for each item, gets a promise back each time — and
**ignores it**. It does not wait for anything, so the array is still empty when the next line
runs. The pushes happen later, when nobody is looking, and any rejection is unhandled. The
same goes for `filter`, `some`, `reduce` and the rest: **they do not understand promises.** Use
`for...of`, or `Promise.all` with `map`.

### Top-level `await`

`await` is normally allowed only inside an `async` function. In an **ES module**
([Lecture 04, Class 08, section 8](../../Lecture04/Materials/Class08-AdvancedTypeScript.md)),
it is also allowed at the top level of the file:

```ts
import { readFile } from "node:fs/promises";

const settings = JSON.parse(await readFile("settings.json", "utf8"));
console.log(settings.name);
```

```
Ana
```

It works in Node for `.mjs` files, for `.js` and `.ts` files in a project whose `package.json`
has `"type": "module"`, and in the browser for `<script type="module">`. In a CommonJS file it
is a `SyntaxError`. Keep it for setup code: a module that awaits at the top level holds up
every module that imports it.

### TypeScript catches some missing `await`s — not all

Forget an `await`, and you have a promise where you expected a value. Often the compiler
notices — `if (isLoggedIn())` on a `Promise<boolean>` gives *This condition will always return
true since this 'Promise<boolean>' is always defined*, and `p.name` on a promise is *Property
'name' does not exist on type 'Promise<…>'*. But a bare call on a line of its own — a
**floating promise** — compiles without complaint, and any rejection from it is unhandled.
The linter rule `@typescript-eslint/no-floating-promises` catches those; `tsc` does not.

---

## 8. Common mistakes

A checklist. Most asynchronous bugs are one of these.

- **Expecting async code to run in the order it is written.** Code after a `setTimeout`,
  `then` or un-awaited call runs *first*. Section 4.
- **Treating the `setTimeout` delay as exact.** It is a minimum; a busy thread pushes it back.
  Section 4.
- **Blocking the thread** with a long loop or a `…Sync` function in a server or a UI. Nothing
  else — timers, clicks, other requests — can happen until it finishes. Sections 1 and 4.
- **Forgetting `return` after handling an error in a callback**, so the code carries on, or
  calls back twice. Section 5.
- **Forgetting `return` inside a `then` callback**, so the chain does not wait and the error is
  lost. Section 6.
- **No `catch` at the end of a chain** — a crash in Node, a quiet console error in the browser.
  Section 6.
- **Catching an error just to log it**, then carrying on as if it worked. Sections 6 and 7.
- **Using `error.message` without checking** that `error` is an `Error`. Section 7.
- **Forgetting `await`**, and getting a `Promise` where you wanted a value. Section 7.
- **`return promise` inside `try`** instead of `return await promise`. Section 7.
- **The accidental waterfall**: awaiting independent operations one after another instead of
  with `Promise.all`. Section 7.
- **`forEach` with an `async` callback**, expecting it to wait. Section 7.
- **Expecting `async` to make CPU-heavy work faster or parallel.** It does not; workers do.
  Section 2.
- **Forgetting `clearInterval`**, so the interval runs — and keeps Node alive — forever.
  Section 4.

---

## Further reading

- **MDN: Asynchronous JavaScript** —
  <https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS>
- **MDN: Using promises** —
  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises>
- **MDN: `async function`** —
  <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function>
- **MDN: The event loop and microtasks** —
  <https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide>
- **Jake Archibald: Tasks, microtasks, queues and schedules** — the classic explanation of
  section 4, with step-by-step animations —
  <https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/>
- **Philip Roberts: "What the heck is the event loop anyway?"** (JSConf EU 2014, video) —
  <https://www.youtube.com/watch?v=8aGhZQkoFbQ>
- **Node.js: `node:timers/promises`** — <https://nodejs.org/api/timers.html#timers-promises-api>

---

*Internet Programming · UACS · Lecture 05*
