# Internet Programming — Exercises #02

Detailed tasks for the five exercises in `Exercises02.pptx`, in slide order.

Everything here uses what Classes 03 and 04 covered: `<script>` placement and `defer`,
selecting elements, changing content, attributes and classes, creating and removing
elements, and events. The companion notes in `Lecture02/Materials` explain all of it in
depth — keep `Class04-DOM.md` open while you work.

**Ground rules for all five exercises**

- One HTML file per exercise, with your JavaScript in a separate `.js` file loaded with
  `<script src="..." defer>` in the `<head>`. (Class 03, section 4 explains why.)
- Use `textContent`, never `innerHTML`, for anything a user typed. Exercise 1 shows you why.
- Use `classList` for appearance; keep the actual styles in CSS.
- Keep the devtools console open the whole time. A red error is information, not failure.
- Stuck? Each exercise has hints and expected results at the end of this sheet.

---

## Exercise 1 — Select and Modify Elements

**Goal:** use every selection and modification technique from Class 04 on a page you
built yourself, and observe the differences between them.

### 1.1 — Build the page

Create `select-modify.html` containing at least:

- an `<h1>`
- a paragraph with `id="intro"`
- a `<ul id="list">` with **five** `<li class="item">` elements, each with a
  `data-count="0"` attribute
