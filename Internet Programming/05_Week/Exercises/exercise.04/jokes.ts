// Exercise 4 — the API layer: everything that talks to https://api.chucknorris.io
//
// This module never touches the page. That keeps it testable: check.ts runs it in
// Node with a fake fetch, and main.ts uses it in the browser.

const BASE_URL = "https://api.chucknorris.io/jokes";

export interface Joke {
    id: string;
    value: string;          // the joke itself
    categories: string[];   // usually empty, sometimes one category
    url: string;
    icon_url: string;
    created_at: string;
    updated_at: string;
}

export interface SearchResult {
    total: number;
    result: Joke[];
}

// An error that remembers the HTTP status, so the page can say something useful.
export class ApiError extends Error {
    readonly status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

// ---- 4.4 — Never trust the response ----
// TypeScript types are erased: `as Joke` would check nothing at runtime.
// A type guard checks the fields we actually use.
export function isJoke(data: unknown): data is Joke {
    if (typeof data !== "object" || data === null) return false;
    const candidate = data as Record<string, unknown>;
    return typeof candidate.id === "string"
        && typeof candidate.value === "string"
        && Array.isArray(candidate.categories);
}

function isStringArray(data: unknown): data is string[] {
    return Array.isArray(data) && data.every(item => typeof item === "string");
}

function isSearchResult(data: unknown): data is SearchResult {
    if (typeof data !== "object" || data === null) return false;
    const candidate = data as Record<string, unknown>;
    return typeof candidate.total === "number"
        && Array.isArray(candidate.result)
        && candidate.result.every(isJoke);
}

// ---- 4.1 — One function that does the fetching properly ----
// fetch() only rejects when the network fails. A 404 or a 500 still *resolves*,
// so the status has to be checked by hand.
async function getJson(url: string | URL): Promise<unknown> {
    let response: Response;
    try {
        response = await fetch(url, { headers: { Accept: "application/json" } });
    } catch {
        throw new ApiError(0, "Cannot reach the joke server. Are you online?");
    }
    if (!response.ok) {
        throw new ApiError(response.status, `The joke server answered ${response.status} ${response.statusText}`.trim());
    }
    return response.json();
}

// ---- 4.1 — A random joke, optionally from one category ----
export async function getRandomJoke(category?: string): Promise<Joke> {
    const url = new URL(`${BASE_URL}/random`);
    if (category) {
        url.searchParams.set("category", category);   // encodes the value for us
    }
    const data = await getJson(url);
    if (!isJoke(data)) {
        throw new ApiError(200, "The joke server sent something that is not a joke");
    }
    return data;
}

// ---- 4.2 — The list of categories ----
// The API has an "explicit" category, and it is exactly what it says. We leave it out.
export const HIDDEN_CATEGORIES: readonly string[] = ["explicit"];

export function isClean(joke: Joke): boolean {
    return !joke.categories.some(category => HIDDEN_CATEGORIES.includes(category));
}

export async function getCategories(): Promise<string[]> {
    const data = await getJson(`${BASE_URL}/categories`);
    if (!isStringArray(data)) {
        throw new ApiError(200, "Unexpected category list");
    }
    return data.filter(category => !HIDDEN_CATEGORIES.includes(category));
}

// ---- 4.5 — Keep it clean ----
// A random joke with no category can still come from "explicit". There is no API
// option to exclude it, so ask again — but only a few times, never forever.
export async function getCleanJoke(category?: string, maxTries = 5): Promise<Joke> {
    for (let attempt = 1; attempt <= maxTries; attempt++) {
        const joke = await getRandomJoke(category);
        if (isClean(joke)) {
            return joke;
        }
    }
    throw new ApiError(200, `No clean joke in ${maxTries} tries — try again`);
}

// ---- 4.3 — Search ----
// The API wants a query of 3 to 120 characters, and answers 400 otherwise.
// Checking first saves a pointless request.
export async function searchJokes(query: string): Promise<SearchResult> {
    const trimmed = query.trim();
    if (trimmed.length < 3 || trimmed.length > 120) {
        throw new ApiError(400, "Search for 3 to 120 characters");
    }
    const url = new URL(`${BASE_URL}/search`);
    url.searchParams.set("query", trimmed);
    const data = await getJson(url);
    if (!isSearchResult(data)) {
        throw new ApiError(200, "Unexpected search result");
    }
    const clean = data.result.filter(isClean);
    return { total: clean.length, result: clean };
}
