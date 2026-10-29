// Exercise 7 — Decorators
// Run with: npx tsc && node dist/exercise.07.js
//
// Uses standard decorators (TypeScript 5.0+) — not the legacy
// "experimentalDecorators" kind. tsconfig.json targets es2022 on purpose:
// with esnext, tsc leaves @Duration in the output as-is, and Node fails with
// "SyntaxError: Invalid or unexpected token".

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// Runs fn while collecting everything it logs, instead of printing it.
function captureLogs(fn: () => void): string[] {
    const captured: string[] = [];
    const original = console.log;
    console.log = (...args: unknown[]) => { captured.push(args.join(" ")); };
    try {
        fn();
    } finally {
        console.log = original;          // always restore, even if fn throws
    }
    return captured;
}

// ---- 7.1 — The decorator ----
// A method decorator receives the original method and a context object, and
// returns a replacement method. The type parameters make the replacement take
// and return exactly what the original did.
//
// Underneath, it is a closure (Lecture 03, Class 05, section 7): the
// replacement remembers `original` and `name` from the scope it was made in.
function Duration<This, Args extends unknown[], Return>(
    original: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) {
    const name = String(context.name);

    // A regular function, not an arrow: it is called as a method, and needs
    // its own `this` to pass on to the original.
    return function (this: This, ...args: Args): Return {
        const start = performance.now();
        const report = (outcome: string) => {
            const ms = (performance.now() - start).toFixed(2);
            console.log(`${name} ${outcome} after ${ms} ms`);
        };

        let result: Return;
        try {
            result = original.call(this, ...args);
        } catch (error) {
            report("threw");             // 7.3 — still report the time, then rethrow
            throw error;
        }

        // 7.4 (stretch) — an async method returns at once with a Promise;
        // report when the Promise settles, not when it is created.
        if (result instanceof Promise) {
            result.then(() => report("resolved"), () => report("rejected"));
        } else {
            report("finished");
        }
        return result;
    };
}

// ---- 7.5 (stretch) — A decorator factory ----
// @SlowerThan(ms) is a function call that RETURNS a decorator. It only
// reports calls that take longer than the limit.
function SlowerThan(limitMs: number) {
    return function <This, Args extends unknown[], Return>(
        original: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
    ) {
        const name = String(context.name);
        return function (this: This, ...args: Args): Return {
            const start = performance.now();
            const result = original.call(this, ...args);
            const ms = performance.now() - start;
            if (ms > limitMs) {
                console.log(`SLOW: ${name} took ${ms.toFixed(2)} ms (limit ${limitMs} ms)`);
            }
            return result;
        };
    };
}

// ---- A class to decorate ----
class Calculator {
    precision = 2;      // used through `this`, to prove `this` survives decoration

    @Duration
    sumTo(n: number): number {
        let total = 0;
        for (let i = 1; i <= n; i++) {
            total += i;
        }
        return total;
    }

    @Duration
    divide(a: number, b: number): string {
        if (b === 0) {
            throw new RangeError("Cannot divide by zero");
        }
        return (a / b).toFixed(this.precision);
    }

    @Duration
    async slowDouble(n: number): Promise<number> {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return n * 2;
    }

    @SlowerThan(20)
    quick(): string {
        return "done";
    }

    @SlowerThan(20)
    slow(): string {
        const end = performance.now() + 30;
        while (performance.now() < end) {
            // busy-wait for 30 ms
        }
        return "done";
    }
}

// Decorators can only be attached to classes and their members. On a plain
// function, tsc reports "error TS1206: Decorators are not valid here." — so
// that example stays in this comment rather than in the code. To time a plain
// function, wrap it in a higher-order function instead, which is all a
// decorator is underneath.

// ======================================================================

const calc = new Calculator();
const msPattern = /after \d+\.\d{2} ms$/;

console.log("=== 7.1 / 7.2 — Timing, result and `this` ===");
let sum = 0;
const sumLogs = captureLogs(() => { sum = calc.sumTo(1_000_000); });
check("the result is unchanged", sum, 500_000_500_000);
check("one line was logged", sumLogs.length, 1);
check("it names the method and the time", /^sumTo finished after \d+\.\d{2} ms$/.test(sumLogs[0] ?? ""), true);
console.log(`      logged: "${sumLogs[0]}"`);

let quotient = "";
captureLogs(() => { quotient = calc.divide(10, 4); });
check("`this` still works inside a decorated method", quotient, "2.50");

console.log("\n=== 7.3 — A method that throws ===");
let thrown: unknown;
const throwLogs = captureLogs(() => {
    try {
        calc.divide(1, 0);
    } catch (error) {
        thrown = error;
    }
});
check("the error still reaches the caller", thrown instanceof RangeError, true);
check("and the time was still reported", /^divide threw after/.test(throwLogs[0] ?? ""), true);

console.log("\n=== 7.5 (stretch) — @SlowerThan(20) ===");
check("a quick call reports nothing", captureLogs(() => calc.quick()).length, 0);
const slowLogs = captureLogs(() => calc.slow());
check("a slow call is reported", /^SLOW: slow took \d+\.\d{2} ms \(limit 20 ms\)$/.test(slowLogs[0] ?? ""), true);

console.log("\n=== 7.4 (stretch) — An async method ===");
// The time is only known once the Promise settles, so this part waits for it.
const asyncLogs: string[] = [];
const original = console.log;
console.log = (...args: unknown[]) => { asyncLogs.push(args.join(" ")); };
const doubled = await calc.slowDouble(21);
await new Promise((resolve) => setTimeout(resolve, 0));    // let the report run
console.log = original;
check("the async result is unchanged", doubled, 42);
check("reported when it resolved", msPattern.test(asyncLogs[0] ?? "") && (asyncLogs[0] ?? "").startsWith("slowDouble resolved"), true);
const asyncMs = Number(/(\d+\.\d{2}) ms/.exec(asyncLogs[0] ?? "")?.[1]);
check("and the time includes the 50 ms wait", asyncMs >= 40, true);
console.log(`      logged: "${asyncLogs[0]}"`);


