# Lecture 06 — Demos

Five short demos, each showing code students already know **from a second angle**. Nothing
to install: Node 24 runs the `.ts` files directly, and the page opens from disk.

| # | File | Run | Shows | Notes |
|---|---|---|---|---|
| 1 | `01-class-underneath.ts` | `node 01-class-underneath.ts` | A class and the constructor function + prototype it is made of, behaving identically; why every array has `.map` | Class 11, §3–4 |
| 2 | `02-this-rules.ts` | `node 02-this-rules.ts` | One method called seven ways: method call, detached, callback, arrow, `bind`, arrow field, `call` | Class 11, §5 |
| 3 | `03-loop-to-pipeline.ts` | `node 03-loop-to-pipeline.ts` | The same report written imperatively (loops) and declaratively (`filter` / `toSorted` / `map` / `reduce`) | Class 12, §4 and §9 |
| 4 | `04-mutation-bug.ts` | `node 04-mutation-bug.ts` | A "read-only" function that sorts the caller's array; the pure version that cannot | Class 12, §6 |
| 5 | `05-state-and-render.html` | open in a browser | A sortable, filterable table: one `state` object, pure functions, one `render()` | Class 12, §9, and the midterm |

`package.json` here only says `"type": "module"`. Demo 3 uses `toSorted`, which needs
Node 20+ (or `[...list].sort(...)`).

The quizzes in [`../Quiz`](../Quiz/index.html) go with these: **Name it** (vocabulary) and
**What does it print?** (`this`, prototypes, copies, immutability).

## Suggested order

- **Class 11:** 1 → 2 → the *What does it print?* quiz
- **Class 12:** 3 → 4 → 5 → the *Name it* quiz, as a recap of both classes

## Things worth saying

- **Demo 1:** `new` does four things — create an object, link it to the prototype, run the
  constructor with `this` set to it, return it. Nothing is copied.
- **Demo 2:** `this` is decided by *how a function is called*, not where it is written —
  except in arrow functions. Line 3 is every `addEventListener` and `setTimeout` bug.
- **Demo 3:** every small function in the declarative version has a name, can be tested on its
  own, and is reusable: `newestFirst` is a column sort, `isAlive` a filter, `summary` a table
  cell.
- **Demo 4:** ask "what order is `scores` in afterwards?" before running it. `sort` and
  `push` change their array; `toSorted`, `map` and spread make new ones.
- **Demo 5:** this is the shape of the midterm. Events change `state` and call `render()`;
  nothing else writes to the page. The `<pre>` at the bottom shows the state live — change a
  filter or click a header twice and watch it.
