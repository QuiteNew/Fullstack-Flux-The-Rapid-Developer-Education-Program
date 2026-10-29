# Internet Programming — Exercises #05

Detailed tasks for the six exercises in `Exercises05.pptx`, in slide order.

These exercises practise Classes 09 and 10: callbacks, promises and `async`/`await`, then
`fetch`, Web APIs and JSON. Keep the companion notes from `Lecture05/Materials` open —
`Class09-AsynchronousJavaScript.md` and `Class10-WebapiFetch.md` explain everything used here.

**Ground rules**

- **Everything is TypeScript**, in one project folder, set up the same way as in Lecture 04.
  If the tooling is new to you, read
  [`TypeScript-Setup.md`](../../../Lecture04/Exercises/Group1/TypeScript-Setup.md) from
  Lecture 04 first.
- **Exercises 1–3 run in Node.** Run them while you work with `npx tsx exercise.02.ts`.
- **Exercises 4–6 run in the browser.** Each one is a folder with an `index.html`, a module that
  talks to the API, a `main.ts` for the page, and a `check.ts` that tests the API module in Node.
  How to build and open them is in the setup section below.
- **`tsx` does not check types — only `tsc` does.** Before handing anything in, `npx tsc` must
  finish without errors.
- **Keep `strict` mode on** and do not reach for `any`. Data that comes from an API has the type
  `unknown` until you have checked it.
- **No `.then()` in exercise 1, no `async`/`await` in exercise 2.** Each exercise practises one
  style, so you feel the difference.
- **Timers are never exact.** `setTimeout(f, 100)` means "not sooner than about 100 ms". When you
  check timings, check for *at least* a duration, never for an exact one.
- Stuck? Each exercise has hints and expected results at the end of this sheet.

---

## Setup

### The project

```bash
npm init -y
npm install --save-dev typescript tsx @types/node
```

In `package.json`, set `"type": "module"`. Copy `tsconfig.json` from this folder, or start from
Lecture 04's and make two changes:

```jsonc
"lib": ["es2022", "dom", "dom.iterable"],   // fetch, document, AbortController, ...
"types": ["node"],                          // node:http, process — for serve.ts
```

and add the three exercise folders to `"include"`. `@types/node` is new: it describes Node's
own modules, which `serve.ts` (below) uses.

### Running the browser exercises

The browser cannot run `.ts` files. It runs the compiled JavaScript in `dist/`, so every page
loads its script like this:

```html
<script type="module" src="../dist/exercise.04/main.js"></script>
```

A page opened by double-clicking it (a `file://` address) **cannot load module scripts** — the
browser blocks them. The page needs a web server. This folder has a tiny one, `serve.ts`, made
with nothing but `node:http`:

```bash
npx tsc --watch      # terminal 1: recompiles whenever you save
npm run serve        # terminal 2: http://localhost:8080/
```

Then open <http://localhost:8080/exercise.04/>. After each change: save, wait for `tsc` to
report "Found 0 errors", and refresh the page. The VS Code **Live Server** extension works too.

Open the browser's developer tools (F12) and keep the **Console** and **Network** tabs visible.
Every request your page makes shows up in Network, with its status, headers and response.

### The APIs

All three are free, need **no API key**, and allow requests from any web page (CORS):

| Exercise | API | Documentation |
|---|---|---|
| 4 | Chuck Norris jokes | <https://api.chucknorris.io> |
| 5 | Exchange rates | <https://www.exchangerate-api.com/docs/free> |
| 6 | Open-Meteo weather and geocoding | <https://open-meteo.com/en/docs> |

Try each URL in the browser's address bar before writing any code — you see exactly the JSON
your program will get.

---

## Exercise 1 — Callback Hell

**Practises:** `setTimeout`, callbacks, error-first callbacks, the Pyramid of Doom.

Callbacks only in this exercise — no promises, no `async`. File: `exercise.01.ts`.

### 1.1 — Two callbacks in succession

Write `inSuccession(first, second, delayMs)`. It calls `first` after `delayMs`, then `second`
another `delayMs` later. Both callbacks take no arguments and return nothing — what is their
type?

