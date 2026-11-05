// Exercise 5 (homework) — the currency converter page.
// Build with `npx tsc`, then `npm run serve` and open http://localhost:8080/exercise.05/

import { convert, currencyName, formatMoney, getRates, type RateTable } from "./rates.ts";

function byId<T extends HTMLElement>(id: string, type: new () => T): T {
    const element = document.getElementById(id);
    if (!(element instanceof type)) {
        throw new Error(`#${id} is missing or is not a ${type.name}`);
    }
    return element;
}

const form = byId("converter", HTMLFormElement);
const amountInput = byId("amount", HTMLInputElement);
const fromSelect = byId("from", HTMLSelectElement);
const toSelect = byId("to", HTMLSelectElement);
const swapButton = byId("swap", HTMLButtonElement);
const result = byId("result", HTMLParagraphElement);
const rateLine = byId("rate", HTMLParagraphElement);
const updatedLine = byId("updated", HTMLParagraphElement);
const errorBox = byId("error", HTMLDivElement);
const errorText = byId("error-text", HTMLSpanElement);
const retryButton = byId("retry", HTMLButtonElement);

// Currencies most people here will want first; the rest follow alphabetically.
const FAVOURITES = ["MKD", "EUR", "USD", "GBP", "CHF"];

let table: RateTable | undefined;

function fillSelects(codes: string[]): void {
    const sorted = [...FAVOURITES.filter(code => codes.includes(code)),
                    ...codes.filter(code => !FAVOURITES.includes(code)).sort()];
    for (const select of [fromSelect, toSelect]) {
        select.replaceChildren(...sorted.map(code => new Option(`${code} — ${currencyName(code)}`, code)));
    }
    fromSelect.value = "EUR";
    toSelect.value = "MKD";
}

// Runs on every keystroke — and costs nothing, because no request is involved.
function update(): void {
    if (table === undefined) return;
    const amount = amountInput.valueAsNumber;
    const from = fromSelect.value;
    const to = toSelect.value;
    if (!Number.isFinite(amount) || amount < 0) {
        result.textContent = "Enter an amount";
        rateLine.textContent = "";
        return;
    }
    result.textContent = formatMoney(convert(amount, from, to, table), to);
    rateLine.textContent = `${formatMoney(amount, from)} at 1 ${from} = ${convert(1, from, to, table).toFixed(4)} ${to}`;
}

async function start(): Promise<void> {
    errorBox.hidden = true;
    result.textContent = "Loading rates…";
    result.classList.add("status");
    form.inert = true;                       // nothing to convert until the rates arrive
    try {
        table = await getRates("EUR");
        fillSelects(Object.keys(table.rates));
        updatedLine.textContent = `Rates from ${table.updated.toLocaleString()}; next update ${table.nextUpdate.toLocaleString()}.`;
        form.inert = false;
        result.classList.remove("status");
        update();
    } catch (error) {
        result.textContent = "";
        errorText.textContent = error instanceof Error ? error.message : "Something went wrong.";
        errorBox.hidden = false;
        console.error(error);
    }
}

amountInput.addEventListener("input", update);
fromSelect.addEventListener("change", update);
toSelect.addEventListener("change", update);
swapButton.addEventListener("click", () => {
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    update();
});
form.addEventListener("submit", event => event.preventDefault());
retryButton.addEventListener("click", () => void start());

void start();
