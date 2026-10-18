# Lecture 03

## Materials

| File | What it is |
|---|---|
| [Class05-FunctionsStructures.pptx](Materials/Class05-FunctionsStructures.pptx) | Slides — functions and control structures |
| [Class05-FunctionsStructures.md](Materials/Class05-FunctionsStructures.md) | **Companion notes** — the detail behind the bullets |
| [Class06-DataStructures.pptx](Materials/Class06-DataStructures.pptx) | Slides — JavaScript data structures |
| [Class06-DataStructures.md](Materials/Class06-DataStructures.md) | **Companion notes** — the detail behind the bullets |
| [Exercises03.pptx](Materials/Exercises03.pptx) | Slides — the exercise list |

The `.md` files follow the slide order section by section, so you can read them alongside
the deck during the lecture or on their own afterwards. They also cover several topics that
are not on the slides — see below.

## Exercises

Task sheets and solutions are in `Exercises/Group1` and `Exercises/Group2`.

- `Exercises03-Tasks.md` — detailed tasks for all ten exercises, with exact specifications
  and test tables for the two "scary" ones, and hints with expected results at the end
- `exercise.01.js` – `exercise.09.js` — solutions. Each file is self-contained and runs its
  own test table, printing `PASS` / `FAIL` per check: `node exercise.01.js`
- `runner.html` + `runner.js` — runs exercises 1–9 in the browser instead, showing the
  console output on the page: open `runner.html?ex=01`
- `exercise.10.html` + `exercise.10.js` — the quiz engine, with keyboard support
- `quizzes/` — the quiz data, one file per quiz: `course.js` (this course so far) and
  `tricky.js` (trick questions). To add a quiz, copy one of these files and add a
  `<script>` line for it in `exercise.10.html`. Open a quiz directly with
  `exercise.10.html?quiz=tricky`
- `style.css` — shared styles for the pages

## Topics covered

**Class 05** — `if`/`else` and guard clauses · `switch`, strict comparison and fall-through ·
all eight falsy values · `!!`, short-circuiting and `??` · `for`, `for...of` and `for...in`
and when to use each · `break` and `continue` · `while`, `do...while` and infinite loops ·
the error object and error types · `try`/`catch`/`finally`, throwing, and why never to
swallow errors · function declarations, expressions, IIFEs and arrow functions · default
parameters · an introduction to `this`

**Class 06** — arrays, indexing and `at()` · mutating versus non-mutating methods · `splice`
versus `slice` · the `sort` trap, comparators, `localeCompare` and `toSorted` · finding with
`includes`, `indexOf`, `find` · `forEach`, `map`, `filter`, `some`, `every`, `reduce` ·
object literals, constructors, property access and iteration · `Map` versus objects ·
destructuring · spread, rest, and shallow versus deep copies

## Beyond the slides

These topics are in the notes but not in the decks:

- **Scope and closures** — Class 05, section 7
- **Recursion**, the call stack, and how large a factorial can get — Class 05, section 8
- **`this`** and why arrow functions behave differently — Class 05, section 6
- **`Set`** — Class 06, section 5
- **Optional chaining `?.`** and nullish coalescing `??` — Class 06, section 8
- **JSON** — Class 06, section 9
- **`structuredClone`** for deep copies — Class 06, section 7

## Builds on earlier lectures

- Truthiness and `==` versus `===` from
  [Class 02, section 6](../Lecture01/Materials/Class02-GettingStartedJS.md) underpin
  Class 05, section 2
- Closures explain why the event handlers in
  [Class 04, section 5](../Lecture02/Materials/Class04-DOM.md) can use outer variables
- The `NodeList` from Class 04 is one of the array-like objects in Class 06, section 1
- The Lecture 02 class demo's `?.` is explained in Class 06, section 8
