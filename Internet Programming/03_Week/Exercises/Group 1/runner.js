// Exercise runner — loads one of exercise.01.js … exercise.09.js into this page
// and copies its console output onto the page.
//
// Each exercise gets its own page load (runner.html?ex=03). The exercise files
// all declare the same top-level names — check, table — so loading two of them
// into one page would fail with "Identifier has already been declared".
//
// The whole runner is wrapped in an IIFE (Class 05, section 6), so its own
// variables stay out of the global scope the exercise script shares.

(function () {
    const EXERCISES = {
        "01": "Factorial",
        "02": "FizzBuzz",
        "03": "Prime numbers",
        "04": "Sum of array elements",
        "05": "Managing objects",
        "06": "Filter and reduce",
        "07": "Name map",
        "08": "Numbers to words",
        "09": "Pig Latin",
    };

    const nav = document.getElementById("exercise-links");
    const output = document.getElementById("output");
    const summary = document.getElementById("summary");
    const selected = new URLSearchParams(location.search).get("ex");

    for (const [number, title] of Object.entries(EXERCISES)) {
        const link = document.createElement("a");
        link.href = `?ex=${number}`;
        link.textContent = `${Number(number)}. ${title}`;
        if (number === selected) {
            link.classList.add("active");
        }
        nav.append(link);
    }

    if (!selected) {
        return;
    }
    if (!Object.hasOwn(EXERCISES, selected)) {
        output.textContent = `There is no exercise "${selected}" in this runner.`;
        return;
    }

    let passed = 0;
    let failed = 0;

    function format(value) {
        if (typeof value === "string") {
            return value;
        }
        if (typeof value === "bigint") {
            return `${value}n`;
        }
        try {
            return JSON.stringify(value);
        } catch {
            return String(value);
        }
    }

    function write(text, extraClass) {
        const line = document.createElement("span");
        let kind = extraClass;
        if (text.startsWith("PASS")) {
            kind = "pass";
            passed++;
        } else if (text.startsWith("FAIL")) {
            kind = "fail";
            failed++;
        } else if (text.startsWith("===") || text.startsWith("\n===")) {
            kind = "heading";
        }
        if (kind) {
            line.className = kind;
        }
        line.textContent = text + "\n";
        output.append(line);
        summary.textContent = `${passed} passed, ${failed} failed`;
    }

    // Mirror console.log / warn / error onto the page, keeping the real console working too
    for (const method of ["log", "warn", "error"]) {
        const original = console[method].bind(console);
        console[method] = (...args) => {
            original(...args);
            write(args.map(format).join(" "), method === "log" ? "" : "fail");
        };
    }

    window.addEventListener("error", (event) => {
        write(`Uncaught ${event.message}`, "fail");
    });

    output.textContent = "";
    const script = document.createElement("script");
    script.src = `exercise.${selected}.js`;
    script.addEventListener("error", () => {
        write(`Could not load exercise.${selected}.js`, "fail");
    });
    document.body.append(script);
})();
