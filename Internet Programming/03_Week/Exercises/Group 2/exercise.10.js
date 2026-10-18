// Exercise 10 — Quiz Time! (configurable version)
//
// The quizzes live in separate data files in the quizzes/ folder. Each one
// calls registerQuiz({...}). To add a quiz: copy one of those files, change
// the data, and add a matching <script ... defer> line to exercise.10.html.
//
// Why .js data files rather than .json? Loading a JSON file needs fetch(),
// which we have not covered yet — and browsers refuse to fetch local files
// from a page opened straight from disk (file://). A <script> tag works
// everywhere.
//
// Load order matters. This file is listed first in exercise.10.html, so
// registerQuiz exists before the data files run. All the scripts are
// `defer`, so they run in the order listed, and all of them finish before
// DOMContentLoaded — which is when the quiz starts (Class 03, section 4).
//
// Includes the keyboard stretch goal (1–4 to answer, Enter to continue).
// The countdown-timer stretch goal is left as an extension.

// ---- Registering quizzes ----

const quizzes = [];
const quizProblems = [];       // quizzes rejected because their data is broken

// Checks a quiz's data and returns a list of problems — empty if it is fine.
function findProblems(quiz) {
    const problems = [];
    if (typeof quiz.id !== "string" || quiz.id === "") {
        problems.push("it needs an id");
    } else if (quizzes.some((existing) => existing.id === quiz.id)) {
        problems.push(`the id "${quiz.id}" is already used`);
    }
    if (typeof quiz.title !== "string" || quiz.title === "") {
        problems.push("it needs a title");
    }
    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        problems.push("it needs at least one question");
        return problems;
    }
    quiz.questions.forEach((q, i) => {
        const where = `question ${i + 1}`;
        if (typeof q.question !== "string" || q.question === "") {
            problems.push(`${where} has no question text`);
        }
        if (!Array.isArray(q.options) || q.options.length < 2) {
            problems.push(`${where} needs at least two options`);
        } else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
            problems.push(`${where} has answer ${q.answer}, but its options are numbered 0 to ${q.options.length - 1}`);
        }
        if (q.comment !== undefined && typeof q.comment !== "string") {
            problems.push(`${where} has a comment that is not text`);
        }
    });
    const perRound = quiz.questionsPerRound;
    if (perRound !== undefined && (!Number.isInteger(perRound) || perRound < 1 || perRound > quiz.questions.length)) {
        problems.push(`questionsPerRound must be between 1 and ${quiz.questions.length}`);
    }
    return problems;
}

// Called by every file in quizzes/. A quiz with broken data is not added —
// instead its problems are listed on the menu, where whoever wrote the file
// will see them. (This is a case where catching a problem is useful: we can
// tell the author exactly what is wrong, and the other quizzes still work.)
function registerQuiz(quiz) {
    const problems = findProblems(quiz);
    if (problems.length > 0) {
        const name = quiz.title || quiz.id || "A quiz";
        quizProblems.push(`${name} was not loaded: ${problems.join("; ")}.`);
        return;
    }
    quizzes.push(quiz);
}

// ---- Page elements ----
// Declared out here, so every function below can use them — but not looked
// up yet. findElements() fills them in once the page is ready (see "Start"
// at the bottom). They are `let`, not `const`, because they get their value
// later. A function reads a variable when it is *called*, not when it is
// defined, so by the time render() runs they hold the elements.
let titleText;
let menuSection;
let quizList;
let problemList;
let quizSection;
let progress;
let questionText;
let optionsBox;
let feedback;
let commentText;
let nextButton;
let resultSection;
let scoreText;
let wrongList;
let restartButton;

// All of the quiz's state lives here. Every action changes the state and
// then calls render() — nothing else writes to the page.
let state = { screen: "menu" };

// ---- 10.5 — Shuffling ----

// Fisher–Yates: a fair shuffle. Returns a new array, so the input is untouched.
// (array.sort(() => Math.random() - 0.5) is NOT fair — some orders come up
// far more often than others.)
function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Turn bare option strings into { text, correct } objects before shuffling,
// so the shuffle can never lose track of which option is right.
function prepare({ question, options, answer, comment }) {
    const tagged = options.map((text, i) => ({ text, correct: i === answer }));
    return { question, comment, options: shuffle(tagged) };
}

// ---- Actions ----

function startQuiz(quiz) {
    const count = quiz.questionsPerRound ?? quiz.questions.length;
    state = {
        screen: "question",
        quiz,
        round: shuffle(quiz.questions).slice(0, count).map(prepare),   // the data itself never changes
        current: 0,
        selected: null,       // index of the chosen option, or null if not answered yet
        score: 0,
        wrong: [],            // { question, correctAnswer }
    };
    render();
}

function choose(index) {
    if (state.screen !== "question" || state.selected !== null) {
        return;                                   // 10.3 — already answered
    }
    const { question, options } = state.round[state.current];
    state.selected = index;
    if (options[index].correct) {
        state.score++;
    } else {
        const correctAnswer = options.find((option) => option.correct).text;
        state.wrong.push({ question, correctAnswer });
    }
    render();
}

function next() {
    if (state.screen !== "question" || state.selected === null) {
        return;
    }
    state.current++;
    state.selected = null;
    if (state.current >= state.round.length) {
        state.screen = "result";
    }
    render();
}

// ---- Drawing ----

function render() {
    menuSection.classList.toggle("hidden", state.screen !== "menu");
    quizSection.classList.toggle("hidden", state.screen !== "question");
    resultSection.classList.toggle("hidden", state.screen !== "result");
    titleText.textContent = state.quiz ? state.quiz.title : "Quiz Time!";

    if (state.screen === "menu") {
        renderMenu();
    } else if (state.screen === "question") {
        renderQuestion();
    } else {
        renderResult();
    }
}

