# Class 06 — JavaScript Data Structures

Companion notes for `Class06-DataStructures.pptx`. The slides are the outline; this is the
content. Sections 1–7 map to slides 3–10. Sections 8 and 9 — optional chaining and JSON —
are not on the slides, but you will need both constantly from here on.

Every code result shown below was executed and verified.

**Contents**

1. [Arrays](#1-arrays-slides-34)
2. [Adding and removing elements](#2-adding-and-removing-elements-slide-5)
3. [Sorting, searching and iterating](#3-sorting-searching-and-iterating-slide-6)
4. [Objects](#4-objects-slide-7)
5. [Maps and Sets](#5-maps-and-sets-slide-8)
6. [Destructuring](#6-destructuring-slide-9)
7. [Spread and rest](#7-spread-and-rest-slide-10)
8. [Optional chaining and nullish coalescing](#8-optional-chaining-and-nullish-coalescing)
9. [JSON](#9-json)

---

## 1. Arrays (slides 3–4)

### What an array is

An **ordered collection of values**, accessed by position.

```js
const empty   = [];
const numbers = [10, 20, 30];
const mixed   = [1, "two", true, null, [5, 6], { a: 1 }];
```

As the slide says, JavaScript arrays are **not fixed size** and **allow mixed data**. Both
are true, and both are worth using carefully: an array of mixed types is legal but hard to
work with. In practice, most arrays hold one kind of thing.

Other ways to create arrays:

```js
Array.from("abc")              // ["a", "b", "c"]  — from anything iterable
Array.from({ length: 3 }, (_, i) => i * 2)   // [0, 2, 4]
new Array(3).fill(0)           // [0, 0, 0]
```

### Indexing

```js
const letters = ["a", "b", "c"];
letters[0]                // "a"   — zero-based
letters[letters.length - 1]   // "c"   — last element
letters.at(-1)            // "c"   — the modern way
letters.at(-2)            // "b"
```

`at()` accepts negative numbers, counting back from the end. `letters[-1]` does **not** —
it looks for a property literally named `"-1"`, finds nothing, and returns `undefined`.

**Reading outside the array is not an error** — you just get `undefined`:

```js
letters[10]    // undefined — no error, no warning
```

That is convenient and dangerous in equal measure. A typo in an index produces an
`undefined` that travels silently through your code until something finally breaks,
usually far from the cause.

**Writing outside the array** creates the element — and a gap:

```js
const arr = [1, 2, 3];
arr[6] = 7;
arr.length     // 7
arr            // [1, 2, 3, <3 empty items>, 7]
```

Those "empty items" are *holes*, and various methods treat them inconsistently. Avoid
creating them; use `push` to add to the end.

`length` is writable, which gives a quick way to truncate or empty an array:

```js
arr.length = 2;    // [1, 2]
arr.length = 0;    // []
```

### Looping

By **index** (slide 4) — when you need the position:

```js
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
}
```

By **item** — when you only need the values:

```js
for (const item of arr) {
  console.log(item);
}
```

And with the array methods in section 3, which you will use more than either.

### Array-like objects

Some things *look* like arrays — they have numeric indexes and a `length` — but are not:
the `NodeList` and `HTMLCollection` from Class 04, strings, and the `arguments` object
inside a function.

```js
const nodes = document.querySelectorAll("p");
Array.isArray(nodes)       // false
nodes.map(...)             // TypeError: nodes.map is not a function
```

Convert them with `Array.from()` or spread (section 7):

```js
Array.from(nodes).map(...)
[...nodes].map(...)
```

---

## 2. Adding and removing elements (slide 5)

### Mutating versus non-mutating

The most important question to ask about any array method:

> **Does it change the original array, or return a new one?**

Get this wrong and you either modify data you meant to keep, or throw away the result you
meant to use. The slide groups `slice` with the methods that add and remove elements — but
`slice` is different from all the others, because **it does not change the array at all**.

| Method | Changes the array? | Returns |
|---|:---:|---|
| `push(x)` | ✅ | the new length |
| `pop()` | ✅ | the removed last element |
| `unshift(x)` | ✅ | the new length |
| `shift()` | ✅ | the removed first element |
| `splice(...)` | ✅ | an array of removed elements |
| `slice(...)` | ✗ | a new array — a copy of part of the original |

### Ends of the array: stacks and queues

```js
const arr = [1, 2, 3];
arr.push(4);      // [1, 2, 3, 4]    add to the end
arr.pop();        // [1, 2, 3]       remove from the end — returns 4
arr.unshift(0);   // [0, 1, 2, 3]    add to the start
arr.shift();      // [1, 2, 3]       remove from the start — returns 0
```

"Arrays substitute queues and stacks," says the slide. JavaScript has no separate stack or
queue type; you use an array with the right pair of methods:

- **Stack** — last in, first out (like a pile of plates): `push` and `pop`
- **Queue** — first in, first out (like a line at a counter): `push` and `shift`

`push` and `pop` are fast. `shift` and `unshift` must move every other element along by one,
so on very large arrays they are slow. It does not matter for the arrays you will write in
this course.

### `splice` versus `slice`

Two methods, one letter apart, behaving completely differently. This is one of the most
common mix-ups in JavaScript.

**`splice(start, deleteCount, ...itemsToInsert)`** changes the array — it can remove, insert,
or replace anywhere:

```js
const arr = ["a", "b", "c", "d", "e"];

arr.splice(1, 2);           // removes "b", "c"  → arr is ["a", "d", "e"]
arr.splice(1, 0, "X");      // inserts at 1      → arr is ["a", "X", "d", "e"]
arr.splice(1, 1, "Y");      // replaces at 1     → arr is ["a", "Y", "d", "e"]
```

**`slice(start, end)`** copies a section, leaving the original untouched. `end` is
*exclusive* — the element at `end` is not included:

```js
const arr = ["a", "b", "c", "d", "e"];

arr.slice(1, 3)    // ["b", "c"]
arr.slice(2)       // ["c", "d", "e"]   — to the end
arr.slice(-2)      // ["d", "e"]        — last two
arr.slice()        // a copy of the whole array
arr                // unchanged: ["a", "b", "c", "d", "e"]
```

Memory aid: **s*p*lice** has a **p** — and it *p*ermanently changes the array.

---

## 3. Sorting, searching and iterating (slide 6)

### Sorting — and its famous trap

`sort()` sorts **in place**: it changes the original array, and returns it.

```js
const words = ["pear", "apple", "fig"];
words.sort();      // ["apple", "fig", "pear"]
```

Fine for strings. Now numbers:

```js
[10, 9, 1, 100].sort()    // [1, 10, 100, 9]   ← !
```

By default, `sort` **converts every element to a string** and compares them alphabetically.
As strings, `"100"` comes before `"9"`, just as `"apple"` comes before `"b"`. This
surprises nearly everyone, and it never throws an error — it just quietly gives the wrong
order.

To sort numbers, pass a **comparison function**. It receives two elements and returns a
negative number if `a` should come first, positive if `b` should, or zero if they are equal:

```js
[10, 9, 1, 100].sort((a, b) => a - b)    // [1, 9, 10, 100]   ascending
[10, 9, 1, 100].sort((a, b) => b - a)    // [100, 10, 9, 1]   descending
```

Sorting objects by a property:

```js
students.sort((a, b) => a.age - b.age);              // by a number
students.sort((a, b) => a.name.localeCompare(b.name)); // by a string, properly
```

`localeCompare` handles accented letters and language rules that plain comparison gets
wrong — which matters for names in Macedonian, or anything beyond plain English:

```js
const names = ["Žarko", "Zoran", "ana", "Ana", "Ćirko", "Cvetan"];

names.toSorted()
// ["Ana", "Cvetan", "Zoran", "ana", "Ćirko", "Žarko"]
// every capital before every lowercase letter; Ć and Ž pushed to the end

names.toSorted((a, b) => a.localeCompare(b))
// ["ana", "Ana", "Ćirko", "Cvetan", "Žarko", "Zoran"]
```

The default sort compares raw character codes, so it knows nothing about alphabets.

`reverse()` also works in place.

**Sorting without changing the original.** Because `sort` and `reverse` mutate, it is easy
to scramble an array you still needed in its original order. Since 2023, every current
browser has non-mutating versions:

```js
const original = [3, 1, 2];
const sorted = original.toSorted((a, b) => a - b);   // [1, 2, 3]
original;                                            // still [3, 1, 2]

original.toReversed();    // [2, 1, 3], original unchanged
```

Before these existed, the idiom was to copy first: `[...original].sort(...)`.

### Finding things

| Method | Returns | Use when |
|---|---|---|
| `includes(x)` | `true` / `false` | you only need to know *whether* it is there |
| `indexOf(x)` | the index, or `-1` | you need the position of a known value |
| `find(fn)` | the first matching **element**, or `undefined` | you are searching by a condition |
| `findIndex(fn)` | the index of the first match, or `-1` | you need the position, by condition |

```js
const nums = [5, 12, 8, 130];

nums.includes(8)                // true
nums.indexOf(8)                 // 2
nums.indexOf(99)                // -1
nums.find(n => n > 10)          // 12   — the first one, then it stops
nums.findIndex(n => n > 10)     // 1
```

`indexOf` returns `-1` for "not found", and `-1` is **truthy**. So this is a bug:

```js
if (nums.indexOf(5)) { }        // index 0 is falsy — fails even though 5 IS there
if (nums.includes(5)) { }       // correct
```

One more difference: `includes` can find `NaN`, but `indexOf` cannot, because `indexOf` uses
`===` and `NaN === NaN` is `false` (Class 02, section 4).

### The iteration methods

These take a **callback** (Class 05, section 6) and call it once for each element. They are
the heart of working with data in JavaScript. None of them changes the original array.

**`forEach`** — do something with each element. Returns nothing.

```js
["a", "b"].forEach((item, index) => console.log(index, item));
```

You cannot `break` out of `forEach` (Class 05, section 3). If you need to stop early, use
`for...of`, or one of the methods below that stop on their own.

**`map`** — transform each element. Returns a **new array of the same length**.

```js
[1, 2, 3].map(n => n * 2)                // [2, 4, 6]
users.map(u => u.name)                   // ["Ana", "Marko", ...]
```

**`filter`** — keep the elements that pass a test. Returns a **new, possibly shorter array**.

```js
[1, 2, 3, 4].filter(n => n % 2 === 0)    // [2, 4]
users.filter(u => u.age >= 18)
```

**`some`** / **`every`** — does *any* / does *every* element pass? Return a boolean, and
stop as soon as the answer is known.

```js
[1, 3, 5].some(n => n % 2 === 0)         // false
[2, 4, 6].every(n => n % 2 === 0)        // true
```

**`reduce`** — combine all elements into **one value**.

```js
[1, 2, 3, 4].reduce((total, n) => total + n, 0)    // 10
```

The callback receives the **accumulator** (`total`, the result so far) and the current
element; whatever it returns becomes the accumulator for the next element. The last
argument (`0`) is the **initial value**.

Step by step:

| Step | `total` | `n` | returns |
|---|---|---|---|
| 1 | `0` (initial) | 1 | 1 |
| 2 | 1 | 2 | 3 |
| 3 | 3 | 3 | 6 |
| 4 | 6 | 4 | **10** |

**Always give `reduce` an initial value.** Without one, it uses the first element instead —
which works until the array is empty:

```js
[].reduce((total, n) => total + n)       // TypeError: Reduce of empty array with no initial value
[].reduce((total, n) => total + n, 0)    // 0
```

`reduce` can build any shape of result, not just numbers:

```js
const words = ["apple", "avocado", "banana"];
words.reduce((groups, w) => {
  const letter = w[0];
  groups[letter] = groups[letter] || [];
  groups[letter].push(w);
  return groups;
}, {});
// { a: ["apple", "avocado"], b: ["banana"] }
```

### Chaining

Because `map` and `filter` return arrays, you can chain them into a readable pipeline:

```js
const total = orders
  .filter(order => order.paid)
  .map(order => order.amount)
  .reduce((sum, amount) => sum + amount, 0);
```

Read it top to bottom: *of the orders, take the paid ones, take their amounts, add them up*.
Compare that with the equivalent `for` loop with an `if` and a running total — the chain
says *what* you want rather than *how* to compute it.

---

## 4. Objects (slide 7)

### Creating objects

The **object literal** is how you will create objects almost always:

```js
const person = {
  name: "Ana",
  age: 21,
  "favourite colour": "green",     // keys with spaces need quotes
};
```

Two shortcuts you will see everywhere:

```js
const name = "Ana", age = 21;

const person = { name, age };            // shorthand — same as { name: name, age: age }

const field = "email";
const record = { [field]: "a@b.mk" };    // computed key — { email: "a@b.mk" }
```

**Constructors** create many objects of the same shape. The traditional form is a function
called with `new`; the modern form is `class` syntax, which — as Class 02, section 2
explained — is the same prototype mechanism with nicer syntax:

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const p = new Person("Ana", 21);
```

### Accessing properties

```js
person.name                  // dot notation — the usual way
person["name"]               // bracket notation — same thing
person["favourite colour"]   // brackets required: the key has a space

const key = "age";
person[key]                  // brackets required: the key is in a variable
person.key                   // undefined — looks for a property literally named "key"
```

**Use dot notation by default. Use brackets when the key is in a variable, or is not a
valid identifier.** That last line — `person.key` — is a bug beginners write constantly.

Reading a property that does not exist gives `undefined`, not an error — the same as reading
past the end of an array.

Adding, changing and removing:

```js
person.city = "Skopje";      // adds a new property
person.age = 22;             // changes one
delete person.city;          // removes one
```

Checking whether a property exists:

```js
"name" in person             // true — but includes inherited properties
Object.hasOwn(person, "name")  // true — own properties only
person.name !== undefined    // works, unless the value really is undefined
```

### Iterating over properties

As Class 05, section 3 explained, `for...in` includes inherited properties, so prefer these:

```js
const person = { name: "Ana", age: 21 };

Object.keys(person)      // ["name", "age"]
Object.values(person)    // ["Ana", 21]
Object.entries(person)   // [["name", "Ana"], ["age", 21]]

for (const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
```

And to go the other way — build an object from pairs:

```js
Object.fromEntries([["name", "Ana"], ["age", 21]])    // { name: "Ana", age: 21 }
```

Together, `entries` and `fromEntries` let you use array methods on an object:

```js
const prices = { apple: 40, pear: 55, fig: 120 };
const cheap = Object.fromEntries(
  Object.entries(prices).filter(([fruit, price]) => price < 100)
);
// { apple: 40, pear: 55 }
```

### Methods

A property whose value is a function is a **method**. Use the shorthand syntax:

```js
const counter = {
  count: 0,
  increment() {            // shorthand for: increment: function () { ... }
    this.count++;
  },
};
counter.increment();
counter.count;    // 1
```

Inside a method, `this` is the object the method was called on. As Class 05, section 6
explained, **do not use arrow functions for methods** — they do not get their own `this`.

### Objects are references

Recall Class 02, section 4: assigning an object does **not** copy it.

```js
const a = { x: 1 };
const b = a;
b.x = 2;
a.x;      // 2 — a and b are the same object
```

Section 7 shows how to make actual copies.

---

## 5. Maps and Sets (slide 8)

### Maps

A `Map` is a collection of **key–value pairs**, built specifically for that job.

```js
const ages = new Map();
ages.set("Ana", 21);
ages.set("Marko", 23);

ages.get("Ana")          // 21
ages.has("Marko")        // true
ages.size                // 2
ages.delete("Marko");

// or create it filled in:
const ages = new Map([
  ["Ana", 21],
  ["Marko", 23],
]);
```

**Why not just use an object?** For simple fixed records — a person with a name and an age —
an object is the right choice. A `Map` is better when you have a **collection** of entries
added and removed at runtime:

| | Object | Map |
|---|---|---|
| Key types | Strings (and symbols) only | **Anything** — numbers, objects, functions |
| Number of entries | `Object.keys(obj).length` | `.size` |
| Iteration order | Mostly insertion order, with exceptions | Always insertion order |
| Accidental keys | Inherits properties like `toString` | Starts truly empty |
| Iterable directly | No | Yes — `for...of` works |

The key-type difference is the important one. An object silently converts every key to a
string:

```js
const obj = {};
obj[1] = "a";
obj["1"] = "b";
Object.keys(obj)     // ["1"] — 1 and "1" are the same key!

const map = new Map();
map.set(1, "a");
map.set("1", "b");
map.size             // 2 — different keys
```

Iterating a `Map`:

```js
for (const [name, age] of ages) {
  console.log(name, age);
}

[...ages.keys()]       // ["Ana", "Marko"]
[...ages.values()]     // [21, 23]
```

### Sets

A `Set` is a collection of **unique values** — no keys, and no duplicates allowed.

```js
const tags = new Set();
tags.add("js");
tags.add("css");
tags.add("js");       // already there — ignored

tags.size             // 2
tags.has("css")       // true
tags.delete("css");
```

Its best-known use is a one-line way to remove duplicates from an array:

```js
const withDupes = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(withDupes)];    // [1, 2, 3]
```

Use a `Set` whenever the question you keep asking is *"have I seen this before?"* — visited
pages, selected items, words already counted. `set.has(x)` is much faster than
`array.includes(x)` on large collections, because it does not scan through every element.

---

## 6. Destructuring (slide 9)

Destructuring unpacks values from arrays or objects into separate variables, in one step.

### Array destructuring

Matches by **position**:

```js
const [first, second] = ["a", "b", "c"];
first     // "a"
second    // "b"

const [, , third] = ["a", "b", "c"];     // skip with commas
third     // "c"

const [x = 0, y = 0] = [5];              // defaults for missing values
x         // 5
y         // 0
```

The neatest trick — **swapping** two variables without a temporary one:

```js
let a = 1, b = 2;
[a, b] = [b, a];
a         // 2
b         // 1
```

### Object destructuring

Matches by **name**:

```js
const person = { name: "Ana", age: 21, city: "Skopje" };

const { name, age } = person;
name      // "Ana"
age       // 21
```

Renaming, defaults, and nesting:

```js
const { name: fullName } = person;        // into a variable called fullName
const { country = "North Macedonia" } = person;   // default when missing

const user = { profile: { email: "ana@uacs.edu.mk" } };
const { profile: { email } } = user;      // reach into nested objects
email     // "ana@uacs.edu.mk"
```

### In function parameters

This is where destructuring earns its keep. A function with many parameters is hard to call
correctly:

```js
createUser("Ana", 21, true, false, "Skopje");   // which boolean is which?
```

Instead, take **one object** and destructure it, with defaults:

```js
function createUser({ name, age, isAdmin = false, city = "Skopje" }) {
  // name, age, isAdmin and city are now ordinary local variables
}

createUser({ name: "Ana", age: 21 });
createUser({ name: "Marko", age: 23, isAdmin: true });
```

The call is self-describing, the order does not matter, and optional settings can simply be
left out. This "options object" pattern is everywhere in JavaScript libraries.

If the whole argument might be missing, give the parameter itself a default, or calling
`createUser()` with nothing will throw:

```js
function createUser({ name = "Guest" } = {}) { ... }
```

---

## 7. Spread and rest (slide 10)

Both are written `...`. Which one it is depends on where it appears:

- **Spread** *expands* a collection into individual elements.
- **Rest** *collects* individual elements into a collection.

### Spreading arrays

```js
const a = [1, 2];
const b = [3, 4];

[...a, ...b]          // [1, 2, 3, 4]       combine
[0, ...a, 99]         // [0, 1, 2, 99]      insert
[...a]                // [1, 2]             copy
Math.max(...a)        // 2                  pass as separate arguments
[..."hello"]          // ["h", "e", "l", "l", "o"]
```

### Spreading objects

```js
const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { fontSize: 18 };

const settings = { ...defaults, ...userPrefs };
// { theme: "light", fontSize: 18 }
```

When keys clash, **the later one wins** — which makes this the standard way to combine
defaults with overrides. Put the defaults first.

It is also the standard way to make a changed copy, leaving the original alone:

```js
const updated = { ...person, age: 22 };
```

### The shallowness of spread

The slide flags this, and it matters. Spread copies only the **top level**. Nested objects
and arrays are *not* copied — the copy and the original share them:

```js
const original = { name: "Ana", address: { city: "Skopje" } };
const copy = { ...original };

copy.name = "Marko";             // fine — top level, copied
copy.address.city = "Bitola";    // changes original.address too!

original.address.city    // "Bitola"
```

`copy.address` and `original.address` are the same object (section 4: objects are
references). A copy like this is called **shallow**.

For a **deep** copy — copying everything, all the way down — use `structuredClone`:

```js
const deep = structuredClone(original);
deep.address.city = "Ohrid";
original.address.city    // unchanged
```

`structuredClone` cannot copy functions, but handles everything else you are likely to have —
including `Map`, `Set` and `Date`.

### Rest: collecting elements

In destructuring, `...` gathers **whatever is left**:

```js
const [first, ...others] = [1, 2, 3, 4];
first     // 1
others    // [2, 3, 4]

const { password, ...safeUser } = user;   // everything except password
```

That second line is a handy way to remove a property while copying an object.

### Rest parameters: variadic functions

A **variadic** function accepts any number of arguments. A rest parameter collects them
into a **real array**:

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2)           // 3
sum(1, 2, 3, 4)     // 10
sum()               // 0
```

It must be the **last** parameter, since it takes everything remaining:

```js
function log(level, ...messages) { ... }    // fine
function log(...messages, level) { ... }    // SyntaxError
```

This replaces the old `arguments` object (Lecture 01, Exercise 6), which is not a real
array and does not exist in arrow functions at all.

---

## 8. Optional chaining and nullish coalescing

Not on the slides, but you have already met one of them: the Lecture 02 class demo used
`list.lastElementChild?.remove()`.

### The problem

Reaching into nested data fails when something along the way is missing:

```js
const user = { name: "Ana" };          // no address
user.address.city
// TypeError: Cannot read properties of undefined (reading 'city')
```

The traditional fix is a chain of checks:

```js
const city = user && user.address && user.address.city;
```

### Optional chaining: `?.`

`?.` stops and returns `undefined` if the value to its left is `null` or `undefined`,
instead of throwing:

```js
user.address?.city          // undefined — no error
user?.address?.city         // safe even if user itself is missing
```

It works for every kind of access:

```js
obj?.prop          // property
obj?.[key]         // bracket access
obj.method?.()     // call the method only if it exists
arr?.[0]           // array element
```

That last-but-one form is what the class demo used: `list.lastElementChild?.remove()` —
remove the last child *if there is one*, do nothing otherwise.

**Do not scatter `?.` everywhere.** If a value *must* exist, let the code throw when it
does not — that error tells you something is wrong. Use `?.` only for things that are
legitimately optional.

### Nullish coalescing: `??`

Pairs naturally with `?.` to supply a fallback:

```js
const city = user.address?.city ?? "Unknown";
```

As Class 05, section 2 explained, `??` reacts **only** to `null` and `undefined`, unlike
`||`, which also replaces `0`, `""` and `false`:

```js
const count = data.count ?? 0;     // keeps a real 0
const count = data.count || 0;     // same result here — but...
const label = data.label || "Untitled";   // replaces a deliberately empty "" too
```

---

## 9. JSON

Not on the slides, but it is how data moves around the web — between your page and a
server, and into browser storage. Everything in this class leads here.

### What JSON is

**JSON** (JavaScript Object Notation) is a **text format** for data, based on JavaScript's
object and array literal syntax:

```json
{
  "name": "Ana",
  "age": 21,
  "enrolled": true,
  "courses": ["Internet Programming", "Databases"],
  "address": null
}
```

It looks like a JavaScript object, but it is **a string** — text that any language can read
and write. That is the whole point: a Python or Java server can produce JSON that your
JavaScript reads.

It is stricter than JavaScript:

- Keys **must** be in double quotes
- Strings **must** use double quotes — not single quotes or backticks
- No trailing commas
- No comments
- No functions, no `undefined`

### Converting: `stringify` and `parse`

```js
const student = { name: "Ana", age: 21, courses: ["IP", "DB"] };

const text = JSON.stringify(student);
// '{"name":"Ana","age":21,"courses":["IP","DB"]}'   — a string

const back = JSON.parse(text);
back.courses[0]    // "IP" — a real object again
```

For readable output — handy for debugging — pass an indent as the third argument:

```js
JSON.stringify(student, null, 2);
```

A side effect worth knowing: `JSON.parse(JSON.stringify(x))` is an old way to deep-copy
data. Prefer `structuredClone` (section 7), which does not have the limitations below.

### What does not survive the trip

JSON only knows strings, numbers, booleans, `null`, arrays and plain objects. Everything else
is lost or changed, **silently**:

```js
JSON.stringify({
  a: undefined,             // dropped entirely
  f() { return 1; },        // dropped entirely
  d: new Date(2026, 0, 1),  // becomes a string — not a Date when parsed back
  m: new Map([["k", 1]]),   // becomes {} — the contents vanish
  s: new Set([1, 2]),       // becomes {}
  n: NaN,                   // becomes null
})
```

The `Map` and `Set` cases catch people out most — the data simply disappears, with no error.
Convert them first: `Object.fromEntries(map)` or `[...set]`.

The `Date` is worth a closer look. Run that code in Skopje and the date comes out as:

```
"2025-12-31T23:00:00.000Z"
```

`new Date(2026, 0, 1)` means midnight on 1 January **local time**. JSON stores dates in UTC
(the `Z` at the end), and midnight in Skopje is 23:00 the previous day in UTC. The moment in
time is the same — but display that string carelessly and your New Year's event shows up on
the wrong day. Time zones will bite you in every web application you build.

### Parsing can fail

`JSON.parse` throws a `SyntaxError` on anything that is not valid JSON — and text from a user
or from the network is never guaranteed to be valid. This is a textbook use of
`try...catch` from Class 05, section 5, because there is a sensible way to handle the
failure:

```js
function loadSettings(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.warn("Bad settings, using defaults:", error.message);
    return { theme: "light" };
  }
}
```

### Where you will use it

- **`localStorage`** stores only strings, so you `stringify` on the way in and `parse` on
  the way out — the Lecture 02 to-do list stretch goal.
- **Talking to servers** — when we cover `fetch`, almost every response you receive will be
  JSON.

---

## Further reading

- **MDN: Indexed collections (arrays)** —
  <https://developer.mozilla.org/docs/Web/JavaScript/Guide/Indexed_collections>
- **MDN: Keyed collections (Map and Set)** —
  <https://developer.mozilla.org/docs/Web/JavaScript/Guide/Keyed_collections>
- **MDN: Working with objects** —
  <https://developer.mozilla.org/docs/Web/JavaScript/Guide/Working_with_objects>
- **MDN: Destructuring** —
  <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment>
- **MDN: Working with JSON** —
  <https://developer.mozilla.org/docs/Learn/JavaScript/Objects/JSON>

---

*Internet Programming · UACS · Lecture 03*
