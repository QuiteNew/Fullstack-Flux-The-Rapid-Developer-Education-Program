// Demo 1 — what a class is made of.
// Run: node 01-class-underneath.ts
//
// The same two "classes", written twice: with the class syntax you know, and with the
// constructor functions and prototypes that JavaScript had before 2015. They behave the same,
// because the first is built from the second.

// ---- The way you write it ----
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    describe(): string {
        return `${this.name} says ${this.speak()}`;
    }
    speak(): string {
        return "…";
    }
}

class Dog extends Animal {
    override speak(): string {
        return "woof";
    }
}

// ---- What it is made of ----
// A constructor function: called with `new`, `this` is the new object.
function OldAnimal(this: { name: string }, name: string) {
    this.name = name;
}
// Methods go on the prototype, once — every object made with `new OldAnimal` links to it.
OldAnimal.prototype.describe = function (this: { name: string; speak(): string }) {
    return `${this.name} says ${this.speak()}`;
};
OldAnimal.prototype.speak = () => "…";

function OldDog(this: { name: string }, name: string) {
    OldAnimal.call(this, name);                       // what super(name) does
}
// "extends": make OldDog's prototype link to OldAnimal's prototype.
OldDog.prototype = Object.create(OldAnimal.prototype);
OldDog.prototype.constructor = OldDog;
OldDog.prototype.speak = () => "woof";

// ---- Side by side ----
const rex = new Dog("Rex");
const oldRex = new (OldDog as any)("Old Rex");        // `as any`: TypeScript does not model this style

console.log(rex.describe());
console.log(oldRex.describe());

console.log("\ntypeof Dog:", typeof Dog, "  typeof OldDog:", typeof OldDog);
console.log("own properties:", Object.keys(rex), Object.keys(oldRex));
console.log("speak is on the prototype:", Object.hasOwn(Dog.prototype, "speak"), Object.hasOwn(OldDog.prototype, "speak"));
console.log("instanceof the parent:", rex instanceof Animal, oldRex instanceof OldAnimal);

function chain(object: object): string {
    const names: string[] = [];
    for (let p = Object.getPrototypeOf(object); p !== null; p = Object.getPrototypeOf(p)) {
        names.push(p.constructor.name);
    }
    return names.join(" → ");
}
console.log("\nrex:     ", chain(rex));
console.log("old rex: ", chain(oldRex));
console.log("an array:", chain([1, 2, 3]), "  ← why every array has .map");

// What `new Dog("Rex")` does, in four steps:
//   1. create an empty object
//   2. link it to Dog.prototype
//   3. run the constructor with `this` = that object
//   4. return the object
// Nothing is copied. Every dog *finds* speak by walking up the chain.
