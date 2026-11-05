// Quiz data — "What does it print?": this, prototypes, copies and immutability.
//
// Every answer is checked by running the snippet in Node:  node verify.mjs
// Snippets that depend on `this` use a class, because code inside a class is always
// in strict mode — the same in the browser, in Node and in this quiz.

registerQuiz({
    id: "what-does-it-print",
    title: "What does it print?",
    description: "this, prototypes, copies and immutability. Predict, then run it.",
    questions: [
        {
            question: "What is a class, really?",
            code: `class Dog {
    speak() { return "woof"; }
}
console.log(typeof Dog);`,
            options: ["function", "class", "object", "undefined"],
            answer: 0,
            comment: "A class is a function with a prototype — the newer spelling of a constructor function.",
        },
        {
            question: "Do two dogs have two copies of speak?",
            code: `class Dog {
    speak() { return "woof"; }
}
const rex = new Dog();
const fido = new Dog();
console.log(rex.speak === fido.speak);
console.log(Object.hasOwn(rex, "speak"));`,
            options: ["true false", "false false", "false true", "true true"],
            answer: 0,
            comment: "One function, on Dog.prototype, shared by every dog. Neither dog owns it; they find it by walking the prototype chain.",
        },
        {
            question: "Which properties are on the object itself?",
            code: `class Dog {
    #secret = 1;
    name;
    constructor(name) { this.name = name; }
    speak() { return "woof"; }
}
console.log(Object.keys(new Dog("Rex")).join(","));`,
            options: ["name", "name,speak", "#secret,name", "#secret,name,speak"],
            answer: 0,
            comment: "Fields live on each object; methods live on the prototype; #private fields are invisible from outside.",
        },
        {
            question: "Which of these is rex an instance of?",
            code: `class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}
const rex = new Dog();
console.log(rex instanceof Dog, rex instanceof Animal, rex instanceof Cat, rex instanceof Object);`,
            options: ["true true false true", "true false false false", "true true false false", "true true true true"],
            answer: 0,
            comment: "instanceof walks the prototype chain: Dog.prototype → Animal.prototype → Object.prototype.",
        },
        {
            question: "A method passed as a callback.",
            code: `class Counter {
    count = 0;
    increment() { this.count++; return this.count; }
}
const counter = new Counter();
const run = (callback) => callback();

try {
    console.log(run(counter.increment));
} catch (error) {
    console.log(error.constructor.name);
}
console.log(run(() => counter.increment()));`,
            options: ["TypeError 1", "1 2", "NaN 1", "undefined 1"],
            answer: 0,
            comment: "run calls the function on its own, so this is undefined. The arrow keeps counter.increment() a method call. (Every addEventListener and setTimeout does the same as run.)",
        },
        {
            question: "bind, then call it alone.",
            code: `class Counter {
    count = 10;
    increment() { return ++this.count; }
}
const counter = new Counter();
const bound = counter.increment.bind(counter);
console.log(bound(), bound(), counter.count);`,
            options: ["11 12 12", "11 11 10", "11 12 10", "TypeError"],
            answer: 0,
            comment: "bind returns a new function with this fixed for good — the same counter every time.",
        },
        {
            question: "An arrow function as a class field.",
            code: `class Counter {
    count = 0;
    increment = () => ++this.count;
}
const counter = new Counter();
const { increment } = counter;
console.log(increment(), increment());`,
            options: ["1 2", "TypeError", "NaN NaN", "1 1"],
            answer: 0,
            comment: "An arrow function has no `this` of its own; it uses the one from where it was created — the object. You will see this pattern in Angular code.",
        },
        {
            question: "const and push.",
            code: `const list = [1, 2];
list.push(3);
console.log(list.length);`,
            options: ["3", "2", "TypeError", "undefined"],
            answer: 0,
            comment: "const means the variable cannot be reassigned. It says nothing about changing the array it points to.",
        },
        {
            question: "Object.freeze, then push.",
            code: `const frozen = Object.freeze([1, 2]);
try {
    frozen.push(3);
} catch (error) {
    console.log(error.constructor.name);
}
console.log(frozen.length);`,
            options: ["TypeError 2", "3", "2", "TypeError 3"],
            answer: 0,
            comment: "Object.freeze makes the array itself unchangeable, and push throws trying to change it.",
        },
        {
            question: "How deep does freeze go?",
            code: `const user = Object.freeze({ name: "Ana", tags: ["admin"] });
user.tags.push("editor");
console.log(user.tags.length);`,
            options: ["2", "1", "TypeError", "0"],
            answer: 0,
            comment: "freeze is shallow: user cannot change, but the array it points to is a different object, and it is not frozen.",
        },
        {
            question: "How deep does spread copy?",
            code: `const original = { name: "Ana", address: { city: "Skopje" } };
const copy = { ...original };
copy.name = "Boris";
copy.address.city = "Bitola";
console.log(original.name, original.address.city);`,
            options: ["Ana Bitola", "Ana Skopje", "Boris Bitola", "Boris Skopje"],
            answer: 0,
            comment: "Spread is a shallow copy: the copy gets its own name, but shares the same address object. Lecture 03, Class 06.",
        },
        {
            question: "Does sort return a new array?",
            code: `const numbers = [3, 1, 2];
const sorted = numbers.sort();
console.log(sorted === numbers, numbers.join(","));`,
            options: ["true 1,2,3", "false 3,1,2", "false 1,2,3", "true 3,1,2"],
            answer: 0,
            comment: "sort changes the array in place and returns the same array. For a sorted copy: [...numbers].sort() or numbers.toSorted().",
        },
        {
            question: "And map?",
            code: `const numbers = [3, 1, 2];
const doubled = numbers.map((n) => n * 2);
console.log(doubled === numbers, numbers.join(","));`,
            options: ["false 3,1,2", "true 6,2,4", "false 6,2,4", "true 3,1,2"],
            answer: 0,
            comment: "map, filter and slice return new arrays; push, sort, splice and reverse change the old one.",
        },
        {
            question: "A memoized function that is not pure.",
            code: `let rate = 2;
const cache = new Map();
const price = (n) => {
    if (!cache.has(n)) cache.set(n, n * rate);
    return cache.get(n);
};
console.log(price(10));
rate = 3;
console.log(price(10));`,
            options: ["20 20", "20 30", "30 30", "20 undefined"],
            answer: 0,
            comment: "The cache remembers the old answer. Memoize only pure functions — ones that use nothing but their parameters.",
        },
        {
            question: "Each closure has its own variable.",
            code: `function makeCounter() {
    let count = 0;
    return () => ++count;
}
const a = makeCounter();
const b = makeCounter();
a(); a();
console.log(a(), b());`,
            options: ["3 1", "3 3", "1 1", "4 1"],
            answer: 0,
            comment: "Every call to makeCounter creates a new `count`, and only its own inner function can reach it.",
        },
        {
            question: "compose: which runs first?",
            code: `const compose = (f, g) => (x) => f(g(x));
const double = (x) => x * 2;
const increment = (x) => x + 1;
console.log(compose(double, increment)(5), compose(increment, double)(5));`,
            options: ["12 11", "11 12", "12 12", "11 11"],
            answer: 0,
            comment: "compose(f, g) runs g first. pipe lists the steps in the order they run.",
        },
    ],
});
