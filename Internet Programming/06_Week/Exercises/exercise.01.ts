// Exercise 1 — A Class Hierarchy
// Run with: npx tsx exercise.01.ts   (or: node exercise.01.ts, or npx tsc && node dist/exercise.01.js)
//
// Nothing here is new: classes and access modifiers are Lecture 04, `extends Error`
// is Lecture 05. This exercise gives the pieces their names — and looks underneath.

// ---- tiny test helper (each exercise file is self-contained) ----
let passed = 0;
let failed = 0;
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) passed++; else failed++;
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 1.1 — The base class ----
// Abstraction: callers see describe(), speak() and move() — not how each animal does them.
// Encapsulation: #energy can only be changed through the class's own methods.
abstract class Animal {
    readonly name: string;
    #energy = 10;

    constructor(name: string) {
        this.name = name;
    }

    get energy(): number {             // read from outside, never written from outside
        return this.#energy;
    }

    // Every animal makes some sound, but there is no sound for "an animal" in general.
    // abstract: subclasses must provide it, and `new Animal(...)` is not allowed.
    abstract speak(): string;

    move(distance: number): string {
        this.#energy = Math.max(0, this.#energy - distance);
        return `${this.name} ${this.movement()} ${distance} m`;
    }

    // protected: subclasses may replace it, outside code cannot call it.
    protected movement(): string {
        return "walks";
    }

    describe(): string {
        return `${this.name} the ${this.constructor.name.toLowerCase()} says ${this.speak()}`;
    }
}

// ---- 1.2 — Subclasses ----
// Inheritance: each one gets describe(), move() and energy from Animal for free.
class Cat extends Animal {
    speak(): string { return "meow"; }
}

class Dog extends Animal {
    speak(): string { return "woof"; }
}

class Bird extends Animal {
    speak(): string { return "tweet"; }
    protected override movement(): string { return "flies"; }
}

class Fish extends Animal {
    speak(): string { return "…"; }
    protected override movement(): string { return "swims"; }
}

// A subclass with its own constructor must call super(...) before it touches `this`.
class GuideDog extends Dog {
    readonly owner: string;
    constructor(name: string, owner: string) {
        super(name);
        this.owner = owner;
    }
    override describe(): string {
        return `${super.describe()}, and guides ${this.owner}`;   // extend the parent's version
    }
}

// ---- 1.3 — Polymorphism ----
// One loop, one method call — and each object answers in its own way.
function chorus(animals: readonly Animal[]): string[] {
    return animals.map((animal) => animal.describe());
}

// ---- 1.4 — Under the hood: the prototype chain ----
// The methods are not copied into each object. They live once, on the prototype,
// and every lookup walks up the chain: rex → Dog.prototype → Animal.prototype → Object.prototype.
function chainOf(object: object): string[] {
    const names: string[] = [];
    let current = Object.getPrototypeOf(object);
    while (current !== null) {
        names.push(current.constructor.name);
        current = Object.getPrototypeOf(current);
    }
    return names;
}

// ---- 1.5 — Losing `this` ----
// A method called as object.method() gets that object as `this`.
// The same function called on its own gets undefined.
function callLater(callback: () => string): string {
    return callback();                 // called plainly — like setTimeout or addEventListener would
}

// ---- checks ----
const tom = new Cat("Tom");
const rex = new Dog("Rex");
const tweety = new Bird("Tweety");
const nemo = new Fish("Nemo");
const buddy = new GuideDog("Buddy", "Ana");

// 1.1 / 1.2
check("1.2 a cat speaks", tom.speak(), "meow");
check("1.2 describe() is inherited", rex.describe(), "Rex the dog says woof");
check("1.2 birds override movement", tweety.move(3), "Tweety flies 3 m");
check("1.2 fish too", nemo.move(2), "Nemo swims 2 m");
check("1.2 the rest use the default", tom.move(4), "Tom walks 4 m");
check("1.1 energy went down", [tom.energy, tweety.energy, rex.energy], [6, 7, 10]);
check("1.2 super.describe() extends the parent", buddy.describe(), "Buddy the guidedog says woof, and guides Ana");

// 1.3
check("1.3 one call, five answers", chorus([tom, rex, tweety, nemo, buddy]).map((s) => s.split(" says ")[1]),
    ["meow", "woof", "tweet", "…", "woof, and guides Ana"]);

// 1.4
check("1.4 instanceof walks the chain", [buddy instanceof GuideDog, buddy instanceof Dog, buddy instanceof Animal, buddy instanceof Cat],
    [true, true, true, false]);
check("1.4 the chain", chainOf(buddy), ["GuideDog", "Dog", "Animal", "Object"]);
check("1.4 methods live on the prototype, not on the object", [Object.hasOwn(rex, "speak"), Object.hasOwn(Dog.prototype, "speak")],
    [false, true]);
check("1.4 so every dog shares one function", rex.speak === new Dog("Fido").speak, true);
check("1.4 fields are on the object itself", Object.keys(rex), ["name"]);
check("1.4 a class is a function", typeof Dog, "function");

// 1.5
let lost = "";
try {
    callLater(rex.describe);           // passes the function, not "rex's describe"
} catch (error) {
    lost = (error as Error).constructor.name;
}
check("1.5 a detached method loses `this`", lost, "TypeError");
check("1.5 fixed with an arrow function", callLater(() => rex.describe()), "Rex the dog says woof");
check("1.5 fixed with bind", callLater(rex.describe.bind(rex)), "Rex the dog says woof");

// Things the compiler stops — kept inside a function that never runs.
function neverCalled(): void {
    // @ts-expect-error — Cannot create an instance of an abstract class.
    new Animal("Generic");
    // @ts-expect-error — energy is a getter only.
    tom.energy = 100;
    // @ts-expect-error — movement is protected.
    tom.movement();
    // @ts-expect-error — name is readonly.
    tom.name = "Jerry";
}
void neverCalled;

console.log(`\n${passed} passed, ${failed} failed`);
