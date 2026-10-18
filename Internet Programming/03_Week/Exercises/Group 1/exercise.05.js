// Exercise 5 — Managing Objects
// Run with: node exercise.05.js   (or open runner.html?ex=05 in a browser)

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label, actual, expected) {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// ---- 5.1 — The object ----
const ana = {
    name: "Ana",
    age: 21,
    city: "Skopje",
    address: { street: "Partizanska 12", postcode: "1000" },
};

// ---- 5.2 — Describe it, destructuring in the parameter list ----
function describe({ name, age, city = "an unknown city" }) {
    return `${name} is ${age} years old and lives in ${city}.`;
}

// ---- 5.3 — Many people ----
const people = [
    ana,
    { name: "Marko", age: 23, city: "Bitola", address: { street: "Shirok Sokak 5", postcode: "7000" } },
    { name: "Elena", age: 19, city: "Ohrid", address: { street: "Kej Makedonija 3", postcode: "6000" } },
    { name: "Stefan", age: 25, city: "Kumanovo", address: { street: "Ilindenska 40", postcode: "1300" } },
    { name: "Ivana", age: 20, address: { street: "Unknown", postcode: "" } },    // no city
];

// ---- 5.4 — Change without mutating ----
function birthday(person) {
    return { ...person, age: person.age + 1 };
}

// The naive version: spread copies only the top level, so the copy and the
// original still share the *same* address object.
function moveHouseNaive(person, newStreet) {
    const copy = { ...person };
    copy.address.street = newStreet;      // modifies the shared address!
    return copy;
}

// The fix: copy the nested object too.
function moveHouse(person, newStreet) {
    return {
        ...person,
        address: { ...person.address, street: newStreet },
    };
}

// ======================================================================

console.log("=== 5.2 — describe ===");
check("describe(ana)", describe(ana), "Ana is 21 years old and lives in Skopje.");
check("describe without a city", describe({ name: "Ivana", age: 20 }),
    "Ivana is 20 years old and lives in an unknown city.");

console.log("\n=== 5.3 — Many people ===");
people.forEach((person) => console.log("  " + describe(person)));

const byAge = people.toSorted((a, b) => a.age - b.age);
console.log("  sorted by age:   " + byAge.map((p) => `${p.name} (${p.age})`).join(", "));
console.log("  original order:  " + people.map((p) => `${p.name} (${p.age})`).join(", "));
check("original array unchanged", people.map((p) => p.name), ["Ana", "Marko", "Elena", "Stefan", "Ivana"]);
check("sorted copy", byAge.map((p) => p.name), ["Elena", "Ivana", "Ana", "Marko", "Stefan"]);

const over20 = people.filter((p) => p.age > 20).map((p) => p.name);
check("names of everyone over 20", over20, ["Ana", "Marko", "Stefan"]);

console.log("\n=== 5.4 — Change without mutating ===");
const older = birthday(ana);
check("birthday returns age 22", older.age, 22);
check("original still 21", ana.age, 21);

const marko = people[1];
moveHouseNaive(marko, "Novo Street 1");
console.log(`  after moveHouseNaive, the ORIGINAL Marko lives at: ${marko.address.street}`);
// Answer: the original changed. { ...person } is a *shallow* copy — the
// address property of the copy points at the very same object as the
// original's. Changing copy.address.street changes it for both.

const elena = people[2];
const moved = moveHouse(elena, "Novo Street 2");
check("moveHouse: copy has the new street", moved.address.street, "Novo Street 2");
check("moveHouse: original keeps its street", elena.address.street, "Kej Makedonija 3");

// structuredClone is the other fix: a deep copy of everything
const clone = structuredClone(people[3]);
clone.address.street = "Somewhere else";
check("structuredClone leaves the original alone", people[3].address.street, "Ilindenska 40");

console.log("\n=== 5.5 — Save and load ===");
const withBirthday = { ...ana, birthDate: new Date(2005, 2, 14) };   // 14 March 2005
const json = JSON.stringify([withBirthday]);
const loaded = JSON.parse(json);
console.log(`  as JSON: ${json}`);
check("birthDate after the round trip is a string", typeof loaded[0].birthDate, "string");
// Answer: JSON has no date type, so the Date was turned into an ISO string
// in UTC. In Skopje, midnight on 14 March is 23:00 on 13 March in UTC — the
// stored text even shows the previous day. Turn it back into a Date with
// new Date(text) after parsing.
const revived = new Date(loaded[0].birthDate);
check("new Date(text) restores the same moment", revived.getTime(), withBirthday.birthDate.getTime());
