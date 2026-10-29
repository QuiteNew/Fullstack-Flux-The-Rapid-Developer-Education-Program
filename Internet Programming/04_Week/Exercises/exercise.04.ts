// Exercise 4 — Enums
// Run with: npx tsc && node dist/exercise.04.js
//
// Try `node exercise.04.ts` too. It fails:
//   SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]:
//   TypeScript enum is not supported in strip-only mode
// An enum generates real JavaScript, so it cannot just be stripped out —
// this file has to go through tsc.

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 4.1 — A string enum of colours ----
enum Color {
    Red = "red",
    Orange = "orange",
    Yellow = "yellow",
    Green = "green",
    Blue = "blue",
    Purple = "purple",
}

// ---- 4.2 — Functions that use it ----
function toHex(color: Color): string {
    switch (color) {
        case Color.Red: return "#e53935";
        case Color.Orange: return "#fb8c00";
        case Color.Yellow: return "#fdd835";
        case Color.Green: return "#43a047";
        case Color.Blue: return "#1e88e5";
        case Color.Purple: return "#8e24aa";
        default: {
            // If a colour is added to the enum but not to this switch, this
            // line stops compiling: the new colour is not assignable to never.
            const unhandled: never = color;
            throw new Error(`No hex value for ${String(unhandled)}`);
        }
    }
}

const WARM: readonly Color[] = [Color.Red, Color.Orange, Color.Yellow];

function isWarm(color: Color): boolean {
    return WARM.includes(color);
}

// ---- 4.3 — The enum exists at runtime ----
// An enum is a real object, so its values can be listed.
const allColors: Color[] = Object.values(Color);

// ---- 4.4 — A numeric enum, for comparison ----
enum Priority {
    Low,        // 0
    Medium,     // 1
    High,       // 2
}

function label(priority: Priority): string {
    return `${Priority[priority]} priority`;      // reverse mapping: number → name
}

// ---- 4.5 — The same colours without an enum ----
const Colour = {
    Red: "red",
    Orange: "orange",
    Yellow: "yellow",
    Green: "green",
    Blue: "blue",
    Purple: "purple",
} as const;

type Colour = (typeof Colour)[keyof typeof Colour];   // "red" | "orange" | ... | "purple"

function toHexUnion(colour: Colour): string {
    return toHex(colour as Color);    // the values are identical strings
}

function compileTimeChecks(): void {
    // @ts-expect-error — a string enum does not accept the plain string, only Color.Red
    toHex("red");

    // The union version accepts the plain string, because it IS the type
    toHexUnion("red");

    // @ts-expect-error — and still rejects strings that are not colours
    toHexUnion("pink");

    // @ts-expect-error — a numeric enum rejects a literal number that is not a member...
    label(42);

    // ...but accepts any number that comes from a variable — the numeric enum loophole
    const fromSomewhere: number = 42;
    label(fromSomewhere);
}

// ======================================================================

console.log("=== 4.2 — Using the enum ===");
check("toHex(Color.Green)", toHex(Color.Green), "#43a047");
check("Color.Green is the string 'green'", Color.Green, "green");
check("isWarm(Color.Orange)", isWarm(Color.Orange), true);
check("isWarm(Color.Blue)", isWarm(Color.Blue), false);

console.log("\n=== 4.3 — Listing every value ===");
check("all colours", allColors, ["red", "orange", "yellow", "green", "blue", "purple"]);
check("every colour has a hex value", allColors.every((c) => toHex(c).startsWith("#")), true);

console.log("\n=== 4.4 — Numeric enum ===");
check("Priority.High", Priority.High, 2);
check("reverse mapping Priority[2]", Priority[2], "High");
check("label(Priority.Medium)", label(Priority.Medium), "Medium priority");
const loophole: number = 42;
check("the loophole: label(42) compiles via a variable, and is nonsense", label(loophole), "undefined priority");

console.log("\n=== 4.5 — Union instead of enum ===");
check('toHexUnion("blue")', toHexUnion("blue"), "#1e88e5");
check("Colour.Blue", Colour.Blue, "blue");

void compileTimeChecks;