Check it: record what happens in an array, and check the order and the times. Also check what
the array contains **straight after** the call to `inSuccession`. Why is it empty?

### 1.2 — Any number of callbacks

Write `runInSequence(steps, delayMs, done)`: run every function in the array `steps`, one after
another, with `delayMs` before each, then call `done`. An empty array calls `done` straight away.

A `for` loop that calls `setTimeout` for every step does *not* work here — try it, and explain
what you see. Then write it so that each step schedules the next one.

### 1.3 — Error-first callbacks, and the pyramid

Node.js has a convention for callbacks that can fail: the **first** argument is the error (or
`null`), the second is the result.

```ts
type Callback<T> = (error: Error | null, result?: T) => void;
```

Copy this data and write three functions that pretend to be slow server calls — each one
answers after 20 ms:

```ts
interface User { id: number; name: string; }
interface Order { id: number; userId: number; amount: number; }

const users: User[] = [{ id: 1, name: "Ana" }, { id: 2, name: "Boris" }];
const orders: Order[] = [
    { id: 10, userId: 1, amount: 1200 },
    { id: 11, userId: 1, amount: 800 },
    { id: 12, userId: 2, amount: 450 },
];
```

- `loadUser(id, callback)` — the user, or an error `No user with id 99`
- `loadOrders(user, callback)` — the user's orders
- `calculateTotal(orders, callback)` — the sum of the amounts

Then write `userTotalPyramid(id, callback)`, which calls all three in turn and calls back with a
text like `"Ana: 2000"`. Each step needs the result of the one before, so each one goes inside
the callback of the one before. Count the levels of indentation. Count the error checks.

### 1.4 — Flatten it

Write `userTotalFlat(id, callback)`: the same behaviour, but with every callback a **named
function** at the same level, instead of nested anonymous ones. Is it easier to read? Is it
easier to *follow*?

### 1.5 — Who calls your callback?

When you pass a callback to someone else's function, *they* decide when it runs — and how often.
That is the "responsibility inversion" from the slides. Here is a badly written library function:

```ts
function buggyLoad(callback: Callback<string>): void {
    setTimeout(() => callback(null, "first"), 5);
    setTimeout(() => callback(null, "second"), 10);
}
```

Write `once(fn)`, which returns a function that calls `fn` the first time and ignores every later
call. Use it to protect yourself from `buggyLoad`. Make it generic, so the wrapped function keeps
its parameter types.

### 1.6 — Running the checks

The checks themselves are asynchronous, and you only have callbacks. Each check has to start
the next one when it is done:

```ts
check11(() => check12(() => check13(() => check14(() => check15(summary)))));
```

Keep this line in mind for exercise 3.

---

## Exercise 2 — Promise Practice

**Practises:** creating promises, `then` / `catch` / `finally`, chaining, the combinators.

Promises with `.then()` only — no `async`/`await` yet. File: `exercise.02.ts`.

### 2.1 — `delay`

Write `delay(ms): Promise<void>`, which resolves after `ms` milliseconds. It is one line, and you
will use it in almost every task that follows.

### 2.2 — The exercise from the slide

Write `maybe(succeed, ms = 100): Promise<string>`. After `ms` milliseconds it resolves with
`"Succeeded after 100 ms"` if `succeed` is `true`, and rejects with
`new Error("Failed after 100 ms")` if it is `false`.

Reject with an `Error` object, not a bare string. Why? (Hint: what does the console show for
each?)

### 2.3 — Consuming promises

1. Write `describe(promise): Promise<string>`, which turns any promise into a text:
   `"resolved: <value>"` or `"rejected: <message>"`. The promise it returns never rejects.
2. Write `trackLoading(promise, log)`, which pushes `"loading…"` into `log` straight away and
   `"done"` when the promise settles — **either way** — and passes the result or the error
   through unchanged. Which method does exactly that?

In `catch`, the error has the type `unknown`. Check it with `instanceof Error` before you read
`.message`.

### 2.4 — The pyramid, flat

Rewrite `loadUser`, `loadOrders` and `calculateTotal` from 1.3 so that they **return promises**
instead of taking callbacks. Then write `userTotal(id): Promise<string>` as **one chain**:

