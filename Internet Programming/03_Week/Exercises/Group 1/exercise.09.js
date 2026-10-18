// Exercise 9 — Pig Latin
// Run with: node exercise.09.js   (or open runner.html?ex=09 in a browser)

// ---- tiny test helper (each exercise file is self-contained) ----
function check(label, actual, expected) {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

const VOWELS = "aeiou";

// Rules 2–5: where does the leading consonant cluster end?
// Returns the index of the first letter that counts as a vowel,
// or the word's length if there is none.
function clusterEnd(word) {
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (letter === "u" && i > 0 && word[i - 1] === "q") {
            continue;                          // rule 3: the u in "qu" is a consonant
        }
        if (letter === "y" && i > 0) {
            return i;                          // rule 4: y is a vowel except at the start
        }
        if (VOWELS.includes(letter)) {
            return i;
        }
    }
    return word.length;                        // rule 5: no vowels at all
}

function pigWord(word) {
    // Rule 7: set trailing punctuation aside, and put it back at the end
    const punctuation = word.match(/[.,!?]*$/)[0];
    let core = word.slice(0, word.length - punctuation.length);

    // Rule 6: remember the capital before lowercasing
    const capitalised = core[0] !== core[0].toLowerCase();
    core = core.toLowerCase();

    let result;
    const end = clusterEnd(core);
    if (end === 0) {
        result = core + "way";                         // rule 1: starts with a vowel
    } else if (end === core.length) {
        result = core + "ay";                          // rule 5: no vowels
    } else {
        result = core.slice(end) + core.slice(0, end) + "ay";   // rules 2–4
    }

    if (capitalised) {
        result = result[0].toUpperCase() + result.slice(1);
    }
    return result + punctuation;
}

function toPigLatin(sentence) {
    return sentence
        .split(" ")
        .map(pigWord)
        .join(" ");
}

// ---- Stretch — converting back ----
// Rather than reversing the rules by hand, generate every possible original
// word and keep the ones that pigWord turns back into the input. That makes
// the answer correct by construction — and shows when it is ambiguous.
function fromPigLatinCandidates(pig) {
    const word = pig.toLowerCase();
    const candidates = new Set();

    if (word.endsWith("way")) {
        candidates.add(word.slice(0, -3));             // could be rule 1: "appleway" → "apple"
    }
    if (word.endsWith("ay")) {
        const base = word.slice(0, -2);                // rules 2–5: some ending of base was moved
        for (let i = 0; i <= base.length; i++) {
            candidates.add(base.slice(i) + base.slice(0, i));
        }
    }
    return [...candidates].filter((candidate) => candidate && pigWord(candidate) === word);
}

// ======================================================================

console.log("=== The test table ===");
const table = [
    ["apple", "appleway"],
    ["eat", "eatway"],
    ["pig", "igpay"],
    ["string", "ingstray"],
    ["quiet", "ietquay"],
    ["squeal", "ealsquay"],
    ["yellow", "ellowyay"],
    ["rhythm", "ythmrhay"],
    ["hmm", "hmmay"],
    ["Hello", "Ellohay"],
    ["Hello, world!", "Ellohay, orldway!"],
    ["The quick brown fox.", "Ethay ickquay ownbray oxfay."],
];
for (const [input, expected] of table) {
    check(`toPigLatin(${JSON.stringify(input)})`, toPigLatin(input), expected);
}

console.log("\n=== Stretch — back again ===");
console.log("  Every letter sequence below follows the rules to the given Pig Latin word:");
for (const pig of ["igpay", "ingstray", "itchway", "eatway"]) {
    console.log(`  ${pig.padEnd(10)} ← ${fromPigLatinCandidates(pig).join(", ")}`);
}
check("itch and witch both become itchway", [pigWord("itch"), pigWord("witch")], ["itchway", "itchway"]);
// Answer: rule 1 adds "way" to vowel words, and rule 2 can move a single "w"
// to the end before "ay". Both produce "...way", so "itchway" could be either
// "itch" or "witch" — two real English words. The conversion loses
// information, so it cannot be undone reliably.
//
// It is worse than that: the rules cannot tell where the moved cluster
// began, so even "igpay" could come from "gpi" as well as "pig". Choosing
// between the candidates needs knowledge the rules do not have — a
// dictionary of real words.
