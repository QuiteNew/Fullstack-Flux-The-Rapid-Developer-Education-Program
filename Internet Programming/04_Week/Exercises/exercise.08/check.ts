// The test helper — written once, and imported wherever it is needed.
// In Lecture 03 every exercise file carried its own copy, because the files
// were scripts sharing one global scope. Modules fix exactly that.

let passed = 0;
let failed = 0;

export function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) {
        passed++;
        console.log(`PASS  ${label}`);
    } else {
        failed++;
        console.log(`FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
}

export function checkThrows(label: string, fn: () => unknown): void {
    try {
        fn();
    } catch {
        check(label, true, true);
        return;
    }
    check(label, "did not throw", "threw");
}

// The counters are private to this module: other files can read the totals
// through this function, but cannot change them.
export function summary(): string {
    return `${passed} passed, ${failed} failed`;
}
