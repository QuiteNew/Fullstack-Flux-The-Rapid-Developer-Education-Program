// Exercise 5 — Basic Calculator (no eval, no new Function)

const display = document.getElementById("display");
const expression = document.getElementById("expression");
const keypad = document.getElementById("keypad");
const historyList = document.getElementById("history");

const SYMBOLS = { "+": "+", "-": "−", "*": "×", "/": "÷" };

// 5.3 — All of the calculator's state lives here
const state = {
    current: "0",      // what is being typed — a STRING
    previous: null,    // the stored left operand — a NUMBER
    operator: null,    // "+", "-", "*", "/" or null
    overwrite: false,  // true when the next digit should start a new number
    error: null,       // a message, or null
    history: [],       // completed calculations, newest first
};

function format(number) {
    return String(parseFloat(number.toPrecision(12)));
}

// Returns the result, or null after setting an error
function compute(a, operator, b) {
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/":
            if (b === 0) {
                state.error = "Cannot divide by zero";
                return null;
            }
            return a / b;
    }
}

function inputDigit(digit) {
    if (state.overwrite) {
        state.current = digit;
        state.overwrite = false;
    } else if (state.current === "0") {
        state.current = digit;
    } else if (state.current === "-0") {
        state.current = `-${digit}`;
    } else {
        state.current += digit;
    }
}

function inputDecimal() {
    if (state.overwrite) {
        state.current = "0.";
        state.overwrite = false;
    } else if (!state.current.includes(".")) {
        state.current += ".";
    }
}

function chooseOperator(operator) {
    // No digit typed since the last operator: just replace it
    if (state.operator !== null && state.overwrite) {
        state.operator = operator;
        return;
    }
    if (state.operator !== null) {
        const result = compute(state.previous, state.operator, Number(state.current));
        if (result === null) {
            return;
        }
        state.current = format(result);
    }
    state.previous = Number(state.current);
    state.operator = operator;
    state.overwrite = true;
}

function equals() {
    if (state.operator === null) {
        return;
    }
    const right = Number(state.current);
    const result = compute(state.previous, state.operator, right);
    if (result === null) {
        return;
    }
    const formatted = format(result);
    state.history.unshift({
        text: `${format(state.previous)} ${SYMBOLS[state.operator]} ${format(right)} = ${formatted}`,
        result: formatted,
    });
    state.current = formatted;
    state.previous = null;
    state.operator = null;
    state.overwrite = true;
}

function backspace() {
    if (state.overwrite) {
        return;
    }
    state.current = state.current.slice(0, -1);
    if (state.current === "" || state.current === "-") {
        state.current = "0";
    }
}

function negate() {
    if (state.overwrite && state.operator !== null) {
        // Start the right operand as a negative number
        state.current = "-0";
        state.overwrite = false;
    } else if (state.current.startsWith("-")) {
        state.current = state.current.slice(1);
    } else if (state.current !== "0") {
        state.current = `-${state.current}`;
    }
}

function clear() {
    state.current = "0";
    state.previous = null;
    state.operator = null;
    state.overwrite = false;
    state.error = null;
}

// 5.2 — Every key, from the keypad or the keyboard, goes through here
function press(key) {
    if (state.error && key !== "clear") {
        return;
    }

    if (/^\d$/.test(key)) {
        inputDigit(key);
    } else if (key === ".") {
        inputDecimal();
    } else if (key in SYMBOLS) {
        chooseOperator(key);
    } else if (key === "=") {
        equals();
    } else if (key === "backspace") {
        backspace();
    } else if (key === "negate") {
        negate();
    } else if (key === "clear") {
        clear();
    }

    render();
}

// The only place that writes to the page
function render() {
    display.textContent = state.error ?? state.current;
    expression.textContent = state.operator === null || state.error
        ? ""
        : `${format(state.previous)} ${SYMBOLS[state.operator]}`;

    historyList.replaceChildren(...state.history.map((entry, i) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = entry.text;
        button.dataset.historyIndex = i;
        li.appendChild(button);
        return li;
    }));
}

const ACTION_KEYS = {
    clear: "clear",
    backspace: "backspace",
    negate: "negate",
    decimal: ".",
    equals: "=",
};

keypad.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }
    const { digit, op, action } = button.dataset;
    const key = digit ?? op ?? ACTION_KEYS[action];
    if (key !== undefined) {
        press(key);
    }
});

// 5.6 — Keyboard
const KEYBOARD = {
    "+": "+", "-": "-", "*": "*", "/": "/",
    ".": ".", ",": ".",
    "Enter": "=", "=": "=",
    "Backspace": "backspace",
    "Escape": "clear",
};

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
    }
    const key = /^\d$/.test(event.key) ? event.key : KEYBOARD[event.key];
    if (key === undefined) {
        return;
    }
    // Stops Firefox's quick find on "/" and a focused button also clicking on Enter
    event.preventDefault();
    press(key);
});

// Stretch — clicking a history entry reuses its result
historyList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || state.error) {
        return;
    }
    // Behaves like having just pressed "=" with that result
    state.current = state.history[button.dataset.historyIndex].result;
    state.previous = null;
    state.operator = null;
    state.overwrite = true;
    render();
});

render();