```ts
return loadUser(id)
    .then(user => ...)
    .then(...)
```

with no nesting, and no `catch` inside — a single `catch` at the caller handles a failure at any
step. One problem: the last step needs the user's name, which only the first step had. Solve it.

### 2.5 — `inSuccession`, again

Rewrite `inSuccession(first, second, ms)` from 1.1 so that it **returns a promise** that resolves
when both callbacks have run. Use `delay`.

### 2.6 — The combinators

Using `maybe` with different delays, find out — and write checks that prove — how each of these
behaves:

| | Waits for | Resolves with | Rejects when |
|---|---|---|---|
| `Promise.all` | ? | ? | ? |
| `Promise.allSettled` | ? | ? | ? |
| `Promise.race` | ? | ? | ? |
| `Promise.any` | ? | ? | ? |

Fill in the table. Then answer two questions with a check each:

- `Promise.all([maybe(true, 30), maybe(true, 60), maybe(true, 45)])` — in which order are the
  results? How long does it take — about 60 ms or about 135 ms?
- What does `Promise.any` reject with when **every** promise fails?

### 2.7 — A timeout

Write `withTimeout(promise, ms)`: it settles like `promise`, unless that takes longer than `ms`,
in which case it rejects with `Error("Timed out after 50 ms")`. Use `Promise.race`.

Then make sure the timer does not keep running after the promise has won the race. (Hint: what
does a pending `setTimeout` do to a Node program that has nothing else left to do?)

### 2.8 — In which order?

Before running it, write down what this logs:

```ts
const log: string[] = [];
const promise = new Promise<void>(resolve => {
    log.push("executor");
    resolve();
});
promise.then(() => log.push("then"));
log.push("after");
```

Then check it. Which part of a promise runs immediately, and which part waits?

---

## Exercise 3 — Async/Await Practice

**Practises:** `async` functions, `await`, `try`/`catch`/`finally`, sequential versus parallel.

"Repeat exercises 1 and 2, but using async functions." File: `exercise.03.ts`. Copy `delay` and
`maybe` from exercise 2 — an `async` function can `await` any promise, no matter how it was made.

### 3.1 and 3.2 — Exercise 1, async

Rewrite `inSuccession` and `runInSequence` as `async` functions. `runInSequence` becomes a plain
`for...of` loop. Compare it with your 1.2.

Check: straight after calling `inSuccession(...)`, without `await`, has `first` run yet? Why not?

### 3.3 — Exercise 2, async

Write `attempt(succeed, log): Promise<string>`. It awaits `maybe(succeed, 20)` and returns
`"resolved: …"` or `"rejected: …"`, using `try` / `catch`. Push `"start"` into `log` at the
beginning, and `"finally"` in a `finally` block. Check that `finally` runs on both paths.

### 3.4 — The pyramid, one last time

Write `loadUser` and `loadOrders` as `async` functions (each one waits 40 ms), and
`userTotal(id)`. Every intermediate result is now an ordinary local variable — the name problem
from 2.4 disappears. Add a third user, Vesna, with an order of 300.

What does `userTotal(99)` do? Check it with `try` / `catch` around `await`.

### 3.5 — Sequential versus parallel

Write two functions that load the names of users `[1, 2, 3]`:

- `loadUsersSequential` — a `for...of` loop with `await` inside
- `loadUsersParallel` — `Promise.all` with `map`

Both return the same array. Measure both with `Date.now()`. Explain the difference. Which one
would you use when the second request needs the result of the first?

### 3.6 — The `forEach` trap

```ts
async function forEachTrap(ids: number[]): Promise<string[]> {
    const names: string[] = [];
    ids.forEach(async id => {
        const user = await loadUser(id);
        names.push(user.name);
    });
    return names;
}
```

What does `await forEachTrap([1, 2])` return? Check it. Then wait 60 ms and look at the same
array again. Explain both results.

### 3.7 — Retry

Write `retry(operation, attempts, waitMs)`. It calls `operation` (a function that returns a
promise), and if that fails, waits `waitMs` and tries again — up to `attempts` times in total.
If the last attempt fails too, it rejects with **that** error.

