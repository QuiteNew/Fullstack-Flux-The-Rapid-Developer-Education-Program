# Class 03 — JavaScript in the Browser

Companion notes for `Class03-JavaScriptInTheBrowser.pptx`. The slides are the outline; this
is the content. Section numbers map to slide numbers.

**Contents**

1. [Connecting HTML and JavaScript](#1-connecting-html-and-javascript-slide-3)
2. [Inline JavaScript](#2-inline-javascript-slide-4)
3. [External JavaScript files](#3-external-javascript-files-slide-5)
4. [Asynchronous and deferred loading](#4-asynchronous-and-deferred-loading-slides-67)
5. [Inspecting JavaScript in the browser](#5-inspecting-javascript-in-the-browser-slide-8)

---

## 1. Connecting HTML and JavaScript (slide 3)

### JavaScript does nothing by itself

A `.js` file sitting on a server is inert text. Nothing executes it, nothing knows it
exists. **The HTML document is what pulls JavaScript into a page** — the browser downloads
and parses HTML first, and only runs JavaScript because the HTML told it to.

This ordering matters more than it first appears, and it is the reason the rest of this
class exists. The browser is doing two jobs at once — building the page from HTML, and
running your code — and those two jobs interfere with each other.

### The mechanism

There is exactly one element involved: **`<script>`**. It works in two modes.

```html
<!-- Mode 1: the code is in the tag -->
<script>
  console.log("I am inline");
</script>

<!-- Mode 2: the code is in another file -->
<script src="app.js"></script>
```

That is the whole interface. Everything else in this class — `async`, `defer`, head versus
body placement — is about *when* that script runs, not *how* it is attached.

A detail that catches beginners: **a `<script>` with `src` must still have a closing tag,
and anything between the tags is ignored.**

```html
<script src="app.js" />              <!-- WRONG: not valid HTML, the rest of the page breaks -->
<script src="app.js"></script>       <!-- correct -->
<script src="app.js">alert(1)</script>  <!-- alert(1) silently ignored -->
```

HTML is not XML. Self-closing syntax works for void elements like `<img>` and `<br>`, but
`<script>` is not one of them.

### The third way, and why we do not use it

There is one more way to attach JavaScript to HTML — attributes on elements:

```html
<button onclick="alert('hi')">Click</button>
```

This works, and you will meet it in old code. It is covered properly in Class 04, section 5,
where you will see why it is a bad habit: it mixes behaviour into structure, allows only one
handler per event, and scopes the code strangely.

---

## 2. Inline JavaScript (slide 4)

```html
<!DOCTYPE html>
<html>
<body>
  <h1>Title</h1>
  <script>
    console.log("runs here, during parsing");
  </script>
  <p>This paragraph does not exist yet when the script above runs.</p>
</body>
</html>
```

### It executes immediately, where it is written

This is the crucial property. The HTML parser works top to bottom; when it reaches a
`<script>` tag it **stops parsing**, runs the code to completion, and only then continues.

The consequence trips up nearly every beginner:

```html
<script>
  document.getElementById("output").textContent = "hello";  // TypeError!
</script>
<div id="output"></div>
```

`#output` does not exist yet. The parser has not reached it. You get
`TypeError: Cannot read properties of null (setting 'textContent')` — the error from
Class 02, section 7, and now you know one of its most common causes.

Move the script below the element and it works:

```html
<div id="output"></div>
<script>
  document.getElementById("output").textContent = "hello";  // fine
</script>
```

**This is the single reason you so often see `<script>` at the end of `<body>`.** It is not
style; it is the simplest way to guarantee the elements you want already exist.

### Blocking

Because parsing stops while the script runs, a slow inline script delays the whole page.
The user sees a blank or half-built page until your code finishes. Class 02 section 2
established that JavaScript is single-threaded — this is that fact showing up visibly.

### What inline is good for

- **Experimenting.** One file, no tooling, instant feedback.
- **Tiny bits of configuration** that must be available before anything else runs.
- **Teaching**, which is why your first exercises use it.

### What it is bad for

- **No caching.** The browser caches `app.js` across page loads; inline code is re-downloaded
  with every page, every time.
- **No reuse.** Two pages needing the same function means two copies.
- **Poor debugging.** Stack traces point into the HTML document rather than a named file.
- **Harder security.** A strict Content Security Policy — the standard defence against
  cross-site scripting — blocks inline scripts by default.

Use it to learn. Move to external files for anything real.

---

## 3. External JavaScript files (slide 5)

```html
<script src="js/app.js"></script>
```

The browser issues a **separate HTTP request** for that file — a full request-response cycle
from Class 01, section 6, visible as its own row in the Network tab.

### Why this is better

| | Inline | External |
|---|---|---|
| Cached by the browser | ✗ | ✅ |
| Shared across pages | ✗ | ✅ |
| Clean stack traces | ✗ | ✅ |
| Works with a strict CSP | ✗ | ✅ |
| Separates structure from behaviour | ✗ | ✅ |

The caching point is the big one. A returning visitor downloads your HTML again but reuses
the cached JavaScript — often a `304 Not Modified`, which you met in Class 01, section 6.

### Paths

`src` is a URL, resolved like any other:

```html
<script src="app.js"></script>           <!-- same folder -->
<script src="js/app.js"></script>        <!-- subfolder -->
<script src="../shared/util.js"></script><!-- parent folder -->
<script src="/js/app.js"></script>       <!-- from the site root -->
<script src="https://cdn.example.com/lib.js"></script>  <!-- another server -->
```

A `404` on a script is silent in the page itself — nothing happens, no error dialog, just
missing behaviour. **The Network tab is where you find out.** Check it first when a script
"does nothing".

### Placement: head versus body

This is the decision slide 5 is pointing at.

**In `<head>`** — the parser finds it before any content exists:

```html
<head>
  <script src="app.js"></script>
</head>
```

Parsing stops, the browser fetches the file over the network, runs it, and only then starts
on the body. The user stares at a blank page for the duration of a network round trip. And
your code cannot touch any element, because none exist yet.

**At the end of `<body>`** — the traditional fix:

```html
<body>
  ...all your content...
  <script src="app.js"></script>
</body>
```

The whole document is parsed and visible before the script is even requested. All elements
exist. This was the standard advice for over a decade, and it still works perfectly.

**But it has a flaw**: the browser does not even *discover* the script until it has parsed
the entire document, so the download starts late. On a slow connection that is wasted time
— the file could have been downloading while the HTML was still being parsed.

Solving that without reintroducing the blocking problem is exactly what `async` and `defer`
are for.

### Multiple scripts

Plain scripts execute **in document order**, guaranteed:

```html
<script src="library.js"></script>   <!-- runs first -->
<script src="app.js"></script>       <!-- runs second, can use library.js -->
```

Dependencies therefore go first. Remember this guarantee — `async` destroys it.

---

## 4. Asynchronous and deferred loading (slides 6–7)

Slide 7's diagram is the clearest summary of this topic, so here it is in words. In each
case the question is: **what happens to HTML parsing while the script is fetched and run?**

### Plain `<script>`

```html
<script src="app.js"></script>
```

```
HTML parsing ──────┐                          ┌────── parsing resumes
                   │   fetch    │  execute    │
                   └─ PAUSED ───┴── PAUSED ───┘
```

Parsing stops for **both** the download and the execution. Worst case for performance, but
simple and completely predictable.

### `async`

```html
<script src="app.js" async></script>
```

```
HTML parsing ────────────────────┐             ┌──── parsing resumes
                 │   fetch   │   │  execute    │
                 └ in parallel ──┘└─ PAUSED ───┘
```

The file downloads **in parallel** with parsing. But the moment it arrives, parsing pauses
and the script runs immediately.

Two consequences:

1. **You cannot predict when it runs.** It depends on network speed. It may run before the
   document is finished — so the elements you want may not exist.
2. **Order is not guaranteed.** With several `async` scripts, whichever downloads first runs
   first. A small file requested second can beat a large one requested first.

```html
<script src="library.js" async></script>
<script src="app.js" async></script>
<!-- app.js may run BEFORE library.js. If it depends on it, it breaks — intermittently. -->
```

That intermittency is the worst part: it works on your fast local machine and fails on a
student's phone.

**Use `async` for genuinely independent scripts** — analytics, ad tags, error trackers.
Things that touch nothing else and that nothing waits for.

### `defer`

```html
<script src="app.js" defer></script>
```

```
HTML parsing ──────────────────────────────┐
                 │   fetch   │             │  execute
                 └ in parallel ────────────┘  (after parsing completes)
```

The file downloads in parallel with parsing, and execution is **deferred until parsing is
complete**. This gives you everything you want:

- Download starts early (unlike a script at the end of `<body>`)
- Parsing is never blocked
- The whole DOM exists when your code runs
- **Execution order is preserved** across multiple deferred scripts

```html
<head>
  <script src="library.js" defer></script>
  <script src="app.js" defer></script>
</head>
<!-- Both download immediately and in parallel.
     Both run after parsing, in this order. -->
```

**`defer` in `<head>` is the modern default for application code.** Learn this as your
starting position and deviate only with a reason.

Deferred scripts run **before** the `DOMContentLoaded` event — the browser waits for them.
That is a guarantee you can rely on.

### Both attributes together

The slide originally said this was implementation-specific. **It is not** — the HTML
specification defines it, and the deck has been corrected.

**`async` wins.** For a classic script, if `async` is present, the browser uses async
behaviour and ignores `defer` entirely. `defer` is kept in the spec purely as a *legacy
fallback*: very old browsers that understood `defer` but not `async` would at least degrade
to deferred rather than fully blocking behaviour. Those browsers are long gone.

This is verifiable rather than merely assertable. Serve a page with
`<script src="x.js" async defer>` and have the script record when it ran: it executes
*after* `DOMContentLoaded` has already fired — something `defer` can never do, since
deferred scripts are guaranteed to run before that event. Async behaviour, exactly as
specified.

**In practice: never write both.** Pick the one you mean.

### Summary

| | Download | Blocks parsing? | Runs when | Order kept |
|---|---|---|---|---|
| `<script>` | When reached | **Yes**, fetch + execute | Immediately | ✅ |
| `<script async>` | Parallel | Only during execute | As soon as fetched | ✗ |
| `<script defer>` | Parallel | No | After parsing, before `DOMContentLoaded` | ✅ |
| End of `<body>` | When reached | Effectively no | After content parsed | ✅ |

**Choosing:**

- Application code that touches the DOM → **`defer` in `<head>`**
- Independent third-party scripts → **`async`**
- Inline configuration that must run first → **plain, in `<head>`**
- Still learning → **plain, at the end of `<body>`** — simplest to reason about

### One exception: modules

```html
<script type="module" src="app.js"></script>
```

Module scripts are **deferred by default** — no attribute needed. They also get their own
scope, so variables do not leak onto `window`. Modules are a later topic, but if you see a
script tag with no `defer` that nonetheless behaves as deferred, this is why.

---

## 5. Inspecting JavaScript in the browser (slide 8)

Class 02, section 7 introduced devtools for finding errors. Here we use them to understand
*loading*, which is what this class is about.

Open with **F12** or **Ctrl+Shift+I**.

### Inspecting elements

The **Elements** tab shows the **live DOM**, not your HTML file. Recall from Class 01,
section 7: your file is the starting state, and the DOM is what the page has become.

This distinction is now directly testable, and it is a good exercise:

1. Open a page with a script that adds an element.
2. **View Source** (`Ctrl+U`) — the added element is not there. That is the file.
3. **Elements tab** — it is there. That is the DOM.

Right-click any element and choose *Inspect* to jump to it. The breadcrumb trail at the
bottom shows its ancestors — a direct view of the tree structure that Class 04 is about.

### Using the console to interact with existing code

The console is not only for reading errors. It runs in **the page's own scope**, so you can
reach into a loaded script and poke at it:

```js
typeof myFunction        // "function" — did my script actually load?
myFunction(42)           // call it directly, no clicking required
myGlobalVariable         // inspect current state
$0                       // the element currently selected in the Elements tab
$("#id")                 // devtools shorthand for querySelector
$$(".cls")               // shorthand for querySelectorAll, returns a real array
```

`$0` and `$$` are **devtools conveniences, not JavaScript**. They will not work in your
`.js` files. (And if the page loads jQuery, the real `$` replaces the shorthand.)

That first line is the fastest way to answer "did my script load?":

- `typeof myFunction` is `"undefined"` → the file did not load, or it threw before defining
  it. Go to the Network tab.
- `"function"` → it loaded fine, and your problem is in how it is being called.

### Debugging loading order

This is the class-specific skill. To see the effects described in section 4:

**The Network tab** shows when each script was requested and how long it took. Switch on
the *Waterfall* column: with `defer` and `async` you can see downloads overlapping with the
document; with plain scripts you see them serialised.

**The Performance tab** (or the Network waterfall's event markers) shows the
`DOMContentLoaded` and `Load` lines. Deferred scripts finish before the first; async
scripts may land after it.

**A quick instrumentation trick** — put this at the top and bottom of each script:

```js
console.log("app.js running, readyState:", document.readyState);
```

`document.readyState` tells you exactly which phase you are in:

| Value | Meaning |
|---|---|
| `"loading"` | HTML is still being parsed — a plain or async script got here early |
| `"interactive"` | Parsing done, deferred scripts running, `DOMContentLoaded` about to fire |
| `"complete"` | Everything including images has loaded |

Log it from a plain script, an `async` script and a `defer` script in the same page, and
section 4's table stops being something you memorised and becomes something you watched.

### Viewing and debugging source code

The **Sources** tab lists every file the page loaded. Breakpoints, stepping and the Scope
panel work as described in Class 02, section 7.

Two features that matter specifically here:

- **Breakpoint on the first line of a script** to see exactly when it runs relative to the
  page building around it. Check whether `document.body` exists, or whether the element you
  need is there yet.
- **Event Listener Breakpoints** (in the right-hand panel) — expand *Document* and tick
  `DOMContentLoaded` to pause the moment it fires, with the full call stack visible.

---

## Common problems, and what causes them

A reference for when something will not work:

| Symptom | Likely cause |
|---|---|
| `Cannot read properties of null` | Script ran before the element was parsed. Use `defer`, or move to end of `<body>` |
| Script "does nothing", no errors | It never loaded. Check Network for a `404` |
| `myFunc is not defined` | Scripts in the wrong order, or an `async` race |
| Works locally, breaks on the server | Case-sensitive paths. `App.js` ≠ `app.js` on Linux |
| Works on reload, fails on first load | Caching masking a load-order bug |
| Intermittent failure | Classic `async` ordering race |
| Everything after `<script src=... />` vanishes | Self-closed script tag — add `</script>` |

---

## Further reading

- **MDN: `<script>`** — <https://developer.mozilla.org/docs/Web/HTML/Element/script>
- **HTML spec, script processing** — <https://html.spec.whatwg.org/multipage/scripting.html>
- **MDN: `document.readyState`** —
  <https://developer.mozilla.org/docs/Web/API/Document/readyState>

---

*Internet Programming · UACS · Lecture 02*
