// Quiz data — questions about this course so far.
//
// The format, for anyone adding a quiz:
//   id                 short name used in the address: exercise.10.html?quiz=course
//   title              shown on the menu and as the page heading
//   description        optional — shown on the menu
//   questionsPerRound  optional — ask only this many, picked at random each round
//   questions          the questions; for each one:
//     question         the text
//     options          the possible answers, at least two
//     answer           the index of the correct option, counting from 0
//     comment          optional — shown after the question is answered

registerQuiz({
    id: "course",
    title: "Internet Programming so far",
    description: "HTTP, JavaScript, the DOM and data structures.",
    questions: [
        {
            question: "What does typeof null return?",
            options: ['"null"', '"object"', '"undefined"', '"boolean"'],
            answer: 1,
            comment: "A bug from 1995, kept forever so old pages keep working.",
        },
        {
            question: "Which of these values is truthy?",
            options: ["0", '""', '"0"', "NaN"],
            answer: 2,
            comment: "Any non-empty string is truthy — even one that says zero.",
        },
        {
            question: "What does [10, 9, 1, 100].sort() return?",
            options: ["[1, 9, 10, 100]", "[1, 10, 100, 9]", "[100, 10, 9, 1]", "[10, 9, 1, 100]"],
            answer: 1,
            comment: "Without a comparison function, sort compares the numbers as strings.",
        },
        {
            question: 'What does parseInt("0.9") return?',
            options: ["0.9", "1", "0", "NaN"],
            answer: 2,
            comment: "parseInt stops reading at the first character that is not a digit.",
        },
        {
            question: 'Which HTTP status code means "Not Found"?',
            options: ["200", "301", "404", "500"],
            answer: 2,
        },
        {
            question: "When does a script with the defer attribute run?",
            options: [
                "As soon as it has downloaded",
                "After the HTML is parsed, before DOMContentLoaded",
                "After every image has loaded",
                "Before the HTML is parsed",
            ],
            answer: 1,
            comment: "This very quiz relies on it: its data files are deferred scripts.",
        },
        {
            question: "Which array method does NOT change the original array?",
            options: ["splice", "sort", "slice", "push"],
            answer: 2,
        },
        {
            question: 'What does JSON.stringify(new Map([["a", 1]])) return?',
            options: ['\'{"a":1}\'', "'[[\"a\",1]]'", "'{}'", "It throws an error"],
            answer: 2,
            comment: "No error, no warning — the data simply disappears.",
        },
        {
            question: "What does -3 % 2 evaluate to?",
            options: ["1", "-1", "0", "1.5"],
            answer: 1,
            comment: "The remainder takes the sign of the number being divided.",
        },
        {
            question: "Where is a let variable declared inside an if block visible?",
            options: [
                "In the whole function",
                "Only inside that block",
                "Everywhere — it is global",
                "In the whole file",
            ],
            answer: 1,
        },
    ],
});
