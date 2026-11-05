// Exercise 5 (homework) — exchange rates from https://open.er-api.com
// Free, no API key. Its terms ask for a visible link back, which the page shows.
//
// Like exercise 4, this module never touches the page, so check.ts can test it in Node.

const BASE_URL = "https://open.er-api.com/v6/latest";

export interface RateTable {
    base: string;                    // e.g. "EUR"
    rates: Record<string, number>;   // 1 base = rates[code] of that currency
    updated: Date;
    nextUpdate: Date;
}

export class RatesError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RatesError";
    }
}

// ---- 5.2 — Read the response carefully ----
// This API answers "200 OK" even when it fails, and reports the error in the body:
//   { "result": "error", "error-type": "unsupported-code" }
// So response.ok is not enough — the body has to be checked too.
export function parseRates(data: unknown): RateTable {
    if (typeof data !== "object" || data === null) {
        throw new RatesError("The rate server sent no data");
    }
    const body = data as Record<string, unknown>;
    if (body.result === "error") {
        throw new RatesError(`The rate server refused: ${String(body["error-type"] ?? "unknown error")}`);
    }
    const { base_code, rates, time_last_update_unix, time_next_update_unix } = body;
    if (body.result !== "success"
        || typeof base_code !== "string"
        || typeof time_last_update_unix !== "number"
        || typeof time_next_update_unix !== "number"
        || typeof rates !== "object" || rates === null
        || !Object.values(rates).every(rate => typeof rate === "number" && rate > 0)) {
        throw new RatesError("The rate server sent data in an unexpected shape");
    }
    return {
        base: base_code,
        rates: rates as Record<string, number>,
        updated: new Date(time_last_update_unix * 1000),       // Unix time is in seconds
        nextUpdate: new Date(time_next_update_unix * 1000),
    };
}

// ---- 5.1 — Fetch the table for one base currency ----
async function fetchRates(base: string): Promise<RateTable> {
    let response: Response;
    try {
        response = await fetch(`${BASE_URL}/${encodeURIComponent(base)}`);
    } catch {
        throw new RatesError("Cannot reach the rate server. Are you online?");
    }
    if (!response.ok) {
        throw new RatesError(`The rate server answered ${response.status}`);
    }
    return parseRates(await response.json());
}

// ---- 5.4 — Cache ----
// The rates change once a day, and the API says when the next update is due.
// Until then, the same table can be reused: no request, no waiting.
//
// We cache the *promise*, not the table. Two conversions that start at the same
// moment then share one request instead of sending two.
const cache = new Map<string, { table: Promise<RateTable>; expires: number }>();

export async function getRates(base = "EUR", now = Date.now()): Promise<RateTable> {
    const cached = cache.get(base);
    if (cached !== undefined && now < cached.expires) {
        return cached.table;
    }

    const table = fetchRates(base);
    // Until the answer arrives we do not know nextUpdate; keep it for a minute meanwhile.
    cache.set(base, { table, expires: now + 60_000 });
    try {
        const result = await table;
        cache.set(base, { table, expires: result.nextUpdate.getTime() });
        return result;
    } catch (error) {
        cache.delete(base);          // never cache a failure — the next call tries again
        throw error;
    }
}

export function clearCache(): void {
    cache.clear();
}

// ---- 5.3 — Convert ----
// One table is enough for any pair: every rate is relative to the same base, so
// amount / rates[from] gives the amount in the base currency, and * rates[to] converts on.
export function convert(amount: number, from: string, to: string, table: RateTable): number {
    const fromRate = table.rates[from];
    const toRate = table.rates[to];
    if (fromRate === undefined) throw new RangeError(`Unknown currency: ${from}`);
    if (toRate === undefined) throw new RangeError(`Unknown currency: ${to}`);
    if (from === to) {
        return amount;               // 42 / 1.12 * 1.12 is 41.99999999999999 — floating point
    }
    return amount / fromRate * toRate;
}

// ---- 5.5 — Display ----
// Intl does the hard parts: currency symbols, decimal places, thousands separators.
export function formatMoney(amount: number, currency: string, locale = "en-GB"): string {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

const names = new Intl.DisplayNames(["en"], { type: "currency" });

export function currencyName(code: string): string {
    return names.of(code) ?? code;
}
