# Assignment 2 — Advanced Swing Widgets (AdvancedSwingDemo)

**Starter code:** `AdvancedSwingDemo.java`

## Goal
Make the advanced demo feel like a real “form” by reacting live to user selections and organizing results cleanly.

## Tasks
1. **Live preview panel**
   - Add a panel (or tab section) that shows a live summary of current selections.
   - Update the summary immediately when the user changes:
     - any checkbox
     - any radio button
     - combo box selection
     - list selection
     - slider value

2. **Model + separation**
   - Create a small data class (e.g. `SelectionState`) to hold the current state.
   - UI should read from / write to that state (don’t build the summary string from raw UI components everywhere).

3. **Keyboard accessibility**
   - Add at least two keyboard shortcuts:
     - `Ctrl/Cmd + R` for Reset
     - `Ctrl/Cmd + Enter` for Start Demo

4. **Progress behavior**
   - When the demo is running, disable controls that change the state.
   - When it finishes, re-enable controls.

## Deliverables
- Updated `AdvancedSwingDemo.java` (and any extra small helper class you create)
- Brief explanation of your event strategy (listeners used and why)

## Success criteria
- Live summary updates correctly.
- No UI glitches when Start/Reset is used repeatedly.

## Optional challenge
- Replace the `JOptionPane` results dialog with a custom `JDialog`.