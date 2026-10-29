// Checks every quiz answer by running its code in Node.
// Run with: node verify.mjs
//
// For each question with code: run it with the same runSnippet() the page uses,
// join the printed lines with spaces, and check that exactly one option matches
// it — and that it is the option marked as the answer.

import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";

const here = new URL(".", import.meta.url);
const source = (path) => readFileSync(new URL(path, here), "utf8");

// Run the engine and the quiz files in one context, as the page does. The engine's
// last line waits for DOMContentLoaded — give it a document that never fires it.
const context = vm.createContext({ setTimeout, queueMicrotask, URLSearchParams, document: { addEventListener() {} } });
vm.runInContext(source("quiz.js"), context);
for (const file of readdirSync(new URL("quizzes/", here)).filter((name) => name.endsWith(".js"))) {
    vm.runInContext(source(`quizzes/${file}`), context, { filename: file });
}

const problems = vm.runInContext("quizProblems", context);
for (const problem of problems) console.log(`BROKEN  ${problem}`);

let failures = problems.length;
for (const quiz of vm.runInContext("quizzes", context)) {
    console.log(`\n${quiz.title}`);
    for (const [i, q] of quiz.questions.entries()) {
        if (q.code === undefined) continue;
        const lines = await context.runSnippet(q.code);
        const printed = lines.join(" ");
        const matching = q.options.filter((option) => option === printed);
        const ok = matching.length === 1 && q.options[q.answer] === printed;
        if (!ok) failures++;
        console.log(ok
            ? `PASS  ${i + 1}. ${printed}`
            : `FAIL  ${i + 1}. printed "${printed}", answer is "${q.options[q.answer]}"`
                + (matching.length > 1 ? " (several options match)" : ""));
    }
}

console.log(failures === 0 ? "\nAll answers verified." : `\n${failures} problem(s).`);
process.exitCode = failures === 0 ? 0 : 1;
