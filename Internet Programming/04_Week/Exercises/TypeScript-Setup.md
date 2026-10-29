# Setting up TypeScript and `tsx`

Everything you need to install, and how to use it, for the Lecture 04 exercises.

**The short version** — in this folder:

```bash
npm install                      # installs TypeScript and tsx for this project
npx tsx exercise.03.ts           # run an exercise straight from the .ts file
npx tsc                          # type-check everything, and compile it into dist/
```

The rest of this page explains what those do, and what to do when they do not work.

---

## 1. Node.js

TypeScript and `tsx` run on Node.js, and so does the compiled code. Check what you have:

```bash
node --version
npm --version
```

You want **Node 22.18 or later** — the current LTS release, Node 24, is the best choice. If
`node` is not found, or the version is older, install the **LTS** version from
<https://nodejs.org>. `npm` comes with it.

If you work on several projects that need different Node versions, a version manager makes
switching painless: **nvm-windows** on Windows, **nvm** or **fnm** on macOS and Linux.

---

## 2. Two tools, two jobs

| Tool | What it does | Checks types? | Writes files? |
|---|---|:---:|:---:|
| **`tsc`** — the TypeScript compiler | type-checks your code, then compiles it to JavaScript in `dist/` | ✅ | ✅ |
| **`tsx`** — "TypeScript execute" | runs a `.ts` file directly, translating it in memory | ✗ | ✗ |
| **`node file.ts`** | Node 22.18+ runs simple `.ts` files by stripping the types out | ✗ | ✗ |

The important column is the first one. **Only `tsc` checks your types.** `tsx` and Node will
happily run code with type errors in it:

```ts
let x: number = 1;
x = "two";                     // a type error
console.log("ran anyway:", x);
```

```text
$ npx tsx typeerror.ts
ran anyway: two

$ npx tsc --noEmit
typeerror.ts(2,1): error TS2322: Type 'string' is not assignable to type 'number'.
```

So use them together: **`tsx` to run your code quickly while you work, `tsc` to check it.**
Your editor shows type errors as you type too, but `npx tsc` is the final word.

### Why `tsx` and not just `node`?

Node can run `.ts` files directly, but only TypeScript that is *plain JavaScript plus type
annotations*. `tsx` handles everything. This is what happened with each of the exercise
solutions:

| File | `node file.ts` | `npx tsx file.ts` |
|---|---|---|
| `exercise.02.ts` — annotations only | ✅ runs | ✅ runs |
| `exercise.04.ts` — **enums** | ❌ `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` | ✅ runs |
| `exercise.07.ts` — **decorators** | ❌ `SyntaxError: Invalid or unexpected token` | ✅ runs |
| `exercise.08/main.ts` — several modules | ✅ runs | ✅ runs |

`tsx` is also forgiving about project settings that trip up the compiled output, such as a
missing `"type": "module"` (section 6).

---

## 3. Installing: per project, or globally

### Per project — recommended

```bash
npm install --save-dev typescript tsx
```

This adds both to `devDependencies` in `package.json` and installs them into
`node_modules/`. You then run them through **`npx`**, which finds the project's own copy:

```bash
npx tsc --version        # Version 7.0.2
npx tsx --version        # tsx v4.23.x
```

Why per project? The version is **recorded in `package.json`**. Anyone who clones the project —
a teammate, or whoever grades your homework — runs `npm install` and gets the same versions you
used. A compiler upgrade can change which errors are reported (TypeScript 7 removed the ES5
target, for one), so pinning the version matters.

`node_modules/` is never committed to git: it can be rebuilt at any time from `package.json`
with `npm install`. This repository's `.gitignore` already excludes it, and `dist/`.

### Globally — for quick experiments

```bash
npm install --global typescript tsx
```

Now `tsc` and `tsx` work in any folder, without `npx`. Convenient for trying something out —
but a global install is one version shared by everything on your machine, so for real projects,
prefer the per-project install. If both exist, `npx tsc` uses the project's copy.

