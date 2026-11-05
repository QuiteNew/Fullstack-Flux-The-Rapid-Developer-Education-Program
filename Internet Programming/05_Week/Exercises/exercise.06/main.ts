// Exercise 6 — the weather page.
// Build with `npx tsc`, then `npm run serve` and open http://localhost:8080/exercise.06/

import { describeWeather, getWeather, weatherForCity, type Place, type Weather } from "./weather.ts";

function byId<T extends HTMLElement>(id: string, type: new () => T): T {
    const element = document.getElementById(id);
    if (!(element instanceof type)) {
        throw new Error(`#${id} is missing or is not a ${type.name}`);
    }
    return element;
}

const form = byId("search-form", HTMLFormElement);
const cityInput = byId("city", HTMLInputElement);
const status = byId("status", HTMLParagraphElement);
const errorBox = byId("error", HTMLDivElement);
const card = byId("weather", HTMLElement);
const placeHeading = byId("place", HTMLHeadingElement);
const temperature = byId("temperature", HTMLParagraphElement);
const summary = byId("summary", HTMLParagraphElement);
const details = byId("details", HTMLParagraphElement);
const forecast = byId("forecast", HTMLUListElement);
const others = byId("others", HTMLParagraphElement);

const LAST_CITY_KEY = "exercise06.lastCity";
const round = (n: number) => Math.round(n);

function placeLabel(place: Place): string {
    return [place.name, place.region !== place.name ? place.region : "", place.country].filter(Boolean).join(", ");
}

// `matches` are all the places the search found; the others are offered as buttons.
function showWeather(place: Place, weather: Weather, matches: Place[]): void {
    const now = describeWeather(weather.current.code, weather.current.isDay);
    placeHeading.textContent = placeLabel(place);
    temperature.textContent = `${now.icon} ${round(weather.current.temperature)} °C`;
    summary.textContent = `${now.text}, feels like ${round(weather.current.feelsLike)} °C`;
    details.textContent = `Humidity ${weather.current.humidity}% · wind ${round(weather.current.windSpeed)} km/h · `
        + `local time ${weather.current.time.slice(11)}`;

    // ---- 6.6 — The next days ----
    const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "UTC" });
    forecast.replaceChildren(...weather.days.slice(1).map(day => {
        const item = document.createElement("li");
        const { text, icon } = describeWeather(day.code);
        // "2026-10-26" is read as midnight UTC, so format it in UTC too — otherwise
        // a browser west of Greenwich would show the day before.
        item.textContent = `${weekday.format(new Date(day.date))}: ${icon} ${text}, ${round(day.min)}–${round(day.max)} °C`;
        return item;
    }));

    // Other places with the same name: offer them as buttons.
    const alternatives = matches.filter(match => match !== place);
    others.replaceChildren();
    if (alternatives.length > 0) {
        others.append("Not this one? ");
        for (const alternative of alternatives) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "secondary";
            button.textContent = placeLabel(alternative);
            button.addEventListener("click", () => void show(alternative, matches));
            others.append(button, " ");
        }
    }
    card.hidden = false;
}

// ---- 6.7 — Only the latest search counts ----
// Typing "Skopje", then quickly "Bitola", starts two searches. If Skopje answers last,
// the page would show the wrong city. So each new search cancels the one before.
let controller: AbortController | undefined;

function newRequest(): AbortSignal {
    controller?.abort();
    controller = new AbortController();
    return controller.signal;
}

async function show(place: Place, matches: Place[]): Promise<void> {
    const signal = newRequest();
    status.textContent = `Loading weather for ${place.name}…`;
    errorBox.hidden = true;
    try {
        const weather = await getWeather(place, signal);
        showWeather(place, weather, matches);
        status.textContent = "";
    } catch (error) {
        handleError(error);
    }
}

function handleError(error: unknown): void {
    if (error instanceof DOMException && error.name === "AbortError") {
        return;                                   // a newer search replaced this one — not an error
    }
    status.textContent = "";
    card.hidden = true;                           // don't leave the previous city's weather next to the error
    errorBox.textContent = error instanceof Error ? error.message : "Something went wrong.";
    errorBox.hidden = false;
    console.error(error);
}

async function search(city: string): Promise<void> {
    const signal = newRequest();
    status.textContent = `Looking for ${city.trim()}…`;
    errorBox.hidden = true;
    try {
        const { place, others: alternatives, weather } = await weatherForCity(city, signal);
        showWeather(place, weather, [place, ...alternatives]);
        status.textContent = "";
        try {
            localStorage.setItem(LAST_CITY_KEY, city.trim());
        } catch {
            // private mode or storage disabled — remembering the city is only a nicety
        }
    } catch (error) {
        handleError(error);
    }
}

form.addEventListener("submit", event => {
    event.preventDefault();
    void search(cityInput.value);
});

let lastCity = "Skopje";
try {
    lastCity = localStorage.getItem(LAST_CITY_KEY) ?? lastCity;
} catch {
    // ignore — see above
}
cityInput.value = lastCity;
void search(lastCity);