To test it, write `flaky(failures)`: it returns an operation that fails the first `failures`
times it is called, and then succeeds with `"Worked on call 3"`.

### 3.8 — `return` versus `return await`

```ts
async function withoutAwait(): Promise<string> {
    try {
        return maybe(false, 10);
    } catch {
        return "caught";
    }
}
```

Does this return `"caught"`? Write the same function with `return await maybe(false, 10)` and
compare. Explain the difference.

### 3.9 — The checks

Exercise 1 needed a pyramid of callbacks to run its checks in order. Here, use **top-level
`await`** — allowed in ES modules — and write the checks one after another, top to bottom, inside
a single `try` / `catch` / `finally`.

---

## Exercise 4 — Chuck Norris

**Practises:** `fetch`, checking the status, query strings, validating JSON, loading and error
states.

"Create a page that fetches Chuck Norris jokes from the Chuck Norris Joke API." Folder:
`exercise.04/` with `index.html`, `jokes.ts`, `main.ts` and `check.ts`.

The API, all `GET`, all answering JSON:

| URL | Answers |
|---|---|
| `https://api.chucknorris.io/jokes/random` | one joke |
| `https://api.chucknorris.io/jokes/random?category=dev` | one joke from a category |
| `https://api.chucknorris.io/jokes/categories` | an array of category names |
| `https://api.chucknorris.io/jokes/search?query=computer` | `{ total, result: [jokes] }` |

> **One category is called `explicit`, and it means it.** Leave it out of your category list,
> and do not show jokes from it (task 4.5).

### 4.1 — A random joke

In `jokes.ts`:

1. Write the `Joke` interface — open the first URL in the browser and copy the field names from
   what you see.
2. Write `getJson(url)`, used by every function in this file. It calls `fetch`, and:
   - if `fetch` itself **rejects** (no network), throws an error with a friendly message
   - if the response is **not ok** (404, 500, …), throws an error that includes the status —
     `fetch` does *not* do this for you
   - otherwise returns `await response.json()`
3. Write `getRandomJoke(category?)`. Build the URL with `new URL(...)` and
   `url.searchParams.set(...)`, not by gluing strings together.

Make an `ApiError` class that extends `Error` and has a `status` field (`0` for "no network"), so
the page can tell the cases apart.

### 4.2 — Categories

Write `getCategories()`, without `explicit`.

### 4.3 — Search

Write `searchJokes(query)`. Trim the query. The API answers `400 Bad Request` for queries shorter
than 3 or longer than 120 characters — check that yourself and throw, without sending a request
the server will refuse. Try a query with spaces and an `&` in it: what does the URL look like?

### 4.4 — Do not trust the response

`response.json()` returns `Promise<any>`. Writing `as Joke` checks nothing at runtime — types
are erased (Lecture 04, Class 07). Write a type guard `isJoke(data: unknown): data is Joke` that
checks the fields you actually use, and make `getRandomJoke` throw if the data fails it. Do the
same for the category list and the search result.

### 4.5 — Keep it clean

A random joke *without* a category can still come from `explicit`. There is no option in the API
to exclude it. Write `getCleanJoke(category?, maxTries = 5)`, which asks again when the joke is
explicit — but gives up with an error after `maxTries`, so a run of bad luck never turns into an
endless loop. Filter explicit jokes out of search results too.

### 4.6 — The page

In `main.ts`, using only the functions from `jokes.ts`:

- On load, show a clean random joke, and fill a `<select>` with the categories (plus "any").
  Start both requests **at the same time** — neither needs the other.
- An **Another joke** button, and changing the category, load a new joke.
- While a joke is loading, show "Loading…" and disable the button.
- A **search** form: show the matching jokes as a list (at most 20), with
  "Showing 20 of 26 jokes." or "No jokes about …". Stop the form from reloading the page.
- When anything fails, show a readable message in the page, and the details in the console.
- Put API text into the page with `textContent`, never `innerHTML`. Why?

