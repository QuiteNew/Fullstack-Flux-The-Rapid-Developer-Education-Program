// Demo 2 — what `this` is, in each of the ways a function can be called.
// Run: node 02-this-rules.ts
//
// `this` is not decided where a function is written, but where it is *called*.
// (Except for arrow functions, which take it from where they are written.)

class Player {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    // A normal method.
    greet(): string {
        return `Hi, I'm ${this?.name ?? "(no this!)"}`;
    }
    // An arrow function stored in a field: `this` is fixed when the object is created.
    greetArrow = (): string => `Hi, I'm ${this.name}`;
}

const ana = new Player("Ana");
const boris = new Player("Boris");

const callIt = (fn: () => string) => fn();              // what setTimeout, addEventListener, .then do

console.log("1. method call           ", ana.greet());                   // this = ana
const detached = ana.greet;
console.log("2. detached, then called ", detached());                    // this = undefined
console.log("3. passed as a callback  ", callIt(ana.greet));             // the same as 2
console.log("4. wrapped in an arrow   ", callIt(() => ana.greet()));     // a method call again
console.log("5. bind                  ", callIt(ana.greet.bind(ana)));   // this fixed for good
console.log("6. arrow field, detached ", callIt(ana.greetArrow));        // captured at creation
console.log("7. call with another this", ana.greet.call(boris));         // this = boris, chosen per call

// The rules, in the order they are checked:
//   new Player(...)           → the new object
//   fn.call(x) / fn.bind(x)   → x
//   object.fn()               → object
//   fn()                      → undefined (in classes and modules; the global object in old sloppy scripts)
//   arrow functions           → whatever `this` was where the arrow was written
