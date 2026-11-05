// Exercise 6 — weather from Open-Meteo (https://open-meteo.com). Free, no API key.
//
// Two APIs, one after the other:
//   1. geocoding: city name  → latitude and longitude
//   2. forecast:  coordinates → current weather and the next days
//
// Like exercises 4 and 5, this module never touches the page.

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const TIMEOUT_MS = 8000;

export interface Place {
    name: string;
    country: string;
    region: string;         // "admin1" in the API: the state, province or region
    latitude: number;
    longitude: number;
}

export interface CurrentWeather {
    time: string;           // local time at the place, e.g. "2026-10-25T19:15"
    temperature: number;    // °C
    feelsLike: number;      // °C
    humidity: number;       // %
    windSpeed: number;      // km/h
    isDay: boolean;
    code: number;           // WMO weather code — see describeWeather
}

export interface DayForecast {
    date: string;           // "2026-10-26"
    code: number;
    min: number;
    max: number;
}

export interface Weather {
    current: CurrentWeather;
    days: DayForecast[];
}

export class WeatherError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "WeatherError";
    }
}

// ---- 6.1 — Fetching, with a timeout and cancellation ----
// `signal` lets the caller cancel (a newer search replaces an older one).
// AbortSignal.timeout gives up on a request that hangs. AbortSignal.any combines both.
async function getJson(url: URL, signal?: AbortSignal): Promise<Record<string, unknown>> {
    const timeout = AbortSignal.timeout(TIMEOUT_MS);
    let response: Response;
    try {
        response = await fetch(url, { signal: signal ? AbortSignal.any([signal, timeout]) : timeout });
    } catch (error) {
        if (signal?.aborted) {
            throw error;                         // cancelled on purpose — let the caller ignore it
        }
        if (timeout.aborted) {
            throw new WeatherError(`The weather service did not answer within ${TIMEOUT_MS / 1000} seconds`);
        }
        throw new WeatherError("Cannot reach the weather service. Are you online?");
    }

    // A proxy or an overloaded server may answer with an HTML error page, so the
    // body might not be JSON at all. Treat that as "no data" instead of crashing.
    const data: unknown = await response.json().catch(() => null);
    const body = typeof data === "object" && data !== null ? data as Record<string, unknown> : undefined;
    if (!response.ok) {
        // Open-Meteo explains its errors: { "error": true, "reason": "..." }
        throw new WeatherError(typeof body?.reason === "string" ? body.reason : `Weather service error ${response.status}`);
    }
    if (body === undefined) {
        throw new WeatherError("The weather service sent no data");
    }
    return body;
}

function isNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

// ---- 6.2 — City name → places ----
// No match is not an error: the API leaves out "results", and we return [].
export async function findPlaces(name: string, signal?: AbortSignal): Promise<Place[]> {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
        return [];                               // the API needs at least 2 characters
    }
    const url = new URL(GEOCODING_URL);
    url.searchParams.set("name", trimmed);
    url.searchParams.set("count", "5");
    url.searchParams.set("language", "en");

    const body = await getJson(url, signal);
    if (body.results === undefined) {
        return [];
    }
    if (!Array.isArray(body.results)) {
        throw new WeatherError("Unexpected answer from the geocoding service");
    }
    const places: Place[] = [];
    for (const item of body.results as Record<string, unknown>[]) {
        if (typeof item.name === "string" && isNumber(item.latitude) && isNumber(item.longitude)) {
            places.push({
                name: item.name,
                country: typeof item.country === "string" ? item.country : "",
                region: typeof item.admin1 === "string" ? item.admin1 : "",
                latitude: item.latitude,
                longitude: item.longitude,
            });
        }
    }
    return places;
}

