# Internet Programming — Exercises #01

Tasks for **Exercise 4 and onward**. Exercises 1–3 (environment setup, first HTML page,
console interaction) are covered in the slides.

Work in pairs or alone. For every task that asks you to *predict*, write your prediction
down **before** you run the code. The gap between what you expected and what happened is
the actual lesson.

---

## Exercise 4 — Understanding HTTP

**Goal:** see that a page load is not one thing, but dozens of request/response pairs.

Open a browser, press `F12` (or `Ctrl+Shift+I`), and go to the **Network** tab. Leave
*Disable cache* unticked for now. Reload the page so the panel fills up.

### 4.1 — Anatomy of a page load

Load any content-heavy site (a news site works well). Record:

| Question | Your answer |
|---|---|
| How many requests did the page make? | |
| How much data was transferred? | |
| How long until `DOMContentLoaded`? Until `Load`? | |
| Which single request took the longest? | |

### 4.2 — The document request

Click the **first** request in the list — the HTML document itself. From the *Headers*
panel, write down: request method, status code, and protocol (`http/1.1`, `h2`, `h3`).

### 4.3 — Reading headers

For that same request, find and explain in one sentence each:

- **Request headers:** `User-Agent`, `Accept`, `Accept-Language`
- **Response headers:** `Content-Type`, `Content-Length`, `Server`, `Cache-Control`

Then: change your browser's language setting and reload. Which header changed?

### 4.4 — Status codes in the wild

Trigger each of these and record the status code and what the browser did:

1. A page that exists — `200`
2. A URL on a real site that does not exist (invent a path) — `404`
3. Type `http://github.com` (note: **http**, no `s`) and watch the redirect chain.
   How many requests happened before you landed on the final page? What codes?

If you want codes on demand, `https://httpbin.org` serves any code you ask for:
`httpbin.org/status/404`, `/status/500`, `/redirect/3`, and `/headers` echoes back
what your browser sent. (If httpbin is down, `https://httpstat.us/404` does the same job.)

### 4.5 — Filtering by type

Use the type filters (*Doc / CSS / JS / Img / Fetch-XHR / Font*). Count how many of each
the page loaded. Which type accounts for the most **bytes**? Is that the same as the type
with the most **requests**?

### 4.6 — Caching

1. Reload normally (`F5`). Look at the *Size* column — some rows now say
   `(from disk cache)` or `(from memory cache)`.
2. Now hard-reload (`Ctrl+Shift+R`). What changed?
3. Tick *Disable cache* and reload again. Compare total transferred bytes across all three.

**Deliverable:** a short document with the filled table from 4.1, your header explanations
from 4.3, the redirect chain from 4.4, and the three byte totals from 4.6.

---

## Exercise 5 — JavaScript Variables and Data Types

**Goal:** internalise that *dynamically typed* does not mean *typeless*, and meet the
coercion rules that trip up every JavaScript developer.

Work in the browser console, or in a `.js` file run with `node`.

### 5.1 — `var`, `let`, `const`

Predict, then run, then explain each result:

```js
const x = 1;
x = 2;                       // ?

const o = { a: 1 };
o.a = 2;                     // ? why is this different from the line above?

console.log(v); var v = 1;   // ?
console.log(l); let l = 1;   // ?
```

Write one sentence on why the two `console.log` lines fail differently.

### 5.2 — `typeof`

Fill in the table by predicting first, then checking:

| Expression | Prediction | Actual |
|---|---|---|
| `typeof 1` | | |
| `typeof "a"` | | |
| `typeof true` | | |
| `typeof undefined` | | |
| `typeof null` | | |
| `typeof []` | | |
| `typeof {}` | | |
| `typeof function(){}` | | |

Two of these results are surprising. Which two, and how would you *actually* test whether
something is an array, or whether it is `null`?

### 5.3 — Numbers behaving badly

```js
0.1 + 0.2
0.1 + 0.2 === 0.3
1 / 0
0 / 0
typeof NaN
NaN === NaN
Number.MAX_SAFE_INTEGER
9007199254740992 + 1 === 9007199254740993
```

Explain the first two results. Then: how *should* you compare two floating-point numbers?
How do you reliably test whether a value is `NaN`?

### 5.4 — Truthy and falsy

