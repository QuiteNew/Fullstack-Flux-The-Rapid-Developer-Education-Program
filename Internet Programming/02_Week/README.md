# Lecture 02

## Materials

| File | What it is |
|---|---|
| [Class03-JavaScriptInTheBrowser.pptx](Materials/Class03-JavaScriptInTheBrowser.pptx) | Slides — connecting JavaScript to HTML |
| [Class03-JavaScriptInTheBrowser.md](Materials/Class03-JavaScriptInTheBrowser.md) | **Companion notes** — the detail behind the bullets |
| [Class04-DOM.pptx](Materials/Class04-DOM.pptx) | Slides — working with the DOM |
| [Class04-DOM.md](Materials/Class04-DOM.md) | **Companion notes** — the detail behind the bullets |
| [Exercises02.pptx](Materials/Exercises02.pptx) | Slides — the exercise list |
| [Class/](Materials/Class) | Code written live in class — script loading order and DOM manipulation demos |

The `.md` files follow the slide order section by section, so you can read them alongside
the deck during the lecture or on their own afterwards. The slides are the outline; the
notes are the content.

## Exercises

Task sheets and starter files are in `Exercises/Group1` and `Exercises/Group2`.

- `Exercises02-Tasks.md` — detailed tasks for all five exercises: selecting and modifying
  elements, interactive forms, an image gallery, a to-do list, and a calculator
- `gallery-images/` — eight local images for the gallery exercise, so it works offline

## Topics covered

**Class 03** — the `<script>` tag · inline versus external JavaScript · why script placement
matters · parser blocking · `async` and `defer` loading strategies · module defaults ·
inspecting load order in devtools · `document.readyState`

**Class 04** — what the DOM actually is and how it differs from your HTML file · node types
and the whitespace text-node trap · selecting elements, live versus static collections ·
`textContent` versus `innerHTML` and XSS · creating, inserting and removing elements ·
`classList` versus inline styles · events, `addEventListener`, `preventDefault` · bubbling
and event delegation

## Builds on Lecture 01

- Class 03 section 2 explains the `Cannot read properties of null` error from
  [Class 02 section 7](../Lecture01/Materials/Class02-GettingStartedJS.md)
- Class 03 section 4 is the single-threaded execution model from Class 02 section 2, seen
  from the browser's side
- Class 04 develops the DOM introduction in
  [Class 01 section 7](../Lecture01/Materials/Class01-Introduction.md)
- Class 04 section 5 is the practical form of the event-driven model from Class 02 section 2