Then click **Another joke** five times, very fast, and watch the Network tab. The answers can
arrive in any order. Make sure only the **last** request is allowed to update the page.

### 4.7 — Test without the network

`check.ts` runs `jokes.ts` in Node, with `globalThis.fetch` replaced by a fake that returns
prepared answers and records the URLs it was asked for:

```ts
globalThis.fetch = async (input) => {
    requested.push(String(input));
    return new Response(JSON.stringify(body), { status: 200 });
};
```

Write checks for: the URLs (with and without a category), a 404, no network, the explicit
filter, a too-short search, and a response in the wrong shape. Restore the real `fetch` in a
`finally`. End with one real request, and print `SKIP` instead of failing if you are offline.

---

## Exercise 5 — Currency Conversion *(homework)*

**Practises:** everything from exercise 4, plus reading an API's documentation, caching, and
formatting money.

"Develop a currency exchange rate calculator that uses a currency exchange rate API." Folder:
`exercise.05/` with `index.html`, `rates.ts`, `main.ts` and `check.ts`.

Use `https://open.er-api.com/v6/latest/EUR` — free and without a key. Read its documentation at
<https://www.exchangerate-api.com/docs/free> first. Its terms ask you to show a link back to it
on the page ("Rates By Exchange Rate API").

### 5.1 — Fetch the rates

Write `RateTable` — `base`, `rates` (a `Record<string, number>`), `updated` and `nextUpdate` as
`Date` objects — and a function that fetches the table for one base currency. Handle "no
network" and a status that is not ok, as in exercise 4.

### 5.2 — Read the response carefully

Open `https://open.er-api.com/v6/latest/XYZ` in the browser, then look at it in the Network tab.
What is the **status code**? What is in the body?

This API answers `200 OK` even when it fails, and reports the problem inside the JSON. So
`response.ok` is not enough. Write `parseRates(data: unknown): RateTable`, which:

- throws `The rate server refused: unsupported-code` for `{ "result": "error", … }`
- throws when the shape is wrong — a missing field, or a rate that is not a positive number
- converts `time_last_update_unix` and `time_next_update_unix` into `Date` objects (careful:
  Unix time here is in **seconds**, JavaScript counts milliseconds)

### 5.3 — Convert

Write `convert(amount, from, to, table)`. You only need **one** table for any pair of
currencies: every rate is relative to the same base, so `amount / rates[from]` is the amount in
the base currency, and `* rates[to]` converts it on. Throw a `RangeError` for an unknown
currency.

Check `convert(42, "USD", "USD", table)`. Is it exactly `42`? Fix it.

### 5.4 — Cache

The rates change once a day, and the API tells you when the next update is due. Fetching them
again on every keystroke would be slow, and rude to a free service.

Write `getRates(base)` with a cache — a `Map` from the base currency to the table — so that:

- a second call before `nextUpdate` sends **no request**
- a call after `nextUpdate` fetches fresh rates
- a **failed** request is not cached, so the next call tries again
- two calls made **at the same moment**, before the first answer arrives, send **one** request,
  not two (hint: cache the promise, not the table)

To test the time-dependent parts without waiting a day, give `getRates` a second parameter
`now = Date.now()`.

### 5.5 — Display

Never format money by hand. `Intl.NumberFormat` knows every currency's symbol and decimal
places:

```ts
new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(1234.5)   // "€1,234.50"
```

and `Intl.DisplayNames` knows their names: `"MKD"` → `"Macedonian Denar"`.

### 5.6 — The page

- An amount, a **from** and a **to** currency (`<select>`s showing "MKD — Macedonian Denar"), and
  a ⇄ button that swaps them. Start with EUR → MKD.
- Put MKD, EUR, USD, GBP and CHF at the top of the lists, then the rest alphabetically.
- The result updates **as you type** — with no request, because the table is already loaded.
- Show the rate used ("1 EUR = 61.4970 MKD") and when the rates were last updated.
- While the rates load, the form cannot be used. If they fail to load, show the error and a
  **Try again** button.
- An empty or negative amount shows "Enter an amount", not `NaN`.

### 5.7 — Checks

