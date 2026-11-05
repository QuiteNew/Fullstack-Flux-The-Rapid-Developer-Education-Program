// Demo 4 — the bug that immutability prevents.
// Run: node 04-mutation-bug.ts
//
// Ask first: "after showTopThree runs, what order is `scores` in?"

interface Score { name: string; points: number; }

const scores: Score[] = [
    { name: "Ana", points: 72 },
    { name: "Boris", points: 95 },
    { name: "Vesna", points: 88 },
    { name: "Marko", points: 64 },
];

// Looks harmless: it only *reads* the scores... doesn't it?
function topThree(list: Score[]): Score[] {
    return list.sort((a, b) => b.points - a.points).slice(0, 3);
}

console.log("before:", scores.map((s) => s.name).join(", "));
console.log("top 3: ", topThree(scores).map((s) => s.name).join(", "));
console.log("after: ", scores.map((s) => s.name).join(", "), "  ← sort changed the caller's array!");

// And objects are shared by reference: "fixing" one score in the result changes the original.
const best = topThree(scores)[0]!;
best.points += 5;
console.log("Boris in the original list now has", scores.find((s) => s.name === "Boris")!.points, "points");

// ---- The pure version: new arrays and new objects, the input untouched ----
const original: readonly Readonly<Score>[] = [
    { name: "Ana", points: 72 },
    { name: "Boris", points: 95 },
    { name: "Vesna", points: 88 },
    { name: "Marko", points: 64 },
];

function topThreePure(list: readonly Score[]): Score[] {
    return list.toSorted((a, b) => b.points - a.points).slice(0, 3);    // or [...list].sort(...)
}

function addBonus(list: readonly Score[], name: string, bonus: number): Score[] {
    return list.map((s) => (s.name === name ? { ...s, points: s.points + bonus } : s));
}

console.log("\npure top 3:", topThreePure(original).map((s) => s.name).join(", "));
console.log("original:  ", original.map((s) => s.name).join(", "), "  ← untouched");
const updated = addBonus(original, "Boris", 5);
console.log("Boris:", original[1]!.points, "→", updated[1]!.points, "  updated !== original:", updated !== original);
console.log("unchanged entries are shared:", updated[0] === original[0]);

// `readonly` made TypeScript reject list.sort() and list.push() inside the pure version —
// the compiler checks the promise "this function does not change its input".
// In Angular, `updated !== original` is how signals and change detection notice a change.
