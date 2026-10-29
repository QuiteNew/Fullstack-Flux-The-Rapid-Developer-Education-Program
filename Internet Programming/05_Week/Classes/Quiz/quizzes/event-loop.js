// Quiz data — "In which order?": predict what asynchronous code prints.
//
// The format is the one from Lecture 03 (see quiz.js), plus:
//   ordered   keep the questions in the order written here — they get harder
//   code      a snippet, shown above the options; "Run it" runs it in the browser
//
// Each option is the printed lines, joined with spaces. Every answer below is checked
// by running the snippet in Node:  node verify.mjs

registerQuiz({
    id: "event-loop",
    title: "In which order?",
    description: "Synchronous code, timers, promises, microtasks and await. Predict the output.",
    ordered: true,
    questions: [
        {
            question: "Warm-up. What does this print?",
            code: `console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");`,
            options: ["A B C", "A C B", "B A C", "C A B"],
            answer: 1,
            comment: "A delay of 0 means \"as soon as the current code has finished\" — never \"right now\". The script runs to completion first.",
        },
        {
            question: "Three timers. In which order do they fire?",
            code: `setTimeout(() => console.log("A"), 100);
setTimeout(() => console.log("B"), 0);
setTimeout(() => console.log("C"), 50);`,
            options: ["A B C", "B C A", "C B A", "B A C"],
            answer: 1,
            comment: "Timers fire by delay, not by the order they were created in.",
        },
        {
            question: "A timer and a promise, both \"immediate\". Which runs first?",
            code: `setTimeout(() => console.log("A"), 0);
Promise.resolve().then(() => console.log("B"));
console.log("C");`,
            options: ["C A B", "C B A", "A B C", "B C A"],
            answer: 1,
            comment: "Promise callbacks are microtasks. All microtasks run before the next task — and a timer callback is a task.",
        },
        {
            question: "When does the code inside new Promise(...) run?",
            code: `console.log("A");
new Promise((resolve) => {
    console.log("B");
    resolve();
}).then(() => console.log("C"));
console.log("D");`,
            options: ["A B C D", "A D B C", "A B D C", "A D C B"],
            answer: 2,
            comment: "The executor runs immediately, inside the constructor. Only the .then callback waits.",
        },
        {
            question: "An async function. When does its body run?",
            code: `async function work() {
    console.log("B");
    await null;
    console.log("D");
}
console.log("A");
work();
console.log("C");`,
            options: ["A B C D", "A C B D", "A B D C", "A C D B"],
            answer: 0,
            comment: "An async function runs synchronously until its first await. Then it returns to the caller, and the rest runs later, as a microtask.",
        },
        {
            question: "What does this print?",
            code: `async function getName() {
    return "Ana";
}
console.log(typeof getName());`,
            options: ["string", "object", "undefined", "function"],
            answer: 1,
            comment: "An async function always returns a promise — even when it returns a plain value. To get \"Ana\", you need await or .then.",
        },
        {
            question: "Two promise chains, side by side.",
            code: `Promise.resolve()
    .then(() => console.log("A"))
    .then(() => console.log("B"));
Promise.resolve()
    .then(() => console.log("C"))
    .then(() => console.log("D"));`,
            options: ["A B C D", "A C B D", "C D A B", "A C D B"],
            answer: 1,
            comment: "Each .then is queued only when the previous step finishes. So the two chains take turns, one step at a time.",
        },
        {
            question: "queueMicrotask and .then — the same queue?",
            code: `queueMicrotask(() => console.log("A"));
Promise.resolve().then(() => console.log("B"));
queueMicrotask(() => console.log("C"));
console.log("D");`,
            options: ["D A B C", "D A C B", "D B A C", "A B C D"],
            answer: 0,
            comment: "Yes: one microtask queue, first in, first out.",
        },
        {
            question: "A promise inside a timer, and a second timer.",
            code: `setTimeout(() => {
    console.log("A");
    Promise.resolve().then(() => console.log("B"));
}, 0);
setTimeout(() => console.log("C"), 0);`,
            options: ["A C B", "A B C", "C A B", "A C"],
            answer: 1,
            comment: "Microtasks are drained after every task, not only after the script. B runs before the second timer gets its turn.",
        },
        {
            question: "A timer inside a promise, and a timer outside it.",
            code: `Promise.resolve().then(() => {
    console.log("A");
    setTimeout(() => console.log("B"), 0);
});
setTimeout(() => console.log("C"), 0);`,
            options: ["A B C", "A C B", "C A B", "B A C"],
            answer: 1,
            comment: "C's timer was created first — while the script ran. B's timer was only created later, inside the microtask.",
        },
        {
            question: "The timer is due after 0 ms. When does it actually fire?",
            code: `const start = Date.now();
setTimeout(() => console.log("A"), 0);
while (Date.now() - start < 200) {
    // busy for 200 ms
}
console.log("B");`,
            options: ["A B", "B A", "A", "B"],
            answer: 1,
            comment: "Nothing can interrupt running code. The timer waits for the loop, however late that makes it. In a browser, the page is frozen too.",
        },
        {
            question: "Two async functions, each with an await.",
            code: `async function one() {
    console.log("A");
    await null;
    console.log("B");
}
async function two() {
    console.log("C");
    await null;
    console.log("D");
}
one();
two();
console.log("E");`,
            options: ["A B C D E", "A C E B D", "A C B D E", "E A C B D"],
            answer: 1,
            comment: "Both run up to their await, then the script finishes, then both continue — in the order they paused.",
        },
        {
            question: "Can a promise change its mind?",
            code: `new Promise((resolve, reject) => {
    resolve("A");
    reject(new Error("B"));
    resolve("C");
}).then(
    (value) => console.log(value),
    (error) => console.log(error.message),
);`,
            options: ["A", "B", "C", "A B C"],
            answer: 0,
            comment: "A promise settles once. Every later resolve or reject is silently ignored.",
        },
        {
            question: "What happens after a catch?",
            code: `Promise.reject(new Error("A"))
    .then(() => console.log("B"))
    .catch((error) => console.log(error.message))
    .then(() => console.log("C"));`,
            options: ["A", "B A C", "A C", "A B C"],
            answer: 2,
            comment: "The rejection skips the .then and lands in .catch. A catch that does not throw again turns the chain back into a success, so C runs.",
        },
        {
            question: "finally, then then.",
            code: `Promise.resolve("A")
    .finally(() => console.log("B"))
    .then((value) => console.log(value));
console.log("C");`,
            options: ["B A C", "C B A", "C A B", "C B"],
            answer: 1,
            comment: "finally sees neither the value nor the error — it passes the original result through, so the next .then still gets \"A\".",
        },
        {
            question: "The forgotten return. Does the chain wait?",
            code: `Promise.resolve()
    .then(() => {
        new Promise((resolve) => setTimeout(() => {
            console.log("A");
            resolve();
        }, 50));
    })
    .then(() => console.log("B"));`,
            options: ["A B", "B A", "B", "A"],
            answer: 1,
            comment: "Without return, the first .then returns undefined, and the chain moves on at once. Write: return new Promise(...).",
        },
        {
            question: "forEach with an async callback. What is the length — twice?",
            code: `const names = [];
[1, 2, 3].forEach(async (id) => {
    await null;
    names.push(id);
});
console.log(names.length);
setTimeout(() => console.log(names.length), 0);`,
            options: ["3 3", "0 0", "0 3", "1 3"],
            answer: 2,
            comment: "forEach ignores the promises its callback returns, so nothing waits. Use for...of with await, or Promise.all with map.",
        },
        {
            question: "Promise.all: in which order do the results come?",
            code: `const wait = (ms, value) => new Promise((resolve) =>
    setTimeout(() => {
        console.log(value);
        resolve(value);
    }, ms));

Promise.all([wait(100, "A"), wait(50, "B")])
    .then((values) => console.log(values.join("+")));`,
            options: ["A B A+B", "B A B+A", "B A A+B", "A B B+A"],
            answer: 2,
            comment: "The promises finish in their own time (B first), but the results are always in the order the promises were given.",
        },
        {
            question: "Promise.race: does the loser stop?",
            code: `const wait = (ms, value) => new Promise((resolve) =>
    setTimeout(() => {
        console.log(value);
        resolve(value);
    }, ms));

Promise.race([wait(100, "A"), wait(50, "B")])
    .then((winner) => console.log("winner " + winner));`,
            options: ["B winner B", "B winner B A", "A B winner B", "winner B"],
            answer: 1,
            comment: "race settles with the first result, but nothing is cancelled: A's timer still fires. To really stop work, you need an AbortController.",
        },
        {
            question: "The final boss. Take your time.",
            code: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => {
    console.log("C");
    queueMicrotask(() => console.log("D"));
});
(async () => {
    console.log("E");
    await null;
    console.log("F");
})();
console.log("G");`,
            options: ["A E G C F D B", "A E G C D F B", "A G E C F D B", "A E G B C F D"],
            answer: 0,
            comment: "Script: A, E, G. Microtasks in the order they were queued: C (which queues D at the back), then F, then D. Then the timer: B.",
        },
    ],
});