Run `Boolean(v)` for each: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`,
`[]`, `{}`, `"0"`, `"false"`.

**There are exactly eight falsy values in JavaScript.** List them. Then explain why
`[]` and `"0"` are truthy even though they look "empty" or "zero".

### 5.5 — `==` versus `===`

Predict every line before running:

```js
"" == 0
"0" == false
[] == false
null == undefined
null === undefined
null == 0
undefined == 0
[] == ![]
NaN == NaN
```

`null == undefined` is `true` but `null == 0` is `false`. Explain why — `null` is not
coerced to a number by `==`. Then state the rule you will follow in your own code.

### 5.6 — Explicit conversion

| Expression | Result |
|---|---|
| `Number("")` | |
| `Number(" ")` | |
| `Number("12abc")` | |
| `Number(null)` | |
| `Number(undefined)` | |
| `parseInt("12abc")` | |
| `parseInt("0.9")` | |
| `parseFloat("0.9abc")` | |
| `+"5"` | |

When would you reach for `Number()` and when for `parseInt()`? Look carefully at what
`parseInt("0.9")` returns — this one causes real bugs.

### 5.7 — Put it together

Predict, run, and *explain the evaluation order* for each:

```js
"5" + 3
"5" - 3
true + true
[] + []
[] + {}
"b" + "a" + +"a" + "a"
1 < 2 < 3
3 > 2 > 1
```

The last two are the best ones. Why does `1 < 2 < 3` give a different answer than
`3 > 2 > 1`, when both look "obviously true" in mathematics?

**Deliverable:** your prediction-vs-actual tables, plus written explanations for 5.3,
5.4, 5.5 and the final two lines of 5.7.

---

## Exercise 6 — Basic JavaScript Functions

**Goal:** write functions, and see that functions are values like any other.

### 6.1 — Three ways to write one

Write the same function — one that squares a number — three times:

```js
function square(n) { ... }           // declaration
const square = function (n) { ... }  // expression
const square = n => ...              // arrow
```

Then test hoisting: call each one on the line *above* where it is defined. Which works?
Which throws, and with what error message?

### 6.2 — Write these

Small and concrete. No libraries.

1. `celsiusToFahrenheit(c)` — returns the converted temperature.
2. `isEven(n)` — returns `true` / `false`.
3. `largest(a, b, c)` — returns the largest of three numbers, without using `Math.max`.
4. `reverseString(s)` — `"hello"` becomes `"olleh"`.
5. `countVowels(s)` — `"internet"` gives `3`.
6. `sum(numbers)` — takes an array, returns the total.
7. `isPalindrome(s)` — ignoring case and spaces, `"Never odd or even"` gives `true`.

### 6.3 — Parameters and return values

```js
function f(a, b) { return b; }
f(1);                         // ?

function g(a, b = 10) { return a + b; }
g(5);                         // ?

function h(a) { return arguments.length; }
h(1, 2, 3);                   // ?

function noReturn() {}
noReturn();                   // ?
```

What does a function return when it has no `return` statement? What happens to arguments
you pass but never declared? Now try `arguments` inside an **arrow** function — what
happens, and why?

### 6.4 — Functions as values

This is what "first-class citizen" means. Demonstrate each:

1. Assign a function to a variable, then call it through a *second* variable.
2. Pass a function **as an argument**: sort `[10, 9, 100, 1]` numerically with
   `.sort((a, b) => a - b)`. Then try `.sort()` with no argument — why is the result wrong?
3. Return a function **from** a function:
   ```js
   const adder = a => b => a + b;
   adder(2)(3);   // ?
   ```
   Now write `multiplier(n)` the same way, so that `multiplier(3)(4)` gives `12`.

**Deliverable:** one `.js` file with all functions from 6.2 plus `console.log` calls
proving each works, and short written answers for 6.3 and 6.4.

---

## Exercise 7 — DOM Manipulation

**Goal:** change a live page from JavaScript.

Use the starter page `dom-playground.html` in this folder. Open it in the browser, open the
console, and do everything below **from the console first** — then move your working code
into the `<script>` tag at the bottom of the page.

### 7.1 — Selecting

1. Select the element with id `title` using `document.getElementById`.
2. Select the same element using `document.querySelector`.
3. Select **all** elements with class `item` using `querySelectorAll`. How many are there?
4. `querySelectorAll` does not return an array. Prove it (`Array.isArray`), then convert
   the result into a real array.

### 7.2 — Changing content

1. Change the text of `#title` to your own name.
2. Set `#subtitle` using `textContent`, then set the same thing using `innerHTML` with
   `"<em>hello</em>"` in the string. What is the difference in what you see?