As in 4.7: parsing (including the error-in-a-200 case), conversion, every caching rule from 5.4
(count the calls to your fake `fetch`), and formatting. One live check at the end: is EUR → MKD
somewhere near 61.5?

---

## Exercise 6 — Weather Information

**Practises:** two APIs one after the other, parallel arrays, cancelling requests, timeouts.

"Create a web application that fetches and displays current weather information for a given city
using a weather API." Folder: `exercise.06/` with `index.html`, `weather.ts`, `main.ts` and
`check.ts`.

Open-Meteo needs coordinates, not city names. So it takes two requests: first find the city,
then ask for its weather.

```text
https://geocoding-api.open-meteo.com/v1/search?name=Ohrid&count=5&language=en
https://api.open-meteo.com/v1/forecast?latitude=41.117&longitude=20.802
    &current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,is_day,weather_code
    &daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=4&timezone=auto
```

Open both in the browser and study the answers before you write anything.

### 6.1 — Fetching, with a timeout and cancellation

Write `getJson(url, signal?)`. Besides the usual checks:

- **Timeout:** give up after 8 seconds with `AbortSignal.timeout(8000)`, and throw
  `The weather service did not answer within 8 seconds`.
- **Cancellation:** if the caller passes an `AbortSignal`, the request must stop when it is
  aborted. Combine both signals with `AbortSignal.any([signal, timeout])`.
- When the *caller* cancelled, rethrow the original error (an `AbortError`) — that is not a
  failure, and the page should ignore it.
- Open-Meteo explains its errors: `{ "error": true, "reason": "Latitude must be in range of -90
  to 90°. Given: 200.0." }` with status 400. Show that `reason`.
- A server can also answer with an HTML error page. `response.json()` then throws — handle it.

### 6.2 — City → places

Write `Place` and `findPlaces(name, signal?)`. Look at what the API answers for a city that does
not exist: there is no error, the `results` field is simply missing. Return an empty array. Names
shorter than 2 characters return `[]` without a request. Skip results that lack a name or
coordinates. Search for "Ohrid": how many places come back, and in which countries?

### 6.3 — Coordinates → weather

Write `getWeather(place, signal?)`, returning the current weather and a list of days. The daily
data arrives as **parallel arrays**:

```json
"daily": { "time": ["2026-10-25", "2026-10-26"], "temperature_2m_max": [17.6, 16.1], ... }
```

`time[1]` and `temperature_2m_max[1]` belong together. Turn them into one object per day:
`{ date, code, min, max }`.

### 6.4 — Weather codes

The API sends weather as a number — a WMO code (the table is in the Open-Meteo documentation,
under "WMO Weather interpretation codes"). Write `describeWeather(code, isDay)`, returning a text
and an emoji: `2` → `"Partly cloudy"` ⛅. At night, a clear sky gets a moon. An unknown code must
not crash the page.

### 6.5 — Both steps

Write `weatherForCity(name, signal?)`: find the places, take the first one, get its weather, and
return the place, the weather and the **other** places found. The second request needs the
coordinates from the first, so these two cannot run in parallel. Throw
`No place called "Xyzzyqq" found` when there is no match.

### 6.6 — The page

- A form with a city name. On submit: "Looking for Ohrid…", then a card with the place name
  (with region and country), the temperature with an emoji, the description, "feels like",
  humidity, wind, and the local time.
- The next three days: weekday, emoji, description, min–max.
- When several places have the same name, show the others as buttons: clicking one shows its
  weather instead.
- Errors appear in the page. A failed search hides the previous city's card.
- Remember the last city in `localStorage`, and show it when the page opens. (`localStorage`
  can throw — in private mode, for example — so wrap it in `try`.)

Careful with the weekdays: `new Date("2026-10-26")` is midnight **UTC**. Format it with
`timeZone: "UTC"`, or a browser west of Greenwich shows Sunday instead of Monday.

### 6.7 — Only the latest search counts

Search for "Skopje", then immediately for "Bitola". Two searches are now running. If Skopje's
answer arrives last, the page shows the wrong city.

Keep one `AbortController` for the current search. Every new search **aborts the previous one**
and creates a new controller. In the error handler, ignore an `AbortError` — the user simply
asked for something else.

