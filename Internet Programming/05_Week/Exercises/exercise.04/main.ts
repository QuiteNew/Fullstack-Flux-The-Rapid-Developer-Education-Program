// Exercise 4 — the page: wires jokes.ts to the HTML.
// Build with `npx tsc` (or `npx tsc --watch`), then `npm run serve` and open
// http://localhost:8080/exercise.04/

import { ApiError, getCategories, getCleanJoke, searchJokes, type Joke } from "./jokes.ts";

// getElementById returns HTMLElement | null. This helper checks both the null and the
// element type once, so the rest of the code can use the elements without `!`.
function byId<T extends HTMLElement>(id: string, type: new () => T): T {
    const element = document.getElementById(id);
    if (!(element instanceof type)) {
        throw new Error(`#${id} is missing or is not a ${type.name}`);
    }
    return element;
}

const jokeText = byId("joke", HTMLParagraphElement);
const jokeCategory = byId("joke-category", HTMLParagraphElement);
const categorySelect = byId("category", HTMLSelectElement);
const anotherButton = byId("another", HTMLButtonElement);
const searchForm = byId("search-form", HTMLFormElement);
const searchInput = byId("search-input", HTMLInputElement);
const searchButton = byId("search-button", HTMLButtonElement);
const searchStatus = byId("search-status", HTMLParagraphElement);
const results = byId("results", HTMLUListElement);
const errorBox = byId("error", HTMLDivElement);

const MAX_RESULTS = 20;

function describeError(error: unknown): string {
    if (error instanceof ApiError) {
        return error.status === 0 ? error.message : `Something went wrong: ${error.message}`;
    }
    return "Something unexpected went wrong.";
}

function showError(error: unknown): void {
    errorBox.textContent = describeError(error);
    errorBox.hidden = false;
    console.error(error);              // the details are for the developer, in the console
}

function clearError(): void {
    errorBox.hidden = true;
}

function showJoke(joke: Joke): void {
    jokeText.textContent = joke.value;   // textContent, never innerHTML, for text from an API
    jokeCategory.textContent = joke.categories.length > 0 ? `Category: ${joke.categories.join(", ")}` : "";
}

// ---- 4.1 — A random joke, with a loading state ----
// If the button is clicked again before the first answer arrives, the answers can
// come back in either order. Only the newest request is allowed to update the page.
let latestJokeRequest = 0;

async function loadJoke(): Promise<void> {
    const requestNumber = ++latestJokeRequest;
    anotherButton.disabled = true;
    jokeText.textContent = "Loading…";
    jokeText.classList.add("status");
    clearError();
    try {
        const joke = await getCleanJoke(categorySelect.value || undefined);
        if (requestNumber === latestJokeRequest) {
            showJoke(joke);
        }
    } catch (error) {
        if (requestNumber === latestJokeRequest) {
            jokeText.textContent = "No joke this time.";
            showError(error);
        }
    } finally {
        if (requestNumber === latestJokeRequest) {
            anotherButton.disabled = false;
            jokeText.classList.remove("status");
        }
    }
}

// ---- 4.2 — Categories ----
async function loadCategories(): Promise<void> {
    try {
        const categories = await getCategories();
        for (const category of categories) {
            categorySelect.append(new Option(category, category));
        }
    } catch (error) {
        // Not fatal: the page still works with "any category".
        console.warn("Could not load categories", error);
    }
}

// ---- 4.3 — Search ----
async function search(event: SubmitEvent): Promise<void> {
    event.preventDefault();                // a form submit would reload the page
    searchButton.disabled = true;
    searchStatus.textContent = "Searching…";
    results.replaceChildren();
    clearError();
    try {
        const found = await searchJokes(searchInput.value);
        if (found.total === 0) {
            searchStatus.textContent = `No jokes about "${searchInput.value.trim()}".`;
            return;
        }
        searchStatus.textContent = found.total > MAX_RESULTS
            ? `Showing ${MAX_RESULTS} of ${found.total} jokes.`
            : `Found ${found.total} joke${found.total === 1 ? "" : "s"}.`;
        for (const joke of found.result.slice(0, MAX_RESULTS)) {
            const item = document.createElement("li");
            item.textContent = joke.value;
            results.append(item);
        }
    } catch (error) {
        searchStatus.textContent = "";
        showError(error);
    } finally {
        searchButton.disabled = false;
    }
}

anotherButton.addEventListener("click", () => void loadJoke());
categorySelect.addEventListener("change", () => void loadJoke());
searchForm.addEventListener("submit", event => void search(event));

// Start both requests at once — neither needs the other.
void loadCategories();
void loadJoke();