// Each quiz is a link to this same page with ?quiz=its-id, so every quiz
// also has its own address that can be bookmarked or shared.
function renderMenu() {
    quizList.replaceChildren();
    for (const quiz of quizzes) {
        const link = document.createElement("a");
        link.href = `?quiz=${encodeURIComponent(quiz.id)}`;

        const title = document.createElement("strong");
        title.textContent = quiz.title;
        const total = quiz.questions.length;
        const perRound = quiz.questionsPerRound ?? total;
        const count = perRound < total
            ? `${perRound} of ${total} questions, picked at random`
            : `${total} questions`;
        const details = document.createElement("span");
        details.textContent = `${quiz.description ?? ""} (${count})`.trim();

        link.append(title, details);
        const item = document.createElement("li");
        item.append(link);
        quizList.append(item);
    }

    problemList.replaceChildren();
    for (const problem of quizProblems) {
        const item = document.createElement("li");
        item.textContent = problem;
        problemList.append(item);
    }
}

function renderQuestion() {
    const { question, options, comment } = state.round[state.current];
    const answered = state.selected !== null;

    progress.textContent = `Question ${state.current + 1} of ${state.round.length}`;
    questionText.textContent = question;

    optionsBox.replaceChildren();
    options.forEach((option, i) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "option";
        button.dataset.index = i;
        button.textContent = `${i + 1}. ${option.text}`;
        if (answered) {
            button.disabled = true;
            if (option.correct) {
                button.classList.add("correct");      // always reveal the right answer
            } else if (i === state.selected) {
                button.classList.add("wrong");        // and mark a wrong choice
            }
        }
        optionsBox.append(button);
    });

    if (answered) {
        feedback.textContent = options[state.selected].correct ? "Correct!" : "Not quite.";
        commentText.textContent = comment ?? "";      // the optional quip, once answered
        const isLast = state.current === state.round.length - 1;
        nextButton.textContent = isLast ? "See results" : "Next";
    } else {
        feedback.textContent = "";
        commentText.textContent = "";
    }
    nextButton.classList.toggle("hidden", !answered);
}

function renderResult() {
    scoreText.textContent = `${state.score} / ${state.round.length}`;
    wrongList.replaceChildren();
    if (state.wrong.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No mistakes — perfect score!";
        wrongList.append(item);
    }
    for (const { question, correctAnswer } of state.wrong) {
        const item = document.createElement("li");
        const strong = document.createElement("strong");
        strong.textContent = correctAnswer;
        item.append(`${question} — correct answer: `, strong);
        wrongList.append(item);
    }
}

// ---- Finding elements and wiring up events ----

function findElements() {
    titleText = document.getElementById("title");
    menuSection = document.getElementById("menu");
    quizList = document.getElementById("quiz-list");
    problemList = document.getElementById("quiz-problems");
    quizSection = document.getElementById("quiz");
    progress = document.getElementById("progress");
    questionText = document.getElementById("question");
    optionsBox = document.getElementById("options");
    feedback = document.getElementById("feedback");
    commentText = document.getElementById("comment");
    nextButton = document.getElementById("next-button");
    resultSection = document.getElementById("result");
    scoreText = document.getElementById("score");
    wrongList = document.getElementById("wrong-list");
    restartButton = document.getElementById("restart-button");
}

function attachListeners() {
    // 10.2 — One listener for all the options
    optionsBox.addEventListener("click", (event) => {
        const button = event.target.closest("button.option");
        if (button) {
            choose(Number(button.dataset.index));
        }
    });

    nextButton.addEventListener("click", next);
    restartButton.addEventListener("click", () => startQuiz(state.quiz));

    // Stretch — keyboard support
    document.addEventListener("keydown", handleKey);
}

function handleKey(event) {
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;                                   // leave browser shortcuts alone
    }
    // A focused button or link already handles Enter itself; acting here as
    // well would skip a question.
    if (event.key === "Enter" && event.target.closest("button, a")) {
        return;
    }
    if (state.screen === "question") {
        const number = Number(event.key);
        const optionCount = state.round[state.current].options.length;
        if (Number.isInteger(number) && number >= 1 && number <= optionCount) {
            choose(number - 1);
        } else if (event.key === "Enter") {
            next();
        }
    } else if (state.screen === "result" && event.key === "Enter") {
        startQuiz(state.quiz);
    }
}

// ---- Start ----
// Nothing touches the page until DOMContentLoaded. Two reasons to wait:
//
// 1. The elements. Because this script is `defer`, the HTML has already
//    been parsed when it runs, so looking elements up at the top of the file
//    would happen to work. But it would depend on that one attribute: take
//    `defer` away and this script runs as soon as the parser reaches it in
//    <head>, before the <body> exists. Every getElementById would return null,
//    and the first addEventListener would fail with "Cannot read properties
//    of null". Waiting for DOMContentLoaded works however the script is
//    included.
//
// 2. The quiz data. The files in quizzes/ run *after* this one, and all of
//    them have run by the time DOMContentLoaded fires.
document.addEventListener("DOMContentLoaded", () => {
    findElements();
    attachListeners();

    const requested = new URLSearchParams(location.search).get("quiz");
    const quiz = quizzes.find((q) => q.id === requested);
    if (quiz) {
        startQuiz(quiz);
        return;
    }
    if (requested !== null) {
        quizProblems.unshift(`There is no quiz called "${requested}".`);
    }
    render();
});