### 6.8 — Checks

As in 4.7, with a fake `fetch` that answers by URL — geocoding or forecast — and that respects
`init.signal` like the real one. Check the query strings, "no match", the parallel arrays, the
API's error reason, an HTML error page, the weather codes, both steps in order, and that an
aborted request rejects with an `AbortError` and not with your own error class.

---

## Hints

<details>
<summary><strong>Exercise 1 — Callback Hell</strong></summary>

- **1.1** The type of a callback that takes nothing and returns nothing is `() => void`.
- **1.1** The array is empty after the call because `inSuccession` only *schedules* the
  callbacks and returns at once. Nothing asynchronous runs while your own code is still running.
- **1.2** The `for` loop starts every timer at the same moment, so they all fire together after
  one delay. Write an inner function `runStep(index)` that runs one step and then calls
  `runStep(index + 1)` from inside the timer.
- **1.3** Every level repeats `if (error) { callback(error); return; }`. Forget the `return`,
  and the function carries on with an `undefined` result.
- **1.4** The last step needs the user's name, which only the first callback had. Keep it in a
  variable of the outer function.
- **1.5** `function once<A extends unknown[]>(fn: (...args: A) => void): (...args: A) => void` —
  a closure with a `called` flag (Lecture 03, Class 05).
- **Check:** `userTotalPyramid(1, …)` calls back with `null, "Ana: 2000"`; user 2 is
  `"Boris: 450"`.

</details>

<details>
<summary><strong>Exercise 2 — Promise Practice</strong></summary>

- **2.1** `return new Promise(resolve => setTimeout(resolve, ms));`
- **2.2** Call `resolve` or `reject` *inside* the `setTimeout` callback, not outside it.
- **2.3** `finally` runs on both paths and passes the outcome through.
  `describe` is `.then(value => ...)` followed by `.catch(error => ...)`.
- **2.4** Inside `.then`, **return** the next promise. Without the `return`, the chain does not
  wait for it — the most common promise bug. Throwing inside a `.then` rejects the chain.
- **2.4** For the name: `let name = "";` before the chain, set it in the first `.then`.
- **2.6** `all`: results in **input** order, about 60 ms (the slowest one), rejects on the
  first failure. `allSettled`: never rejects, gives `{ status, value }` or `{ status, reason }`
  for each. `race`: the first to settle, success or failure. `any`: the first success; if all
  fail, an `AggregateError` with an `errors` array.
- **2.7** Keep the timer's ID in a variable, and `clearTimeout` it in a `.finally()` on the race.
  A pending timer keeps a Node program alive until it fires.
- **2.8** `["executor", "after", "then"]`. The executor runs immediately, inside the
  constructor. `then` callbacks always run later — even for a promise that is already resolved.

</details>

<details>
<summary><strong>Exercise 3 — Async/Await Practice</strong></summary>

- **3.1** An `async` function runs synchronously until its first `await`, and then returns a
  promise to the caller. So `first` has not run yet.
- **3.3** In `catch (error)`, `error` is `unknown` — narrow it with `instanceof Error`.
- **3.5** Sequential is about 3 × 40 = 120 ms; parallel is about 40 ms. Use sequential only when
  each request needs the result of the previous one.
- **3.6** `forEach` ignores what its callback returns, including a promise. The function returns
  an empty array; the names arrive later. Use `for...of` (one at a time) or
  `Promise.all(ids.map(...))` (all at once).
- **3.7** `for (let attempt = 1; ; attempt++) { try { return await operation(); } catch (error) {
  if (attempt >= attempts) throw error; await delay(waitMs); } }`
- **3.8** Without `await`, the function returns the promise *unsettled*: by the time it rejects,
  the `try` block is long gone, so the rejection goes to the caller. With `return await`, the
  promise settles inside the `try`. Inside `try`, always write `return await`.
- **3.9** Top-level `await` works only in ES modules — which this project is, because of
  `"type": "module"`.

</details>

<details>
<summary><strong>Exercise 4 — Chuck Norris</strong></summary>

