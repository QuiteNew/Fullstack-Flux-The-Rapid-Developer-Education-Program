// Exercise 4 — checks for jokes.ts, run in Node (no browser needed).
// Run with: npx tsx exercise.04/check.ts   (or: npx tsc && node dist/exercise.04/check.js)
//
// jokes.ts calls the global fetch(). Here we swap it for a fake that returns
// prepared answers, so the checks are fast, repeatable and work offline.
// At the end, one live request checks that the real API still looks the same.

import { ApiError, getCategories, getCleanJoke, getRandomJoke, isJoke, searchJokes, type Joke } from "./jokes.ts";

// ---- tiny test helper ----
let passed = 0;
let failed = 0;
function check(label: string, actual: unknown, expected: unknown): void {
    const ok = Object.is(actual, expected) || JSON.stringify(actual) === JSON.stringify(expected);
    if (ok) passed++; else failed++;
    console.log(ok
        ? `PASS  ${label}`
        : `FAIL  ${label} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

// Runs `action` and returns the error it throws (or "no error").
async function errorOf(action: () => Promise<unknown>): Promise<string> {
    try {
        await action();
        return "no error";
    } catch (error) {
        return error instanceof ApiError ? `${error.status}: ${error.message}` : String(error);
    }
}

// ---- a fake fetch ----
// Each call takes the next prepared answer: a body with a status, or "offline".
type FakeAnswer = { status: number; body: unknown } | "offline";
const realFetch = globalThis.fetch;
let requested: string[] = [];

function fakeFetch(...answers: FakeAnswer[]): void {
    requested = [];
    globalThis.fetch = async (input: string | URL | Request) => {
        requested.push(input instanceof Request ? input.url : String(input));
        const answer = answers.shift();
        if (answer === undefined) throw new Error("The fake fetch ran out of answers");
        if (answer === "offline") throw new TypeError("fetch failed");   // what Node's fetch throws
        return new Response(JSON.stringify(answer.body), {
            status: answer.status,
            headers: { "Content-Type": "application/json" },
        });
    };
}

function joke(value: string, categories: string[] = []): Joke {
    return { id: value, value, categories, url: "", icon_url: "", created_at: "", updated_at: "" };
}

try {
    // 4.1 — a random joke
    fakeFetch({ status: 200, body: joke("Chuck Norris counted to infinity. Twice.") });
    check("4.1 random joke", (await getRandomJoke()).value, "Chuck Norris counted to infinity. Twice.");
    check("4.1 URL", requested, ["https://api.chucknorris.io/jokes/random"]);

    fakeFetch({ status: 200, body: joke("dev joke", ["dev"]) });
    await getRandomJoke("dev");
    check("4.1 the category goes in the query string", requested, ["https://api.chucknorris.io/jokes/random?category=dev"]);

    fakeFetch({ status: 404, body: { error: "Not Found" } });
    check("4.1 a 404 becomes an error, not a joke", await errorOf(() => getRandomJoke("nonsense")),
        "404: The joke server answered 404");

    fakeFetch("offline");
    check("4.1 no network gives a friendly error", await errorOf(() => getRandomJoke()),
        "0: Cannot reach the joke server. Are you online?");

    // 4.2 — categories, without "explicit"
    fakeFetch({ status: 200, body: ["animal", "dev", "explicit", "food"] });
    check("4.2 categories, explicit removed", await getCategories(), ["animal", "dev", "food"]);

    // 4.3 — search
    fakeFetch({ status: 200, body: { total: 2, result: [joke("one"), joke("two", ["explicit"])] } });
    const found = await searchJokes("  computer  ");
    check("4.3 the query is trimmed and encoded", requested, ["https://api.chucknorris.io/jokes/search?query=computer"]);
    check("4.3 explicit jokes are filtered out, and the total follows", [found.total, found.result.map(j => j.value)], [1, ["one"]]);

    fakeFetch({ status: 200, body: { total: 0, result: [] } });
    await searchJokes("fish & chips");
    check("4.3 special characters are encoded", requested, ["https://api.chucknorris.io/jokes/search?query=fish+%26+chips"]);

    fakeFetch();
    check("4.3 too short — no request at all", await errorOf(() => searchJokes("ab")), "400: Search for 3 to 120 characters");
    check("4.3 ... nothing was requested", requested, []);

    // 4.4 — the response is checked, not trusted
    check("4.4 a real joke passes", isJoke(joke("ok")), true);
    check("4.4 a string does not", isJoke("joke"), false);
    check("4.4 missing value does not", isJoke({ id: "x", categories: [] }), false);
    check("4.4 null does not", isJoke(null), false);

    fakeFetch({ status: 200, body: { message: "Service moved" } });
    check("4.4 the wrong shape is an error", await errorOf(() => getRandomJoke()),
        "200: The joke server sent something that is not a joke");

    // 4.5 — keep it clean
    fakeFetch({ status: 200, body: joke("rude", ["explicit"]) }, { status: 200, body: joke("polite") });
    check("4.5 an explicit joke is skipped", (await getCleanJoke()).value, "polite");
    check("4.5 ... after asking twice", requested.length, 2);

    fakeFetch(...Array.from({ length: 3 }, () => ({ status: 200, body: joke("rude", ["explicit"]) })));
    check("4.5 gives up after maxTries", await errorOf(() => getCleanJoke(undefined, 3)),
        "200: No clean joke in 3 tries — try again");
} finally {
    globalThis.fetch = realFetch;
}

// ---- live: one real request ----
try {
    const live = await getRandomJoke("dev");
    check("live: the real API returns a joke in the dev category", live.categories, ["dev"]);
} catch (error) {
    console.log(`SKIP  live check — ${String(error)}`);
}

console.log(`\n${passed} passed, ${failed} failed`);
