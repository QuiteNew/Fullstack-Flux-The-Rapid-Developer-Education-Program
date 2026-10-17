// Exercise 4 — To Do List

const STORAGE_KEY = "lecture02-todos";

const addForm = document.getElementById("add-form");
const newTaskInput = document.getElementById("new-task");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");
const clearCompletedButton = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filters button");

// "all", "active" or "done"
let currentFilter = "all";

// 4.2 — Building an item
function createItem(text, done = false) {
    const li = document.createElement("li");
    li.classList.toggle("done", done);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = done;

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "Delete task");

    li.append(checkbox, span, deleteButton);
    return li;
}

// 4.1 — Adding items
addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = newTaskInput.value.trim();
    if (text === "") {
        return;
    }
    list.appendChild(createItem(text));
    newTaskInput.value = "";
    newTaskInput.focus();
    updateUI();
});

// 4.3 — One listener for the checkbox and delete button of every item
list.addEventListener("change", (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
        event.target.closest("li").classList.toggle("done", event.target.checked);
        updateUI();
    }
});

list.addEventListener("click", (event) => {
    if (event.target.matches(".delete")) {
        event.target.closest("li").remove();
        updateUI();
    }
});

// 4.4, 4.5 and 4.6 — Everything that depends on the list is refreshed from the DOM
function updateCounter() {
    const total = list.querySelectorAll("li").length;
    const done = list.querySelectorAll("li.done").length;
    counter.textContent = `${done} of ${total} done`;
    clearCompletedButton.disabled = done === 0;
}

// Items that no longer match the filter are hidden immediately, including right after ticking
function applyFilter() {
    for (const li of list.children) {
        const isDone = li.classList.contains("done");
        const visible = currentFilter === "all"
            || (currentFilter === "active" && !isDone)
            || (currentFilter === "done" && isDone);
        li.classList.toggle("hidden", !visible);
    }
    for (const button of filterButtons) {
        button.classList.toggle("active", button.dataset.filter === currentFilter);
    }
}

function updateUI() {
    updateCounter();
    applyFilter();
    save();
}

// 4.5 — Filters
for (const button of filterButtons) {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        updateUI();
    });
}

// 4.6 — Clear completed
clearCompletedButton.addEventListener("click", () => {
    for (const li of list.querySelectorAll("li.done")) {
        li.remove();
    }
    updateUI();
});

// 4.7 — Editing
list.addEventListener("dblclick", (event) => {
    const span = event.target.closest(".text");
    if (!span) {
        return;
    }

    const original = span.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit";
    input.value = original;
    span.replaceWith(input);
    input.focus();
    input.select();

    // Enter and blur can both try to finish the same edit, so only the first call counts
    let finished = false;
    function finish(save) {
        if (finished || !input.isConnected) {
            return;
        }
        finished = true;

        const text = input.value.trim();
        if (save && text === "") {
            input.closest("li").remove();
        } else {
            span.textContent = save ? text : original;
            input.replaceWith(span);
        }
        updateUI();
    }

    input.addEventListener("keydown", (keyEvent) => {
        if (keyEvent.key === "Enter") {
            finish(true);
        } else if (keyEvent.key === "Escape") {
            finish(false);
        }
    });
    input.addEventListener("blur", () => finish(true));
});

// Stretch — persist the list across reloads
function save() {
    const items = [...list.children].map((li) => ({
        text: li.querySelector(".text")?.textContent ?? li.querySelector(".edit").value,
        done: li.classList.contains("done"),
    }));
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.warn("Could not save the list:", error);
    }
}

function load() {
    try {
        const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
        for (const item of items) {
            list.appendChild(createItem(item.text, item.done));
        }
    } catch (error) {
        console.warn("Could not load the list:", error);
    }
}

load();
updateUI();
