// Exercise 6 — checks for weather.ts, run in Node (no browser needed).
// Run with: npx tsx exercise.06/check.ts   (or: npx tsc && node dist/exercise.06/check.js)

import { describeWeather, findPlaces, getWeather, weatherForCity, type Place } from "./weather.ts";

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

async function errorOf(action: () => Promise<unknown>): Promise<string> {
    try {
        await action();
        return "no error";
    } catch (error) {
        return error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    }
}

// ---- a fake fetch that answers by URL, and respects AbortSignal like the real one ----
type Handler = (url: URL) => Response | "hang";
const realFetch = globalThis.fetch;
let requested: URL[] = [];

function fakeFetch(handler: Handler): void {
    requested = [];
    globalThis.fetch = (input: string | URL | Request, init?: RequestInit) => {
        const url = new URL(input instanceof Request ? input.url : String(input));
        requested.push(url);
        const signal = init?.signal;
        return new Promise<Response>((resolve, reject) => {
            const abort = () => reject(signal?.reason ?? new DOMException("Aborted", "AbortError"));
            if (signal?.aborted) return abort();
            signal?.addEventListener("abort", abort);
            const answer = handler(url);
            if (answer !== "hang") resolve(answer);       // "hang": never answer, wait for an abort
        });
    };
}

const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

const OHRID = { name: "Ohrid", latitude: 41.11701, longitude: 20.80175, country: "North Macedonia", admin1: "Ohrid" };
const OHRID_BG = { name: "Ohrid", latitude: 43.45417, longitude: 23.38167, country: "Bulgaria", admin1: "Montana" };
const FORECAST = {
    current: { time: "2026-10-25T19:15", temperature_2m: 13.6, apparent_temperature: 13.9,
               relative_humidity_2m: 88, wind_speed_10m: 1.8, is_day: 0, weather_code: 2 },
    daily: { time: ["2026-10-25", "2026-10-26"], weather_code: [45, 3],
             temperature_2m_max: [17.6, 16.1], temperature_2m_min: [8.8, 6.7] },
};
const place = (p: typeof OHRID): Place =>
    ({ name: p.name, country: p.country, region: p.admin1, latitude: p.latitude, longitude: p.longitude });

try {
    // 6.2 — geocoding
    fakeFetch(() => json({ results: [OHRID, OHRID_BG, { name: "broken" }] }));
    const places = await findPlaces("  Ohrid ");
    check("6.2 two valid places, the broken one skipped", places.map(p => p.country), ["North Macedonia", "Bulgaria"]);
    check("6.2 region comes from admin1", places[0]?.region, "Ohrid");
    const query = requested[0]?.searchParams;
    check("6.2 query string", [query?.get("name"), query?.get("count"), query?.get("language")], ["Ohrid", "5", "en"]);

    fakeFetch(() => json({ generationtime_ms: 0.05 }));
    check("6.2 no match: an empty list, not an error", await findPlaces("Xyzzyqq"), []);

    fakeFetch(() => json({}));
    check("6.2 one letter: no request at all", [await findPlaces("O"), requested.length], [[], 0]);

    // 6.3 — forecast
    fakeFetch(() => json(FORECAST));
    const weather = await getWeather(place(OHRID));
    check("6.3 current", weather.current,
        { time: "2026-10-25T19:15", temperature: 13.6, feelsLike: 13.9, humidity: 88, windSpeed: 1.8, isDay: false, code: 2 });
    check("6.3 parallel arrays become one object per day", weather.days,
        [{ date: "2026-10-25", code: 45, max: 17.6, min: 8.8 }, { date: "2026-10-26", code: 3, max: 16.1, min: 6.7 }]);
    const params = requested[0]?.searchParams;
    check("6.3 coordinates and time zone sent", [params?.get("latitude"), params?.get("longitude"), params?.get("timezone")],
        ["41.11701", "20.80175", "auto"]);

    fakeFetch(() => json({ error: true, reason: "Latitude must be in range of -90 to 90°. Given: 200.0." }, 400));
    check("6.3 the API's own reason is shown",
        await errorOf(() => getWeather({ ...place(OHRID), latitude: 200 })),
        "WeatherError: Latitude must be in range of -90 to 90°. Given: 200.0.");

    fakeFetch(() => new Response("<html>Bad Gateway</html>", { status: 502 }));
    check("6.3 an HTML error page does not crash the parser", await errorOf(() => getWeather(place(OHRID))),
        "WeatherError: Weather service error 502");

    fakeFetch(() => json({ current: { time: "now" } }));
    check("6.3 wrong shape", await errorOf(() => getWeather(place(OHRID))),
        "WeatherError: Unexpected answer from the forecast service");

    // 6.4 — codes
    check("6.4 code 2", describeWeather(2), { text: "Partly cloudy", icon: "⛅" });
    check("6.4 clear at night shows the moon", describeWeather(0, false).icon, "🌙");
    check("6.4 an unknown code does not crash", describeWeather(42).text, "Unknown (code 42)");

    // 6.5 — both steps
    fakeFetch(url => url.hostname.startsWith("geocoding") ? json({ results: [OHRID, OHRID_BG] }) : json(FORECAST));
    const both = await weatherForCity("Ohrid");
    check("6.5 first match is used, the rest are offered", [both.place.country, both.others.map(p => p.country)],
        ["North Macedonia", ["Bulgaria"]]);
    check("6.5 the second request waited for the first", requested.map(u => u.hostname),
        ["geocoding-api.open-meteo.com", "api.open-meteo.com"]);

    fakeFetch(() => json({ generationtime_ms: 0.05 }));
    check("6.5 unknown city", await errorOf(() => weatherForCity("Xyzzyqq")), 'WeatherError: No place called "Xyzzyqq" found');

    // 6.1 / 6.7 — offline, and cancelling
    globalThis.fetch = async () => { throw new TypeError("fetch failed"); };
    check("6.1 offline", await errorOf(() => findPlaces("Ohrid")), "WeatherError: Cannot reach the weather service. Are you online?");

    fakeFetch(() => "hang");
    const controller = new AbortController();
    const pending = errorOf(() => findPlaces("Ohrid", controller.signal));
    controller.abort();
    check("6.7 a cancelled request rejects with AbortError, not a WeatherError", await pending,
        "AbortError: This operation was aborted");
} finally {
    globalThis.fetch = realFetch;
}

// ---- live: the real service ----
try {
    const live = await weatherForCity("Skopje");
    check("live: Skopje is in North Macedonia", live.place.country, "North Macedonia");
    check("live: a believable temperature", live.weather.current.temperature > -40 && live.weather.current.temperature < 50, true);
} catch (error) {
    console.log(`SKIP  live check — ${String(error)}`);
}

console.log(`\n${passed} passed, ${failed} failed`);
