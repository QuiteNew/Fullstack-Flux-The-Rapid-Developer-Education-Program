# Lecture 05

## Materials

| File | What it is |
|---|---|
| [Class09-AsynchronousJavaScript.pptx](Materials/Class09-AsynchronousJavaScript.pptx) | Slides — asynchronous JavaScript |
| [Class09-AsynchronousJavaScript.md](Materials/Class09-AsynchronousJavaScript.md) | **Companion notes** — the detail behind the bullets |
| [Class10-WebapiFetch.pptx](Materials/Class10-WebapiFetch.pptx) | Slides — Web APIs and fetch |
| [Class10-WebapiFetch.md](Materials/Class10-WebapiFetch.md) | **Companion notes** — the detail behind the bullets |
| [Exercises05.pptx](Materials/Exercises05.pptx) | Slides — the exercise list |
| [Quiz/](Materials/Quiz/index.html) | **"In which order?"** — 20 questions: predict what asynchronous code prints, then run it |
| [Demos/](Materials/Demos/README.md) | Nine short programs to run in class — event loop, waterfalls, `fetch`, timeouts, CORS, JSON |

The `.md` files follow the slide order section by section, so you can read them alongside the
deck or on their own afterwards. Every example in them was run with Node 24, and the output
shown is the real output; type claims were checked with TypeScript 7.

### The quiz

Open `Materials/Quiz/index.html` in a browser — straight from disk works. Each question shows a
snippet of code that mixes plain code, timers, promises and `await`, and asks what it prints.
The questions go from easy to hard. After answering, **Run it** runs the snippet in the
browser and shows its real output. Keyboard: 1–4 to answer, R to run, Enter to continue.

It is the quiz engine from Lecture 03, exercise 10, with code questions added. To add a
quiz, copy `quizzes/event-loop.js` and add a `<script>` line for it in `index.html`.
`node verify.mjs` runs every snippet in Node and checks that the marked answer is what it
really prints.

## Exercises

Task sheets and solutions are in `Exercises/Group1` and `Exercises/Group2`. Each folder is one
TypeScript project, set up like Lecture 04's:

```bash
npm install                    # installs TypeScript, tsx and the Node type definitions
npx tsx exercise.02.ts         # exercises 1-3 run in Node
npx tsc --watch                # exercises 4-6 run in the browser: compile them...
npm run serve                  # ...and serve them at http://localhost:8080/exercise.04/
```

- `Exercises05-Tasks.md` — detailed tasks for all six exercises, a setup section for the
  browser pages, and hints with expected results at the end
- `exercise.01.ts` – `exercise.03.ts` — callbacks, promises, and async/await. Each prints
  `PASS` / `FAIL`. Compare how each file runs its own checks: a pyramid of callbacks, a
  `.then` chain, and plain top-level `await`.
- `exercise.04/` — Chuck Norris jokes; `exercise.05/` — a currency converter (the homework);
  `exercise.06/` — weather from Open-Meteo. Each has an `index.html`, an API module, the page
  code in `main.ts`, and a `check.ts` that tests the API module in Node with a fake `fetch`,
  then makes one real request (`npx tsx exercise.05/check.ts`).
- `serve.ts` — a static web server in 50 lines of `node:http`. A page opened from `file://`
  cannot load module scripts.
- `tsconfig.json`, `package.json` — the project settings. New since Lecture 04: the `dom` lib
  and `@types/node`, because this project has code for both the browser and Node.

All three APIs are free, need no key, and allow requests from any page.

## Topics covered

**Class 09** — synchronous versus asynchronous code · blocking · concurrency versus parallelism ·
the event loop, run-to-completion, the task and microtask queues · `setTimeout` as a minimum
delay, `setInterval` · callbacks, the error-first convention, inversion of control, callback
hell and how to flatten it · promise states, the constructor, `then` / `catch` / `finally`,
chaining, unhandled rejections, promisifying callback APIs · `Promise.all`, `allSettled`,
`race`, `any` and `withResolvers` · `async` functions, `await`, `try` / `catch` / `finally`,
`return await` · sequential versus parallel awaits, loops, `forEach`, top-level `await`

**Class 10** — what a Web API is · REST in practice: resources, methods, status codes, headers,
where data goes · GraphQL, SOAP, gRPC, WebSocket and Server-Sent Events compared · public
and private APIs, API keys, authentication, rate limiting · `fetch` and the `Response`
object · sending JSON, building URLs with `URLSearchParams` · timeouts and cancellation with
`AbortSignal` · CORS · a typed `getJson` wrapper and validating responses at runtime ·
exogenous errors, loading / error / empty states, parallel requests, retries, caching · JSON
syntax, parsing, stringifying, what gets lost, revivers, `structuredClone`

## Beyond the slides

These topics are in the notes but not in the decks:

- **Microtasks versus tasks**, and a puzzle about the order in which callbacks run — Class 09,
  section 4
- **Concurrency is not parallelism**: JavaScript waits for many things at once but runs on one
  thread; real parallelism needs Workers — Class 09, section 2
- **Unhandled rejections** crash Node 24 — Class 09, section 6
- **The accidental waterfall**, `forEach` that does not wait, and `return await` — Class 09,
  section 7
- **`fetch` does not reject on 404 or 500** — check `response.ok` — Class 10, section 5
- **Timeouts and cancellation** with `AbortSignal.timeout` and `AbortController` — Class 10,
  section 7
- **CORS**, and why the same request works from Node but not from a page — Class 10, section 8
- **Validating responses at runtime**, because the types promise nothing — Class 10, section 9
- **What JSON loses** — dates, `undefined`, `Map`, `BigInt` — and how to get dates back —
  Class 10, section 11

## Builds on earlier lectures

- The event loop sketched in [Lecture 01, Class 02](../Lecture01/Materials/Class02-GettingStartedJS.md)
  is explained in full — Class 09, section 4
- Callbacks are closures — [Lecture 03, Class 05](../Lecture03/Materials/Class05-FunctionsStructures.md);
  `once()` in exercise 1.5 is a closure over a flag
- Event handlers from [Lecture 02](../Lecture02/Materials/Class04-DOM.md) are callbacks too —
  Class 09, section 3
- JSON from [Lecture 03, Class 06, section 9](../Lecture03/Materials/Class06-DataStructures.md)
  comes back from every API — Class 10, section 11
- "Types are erased" from [Lecture 04, Class 07](../Lecture04/Materials/Class07-TypeScriptFundamentals.md)
  is why API data must be checked — Class 10, section 9, and every `isJoke`-style guard in
  exercises 4–6
