// Exercise 1 — Compiling TypeScript
//
// Build and run with the project settings from tsconfig.json:
//     npx tsc
//     node dist/exercise.01.js
//
// Compile just this file for different targets. Because there is a
// tsconfig.json in this folder, naming a file on the command line needs
// --ignoreConfig — without it, tsc 7 stops with error TS5112:
//     npx tsc exercise.01.ts --ignoreConfig --target es2015 --outDir targets/es2015
//     npx tsc exercise.01.ts --ignoreConfig --target es2022 --outDir targets/es2022
//     npx tsc exercise.01.ts --ignoreConfig --target esnext --outDir targets/esnext
// then open the three targets/*/exercise.01.js files side by side.

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 1.1 — A file with functions in it ----
// Deliberately uses syntax from different JavaScript versions, so that the
// different targets have something to change.

interface Order {
    id: number;
    customer?: { name: string } | null;
    total: number;
    discountPercent?: number;
}

function summarize(order: Order): string {
    const name = order.customer?.name ?? "guest";          // ?. and ?? — ES2020
    const discount = order.discountPercent ?? 0;
    const total = order.total * (1 - discount / 100);
    return `Order #${order.id} for ${name}: ${total.toFixed(2)}`;
}

const square = (n: number): number => n ** 2;              // ** — ES2016

class Counter {
    count = 0;                                             // class field — ES2022
    increment(): number {
        this.count++;
        return this.count;
    }
}

async function doubleLater(n: number): Promise<number> {   // async / await — ES2017
    await null;
    return n * 2;
}

// ======================================================================
// The program behaves the same whichever target it was compiled for —
// only the shape of the JavaScript changes.

check("summarize with a customer", summarize({ id: 7, customer: { name: "Ana" }, total: 200, discountPercent: 10 }),
    "Order #7 for Ana: 180.00");
check("summarize without a customer", summarize({ id: 8, total: 50 }), "Order #8 for guest: 50.00");
check("summarize with customer: null", summarize({ id: 9, customer: null, total: 10 }), "Order #9 for guest: 10.00");
check("square(12)", square(12), 144);

const counter = new Counter();
counter.increment();
check("Counter after two increments", counter.increment(), 2);

doubleLater(21).then((result) => check("doubleLater(21)", result, 42));

// ======================================================================
// 1.2 — What the targets change. Observed with tsc 7.0:
//
//   Source               --target es2015                                    --target es2022
//   n ** 2               Math.pow(n, 2)                                     n ** 2
//   a?.b                 a === null || a === void 0 ? void 0 : a.b          a?.b
//   a ?? b               a !== null && a !== void 0 ? a : b                 a ?? b
//   async / await        a generator, wrapped in an __awaiter helper        async / await
//   count = 0 (field)    this.count = 0 inside a generated constructor      count = 0;
//
// esnext produces the same as es2022 for this file.
//
// 1.3 — Things that went wrong on the way:
//
//   --target es5   →  error TS5108: Option 'target=ES5' has been removed.
//                     TypeScript 7 supports ES2015 and later only.
//
//   Adding  [[1], [2]].flat()  and compiling with --target es2015  →
//                     error TS2550: Property 'flat' does not exist ...
//                     The target also decides which built-in methods the
//                     compiler knows about; flat() arrived in ES2019.
//
//   npx tsc exercise.01.ts (without --ignoreConfig)  →  error TS5112:
//                     tsconfig.json is present but will not be loaded if
//                     files are specified on commandline.
//
//   A deliberate type error, e.g.  const n: number = "one";  →
//                     tsc reports it, but still writes the .js file —
//                     unless noEmitOnError is on (it is, in tsconfig.json).
