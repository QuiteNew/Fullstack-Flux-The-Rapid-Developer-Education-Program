# Lecture 06

**This lecture adds almost nothing new.** It comes right before the midterm, and right before
the course moves to Angular. Its job is to take what you have already been doing since
Lecture 01 — classes, callbacks, `map` and `filter`, closures, caches — and give it the names
the rest of the course (and the rest of the industry) uses: *encapsulation, polymorphism,
prototype, higher-order function, pure function, immutability, memoization, composition.*
Angular uses those words constantly, and so will we.

## Materials

| File | What it is |
|---|---|
| [Class11-ObjectOrientedJavaScript.pptx](Materials/Class11-ObjectOrientedJavaScript.pptx) | Slides — object-oriented programming with JavaScript |
| [Class11-ObjectOrientedJavaScript.md](Materials/Class11-ObjectOrientedJavaScript.md) | **Companion notes** — every concept, starting from code you have already written |
| [Class12-FunctionalJavaScript.pptx](Materials/Class12-FunctionalJavaScript.pptx) | Slides — functional programming in JavaScript |
| [Class12-FunctionalJavaScript.md](Materials/Class12-FunctionalJavaScript.md) | **Companion notes** — the same approach, for the functional side |
| [Exercises06.pptx](Materials/Exercises06.pptx) | Slides — the exercise list |
| [Quiz/](Materials/Quiz/index.html) | Two quizzes: **Name it** (what is this code called?) and **What does it print?** (`this`, prototypes, copies) |
| [Demos/](Materials/Demos/README.md) | Five short demos: familiar code, seen from a second angle |

The notes follow the slide order, and each section links back to the lecture where you first
used the idea and ends with a pointer to where it shows up in Angular. Each ends with a
**Vocabulary** table — a good page to read the night before the midterm.

## Exercises

Both groups do the exercises together this time, so there is one folder, `Exercises`, set up
like Lecture 04's:

```bash
npm install
node exercise.03.ts          # every file also runs directly in Node 24
npx tsc                      # type-check everything
npx tsx exercise.03.ts       # alternative way to run in Node 24
```

- `Exercises06-Tasks.md` — the seven exercises. Each starts with **Revisits** (where you did
  this before) and **Names** (the vocabulary it is about).
- `exercise.01.ts` – `exercise.07.ts` — solutions that print `PASS` / `FAIL`.
  1. a class hierarchy, and the prototype chain underneath it
  2. the Lecture 04 library homework, rebuilt with classes — compare the two designs
  3. your own `map`, `filter` and `reduce`
  4. `compose`, `pipe`, and combining filter predicates
  5. Fibonacci, naive and memoized, and a general `memoize`
  6. a power-function factory, and a sort-comparator factory `by(key, direction)`
  7. partial application, `bind` and currying

## The quizzes

Open `Materials/Quiz/index.html` — from disk works. **Name it** shows code you have already
written and asks what it is called (15 of 18 questions, picked at random). **What does it
print?** has 16 output puzzles about `this`, prototypes, `const` versus `freeze`, shallow
copies and `sort`; after answering, **Run it** runs the code in the browser. `node verify.mjs`
checks every output answer in Node.

---

## Midterm checklist

The midterm covers Lectures 01–06 and is hands-on: you get a JSON API and a task, and build a
page that loads the data, shows it in a table, and lets the user sort and filter it — then you
commit and push your work. The past dry runs show exactly what to expect:
[2023](https://github.com/sweko/uacs-internet-programming-exams/tree/main/dry-run-mid-term-2023),
[2024](https://github.com/sweko/uacs-internet-programming-exams/tree/main/dry-run-mid-term-2024),
[2025](https://github.com/sweko/uacs-internet-programming-exams/tree/main/dry-run-mid-term-2025).
Do at least one of them, under time pressure, before the real thing.

Go through this list. For every item you cannot do without looking it up, the link says where
to look.

### Getting the work in — [exam guide](https://github.com/sweko/uacs-internet-programming-exams/blob/main/readme-midterm.md)

- [ ] Fork a repository, clone it, commit, and push — and check on GitHub that the push arrived
- [ ] Open a project folder in VS Code and run it in the browser (a local server or Live Server)
- [ ] Keep the browser's developer tools open: Console for errors, Network for requests

### Lectures 01–02 — the page — [Lecture 02](../Lecture02/README.md)

- [ ] Load a script so it runs after the page is parsed (`defer`, `type="module"`, or `DOMContentLoaded`)
- [ ] Find elements (`getElementById`, `querySelector`) and create them (`createElement`, `append`, `replaceChildren`)
- [ ] Put text from data into the page with `textContent` — not `innerHTML`
- [ ] Build a table body from an array: one `<tr>` per item, one `<td>` per column
- [ ] Handle `click`, `input` and `change` events, and read a checkbox (`checked`) and a select (`value`)
- [ ] Handle clicks on many elements with **one** listener (event delegation, `closest()`)

### Lecture 03 — the language — [Lecture 03](../Lecture03/README.md)

- [ ] `map`, `filter`, `find`, `some`, `every`, `reduce` — and chain them
- [ ] Sort with a comparator: numbers (`a - b`), strings (`localeCompare`), descending (swap or negate) — and remember that `sort` changes the array
- [ ] Count things by a key with `reduce` (`{ Novel: 3, Novella: 2 }`), and turn that into text with the right plural
- [ ] Work with dates: parse an ISO string, get the year, compute an age
- [ ] Destructuring, spread, `?.` and `??` — for data where some fields are optional
- [ ] Closures, and a function that returns a function

### Lecture 04 — TypeScript — [Lecture 04](../Lecture04/README.md)

- [ ] Write an `interface` for the API's data, with optional fields (`death_date?: string`)
- [ ] Compile with `tsc`, read its errors, and fix them without `any`
- [ ] Union types for fixed sets of values (`"Novel" | "Novella"`), and narrowing
- [ ] A class with fields, a constructor, methods and access modifiers

### Lecture 05 — async and fetch — [Lecture 05](../Lecture05/README.md)

- [ ] `const response = await fetch(url)` — and check `response.ok` before `response.json()`
- [ ] Show a loading state while waiting, and an error message if it fails
- [ ] `async` / `await` with `try` / `catch`; know why `forEach` does not wait
- [ ] Load the data **once**, keep it, and filter and sort the copy you already have

### Lecture 06 — how to put it together — this lecture

- [ ] Keep everything the page shows in one **state** object (data, filters, sort column and direction)
- [ ] Write the filtering and sorting as **pure functions** that take the state and return rows — and never change the original array
- [ ] Have **one** `render()` that draws the table from the state, and call it after every change
- [ ] Toggle the sort direction when the same header is clicked again, and show an arrow on the sorted column
- [ ] Combine several filters into one predicate
- [ ] Name what you are doing: when someone says *higher-order function, pure function, closure, immutable update, comparator*, you know which part of your code they mean

Demo 5 in [`Materials/Demos`](Materials/Demos/README.md) is that whole structure on one page —
a good thing to understand line by line before the exam.