### In this folder

`package.json` already lists both, so just run:

```bash
npm install
```

---

## 4. Everyday use

### Running an exercise

```bash
npx tsx exercise.03.ts
```

### Re-running on every save

```bash
npx tsx watch exercise.03.ts
```

`tsx` re-runs the file each time you save it. Stop it with **Ctrl+C**. (This folder also has
`npm run dev -- exercise.03.ts`, which does the same.)

### Checking types

```bash
npx tsc --noEmit             # check everything, write nothing
npx tsc --noEmit --watch     # keep checking on every save — run it in a second terminal
```

A good setup while working: `tsx watch` in one terminal shows what the code *does*, and
`tsc --noEmit --watch` in another shows what is *wrong with it*.

### Building

```bash
npx tsc                      # compile into dist/
node dist/exercise.03.js     # run the compiled JavaScript
```

You need this for anything that will run without `tsx` — and Exercise 1 is all about
looking at what the compiler produces.

The `npm run` shortcuts in this folder's `package.json`:

| Command | Runs |
|---|---|
| `npm run check` | `tsc --noEmit` |
| `npm run build` | `tsc` |
| `npm run watch` | `tsc --watch` |
| `npm run dev -- file.ts` | `tsx watch file.ts` |

**Before handing anything in, `npx tsc` must finish without errors.** If `tsx` runs it but
`tsc` complains, it is not finished.

---

## 5. Your editor

**VS Code** understands TypeScript out of the box: red underlines for type errors, hover for
types, autocomplete, rename. Nothing to install.

Hover over any variable to see its inferred type — the quickest way to learn what TypeScript
thinks is going on.

Your editor may use its own copy of TypeScript, so occasionally its messages differ slightly
from `npx tsc`. When they disagree, trust `npx tsc`: that is the version recorded in the
project.

---

## 6. When something goes wrong

| You see | Why | Fix |
|---|---|---|
| `'tsc' is not recognized` / `command not found: tsc` | TypeScript is installed for the project, not globally | Use **`npx tsc`** |
| In PowerShell: *"running scripts is disabled on this system"* | Windows blocks the `.ps1` launchers that npm creates | Use **Command Prompt** or **Git Bash** instead, or call `npx.cmd tsc` |
| `error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline` | `tsc somefile.ts` ignores your `tsconfig.json`, so TypeScript 7 refuses | Run plain `npx tsc`, or add `--ignoreConfig` |
| `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` | `node file.ts` met an enum, namespace or parameter property | Use `npx tsx file.ts`, or compile with `npx tsc` first |
| `SyntaxError: Invalid or unexpected token` when running compiled decorators | `target` is `esnext`, so the decorators were left uncompiled | Set `"target": "es2022"` in `tsconfig.json` (Class 08, section 6) |
| `SyntaxError: Cannot use import statement outside a module` | `package.json` says `"type": "commonjs"` — which is what `npm init -y` writes | Change it to `"type": "module"` |
| `error TS5108: Option 'target=ES5' has been removed` | TypeScript 7 supports ES2015 and later only | Use `es2015` or newer |
| `tsx` runs fine, but `tsc` reports errors | `tsx` does not check types | Fix the errors — `tsc` is right |

**One trap that produces no error at all.** TypeScript treats any comment that *starts* with
`@ts-ignore` as the directive — whatever follows it. So a comment such as

```ts
// @ts-ignore-check this later
x = "two";
```

silently switches off type checking for the next line. Write `@ts-expect-error` when you mean
to suppress an error — it complains if there is nothing to suppress — and never start an
ordinary comment with `@ts-`.

---

## Further reading

- **TypeScript: Download and install** — <https://www.typescriptlang.org/download>
- **tsx documentation** — <https://tsx.is>
- **Node.js: running TypeScript natively** — <https://nodejs.org/api/typescript.html>
