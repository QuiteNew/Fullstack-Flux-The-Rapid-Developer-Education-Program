// Exercise 2 — Interactive Forms

const form = document.getElementById("register-form");
const submitButton = document.getElementById("submit-button");
const success = document.getElementById("success");
const strength = document.getElementById("strength");

//const fullNameInput = document.getElementById("full-name");
const fullNameInput = form.elements.fullName;
const emailInput = form.elements.email;
const passwordInput = form.elements.password;
const confirmInput = form.elements.confirmPassword;
const ageInput = form.elements.age;
const termsInput = form.elements.terms;

// 2.3 — Each rule returns an error message, or "" when the field passes.
// Keys are the inputs' name attributes.
const rules = {
    fullName(input) {
        const name = input.value.trim();
        if (name === "") {
            return "Please enter your full name";
        }
        if (name.length < 2) {
            return "Name needs at least 2 characters";
        }
        return "";
    },
    email(input) {
        if (input.value.trim() === "") {
            return "Please enter your email address";
        }
        if (input.validity.typeMismatch) {
            return "That does not look like an email address";
        }
        return "";
    },
    password(input) {
        if (input.value.length < 8) {
            return "Password needs at least 8 characters";
        }
        if (!/\d/.test(input.value)) {
            return "Password needs at least one digit";
        }
        return "";
    },
    confirmPassword(input) {
        if (input.value === "") {
            return "Please confirm your password";
        }
        if (input.value !== passwordInput.value) {
            return "Passwords do not match";
        }
        return "";
    },
    age(input) {
        if (input.value === "") {
            return "Please enter your age";
        }
        const age = Number(input.value);
        if (Number.isNaN(age) || age < 16 || age > 120) {
            return "Age must be between 16 and 120";
        }
        return "";
    },
    terms(input) {
        if (!input.checked) {
            return "You must accept the terms to register";
        }
        return "";
    },
};

const inputs = [fullNameInput, emailInput, passwordInput, confirmInput, ageInput, termsInput];

// Validates one field, shows or clears its message, and returns true if it passed
function validateField(input) {
    const message = rules[input.name](input);
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    input.classList.toggle("invalid", message !== "");
    return message === "";
}

function validate() {
    const failing = inputs.filter((input) => !validateField(input));
    if (failing.length > 0) {
        failing[0].focus();
    }
    return failing.length === 0;
}

// 2.2 and 2.7 — Take over submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    console.log(data, `typeof data.age: ${typeof data.age}`);

    if (!validate()) {
        return;
    }

    form.classList.add("hidden");
    success.textContent = `Welcome, ${data.fullName.trim()}! A confirmation has been sent to ${data.email}.`;
    success.classList.remove("hidden");
});

// 2.4 — Live feedback
for (const input of inputs) {
    input.addEventListener("blur", () => {
        validateField(input);
    });

    input.addEventListener("input", () => {
        if (input.classList.contains("invalid")) {
            validateField(input);
        }
    });
}

passwordInput.addEventListener("input", () => {
    if (confirmInput.value !== "" || confirmInput.classList.contains("invalid")) {
        validateField(confirmInput);
    }
    updateStrength();
});

// 2.5 — The submit button stays disabled until the terms are accepted
function updateSubmitButton() {
    submitButton.disabled = !termsInput.checked;
}

termsInput.addEventListener("change", () => {
    updateSubmitButton();
    validateField(termsInput);
});

updateSubmitButton();

// Stretch — password strength meter
function updateStrength() {
    const password = passwordInput.value;
    strength.classList.remove("strength-weak", "strength-medium", "strength-strong");

    if (password === "") {
        strength.textContent = "";
        return;
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/\d/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let level = "weak";
    if (score >= 4) {
        level = "strong";
    } else if (score === 3) {
        level = "medium";
    }

    strength.textContent = `Strength: ${level}`;
    strength.classList.add(`strength-${level}`);
}