- **4.1** `fetch` rejects only when no answer arrives at all. For a 404 or a 500 it *resolves*,
  with `response.ok === false`. Check `response.ok` before reading the body.
- **4.1** A failed `fetch` rejects with a `TypeError`, whose message depends on where it runs:
  `fetch failed` in Node, `Failed to fetch` in Chrome, `NetworkError when attempting to fetch
  resource.` in Firefox. Do not show any of them to the user — catch it and throw your own,
  friendlier error.
- **4.3** `url.searchParams.set("query", "fish & chips")` gives `?query=fish+%26+chips`. Glued by
  hand, the `&` would end the parameter and the server would search for `"fish "`.
- **4.4** `typeof data === "object" && data !== null`, then read the fields through
  `data as Record<string, unknown>` and check each one's `typeof`.
- **4.6** `textContent` puts text in as text. With `innerHTML`, a joke containing
  `<img src=x onerror=…>` would run code in your page.
- **4.6** For "only the latest": keep a counter. Each request takes the next number; when the
  answer arrives, it updates the page only if its number is still the latest. (Exercise 6 shows
  a second way: cancelling.)
- **4.6** The `<script type="module">` in the `<head>` runs only after the page is parsed, so
  `document.getElementById` finds every element.
- **4.7** `new Response(JSON.stringify(body), { status: 404 })` builds a response by hand —
  `Response` is global in Node, just like `fetch`.

</details>

<details>
<summary><strong>Exercise 5 — Currency Conversion</strong></summary>

- **5.2** The status for `XYZ` is **200**, and the body is
  `{ "result": "error", "error-type": "unsupported-code" }`. Check `result` before anything else.
- **5.2** `new Date(seconds * 1000)`.
- **5.3** `42 / 1.12 * 1.12` is `41.99999999999999` — floating-point numbers cannot store most
  decimals exactly. Return the amount unchanged when `from === to`, and round only when you
  *display* a number.
- **5.3 Check:** with `EUR: 1, MKD: 61.5, USD: 1.12, GBP: 0.84`: 100 EUR = 6150 MKD, and
  112 USD = 84 GBP.
- **5.4** Store `{ table: Promise<RateTable>, expires: number }` in the map. Put the promise in
  *before* awaiting it — that is what makes two simultaneous calls share it. If it rejects,
  `delete` the entry.
- **5.5** `formatMoney(61.5, "MKD")` gives `"MKD 61.50"` — but the space is a **non-breaking
  space** (`" "`), so that `MKD` and the number never end up on different lines. A check
  that expects a normal space fails.
- **5.6** `input.valueAsNumber` is `NaN` for an empty field — check it with `Number.isFinite`.
- **5.6** A form with `form.inert = true` cannot be clicked or typed into.

</details>

<details>
<summary><strong>Exercise 6 — Weather Information</strong></summary>

- **6.1** When the timeout fires, `timeout.aborted` is `true`; when the caller cancels,
  `signal.aborted` is. Check which one it was in the `catch` around `fetch`.
- **6.1** `await response.json().catch(() => null)` returns `null` instead of throwing for a
  body that is not JSON.
- **6.2** "Ohrid" finds the town in North Macedonia, a village in Bulgaria, Ohrid airport, and
  a mountain.
- **6.3** `dates.forEach((date, i) => { const max = maxima[i]; ... })` — with
  `noUncheckedIndexedAccess`, each `maxima[i]` is possibly `undefined`, so check it.
- **6.4** `const CODES: Record<number, [text: string, icon: string]> = { 0: ["Clear sky", "☀️"], ... }`.
  `CODES[code]` is then `[string, string] | undefined`.
- **6.6** `new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "UTC" }).format(new Date("2026-10-26"))`
  is `"Monday"`.
- **6.7** `controller?.abort(); controller = new AbortController();` at the start of every search,
  and pass `controller.signal` down to `fetch`. An aborted `fetch` rejects with a `DOMException`
  named `"AbortError"`.
- **6.8** The fake has to behave like the real `fetch` with a signal: reject at once if
  `init.signal` is already aborted, and listen for its `abort` event otherwise.

</details>