3. Based on that difference: why is `innerHTML` dangerous with text a user typed in?

### 7.3 — Changing appearance

1. Give `#box` a red background using `element.style`.
2. Now do it instead by adding the existing `highlight` class with `classList.add`.
3. Use `classList.toggle` and call it twice. What happens?
4. Which approach — `style` or `classList` — would you use in a real project, and why?

### 7.4 — Creating and removing

1. Create a new `<li>` with `document.createElement`, set its text, append it to `#list`.
2. Write a loop that adds five more items at once.
3. Remove the **first** item from the list.
4. Remove every item whose text contains the letter `e`.

### 7.5 — Attributes

1. Change the `src` of `#logo` to a different image URL.
2. Change the `href` of `#link` to point somewhere else, and change its text to match.
3. Read `#link`'s `href` back with `getAttribute`. Then set a custom `data-status`
   attribute and read it via `dataset`.

### 7.6 — Reacting to the user

1. Add a `click` listener to `#btn` that changes the text of `#output`.
2. Make `#btn` count its own clicks and display the running total.
3. Add a listener to `#input` for the `input` event that live-copies what is typed
   into `#output`.
4. Add a **single** `click` listener to `#list` that reports which item was clicked. You
   will need `event.target` — one listener on the parent, not one per item. Why is that
   better, especially for items added later?

### 7.7 — Build something small

Use `#input`, `#btn` and `#list` to build a working to-do list:

- typing text and pressing the button adds it as a new item
- the input clears itself after adding
- adding an empty value does nothing
- clicking an existing item removes it

**Deliverable:** your finished `dom-playground.html` with all code in the `<script>` tag,
plus written answers to the "why" questions in 7.2, 7.3 and 7.6.

---

<details>
<summary><strong>Answer key — Exercise 5</strong></summary>

All values below verified against Node.

**5.1** `x = 2` gives `TypeError: Assignment to constant variable.` · `o.a = 2` works,
because `const` freezes the *binding*, not the object it points at. · `var v` logs
`undefined` (hoisted and auto-initialised) · `let l` throws
`ReferenceError: Cannot access 'l' before initialization` — the temporal dead zone.

**5.2** `number`, `string`, `boolean`, `undefined`, **`object`** (the famous `typeof null`
bug, kept for backwards compatibility), **`object`** (arrays are objects — use
`Array.isArray()`), `object`, `function`. Test for null with `value === null`.

**5.3** `0.30000000000000004` · `false` · `Infinity` · `NaN` · `"number"` · `false`
(`NaN` is the only value not equal to itself — use `Number.isNaN()`) ·
`9007199254740991` · `true` (integers above `MAX_SAFE_INTEGER` lose precision).
Compare floats with `Math.abs(a - b) < Number.EPSILON`.

**5.4** The eight falsy values: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.
Everything else is truthy — including `[]`, `{}`, `"0"` and `"false"`, because every
non-empty **string** and every **object** is truthy regardless of its contents.

**5.5** `true`, `true`, `true`, `true`, `false`, `false`, `false`, `true`, `false`.
`[] == ![]` is the prize: `![]` is `false`, then `[]` coerces to `""`, `""` to `0`, and
`false` to `0`. `null` and `undefined` are loosely equal to each other and to nothing
else. The rule: always use `===`.

**5.6** `0`, `0`, `NaN`, `0`, `NaN`, `12`, **`0`**, `0.9`, `5`. `parseInt("0.9")` is `0`
because parsing stops at the `.` — use `Number()` or `parseFloat()` when decimals matter.

**5.7** `"53"` (with `+`, string concatenation wins) · `2` (`-` has no string meaning, so
both sides coerce to numbers) · `2` · `""` · `"[object Object]"` · `"baNaNa"` · `true` ·
`false`. The last pair: comparison is **left-associative**, so `1 < 2 < 3` is
`(1 < 2) < 3` → `true < 3` → `1 < 3` → `true`, while `3 > 2 > 1` is `(3 > 2) > 1` →
`true > 1` → `1 > 1` → `false`. Both are accidents of coercion, not mathematics.

</details>
