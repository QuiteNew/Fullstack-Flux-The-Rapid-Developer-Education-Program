# Lecture 04

## Materials

| File | What it is |
|---|---|
| [Class07-TypeScriptFundamentals.pptx](Materials/Class07-TypeScriptFundamentals.pptx) | Slides — TypeScript fundamentals |
| [Class07-TypeScriptFundamentals.md](Materials/Class07-TypeScriptFundamentals.md) | **Companion notes** — the detail behind the bullets |
| [Class08-AdvancedTypeScript.pptx](Materials/Class08-AdvancedTypeScript.pptx) | Slides — advanced TypeScript features |
| [Class08-AdvancedTypeScript.md](Materials/Class08-AdvancedTypeScript.md) | **Companion notes** — the detail behind the bullets |
| [Exercises04.pptx](Materials/Exercises04.pptx) | Slides — the exercise list |

The `.md` files follow the slide order section by section, so you can read them alongside the
deck or on their own afterwards. Every example in them was checked with TypeScript 7 and
Node 24.

## Exercises

Task sheets and solutions are in `Exercises/Group1` and `Exercises/Group2`. Each folder is a
small TypeScript project:

```bash
npm install                  # installs TypeScript and tsx
npx tsx exercise.03.ts       # runs an exercise straight from the .ts file
npx tsc                      # type-checks and compiles everything into dist/
```

- `TypeScript-Setup.md` — installing TypeScript and `tsx`, `tsc` versus `tsx` versus
  `node`, everyday commands, and a troubleshooting table for the errors students meet most

- `Exercises04-Tasks.md` — detailed tasks for all eight exercises, with hints and expected
  results at the end
- `exercise.01.ts` – `exercise.07.ts` — solutions. Each runs its own checks and prints
  `PASS` / `FAIL`. Lines that must *not* compile are marked `// @ts-expect-error`, so the
  build itself fails if one of them ever stops being an error.
- `exercise.08/` — the homework: a project in six modules. Runs compiled
  (`node dist/exercise.08/main.js`) or straight from source (`node exercise.08/main.ts`).
- `tsconfig.json`, `package.json` — the project settings, with comments explaining the
  choices that matter

## Topics covered

**Class 07** — types erased at compile time · primitives, `null` and strict mode · `any`
versus `unknown` · `void` and `never` · arrays, readonly arrays and tuples · type inference and
literal types · annotating functions, optional, default and rest parameters · function types ·
narrowing, `as` and `!` · interfaces, structural typing and excess property checks · classes,
access modifiers, `private` versus `#private`, `implements` · `tsc`, `tsconfig.json`, targets
and downlevelling · running `.ts` directly in Node · types lying at the boundaries

**Class 08** — interfaces in depth: call signatures, index signatures, extending, declaration
merging · type aliases, and when to use each · numeric and string enums, and the `as const`
alternative · generics, constraints and generic classes · unions, discriminated unions,
exhaustiveness with `never` · intersections · standard versus legacy decorators, writing a
method decorator · `keyof`, `typeof`, indexed access, conditional, mapped and template literal
types · utility types · `satisfies` · modules, `import type` and file extensions · namespaces

## Beyond the slides

These topics are in the notes but not in the decks:

- **Types are erased** — nothing is checked at runtime, and `JSON.parse` data is not checked
  at all — Class 07, sections 1 and 9
- **TypeScript 7 details** — `rootDir` required with `outDir`, error TS5112 for single files,
  the stricter `tsc --init` defaults — Class 07, section 8
- **Why Node cannot run enums**, namespaces or parameter properties directly — Class 07,
  section 8
- **Standard versus legacy decorators**, and why they need `target: "es2022"` — Class 08,
  section 6
- **`satisfies`** — Class 08, section 7
- **Import file extensions** and `rewriteRelativeImportExtensions` — Class 08, section 8

## Builds on earlier lectures

- The *Cannot read properties of null* error from
  [Lecture 02](../Lecture02/Materials/Class03-JavaScriptInTheBrowser.md) is caught at compile
  time — Class 07, section 2
- A decorator is a closure — [Lecture 03, Class 05, section 7](../Lecture03/Materials/Class05-FunctionsStructures.md)
- `JSON.parse` returning `any` connects to
  [Lecture 03, Class 06, section 9](../Lecture03/Materials/Class06-DataStructures.md)
- Modules solve the name clashes that made the Lecture 03 exercise runner load one file per page
