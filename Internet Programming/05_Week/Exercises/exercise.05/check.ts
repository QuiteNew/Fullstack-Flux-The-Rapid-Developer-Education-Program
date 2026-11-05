// Exercise 5 — checks for rates.ts, run in Node (no browser needed).
// Run with: npx tsx exercise.05/check.ts   (or: npx tsc && node dist/exercise.05/check.js)

import { clearCache, convert, currencyName, formatMoney, getRates, parseRates, type RateTable } from "./rates.ts";

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

function errorOf(action: () => unknown): Promise<string> {
    return Promise.resolve()
        .then(action)
        .then(() => "no error", (error: unknown) => error instanceof Error ? error.message : String(error));
}

// A response body in the shape open.er-api.com sends (shortened).
const NOW = Date.UTC(2026, 9, 25, 12, 0, 0);
function body(base: string, rates: Record<string, number>): unknown {
    return {
        result: "success",
        base_code: base,
        time_last_update_unix: Date.UTC(2026, 9, 25, 0, 0, 0) / 1000,
        time_next_update_unix: Date.UTC(2026, 9, 26, 0, 0, 0) / 1000,
        rates,
    };
}
const EUR_RATES = { EUR: 1, MKD: 61.5, USD: 1.12, GBP: 0.84 };

// ---- a fake fetch that counts its calls ----
const realFetch = globalThis.fetch;
let calls = 0;
function fakeFetch(answer: () => Response | Promise<Response>): void {
    calls = 0;
    globalThis.fetch = async () => {
        calls++;
        return answer();
    };
}
const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

try {
    // 5.2 — parsing
    const table = parseRates(body("EUR", EUR_RATES));
    check("5.2 base", table.base, "EUR");
    check("5.2 Unix seconds become a Date", table.updated.toISOString(), "2026-10-25T00:00:00.000Z");
    check("5.2 an error in a 200 response is still an error",
        await errorOf(() => parseRates({ result: "error", "error-type": "unsupported-code" })),
        "The rate server refused: unsupported-code");
    check("5.2 wrong shape",
        await errorOf(() => parseRates({ result: "success", base_code: "EUR", rates: { MKD: "61.5" } })),
        "The rate server sent data in an unexpected shape");
    check("5.2 not even an object", await errorOf(() => parseRates("hello")), "The rate server sent no data");

    // 5.3 — converting
    const round = (n: number) => Math.round(n * 100) / 100;
    check("5.3 EUR → MKD", round(convert(100, "EUR", "MKD", table)), 6150);
    check("5.3 MKD → EUR", round(convert(6150, "MKD", "EUR", table)), 100);
    check("5.3 USD → GBP, through the base", round(convert(112, "USD", "GBP", table)), 84);
    check("5.3 same currency", convert(42, "USD", "USD", table), 42);
    check("5.3 unknown currency", await errorOf(() => convert(1, "EUR", "XYZ", table)), "Unknown currency: XYZ");

    // 5.4 — caching
    clearCache();
    fakeFetch(() => json(body("EUR", EUR_RATES)));
    await getRates("EUR", NOW);
    await getRates("EUR", NOW + 60 * 60 * 1000);
    check("5.4 second call within the day uses the cache", calls, 1);
    await getRates("EUR", Date.UTC(2026, 9, 26, 0, 0, 1));
    check("5.4 after nextUpdate it fetches again", calls, 2);

    clearCache();
    fakeFetch(() => json(body("EUR", EUR_RATES)));
    const [a, b] = await Promise.all([getRates("EUR", NOW), getRates("EUR", NOW)]);
    check("5.4 two calls at the same moment share one request", [calls, a === b], [1, true]);

    clearCache();
    fakeFetch(() => json({}, 500));
    check("5.4 a failure is reported", await errorOf(() => getRates("EUR", NOW)), "The rate server answered 500");
    fakeFetch(() => json(body("EUR", EUR_RATES)));
    await getRates("EUR", NOW);
    check("5.4 ... and not cached: the next call tries again", calls, 1);

    clearCache();
    fakeFetch(() => { throw new TypeError("fetch failed"); });
    check("5.1 offline", await errorOf(() => getRates("EUR", NOW)), "Cannot reach the rate server. Are you online?");

    // 5.5 — display
    check("5.5 formatMoney EUR", formatMoney(1234.5, "EUR"), "€1,234.50");
    // Intl puts a non-breaking space ( ) after the code, so "MKD" and the number
    // never end up on different lines. A normal space in the expected text would fail.
    check("5.5 formatMoney MKD", formatMoney(61.5, "MKD"), "MKD 61.50");
    check("5.5 currencyName", currencyName("MKD"), "Macedonian Denar");
} finally {
    globalThis.fetch = realFetch;
}

// ---- live: one real request ----
try {
    clearCache();
    const live: RateTable = await getRates("EUR");
    const mkd = live.rates.MKD ?? 0;
    check("live: EUR → MKD is somewhere near 61.5", mkd > 55 && mkd < 70, true);
} catch (error) {
    console.log(`SKIP  live check — ${String(error)}`);
}

console.log(`\n${passed} passed, ${failed} failed`);
