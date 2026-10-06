# Class 04 — Working with the Document Object Model

Companion notes for `Class04-DOM.pptx`. The slides are the outline; this is the content.
Section numbers map to slide numbers.

**Contents**

1. [Understanding the DOM](#1-understanding-the-dom-slide-3)
2. [The DOM tree structure](#2-the-dom-tree-structure-slide-4)
3. [Selecting DOM elements](#3-selecting-dom-elements-slide-5)
4. [Manipulating the DOM](#4-manipulating-the-dom-slide-6)
5. [Handling events](#5-handling-events-slide-7)

---

## 1. Understanding the DOM (slide 3)

> The Document Object Model is the data representation of the objects that comprise the
> structure and content of a document on the web.

Correct, and almost useless until you unpack it. Here is the practical version.

### The DOM is not your HTML

This is the one idea to take from this class. Class 01, section 7 stated it; now we use it.

```
   index.html                    The DOM
   (text on disk)      →      (live objects in memory)
```

Your HTML file is **text**. The browser reads it once, and builds from it a **tree of
JavaScript objects**. From that moment on, the file is irrelevant — the page you see is a
rendering of the *tree*, and the tree is what your code manipulates.

Three things follow:

1. **Changing the DOM changes the page immediately.** There is no "save" or "refresh" step.
2. **Changing the DOM does not change the file.** Reload and your changes are gone.
3. **The DOM can differ completely from the file.** `View Source` (`Ctrl+U`) shows the file
   as delivered; the Elements tab shows the tree as it is now. On a modern web application
   these look nothing alike.

If you have ever wondered why "View Source" on a React site shows an empty `<div>`, this is
the answer: the file *is* nearly empty, and JavaScript built everything else into the DOM.

### The DOM is not part of JavaScript

A point that saves confusion later. The DOM is a **browser API**, specified by WHATWG,
not a feature of the JavaScript language. The language gives you objects, functions and
`Array`; the browser hands you `document` and everything reachable from it.

This is the Class 02, section 2 distinction again — language versus host environment.
`document` does not exist in Node.js, not because Node is incomplete, but because Node has
no document.

### The DOM is a tree because HTML is nested

HTML elements nest inside each other and never partially overlap. That constraint is what
makes a tree the natural representation — and what makes every operation in this class
possible.

```html
<body>
  <div id="main">
    <h1>Title</h1>
    <p>Some <em>emphasised</em> text</p>
  </div>
</body>
```

becomes

```
document
└── html
    └── body
        └── div#main
            ├── h1
            │   └── "Title"
            └── p
                ├── "Some "
                ├── em
                │   └── "emphasised"
                └── " text"
```

Notice that the *text* is in the tree too, as its own nodes. That matters in section 2.

---

## 2. The DOM tree structure (slide 4)

### Node types

Everything in the tree is a **node**. The slide lists four kinds; these are the ones you
will meet.

| Node type | What it is | Example |
|---|---|---|
| **Document** | The root. Not an element — the document itself | `document` |
| **Element** | An HTML tag and its contents | `<p>`, `<div>`, `<img>` |
| **Text** | The text inside an element | `"Title"` |
| **Attribute** | A name/value pair on an element | `id="main"` |
| *(Comment)* | An HTML comment, also a node | `<!-- note -->` |

Two notes the slide does not have room for.

**Attribute nodes are historical.** In the modern DOM, attributes are not treated as
children in the tree. You reach them through the element (`el.id`, `el.getAttribute()`),
not by walking to them. The node type still exists for compatibility, but you will never
navigate to one.

**Text nodes are the ones that will surprise you.** Whitespace between tags is text:

```html
<div>
  <p>One</p>
  <p>Two</p>
</div>
```

That `<div>` has **five** child nodes, not two — paragraph, text, paragraph, and the
newline-plus-indentation text nodes around them. This is why there are two parallel sets of
navigation properties:

| Counts all nodes | Counts elements only |
|---|---|
| `childNodes` | `children` |
| `firstChild` | `firstElementChild` |
| `lastChild` | `lastElementChild` |
| `nextSibling` | `nextElementSibling` |
| `previousSibling` | `previousElementSibling` |

**Use the element-only versions** unless you specifically want text. `firstChild` on a
nicely indented document is almost always a whitespace text node, and the resulting bug —
"why is my element a `#text`?" — is a rite of passage.

### Parent–child relationships

Every node except `document` has exactly one parent, and may have any number of children.
Navigation:

```js
const el = document.getElementById("main");

el.parentElement        // up
el.children             // down — an HTMLCollection of elements
el.firstElementChild    // first child element
el.nextElementSibling   // sideways
el.closest(".card")     // nearest ancestor matching a selector — very useful
```

`closest()` is worth remembering now; it makes event delegation in section 5 straightforward.

### The document object

`document` is your entry point to everything:

```js
document.documentElement   // <html>
document.head              // <head>
document.body              // <body>
document.title             // the title, readable and writable
document.URL               // current URL
```

---

## 3. Selecting DOM elements (slide 5)

Before you can change anything you must find it. There are five methods on the slide; two
of them are worth actually using.

> Note: the deck previously said `getElementByID`. The real name is **`getElementById`** —
> lowercase `d`. JavaScript is case-sensitive and will simply tell you it is not a function.

### The older methods

```js
document.getElementById("main");           // one element, or null
document.getElementsByClassName("item");   // HTMLCollection
document.getElementsByTagName("p");        // HTMLCollection
```

Note the singular/plural distinction in the names: `getElementById` returns **one** element
(ids are unique), the others return **collections**.

These are fast and work everywhere, but they have an awkward property — they return **live
collections**:

```js
const items = document.getElementsByClassName("item");
console.log(items.length);        // 3
document.body.appendChild(newItemWithThatClass);
console.log(items.length);        // 4 — it updated itself!
```

The collection is a live view of the document, not a snapshot. This causes genuinely
baffling bugs, the classic being a loop that never ends because you are removing items from
a collection that shrinks as you go.

### The modern methods

```js
document.querySelector(".item");        // FIRST match, or null
document.querySelectorAll(".item");     // ALL matches, as a static NodeList
```

They take **any CSS selector**, which makes them vastly more expressive:

```js
document.querySelector("#main");                  // by id
document.querySelector(".card.featured");         // two classes
document.querySelector("input[type='email']");    // by attribute
document.querySelector("nav > ul > li:first-child");  // by structure
document.querySelectorAll("p:not(.intro)");       // negation
```

Everything you know from CSS transfers directly. **Prefer these.**

`querySelectorAll` returns a **static** NodeList — a snapshot taken at the moment you
called it. Later changes to the document do not affect it. That is almost always what you
want.

### The NodeList trap

A `NodeList` is **not an array**:

```js
const items = document.querySelectorAll(".item");

Array.isArray(items);   // false
items.length;           // works
items.forEach(...);     // works (NodeList has forEach)
items.map(...);         // TypeError — no map, no filter, no reduce
```

Convert it when you need real array methods:

```js
const arr = [...document.querySelectorAll(".item")];        // spread
const arr = Array.from(document.querySelectorAll(".item")); // equivalent

arr.filter(el => el.textContent.includes("e"));   // now this works
```

(An `HTMLCollection` from the older methods does not even have `forEach` — convert it
before doing anything.)

### Searching within an element

All of these exist on elements too, not just `document`:

```js
const card = document.querySelector(".card");
card.querySelectorAll("p");     // only paragraphs inside this card
```

Scoping your search is good practice: it is faster and it will not accidentally match
something elsewhere on the page.

### When selection fails

`querySelector` returns `null` when nothing matches — it does not throw. The error comes one
line later:

```js
document.querySelector(".typo").textContent = "hi";
// TypeError: Cannot read properties of null (setting 'textContent')
```

The message names `null`, which means **the selector matched nothing**. The three causes,
in order of likelihood:

1. The script ran before the element existed → Class 03, section 4. Use `defer`.
2. A typo in the selector, or a missing `.` or `#`.
3. The element is created later by other code.

---

## 4. Manipulating the DOM (slide 6)

### Changing text and content

Three properties that look similar and are not:

```js
el.textContent = "Hello";     // plain text — safe
el.innerHTML  = "<b>Hi</b>";  // parsed as HTML — powerful, dangerous
el.innerText  = "Hello";      // rendered text — layout-aware, slower
```

**`textContent`** sets text. If your string contains `<b>`, the user sees the literal
characters `<b>`. This is what you want almost all the time.

**`innerHTML`** parses the string as HTML and builds real nodes from it. Convenient — and a
security hole if the string contains anything a user supplied:

```js
// If a user's "name" is:  <img src=x onerror="steal(document.cookie)">
el.innerHTML = "Welcome, " + userName;   // the script runs
el.textContent = "Welcome, " + userName; // harmless text
```

This is **cross-site scripting (XSS)**, among the most common vulnerabilities on the web.
The rule is simple: **never put user-supplied content into `innerHTML`.** Use `textContent`,
or build elements with `createElement`.

**`innerText`** differs from `textContent` by respecting rendering — it skips hidden
elements and normalises whitespace, which also makes it slower because it forces the browser
to compute layout. Use `textContent` unless you specifically need what the user visually
sees.

### Modifying attributes

Many attributes are available directly as properties:

```js
img.src = "photo.jpg";
link.href = "https://example.org";
input.value = "text";
input.disabled = true;
el.id = "newId";
```

And the general methods for anything else:

```js
el.getAttribute("href");
el.setAttribute("href", "/new");
el.hasAttribute("disabled");
el.removeAttribute("disabled");
```

For your own data, use `data-*` attributes, exposed through `dataset`:

```html
<li data-id="42" data-status="active">Task</li>
```

```js
li.dataset.id;        // "42"  — always a string
li.dataset.status;    // "active"
li.dataset.status = "done";   // writes data-status="done"
```

Note `data-user-name` becomes `dataset.userName` — hyphens become camelCase.

**Property versus attribute**, which confuses everyone at least once: the *attribute* is
what the HTML said; the *property* is the live state. For an input, the `value` attribute is
the initial value, while the `value` property is what the user has typed. They diverge the
moment the user types. Use the property for current state.

### Adding and removing elements

```js
const li = document.createElement("li");   // create — not yet in the page
li.textContent = "New item";               // configure it
li.className = "item";
document.querySelector("#list").append(li); // insert — now it is visible
```

Nothing appears until you insert it. Creating an element not attached to the document is
normal and useful — configure it fully, then insert once.

Insertion methods:

```js
parent.append(node);          // as last child (also accepts plain strings)
parent.prepend(node);         // as first child
el.before(node);              // as a sibling, before el
el.after(node);               // as a sibling, after el
parent.appendChild(node);     // older; nodes only, one at a time
```

Removal and replacement:

```js
el.remove();                  // removes itself — simple and modern
parent.removeChild(el);       // older equivalent
el.replaceWith(newEl);
```

A performance note worth knowing early. Each insertion into the live document can cause the
browser to recalculate layout. Adding a thousand items one at a time is slow; build them
off-document and insert once:

```js
const frag = document.createDocumentFragment();
for (const text of items) {
  const li = document.createElement("li");
  li.textContent = text;
  frag.append(li);            // no layout work — not in the document yet
}
list.append(frag);            // one insertion
```

### Styling elements

Two approaches, and the choice matters.

**Direct styles** — set individual properties:

```js
el.style.backgroundColor = "red";   // note: camelCase, not background-color
el.style.display = "none";
```

Convenient, but it writes an inline `style` attribute, which has the highest specificity
short of `!important` (Class 01, section 7). You are hard-coding presentation into
JavaScript, and later stylesheet rules cannot override it.

**Classes** — the better way:

```js
el.classList.add("highlight");
el.classList.remove("highlight");
el.classList.toggle("highlight");         // on if off, off if on
el.classList.toggle("highlight", isOn);   // force a specific state
el.classList.contains("highlight");       // true / false
```

The styling stays in CSS where it belongs; JavaScript only decides *which state* the element
is in. This keeps the separation of concerns from Class 01, section 7 intact, and makes
restyling a design change rather than a code change.

**Use `classList` for appearance. Reserve `style` for values you genuinely compute at
runtime** — a position from a mouse coordinate, a width from a percentage.

---

## 5. Handling events (slide 7)

### What an event is

An **event** is something that happens — a click, a keystroke, a page finishing loading.
The browser creates an event object and offers it to your code. If you have registered a
**listener**, it runs.

This is Class 02, section 2's event-driven model made concrete: your code does not wait for
the user, it registers callbacks and returns. The event loop does the rest.

### Common DOM events

| Event | Fires when |
|---|---|
| `click` | An element is clicked (also keyboard-activated, for real buttons) |
| `mouseover` / `mouseout` | The pointer enters / leaves an element |
| `keydown` / `keyup` | A key is pressed / released |
| `input` | An input's value changes — **fires on every keystroke** |
| `change` | An input's value is committed — on blur, or on select |
| `submit` | A **form** is submitted |
| `load` | A resource finishes loading |
| `DOMContentLoaded` | HTML is parsed and the DOM is ready |

Two distinctions worth having now:

**`input` versus `change`** — `input` fires as the user types, `change` fires when they
finish. Live search uses `input`; validation on leaving a field uses `change`.

**`load` versus `DOMContentLoaded`** — `DOMContentLoaded` fires when the HTML is parsed and
the DOM is usable. `load` waits for every image, stylesheet and font as well. Almost always
you want `DOMContentLoaded`; waiting for `load` means waiting for the slowest image on the
page.

### Inline handlers, and why not to use them

```html
<button onclick="alert('hi')">Click</button>
```

It works. Avoid it:

- **Mixes behaviour into structure** — the separation from Class 01, section 7.
- **Only one handler per event.** A second `onclick` overwrites the first.
- **Strange scope.** The code runs in an unusual scope chain, which produces baffling bugs.
- **Blocked by Content Security Policy**, like inline scripts in Class 03, section 2.

The JavaScript-property form has the same one-handler limitation:

```js
btn.onclick = handleOne;
btn.onclick = handleTwo;   // handleOne is now gone, silently
```

### `addEventListener`

The right way:

```js
const btn = document.querySelector("#btn");

btn.addEventListener("click", function (event) {
  console.log("clicked", event.target);
});

// or with an arrow function
btn.addEventListener("click", (e) => console.log("clicked"));
```

Any number of listeners may be attached to the same element and event, and all of them run:

```js
btn.addEventListener("click", logIt);
btn.addEventListener("click", updateUI);   // both run
```

Removing one requires a **named reference** — which is why an inline arrow function cannot
be removed:

```js
function handler(e) { /* ... */ }
btn.addEventListener("click", handler);
btn.removeEventListener("click", handler);   // works

btn.addEventListener("click", e => {});
// impossible to remove — there is no reference to that function
```

### The event object

Every listener receives an event object:

```js
el.addEventListener("click", (event) => {
  event.target;          // the element actually clicked
  event.currentTarget;   // the element the listener is attached to
  event.type;            // "click"
  event.preventDefault();   // cancel the browser's default action
  event.stopPropagation();  // stop the event travelling further up
});
```

`target` versus `currentTarget` is the distinction that makes delegation work below.

For keyboard events, `event.key` gives the key as a string (`"a"`, `"Enter"`, `"Escape"`).
For mouse events, `event.clientX` / `clientY` give coordinates.

### `preventDefault` and forms

Some elements have built-in behaviour: links navigate, forms submit and reload the page.
`preventDefault()` cancels it.

The canonical use:

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();          // stop the page reloading
  const value = input.value;
  // ...handle it in JavaScript instead
});
```

Without that first line the page reloads and your JavaScript state is wiped. If a form
"flashes and resets", this is why.

A related note for your exercises: **a `<button>` inside a `<form>` submits it by default.**
Either listen for `submit` as above, or write `<button type="button">`.

### Bubbling and delegation

When you click an element, the event does not stop there. It **bubbles** upward through
every ancestor — the clicked `<li>`, then the `<ul>`, then `<body>`, up to `document`. A
listener anywhere along that path will fire.

This sounds like a complication and is actually the most useful tool in the section. Instead
of attaching a listener to every item:

```js
// Fragile: only works for items that exist right now
document.querySelectorAll("#list li").forEach(li => {
  li.addEventListener("click", () => li.remove());
});
```

attach **one** listener to the parent and use `event.target`:

```js
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    e.target.remove();
  }
});
```

This is **event delegation**, and it has two decisive advantages:

1. **One listener instead of hundreds** — less memory, faster setup.
2. **It works for elements that do not exist yet.** Items added later are handled
   automatically, because the listener is on the parent.

That second point is the real reason to learn it. Any list you build dynamically — a to-do
list, search results, a shopping cart — needs this, or you must re-attach handlers every
time the content changes.

When the clickable thing has children, use `closest()` rather than `matches()`, since
`e.target` may be an inner element:

```js
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (li) li.remove();
});
```

---

## Putting it together

Everything in this class, in one example — select, create, modify, delegate:

```html
<ul id="list"></ul>
<input id="input" type="text">
<button id="add">Add</button>

<script>
  const list  = document.querySelector("#list");
  const input = document.querySelector("#input");
  const add   = document.querySelector("#add");

  function addItem() {
    const text = input.value.trim();
    if (!text) return;                      // ignore empty input

    const li = document.createElement("li");
    li.textContent = text;                  // textContent, not innerHTML
    list.append(li);

    input.value = "";                       // clear
    input.focus();
  }

  add.addEventListener("click", addItem);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addItem();        // Enter also adds
  });

  // One delegated listener handles every item, including future ones
  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) li.remove();
  });
</script>
```

Read it against the sections: `querySelector` (3), `createElement` / `textContent` /
`append` / `remove` (4), `addEventListener` and delegation (5).

---

## Further reading

- **MDN: DOM introduction** —
  <https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction>
- **MDN: Introduction to events** —
  <https://developer.mozilla.org/docs/Learn/JavaScript/Building_blocks/Events>
- **DOM Living Standard** — <https://dom.spec.whatwg.org>

---

*Internet Programming · UACS · Lecture 02*
