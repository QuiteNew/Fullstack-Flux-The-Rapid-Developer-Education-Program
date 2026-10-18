// Exercise 7 — Name Map
// Run with: node exercise.07.js   (or open runner.html?ex=07 in a browser)

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label, actual, expected) {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 7.1 — The map ----
const ages = new Map([
    ["Ana", 21],
    ["Marko", 23],
    ["Elena", 19],
    ["Stefan", 25],
    ["Ivana", 20],
    ["Petar", 25],        // ties with Stefan
]);

// ---- 7.2 — The oldest ----
// Always returns an array of names, so a tie needs no special return type.
// For an empty map it returns [] — "nobody is the oldest" is a normal,
// expected answer rather than an error, and callers can check .length.
function findOldest(ageMap) {
    let highest = -Infinity;
    let names = [];
    for (const [name, age] of ageMap) {
        if (age > highest) {
            highest = age;
            names = [name];          // a new record — start a new list
        } else if (age === highest) {
            names.push(name);        // a tie — add to the list
        }
    }
    return names;
}

// ---- 7.3 — The same with a plain object ----
const agesObject = { Ana: 21, Marko: 23, Elena: 19, Stefan: 25, Ivana: 20, Petar: 25 };

function findOldestInObject(ageObject) {
    return findOldest(Object.entries(ageObject));    // entries are [key, value] pairs too
}

// ---- 7.4 — JSON and Maps ----
function mapToJson(map) {
    return JSON.stringify(Object.fromEntries(map));
}

function jsonToMap(json) {
    return new Map(Object.entries(JSON.parse(json)));
}

// ======================================================================

console.log("=== 7.2 — findOldest ===");
check("tie between Stefan and Petar", findOldest(ages), ["Stefan", "Petar"]);
check("single oldest", findOldest(new Map([["Ana", 21], ["Marko", 23]])), ["Marko"]);
check("empty map", findOldest(new Map()), []);

console.log("\n=== 7.3 — Plain object ===");
check("findOldestInObject", findOldestInObject(agesObject), ["Stefan", "Petar"]);

const byAgeMap = new Map();
byAgeMap.set(21, "Ana");
byAgeMap.set("21", "a string key");
const byAgeObject = {};
byAgeObject[21] = "Ana";
byAgeObject["21"] = "a string key";
console.log(`  Map keys:    ${[...byAgeMap.keys()].map((k) => `${JSON.stringify(k)} (${typeof k})`).join(", ")}`);
console.log(`  Object keys: ${Object.keys(byAgeObject).map((k) => `${JSON.stringify(k)} (${typeof k})`).join(", ")}`);
check("the Map keeps 21 and '21' apart", byAgeMap.size, 2);
check("the object merges them into one string key", Object.keys(byAgeObject), ["21"]);
// Answer: a Map keeps keys exactly as given — the number 21 and the string
// "21" are different keys. An object converts every key to a string, so the
// second assignment silently overwrote the first.

console.log("\n=== 7.4 — JSON and Maps ===");
console.log(`  JSON.stringify(ages) = ${JSON.stringify(ages)}   ← the data is silently lost`);
const json = mapToJson(ages);
console.log(`  mapToJson(ages)      = ${json}`);
const restored = jsonToMap(json);
check("restored is a Map", restored instanceof Map, true);
check("restored has every entry", [...restored], [...ages]);