// ---- 6.3 — Coordinates → weather ----
export async function getWeather(place: Place, signal?: AbortSignal): Promise<Weather> {
    const url = new URL(FORECAST_URL);
    url.searchParams.set("latitude", String(place.latitude));
    url.searchParams.set("longitude", String(place.longitude));
    url.searchParams.set("current",
        "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,is_day,weather_code");
    url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min");
    url.searchParams.set("forecast_days", "4");
    url.searchParams.set("timezone", "auto");    // times in the place's own time zone

    const body = await getJson(url, signal);
    const current = body.current as Record<string, unknown> | undefined;
    const daily = body.daily as Record<string, unknown> | undefined;
    if (current === undefined || daily === undefined
        || typeof current.time !== "string"
        || !isNumber(current.temperature_2m) || !isNumber(current.apparent_temperature)
        || !isNumber(current.relative_humidity_2m) || !isNumber(current.wind_speed_10m)
        || !isNumber(current.weather_code) || !isNumber(current.is_day)
        || !Array.isArray(daily.time)) {
        throw new WeatherError("Unexpected answer from the forecast service");
    }

    // The daily data comes as parallel arrays: time[i], weather_code[i], ... belong together.
    const dates = daily.time as unknown[];
    const codes = daily.weather_code as unknown[];
    const maxima = daily.temperature_2m_max as unknown[];
    const minima = daily.temperature_2m_min as unknown[];
    const days: DayForecast[] = [];
    dates.forEach((date, i) => {
        const code = codes[i], max = maxima[i], min = minima[i];
        if (typeof date === "string" && isNumber(code) && isNumber(max) && isNumber(min)) {
            days.push({ date, code, max, min });
        }
    });

    return {
        current: {
            time: current.time,
            temperature: current.temperature_2m,
            feelsLike: current.apparent_temperature,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            isDay: current.is_day === 1,
            code: current.weather_code,
        },
        days,
    };
}

// ---- 6.4 — WMO weather codes → words ----
// The API sends numbers (https://open-meteo.com/en/docs, "WMO Weather interpretation codes").
const CODES: Record<number, [text: string, icon: string]> = {
    0: ["Clear sky", "☀️"],
    1: ["Mainly clear", "🌤️"], 2: ["Partly cloudy", "⛅"], 3: ["Overcast", "☁️"],
    45: ["Fog", "🌫️"], 48: ["Freezing fog", "🌫️"],
    51: ["Light drizzle", "🌦️"], 53: ["Drizzle", "🌦️"], 55: ["Heavy drizzle", "🌧️"],
    56: ["Freezing drizzle", "🌧️"], 57: ["Heavy freezing drizzle", "🌧️"],
    61: ["Light rain", "🌦️"], 63: ["Rain", "🌧️"], 65: ["Heavy rain", "🌧️"],
    66: ["Freezing rain", "🌧️"], 67: ["Heavy freezing rain", "🌧️"],
    71: ["Light snow", "🌨️"], 73: ["Snow", "🌨️"], 75: ["Heavy snow", "❄️"], 77: ["Snow grains", "🌨️"],
    80: ["Light showers", "🌦️"], 81: ["Showers", "🌧️"], 82: ["Violent showers", "⛈️"],
    85: ["Snow showers", "🌨️"], 86: ["Heavy snow showers", "❄️"],
    95: ["Thunderstorm", "⛈️"], 96: ["Thunderstorm with hail", "⛈️"], 99: ["Thunderstorm with heavy hail", "⛈️"],
};

export function describeWeather(code: number, isDay = true): { text: string; icon: string } {
    const entry = CODES[code];
    if (entry === undefined) {
        return { text: `Unknown (code ${code})`, icon: "❔" };
    }
    const [text, icon] = entry;
    // At night, a clear sky shows the moon instead of the sun.
    return { text, icon: !isDay && code <= 1 ? "🌙" : icon };
}

// ---- 6.5 — Both steps together ----
export async function weatherForCity(name: string, signal?: AbortSignal): Promise<{ place: Place; others: Place[]; weather: Weather }> {
    const [place, ...others] = await findPlaces(name, signal);
    if (place === undefined) {
        throw new WeatherError(`No place called "${name.trim()}" found`);
    }
    const weather = await getWeather(place, signal);    // needs the coordinates, so it has to wait
    return { place, others, weather };
}
