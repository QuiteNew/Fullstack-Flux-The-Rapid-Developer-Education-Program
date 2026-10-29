// "In which order?" — a quiz engine for code questions.
//
// This is the quiz from Lecture 03, exercise 10, with three additions:
//   - a question can have `code`, shown as a code block above the options
//   - a quiz can be `ordered`, so its questions keep the order they are written in
//     (easy first) instead of being shuffled
//   - once a code question is answered, "Run it" runs the code right here in the
//     browser and shows what it really printed
//
// As in Lecture 03, the quizzes are .js files in quizzes/ that call registerQuiz({...}),
// and all scripts are classic `defer` scripts — so the page also works when it is
// opened straight from disk.

// ---- Registering quizzes ----

const quizzes = [];
const quizProblems = [];       // quizzes rejected because their data is broken

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
        if (q.code !== undefined && typeof q.code !== "string") {
            problems.push(`${where} has code that is not text`);
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

function registerQuiz(quiz) {
    const problems = findProblems(quiz);
    if (problems.length > 0) {
        const name = quiz.title || quiz.id || "A quiz";
        quizProblems.push(`${name} was not loaded: ${problems.join("; ")}.`);
        return;
    }
    quizzes.push(quiz);
}

// ---- Running a code question ----
// The code gets its own `console`, whose log() collects what is printed. Then we wait
// until the code's timers have had time to fire, and return everything it logged.
// The same function is used by verify.mjs, which checks every answer in Node.
function runSnippet(code, waitMs = 400) {
    const lines = [];
    const console = {
        log: (...values) => lines.push(values.map(String).join(" ")),
    };
    return new Promise((resolve) => {
        try {
            new Function("console", code)(console);
        } catch (error) {
            lines.push(`Error: ${error.message}`);
        }
        setTimeout(() => resolve(lines), waitMs);
    });
}

// ---- Page elements ----
let titleText;
let menuSection;
let quizList;
let problemList;
let quizSection;
let progress;
let questionText;
let codeBlock;
let optionsBox;
let feedback;
let commentText;
let runButton;
let runOutput;
let nextButton;
let resultSection;
let scoreText;
let wrongList;
let restartButton;

let state = { screen: "menu" };

// Fisher–Yates: a fair shuffle. Returns a new array, so the input is untouched.
function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function prepare({ question, code, options, answer, comment }) {
    const tagged = options.map((text, i) => ({ text, correct: i === answer }));
    return { question, code, comment, options: shuffle(tagged) };
}

// ---- Actions ----

function startQuiz(quiz) {
    const count = quiz.questionsPerRound ?? quiz.questions.length;
    const questions = quiz.ordered ? quiz.questions : shuffle(quiz.questions);
    state = {
        screen: "question",
        quiz,
        round: questions.slice(0, count).map(prepare),
        current: 0,
        selected: null,
        output: null,         // what "Run it" printed for the current question
        score: 0,
        wrong: [],
    };
    render();
}

function choose(index) {
    if (state.screen !== "question" || state.selected !== null) {
        return;
    }
    const { question, options } = state.round[state.current];
    state.selected = index;
    if (options[index].correct) {
        state.score++;
    } else {
        const correctAnswer = options.find((option) => option.correct).text;
        state.wrong.push({ question: `Question ${state.current + 1}: ${question}`, correctAnswer });
    }
    render();
}

async function run() {
    const { code } = state.round[state.current];
    if (state.selected === null || code === undefined) {
        return;
    }
    const current = state.current;
    state.output = "Running…";
    render();
    const lines = await runSnippet(code);
    if (state.current === current) {          // still on the same question?
        state.output = lines.length > 0 ? lines.join("\n") : "(nothing was printed)";
        render();
    }
}

function next() {
    if (state.screen !== "question" || state.selected === null) {
        return;
    }
    state.current++;
    state.selected = null;
    state.output = null;
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
    const { question, code, options, comment } = state.round[state.current];
    const answered = state.selected !== null;

    progress.textContent = `Question ${state.current + 1} of ${state.round.length}`;
    questionText.textContent = question;
    codeBlock.textContent = code ?? "";
    codeBlock.classList.toggle("hidden", code === undefined);

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
                button.classList.add("correct");
            } else if (i === state.selected) {
                button.classList.add("wrong");
            }
        }
        optionsBox.append(button);
    });

    if (answered) {
        feedback.textContent = options[state.selected].correct ? "Correct!" : "Not quite.";
        commentText.textContent = comment ?? "";
        const isLast = state.current === state.round.length - 1;
        nextButton.textContent = isLast ? "See results" : "Next";
    } else {
        feedback.textContent = "";
        commentText.textContent = "";
    }
    nextButton.classList.toggle("hidden", !answered);
    // "Run it" only after answering — predicting first is the whole point.
    runButton.classList.toggle("hidden", !answered || code === undefined);
    runOutput.textContent = state.output ?? "";
    runOutput.classList.toggle("hidden", state.output === null);
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
    codeBlock = document.getElementById("code");
    optionsBox = document.getElementById("options");
    feedback = document.getElementById("feedback");
    commentText = document.getElementById("comment");
    runButton = document.getElementById("run-button");
    runOutput = document.getElementById("run-output");
    nextButton = document.getElementById("next-button");
    resultSection = document.getElementById("result");
    scoreText = document.getElementById("score");
    wrongList = document.getElementById("wrong-list");
    restartButton = document.getElementById("restart-button");
}

function attachListeners() {
    optionsBox.addEventListener("click", (event) => {
        const button = event.target.closest("button.option");
        if (button) {
            choose(Number(button.dataset.index));
        }
    });
    runButton.addEventListener("click", run);
    nextButton.addEventListener("click", next);
    restartButton.addEventListener("click", () => startQuiz(state.quiz));
    document.addEventListener("keydown", handleKey);
}

// Keyboard: 1–4 to answer, R to run the code, Enter to continue.
function handleKey(event) {
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }
    if (event.key === "Enter" && event.target.closest("button, a")) {
        return;
    }
    if (state.screen === "question") {
        const number = Number(event.key);
        const optionCount = state.round[state.current].options.length;
        if (Number.isInteger(number) && number >= 1 && number <= optionCount) {
            choose(number - 1);
        } else if (event.key === "r" || event.key === "R") {
            run();
        } else if (event.key === "Enter") {
            next();
        }
    } else if (state.screen === "result" && event.key === "Enter") {
        startQuiz(state.quiz);
    }
}

// ---- Start ----
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
