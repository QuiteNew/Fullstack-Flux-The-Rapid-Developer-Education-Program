# Assignment 1 — Basic Swing: Components + Events (SwingDemo)

**Starter code:** `SwingDemo.java`

## Goal
Extend the basic greeting app to practice Swing fundamentals: components, layout managers, and event handling.

## Tasks
1. **Add input validation**
   - If the name is shorter than 2 characters, show an error message in the text area.
   - Trim whitespace and prevent empty submissions.

2. **Add a second input field**
   - Add a `JTextField` for "Age".
   - Validate it is a number between 1 and 120.

3. **Improve UX**
   - Pressing **Enter** in the name field should trigger the same action as clicking **Greet**.
   - Add a status `JLabel` that shows: `Ready`, `Greeting…`, `Cleared`, `Invalid input`, etc.

4. **Refactor events**
   - Replace `if (e.getSource() == ...)` with **separate ActionListeners** for each button OR with **Action objects** (`AbstractAction`).

## Deliverables
- Updated `SwingDemo.java`
- A short note (2–5 sentences) describing what you changed and why.

## Success criteria
- App compiles and runs.
- Validation works consistently.
- Layout still looks clean and readable.

## Optional challenge
- Add a `JMenuBar` with File → Exit and Help → About.