- an `<img>` with `src` and `alt` (use one from Exercise 3's `gallery-images` folder)
- a link `<a id="link">`
- a `<div id="output"></div>`

Format the list with one `<li>` per line and normal indentation — this matters in 1.7.

### 1.2 — Five ways to select

Use each of the five methods from slide 5 of Class 04. For each, record **what type of
thing it returned** (`console.log` it and look carefully):

| Call | Returns | Count |
|---|---|---|
| `document.getElementById("list")` | | |
| `document.getElementsByClassName("item")` | | |
| `document.getElementsByTagName("li")` | | |
| `document.querySelector(".item")` | | |
| `document.querySelectorAll(".item")` | | |
| `document.querySelector(".does-not-exist")` | | |

Then: call `.map()` on the result of `querySelectorAll`. What happens? Convert it into a
real array and try again.

### 1.3 — Live versus static

```js
const live = document.getElementsByClassName("item");
const snapshot = document.querySelectorAll(".item");
```

Record both lengths. Now create a new `<li class="item">` and append it to the list.
Record both lengths again. Explain the difference in one sentence.

### 1.4 — `textContent` versus `innerHTML`

1. Set `#output` using `textContent` to the string `"<strong>bold?</strong>"`. Then do
   the same using `innerHTML`. Describe what you see each time.
2. Now set `#output.innerHTML` to:
   ```html
   <img src="x" onerror="alert('This could have been your session cookie')">
   ```
   What happens? Repeat with `textContent`.
3. Finally try `innerHTML` with `<script>alert(1)</script>`. **It does not run.** Explain
   why that result is *dangerously misleading* — what would a developer wrongly conclude
   if this was the only thing they tested?

### 1.5 — Attributes and data

1. Change the image's `src` to a different image, and update its `alt` to match.
2. Make `#link` point to MDN, open in a new tab (`target="_blank"`), and change its text.
3. Read `#link`'s `href` both as `link.href` and as `link.getAttribute("href")`, after
   setting it to a relative path like `"page.html"`. Why are the two values different?
4. Make each list item, when clicked, increment its own `data-count` and show the new
   count in its text: `Alpha (3)`. Remember `dataset` values are always **strings**.

### 1.6 — Styling two ways

1. Give the `<h1>` a background colour using `element.style`.
2. Now remove that and do the same thing by adding a class defined in your CSS.
3. Open the **Elements** tab and find where each approach put the style.
4. Add a CSS rule `h1 { background: gray; }` to your stylesheet, then apply the colour with
   `element.style` again. Which wins, and why? (Class 01, section 7 — specificity.)

### 1.7 — The whitespace trap

Log `list.childNodes.length` and `list.children.length`. They differ. Explain exactly what
the extra nodes are, and which property you should normally use.

**Deliverable:** `select-modify.html` and its `.js` file, plus the filled table from 1.2
and written answers to 1.3, 1.4.3, 1.5.3 and 1.7.

---

## Exercise 2 — Interactive Forms

**Goal:** take control of a form — validate input yourself, give useful feedback, and
handle submission in JavaScript instead of letting the page reload.

### 2.1 — Build the form

A registration form with these fields. Every input needs a `<label for="...">`.

| Field | Rule |
|---|---|
| Full name | Required, at least 2 characters after trimming |
| Email | Required, valid email format |
| Password | At least 8 characters, and contains at least one digit |
| Confirm password | Must match the password |
| Age | A number between 16 and 120 |
| Accept terms | Checkbox, must be ticked |

Give every field a `name` attribute, and put an empty `<span class="error"></span>`
directly after each input for its error message.

Add the **`novalidate`** attribute to the `<form>`. Section 2.6 makes you find out why.

### 2.2 — Take over submission

```js
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // ...
});
```

Remove the `preventDefault` line temporarily and submit. What happens to the page, and to
anything you logged to the console? Put it back.

Read all the values at once:

```js
const data = Object.fromEntries(new FormData(form));
console.log(data);
```

Look at the type of `data.age`. Every form value arrives as a **string** — even from
`type="number"`. Convert deliberately where it matters.

### 2.3 — Validate on submit

Write a `validate()` function that checks every rule from 2.1, and:

- writes a specific message into each failing field's `.error` span
  (*"Password needs at least one digit"*, not *"Invalid"*)
- adds an `invalid` class to each failing input, styled in your CSS
- clears the message and class from fields that now pass
- returns `true` only if everything passed

On submit, if validation fails, move keyboard focus to the **first** invalid field with
`.focus()`.

> Check password length yourself with `value.length`. The built-in `validity.tooShort` only
> reports problems after real user typing — it stays `false` if a value was set by script —
> so it is an unreliable thing to build on.

### 2.4 — Live feedback

Showing errors before someone has finished typing is irritating. Showing them only on
submit is too late. Implement both halves:

1. On **`blur`** (the field loses focus), validate that one field.
2. On **`input`**, if the field is currently marked invalid, re-check it — so the error
   disappears the moment it is fixed, but never appears while still typing.
3. When the password changes, re-check *confirm password* as well.

In one sentence each: what is the difference between the `input`, `change` and `blur`
events?

### 2.5 — The submit button

Keep the submit button **disabled** until the terms checkbox is ticked. Which event do you
listen to on a checkbox, and which property tells you whether it is ticked?

### 2.6 — Investigations

1. Remove `novalidate` and submit the empty form. What does the browser do? **Does your
   `submit` listener run at all?** Explain why `novalidate` is needed when you validate in
   JavaScript.
2. Set the age field to empty and compare `ageInput.value`, `Number(ageInput.value)` and
   `ageInput.valueAsNumber`. Which one could make an empty field pass a "between 16 and
   120" check by accident, and how? (Class 02, section 6.)

### 2.7 — Success

On valid submission, hide the form and show a message — *"Welcome, Ana! A confirmation has
been sent to ana@example.com."* — built with `textContent`. Then type
`<img src=x onerror=alert(1)>` as your name and confirm it displays harmlessly.

**Stretch:** a password strength meter under the password field that updates on every
keystroke — weak / medium / strong — based on length, digits, capitals and symbols.

**Deliverable:** `form.html` and its `.js` file, plus written answers for 2.4, 2.5 and 2.6.

---

## Exercise 3 — Image Gallery

**Goal:** generate UI from data, and handle clicks, keys and an overlay correctly.

Eight images are provided in `gallery-images/`. They are local files, so your gallery works
without internet.

### 3.1 — Build the grid from data

Do **not** write the `<img>` tags in your HTML. Start from data:

```js
const photos = [
  { file: "01-dawn.svg",   title: "Dawn" },
  { file: "02-noon.svg",   title: "Noon" },
  { file: "03-dusk.svg",   title: "Dusk" },
  { file: "04-night.svg",  title: "Night" },
  { file: "05-autumn.svg", title: "Autumn" },
  { file: "06-winter.svg", title: "Winter" },
  { file: "07-spring.svg", title: "Spring" },
  { file: "08-storm.svg",  title: "Storm" },
];
```

Loop over it and build the thumbnail grid with `createElement`. Every image gets an `alt`
from its title, and a `data-index` attribute holding its position. Lay the grid out with
CSS Grid.

*Why build from data?* Adding a ninth photo should mean adding one line to the array — not
editing HTML in several places.

### 3.2 — One listener for the whole grid

Attach **one** `click` listener to the grid container, not one per image. Use
`event.target.closest("img")` to find which thumbnail was clicked, and read its
`data-index`.

Why is one listener better than eight? What would happen with per-image listeners if you
later added photos dynamically? (Class 04, section 5.)

### 3.3 — The large view

Clicking a thumbnail opens an overlay covering the page, showing:

- the image, large
- its title as a caption
- a position counter — `3 / 8`

Build the overlay in your HTML once, hidden with a class. Opening it means filling in the
`src`, caption and counter, then toggling the class. Do not rebuild it on every click.

### 3.4 — Closing it

The overlay must close in all three of these ways:

1. a **×** button
2. clicking the dark backdrop — but **not** clicking the image itself
3. pressing **Escape**

For 2: when the click lands on the image, which element is `event.target`? Which element
is it when the click lands on the backdrop? Use that to tell them apart.

For 3: listen for `keydown` on `document` and check `event.key`. Make sure Escape does
nothing when the overlay is already closed.

### 3.5 — Next and previous

Add ◀ and ▶ buttons, and support the **ArrowLeft** / **ArrowRight** keys. Navigation wraps
around: next from the last photo goes to the first, previous from the first goes to the
last.

> Watch out: in JavaScript `-1 % 8` is **`-1`**, not `7`. The "obvious"
> `(index - 1) % photos.length` breaks when stepping back from the first photo. Find a
> version that works for both directions.

### 3.6 — Keep the grid in sync

The thumbnail of the photo currently shown in the overlay gets an `active` class. When you
navigate with arrows, the highlight moves.

**Stretch:**

- Rebuild the overlay using the native **`<dialog>`** element and `dialog.showModal()`.
  Which of the behaviours from 3.4 do you get for free?
- Add a text filter above the grid that hides thumbnails whose title does not match.
  Navigation in the overlay should then skip hidden photos.

**Deliverable:** `gallery.html`, its `.js` and `.css` files, and answers for 3.2 and 3.4.

---

## Exercise 4 — To Do List

**Goal:** a list whose items you can add, complete, edit, filter and remove — with every
change kept consistent.

You built a minimal to-do list in Lecture 01, Exercise 7.7. This version goes considerably
further, and the interesting part is keeping everything in sync.

### 4.1 — Adding items

Put the text input and the Add button inside a `<form>`, and handle the form's `submit`
event rather than the button's `click`.

This gives you Enter-to-add **for free** — explain why. Empty or whitespace-only input adds
nothing. The input clears and keeps focus after adding.

### 4.2 — Building an item

Each item contains a checkbox, the task text and a delete button:

```html
<li>
  <input type="checkbox">
  <span class="text">Buy milk</span>
  <button class="delete">×</button>
</li>
```

Build it with `createElement`. The text is user input, so set it with `textContent`. Test
this by adding `<img src=x onerror=alert(1)>` as a task.

### 4.3 — One listener for everything

Handle **both** the checkbox and the delete button with a single listener on the `<ul>`.
Use `event.target.matches(...)` or `.closest(...)` to tell them apart.

Ticking the checkbox toggles a `done` class on the `<li>`, which your CSS shows with a
strikethrough. Delete removes the item.

### 4.4 — The counter

Show a line beneath the list: **`2 of 5 done`**. It must be correct after *every* kind of
change — add, tick, untick, delete, and everything below.

Write one `updateCounter()` function and call it from every place that changes the list.
Do not keep a separate counter variable you increment and decrement — count what is
actually in the DOM each time. Why is that more reliable?

### 4.5 — Filters

Three buttons: **All**, **Active**, **Done**. Filtering *hides* items with a class; it never
deletes them. The active filter button is highlighted.

Then check: if the filter is set to **Active** and you tick an item, should it vanish
immediately? Make your list behave consistently, whichever you decide.

### 4.6 — Clear completed

A **Clear completed** button that removes every done item. It should be disabled when no
items are done.

### 4.7 — Editing

Double-clicking a task's text replaces it with an `<input>` holding the same text.
**Enter** saves, **Escape** cancels and restores the original, and clicking away (`blur`)
saves. Saving an empty value deletes the item.

**Stretch:** persist the list across reloads with `localStorage` and `JSON.stringify` /
`JSON.parse`. This was not covered in class — MDN's `localStorage` page is enough to get
started.

**Deliverable:** `todo.html` and its `.js` and `.css` files, and answers for 4.1, 4.4
and 4.5.

---

## Exercise 5 — Basic Calculator

**Goal:** model a small piece of state carefully, and handle input from both buttons and
the keyboard.

**Rule: no `eval()`, and no `new Function()`.** Both would turn the exercise into one line
— and both execute arbitrary code, which is exactly the kind of habit Exercise 1.4 warns
about. You are building the logic yourself.

### 5.1 — Layout

A display and a keypad laid out with CSS Grid, four columns:

```
  C    ⌫    ÷
  7    8    9    ×
  4    5    6    −
  1    2    3    +
  0         .    =
```

Describe each button with `data-*` attributes rather than reading its visible label —
for example `data-digit="7"`, `data-op="/"`, `data-action="clear"`. The display shows `÷`
but your code should see `/`.

### 5.2 — One listener

A single `click` listener on the keypad, which reads `event.target.dataset` to decide what
happened. Route everything through one function, e.g. `press(key)` — you will reuse it for
the keyboard in 5.6.

### 5.3 — State

Keep the calculator's state in one object, for example:

```js
const state = {
  current: "0",       // what is being typed — a STRING
  previous: null,     // the stored left operand — a NUMBER
  operator: null,     // "+", "-", "*", "/" or null
};
```

Every button changes the state, then a single `render()` function updates the display from
it. Never write to the display from anywhere else.

Why is `current` a string rather than a number? Think about typing `0.0` — and about what
`"3" + "4"` gives you. (Class 02, section 6.)

### 5.4 — Behaviour

This is a **basic** calculator: operations run immediately, left to right, the way a
pocket calculator works. `2 + 3 × 4 =` gives **20**, not 14.

- No leading zeros: typing `0 0 7` shows `7`.
- Only one decimal point per number: `1 . . 5` shows `1.5`.
- `.` on its own starts `0.`
- Pressing an operator twice replaces it: `9 + − 3 =` gives `6`.
- After `=`, typing a digit starts a new calculation; pressing an operator continues from
  the result.
- **⌫** deletes the last character. **C** resets everything.

### 5.5 — Edge cases

1. **Division by zero** shows *Cannot divide by zero* — not `Infinity`. Every key except
   **C** is then ignored until the calculator is cleared.
2. **Floating point.** `0.1 + 0.2` must display **`0.3`**. In JavaScript it is actually
   `0.30000000000000004` (Class 02, section 4). Format results for display with
   `parseFloat(result.toPrecision(12))`. Why not `toFixed(2)`? Try `1 ÷ 3` with both, and
   check what type `toFixed` returns.

### 5.6 — Keyboard

Listen for `keydown` on `document` and map keys to your `press()` function: digits,
`.`, `+ - * /`, **Enter** and `=` for equals, **Backspace**, **Escape** for clear.

Press `/` in Firefox while your calculator is open — something unexpected may happen.
Find out what `event.preventDefault()` does about it.

### 5.7 — Test it

Your calculator must produce exactly these results. Work through the table:

| Keys | Display |
|---|---|
| `2 + 3 =` | `5` |
| `2 + 3 × 4 =` | `20` |
| `0 . 1 + 0 . 2 =` | `0.3` |
| `0 . 1 × 3 =` | `0.3` |
| `1 ÷ 3 =` | `0.333333333333` |
| `7 ÷ 0 =` | `Cannot divide by zero` |
| `7 ÷ 0 = 5` | `Cannot divide by zero` |
| `7 ÷ 0 = C 5` | `5` |
| `0 0 7` | `7` |
| `1 . . 5` | `1.5` |
| `. 5 + 1 =` | `1.5` |
| `9 + − 3 =` | `6` |
| `2 + 3 +` | `5` |
| `6 × 7 = 2` | `2` |
| `6 × 7 = + 1 =` | `43` |
| `1 0 ⌫` | `1` |

**Stretch:** a **±** key that negates the current number, and a small history panel listing
completed calculations — newest first, with each entry clickable to reuse its result.

**Deliverable:** `calculator.html` and its `.js` and `.css` files, the completed test table,
and answers for 5.3, 5.5.2 and 5.6.

---

## Hints

Stuck? Open the hints for the exercise you are on. Each hint nudges you towards the next
step, and the **Check** lines tell you what result to expect, so you can confirm you are on
track. Try for a while before you open them — the struggling is where the learning happens.

<details>
<summary><strong>Exercise 1 — Select and Modify Elements</strong></summary>

- **1.2** Expand each logged result in the console. The type name is shown before the
  contents — look for words like `HTMLCollection` and `NodeList`.
  **Check:** exactly one of the six calls returns `null`.
- **1.2** Before calling `.map()`, try `Array.isArray(...)` on the result. Two ways to get a
  real array: the spread syntax `[...something]`, or `Array.from(something)`.
- **1.3** **Check:** after appending, one of the two reports 6 and the other still reports 5.
  Ask yourself which of them is a *view* of the page and which is a *photo* of it.
- **1.4** **Check:** with `innerHTML` the `onerror` alert appears; with `textContent` you
  see the literal characters on the page.
- **1.4.3** `<script>` is not the only way HTML can run code. Look closely at the attribute
  in the `<img>` example.
- **1.5.3** **Check:** one of the two values starts with `http://` or `file:///`. One reads
  what you wrote in the HTML; the other reads what the browser worked out from it.
- **1.5.4** `dataset.count` is a string. What is `"0" + 1`? Convert with `Number()` first.
  Use `event.target` to know which item was clicked.
- **1.6** In the Elements tab, compare a `style="..."` attribute on the element itself with
  the rules listed in the *Styles* panel. Struck-through rules are the ones that lost.
- **1.7** Log `list.childNodes` and expand it. Look at what the `#text` entries contain.
  **Check:** for five items written one per line, `childNodes` is **11** and `children`
  is **5**.

</details>

<details>
<summary><strong>Exercise 2 — Interactive Forms</strong></summary>

- **2.1** A label's `for` must match the input's **`id`**, not its `name`. Click the label
  text: if the cursor jumps into the input, it is connected.
- **2.2** When the page reloads, the console clears. Tick **Preserve log** in the console
  settings to see what was logged before the reload.
  **Check:** `typeof data.age` is `"string"`.
- **2.3** Password digit check: `/\d/.test(password)` returns `true` if there is at least
  one digit. For the email, `emailInput.validity.typeMismatch` still works with
  `novalidate` — the browser checks the format, it just does not show its own message.
- **2.3** To focus the first invalid field, collect the failing inputs in an array as you
  validate, then call `.focus()` on the first one.
- **2.4** Find out by experiment. Attach all three listeners to one input, each logging its
  own name, then type, tab away, and come back:
  ```js
  ["input", "change", "blur"].forEach(type =>
    field.addEventListener(type, () => console.log(type)));
  ```
- **2.5** A checkbox's `.value` is `"on"` whether it is ticked or not — that is not the
  property you want. Also set the button's state once when the page loads, not only when
  the checkbox changes.
- **2.6.1** Put a `console.log` as the very first line of your submit handler, then submit
  with `novalidate` removed.
- **2.6.2** **Check:** the three values are `""`, `0` and `NaN`. Now work out
  `NaN < 16` and `NaN > 120`. `Number.isNaN()` exists for a reason.
- **2.7** A template literal keeps it readable:
  `` message.textContent = `Welcome, ${name}!` ``

</details>

<details>
<summary><strong>Exercise 3 — Image Gallery</strong></summary>

- **3.1** The image path is the folder plus the file name: `"gallery-images/" + photo.file`.
  Set the index with `img.dataset.index = i`. For a grid that adapts to the window width,
  look up `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))`.
- **3.2** Clicking in the gap *between* thumbnails gives you no image —
  `closest("img")` returns `null`. Check for that before reading the index. And remember
  `dataset` values are strings.
- **3.3** `position: fixed; inset: 0;` makes an element cover the whole window. Keep the
  index of the photo currently shown in a variable — the arrows in 3.5 will need it.
- **3.4** Add `console.log(event.target)` to your overlay's click listener, then click the
  image, and then the dark area. Compare.
- **3.4** For Escape, first check whether the overlay is open —
  `classList.contains(...)` will tell you.
- **3.5** **Check:** pressing ◀ on photo 1 shows **8 / 8**, and ▶ on photo 8 shows
  **1 / 8**. Hint: what happens if you add `photos.length` *before* taking the remainder?
- **3.6** Remove `active` from every thumbnail first, then add it to the one that matches:
  `` grid.querySelector(`[data-index="${index}"]`) ``
- **Stretch** — `dialog.showModal()` opens a `<dialog>`, and its backdrop can be styled
  with the `::backdrop` pseudo-element in CSS. Press Escape and see what happens.

</details>

<details>
<summary><strong>Exercise 4 — To Do List</strong></summary>

- **4.1** Pressing Enter in a text field inside a form submits that form. Do not forget
  `preventDefault()`.
- **4.2** A checkbox is an `input` with a type:
  `const box = document.createElement("input"); box.type = "checkbox";`
- **4.3** The `change` event bubbles, so the list can hear it from any checkbox inside.
  Tell the targets apart with `event.target.matches(".delete")` and
  `event.target.matches('input[type="checkbox"]')`. Then `event.target.closest("li")` gives
  you the item.
- **4.4** `list.querySelectorAll("li").length` and `list.querySelectorAll("li.done").length`
  give you both numbers. For the "why": imagine adding a feature a month from now and
  forgetting to update a separate counter variable.
- **4.5** Keep the current filter in a variable, and write an `applyFilter()` that shows or
  hides every item based on it. Call it after every change — just like `updateCounter()`.
  At that point it may be worth merging them into one `updateUI()`.
- **4.6** The button's `disabled` state depends on the done count — which you already
  calculate in `updateCounter()`.
- **4.7** `dblclick` bubbles too, so it can be delegated like everything else. Save the
  original text *before* you swap in the input, so Escape can restore it.
- **4.7** Enter and losing focus can both try to finish the same edit. Make finishing safe
  to call twice — for example, return early if the input has already been removed:
  `if (!input.isConnected) return;`
- **Stretch** — `localStorage` cannot store DOM elements. Store an array of plain objects
  such as `{ text: "Buy milk", done: false }`, and rebuild the list from it on load.

</details>

<details>
<summary><strong>Exercise 5 — Basic Calculator</strong></summary>

- **5.1** The `0` key spans two columns: `grid-column: span 2;`
- **5.2** Clicking a gap between buttons hits the keypad itself, whose `dataset` is empty —
  ignore those clicks. Destructuring keeps it short:
  `const { digit, op, action } = event.target.dataset;`
- **5.3** **Check:** `"3" + "4"` is `"34"`. Then try to type `0.05` into a calculator whose
  `current` is a number, and see where it goes wrong.
- **5.4** You need to remember whether the last key was `=`, so that the next digit knows
  to start fresh — a flag in your state object works. For "operator pressed twice", ask:
  has the user typed any digit since the last operator?
- **5.5.1** Add an `error` field to your state. At the very top of `press()`: if there is
  an error and the key is not clear, return immediately.
- **5.5.2** **Check:** for `1 ÷ 3`, `toFixed(2)` gives `"0.33"` and the `toPrecision`
  approach gives `0.333333333333`. Look at the quotes — run `typeof` on both.
- **5.6** `event.key` gives you strings such as `"7"`, `"*"`, `"Enter"`, `"Backspace"` and
  `"Escape"`. An object that maps keys to actions is neater than a long `if` chain. Only
  call `preventDefault()` for keys your calculator actually handles.
- **5.7** Let the computer check your table. In the console:
  ```js
  ["2", "+", "3", "*", "4", "="].forEach(press);
  ```
  Then compare the display with the expected result. Put every row in an array and you
  have an automatic test.

</details>
