// Quiz data — "Name it": the vocabulary of Classes 11 and 12.
//
// Every snippet is code you have already written or seen in Lectures 01–05.
// The question is only: what is this called? These snippets have `run: false` —
// they are there to be recognised, not run.

registerQuiz({
    id: "name-it",
    title: "Name it",
    description: "Code you have already written. What is it called?",
    questionsPerRound: 15,
    questions: [
        {
            question: "What is makeCounter's inner function an example of?",
            code: `function makeCounter() {
    let count = 0;
    return () => ++count;
}`,
            run: false,
            options: ["A closure", "A pure function", "Memoization", "A prototype"],
            answer: 0,
            comment: "The inner function keeps `count` alive after makeCounter has returned. Lecture 03, Class 05.",
        },
        {
            question: "repeat takes a function as a parameter. What kind of function is repeat?",
            code: `function repeat(times, action) {
    for (let i = 0; i < times; i++) action(i);
}`,
            run: false,
            options: ["A higher-order function", "A pure function", "A constructor function", "A recursive function"],
            answer: 0,
            comment: "Takes a function, or returns one — either makes it higher-order. map, filter, addEventListener and then are all higher-order.",
        },
        {
            question: "Which OOP principle does #balance demonstrate?",
            code: `class Account {
    #balance = 0;
    deposit(amount) {
        if (amount <= 0) throw new Error("Positive amounts only");
        this.#balance += amount;
    }
}`,
            run: false,
            options: ["Encapsulation", "Inheritance", "Polymorphism", "Composition"],
            answer: 0,
            comment: "The data can only change through the class's own methods, which check the rules. Lecture 04, Class 07.",
        },
        {
            question: "One loop, one call to area(), different code runs for each shape. What is that called?",
            code: `for (const shape of [new Circle(1), new Square(2), new Triangle(3, 4)]) {
    console.log(shape.area());
}`,
            run: false,
            options: ["Polymorphism", "Encapsulation", "Abstraction", "Recursion"],
            answer: 0,
            comment: "\"Many shapes\": the same call, a different behaviour for each kind of object.",
        },
        {
            question: "ApiError gets message, name and a stack trace without writing them. Why?",
            code: `class ApiError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}`,
            run: false,
            options: ["Inheritance", "Encapsulation", "Composition", "Partial application"],
            answer: 0,
            comment: "You wrote this in Lecture 05, exercise 4.",
        },
        {
            question: "What does an interface like this one give the code that uses it?",
            code: `interface PaymentMethod {
    pay(amount: number): boolean;
}`,
            run: false,
            options: ["Abstraction", "Inheritance", "Memoization", "Immutability"],
            answer: 0,
            comment: "Callers depend on what a payment method can do, not on how a particular one does it.",
        },
        {
            question: "Which design pattern is addEventListener?",
            code: `button.addEventListener("click", () => console.log("clicked"));
button.addEventListener("click", () => saveForm());`,
            run: false,
            options: ["Observer", "Singleton", "Factory", "Decorator"],
            answer: 0,
            comment: "Many listeners subscribe; the button notifies all of them. RxJS in Angular is the same pattern, made more powerful.",
        },
        {
            question: "Which design pattern is @Duration from the Lecture 04 exercises?",
            code: `class Report {
    @Duration
    build() { /* … */ }
}`,
            run: false,
            options: ["Decorator", "Observer", "Strategy", "Facade"],
            answer: 0,
            comment: "It wraps a method to add behaviour, without changing the method. Angular's @Component is the same syntax.",
        },
        {
            question: "Passing a different comparator changes how sort orders things. What is that pattern called?",
            code: `authors.sort(byName);
authors.sort(byBirthYear);
authors.sort((a, b) => b.books - a.books);`,
            run: false,
            options: ["Strategy", "Observer", "Singleton", "Iterator"],
            answer: 0,
            comment: "sort's algorithm stays the same; the strategy for comparing two items is plugged in.",
        },
        {
            question: "A module creates one Map, and every file that imports getRates shares it. What is that like?",
            code: `// rates.ts
const cache = new Map();
export async function getRates(base) { /* uses cache */ }`,
            run: false,
            options: ["A singleton", "A factory", "A prototype", "A decorator"],
            answer: 0,
            comment: "A module runs once, so there is one cache for the whole app. Angular's services with providedIn: 'root' are singletons too.",
        },
        {
            question: "What is this technique called?",
            code: `const known = new Map();
function slowSquare(n) {
    if (known.has(n)) return known.get(n);
    const result = n * n;
    known.set(n, result);
    return result;
}`,
            run: false,
            options: ["Memoization", "Currying", "Encapsulation", "Composition"],
            answer: 0,
            comment: "Remember each answer, and hand it back the next time instead of computing it again. Safe only for pure functions.",
        },
        {
            question: "Which of these functions is pure?",
            options: [
                "(price, rate) => price * (1 + rate)",
                "(price) => price * (1 + taxRate)  // taxRate is a global",
                "(item) => { cart.push(item); return cart.length; }",
                "() => Math.random() > 0.5",
            ],
            answer: 0,
            comment: "Pure: uses only its parameters, changes nothing, same input → same output. The others read a global, change one, or are random.",
        },
        {
            question: "add.bind(null, 10) — what has been done to add?",
            code: `const add = (a, b) => a + b;
const addTen = add.bind(null, 10);
addTen(5);   // 15`,
            run: false,
            options: ["Partial application", "Memoization", "Composition", "Inheritance"],
            answer: 0,
            comment: "Some arguments are fixed now; the function returned waits for the rest.",
        },
        {
            question: "What is this way of writing add called?",
            code: `const add = (a) => (b) => a + b;
add(2)(3);   // 5`,
            run: false,
            options: ["Currying", "Recursion", "Composition", "Destructuring"],
            answer: 0,
            comment: "One argument at a time, each call returning a function that waits for the next.",
        },
        {
            question: "What does pipe do with the functions it is given?",
            code: `const normalize = pipe(trim, toLowerCase);
normalize("  Hello ");   // "hello"`,
            run: false,
            options: ["Composes them", "Memoizes them", "Curries them", "Runs them in parallel"],
            answer: 0,
            comment: "The output of each step is the input of the next. RxJS's pipe(map(…), filter(…)) works the same way.",
        },
        {
            question: "Why is the second version preferred in modern front-end code?",
            code: `// 1
list.push(item);
// 2
list = [...list, item];`,
            run: false,
            options: [
                "It is an immutable update: a new array, so anything holding the old one can see that something changed",
                "It is faster",
                "push does not work on arrays declared with const",
                "Spread makes a deep copy",
            ],
            answer: 0,
            comment: "Comparing references is cheap: old !== new means \"changed\". Angular's signals and change detection rely on it.",
        },
        {
            question: "What does `new` do with a function — the thing a class is made of?",
            options: [
                "Creates an empty object linked to the function's prototype, runs the function with this set to it, and returns it",
                "Copies all of the prototype's methods into a new object",
                "Calls the function twice: once to check it, once to run it",
                "Makes a deep copy of the function",
            ],
            answer: 0,
            comment: "Nothing is copied: the new object only gets a link to the prototype. That is why all instances share one copy of each method.",
        },
        {
            question: "A function that returns a new, configured function — like power(2) or by(\"name\"). What is it often called?",
            code: `const square = power(2);
authors.sort(by("name"));`,
            run: false,
            options: ["A function factory", "A constructor", "A prototype", "A predicate"],
            answer: 0,
            comment: "It is also a higher-order function, and what it returns is a closure.",
        },
    ],
});
