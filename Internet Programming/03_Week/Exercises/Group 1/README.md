**The "Online" exercises are the same for both groups which is why they are only here**

# Internet Programming — Exercises #03

Detailed tasks for the ten exercises in `Exercises03.pptx`, in slide order.

These exercises practise Classes 05 and 06: control structures, error handling, functions,
recursion, closures, arrays, objects, `Map` and `Set`, destructuring and spread. Keep the
companion notes from `Lecture03/Materials` open — `Class05-FunctionsStructures.md` and
`Class06-DataStructures.md` explain everything used here.

**Ground rules**

- Exercises 1–9 are plain JavaScript — no web page needed. Write each one in its own file,
  `exercise.01.js` to `exercise.09.js`, and run it with `node exercise.01.js` or by loading
  it in a page and watching the console. No Node? Put `runner.html` and `runner.js` from
  this folder next to your files and open `runner.html?ex=01` — it loads the exercise and
  shows its console output on the page.
- Exercise 10 is a web page: `exercise.10.html` with `exercise.10.js` loaded with `defer`.
- **Write functions that return values.** Print with `console.log` *outside* the function,
  when you call it. A function that returns a value can be tested and reused; one that only
  prints cannot.
- Test your own code. Most exercises have a table of inputs and expected outputs — check
  every row.
- Stuck? Each exercise has hints and expected results at the end of this sheet.

---

## Exercise 1 — Factorial

**Practises:** loops, recursion, throwing errors, `BigInt`.

`n!` (n factorial) is the product of all whole numbers from 1 to n: `5! = 5 × 4 × 3 × 2 × 1
= 120`. By definition, `0! = 1`.

### 1.1 — With a loop

Write `factorialLoop(n)` using a `for` loop.

### 1.2 — With recursion

Write `factorialRecursive(n)` with no loop at all — it calls itself (Class 05, section 8).
Identify the **base case** and the **recursive case** in a comment.

| Call | Result |
|---|---|
| `factorial(0)` | `1` |
| `factorial(1)` | `1` |
| `factorial(5)` | `120` |
| `factorial(10)` | `3628800` |

### 1.3 — Reject bad input

Before adding validation, call your recursive version with `-1` and with `2.5`. Write down
what happens. Is a wrong answer better or worse than an error?

Now make both versions **throw** for bad input (Class 05, section 5):

- a `TypeError` if `n` is not a number
- a `RangeError` if `n` is negative or not a whole number

Then write the code that *calls* `factorial` with input that might be bad, and **catches**
the error, printing a friendly message instead of crashing. Only catch the error where you
can actually do something about it.

### 1.4 — How far can it go?

Print `factorial(n)` for `n` from 15 to 25, next to `Number.MAX_SAFE_INTEGER`. Then try 170
and 171. Then write `factorialBig(n)` using `BigInt` (Class 05, section 8) and compare its
output with the `Number` version for `n = 25`. At which `n` do the two versions first
disagree?

**Deliverable:** `exercise.01.js` with all three functions, and your written answers to 1.3
and 1.4.

---

## Exercise 2 — FizzBuzz

**Practises:** loops, conditions, the order of conditions.

### 2.1 — The classic

Print the numbers from 1 to 100, but print **`Fizz`** instead of multiples of 3,
**`Buzz`** instead of multiples of 5, and **`FizzBuzz`** instead of multiples of both.

### 2.2 — Make it testable

Write `fizzBuzz(n)` that **returns** the right string for one number — `"7"`, `"Fizz"`,
`"Buzz"` or `"FizzBuzz"`. Rewrite 2.1 as a loop that calls it.

| Call | Result |
|---|---|
| `fizzBuzz(1)` | `"1"` |
| `fizzBuzz(9)` | `"Fizz"` |
| `fizzBuzz(10)` | `"Buzz"` |
| `fizzBuzz(15)` | `"FizzBuzz"` |
| `fizzBuzz(98)` | `"98"` |

### 2.3 — Make it data-driven

Your boss now wants `"Bazz"` for multiples of 7 — and `105` (3 × 5 × 7) should print
`"FizzBuzzBazz"`. Next week there will be another rule.

Rewrite `fizzBuzz` so the rules are **data**, not `if` statements:

```js
const rules = [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Bazz" },
];
```

Adding a rule should mean adding one line to the array, and changing nothing else.

**Deliverable:** `exercise.02.js` with both versions of `fizzBuzz`.

---

## Exercise 3 — Check for a Prime Number

**Practises:** loops, `break` / early `return`, edge cases, performance.

A prime is a whole number greater than 1 whose only divisors are 1 and itself.

### 3.1 — The function

Write `isPrime(n)` that returns `true` or `false`. It must handle every row:

| Call | Result |
|---|---|
| `isPrime(2)` | `true` |
| `isPrime(9)` | `false` |
| `isPrime(97)` | `true` |
| `isPrime(1)` | `false` |
| `isPrime(0)` | `false` |
| `isPrime(-7)` | `false` |
| `isPrime(2.5)` | `false` |

### 3.2 — Stop early

Your loop should stop the moment it finds a divisor. There is no point checking any further.

### 3.3 — Make it fast

Time your function on a big prime:

```js
console.time("prime");
console.log(isPrime(1_000_000_007));
console.timeEnd("prime");
```

(The underscores are just digit separators for readability — JavaScript ignores them.)

If you check every possible divisor up to `n`, this is painfully slow. You do not need to
check that far. Work out how far you *do* need to go, and why, then make it fast.

### 3.4 — Use it

Using `isPrime`, produce an array of all primes below 100.

**Deliverable:** `exercise.03.js`, your timings before and after 3.3, and a one-sentence
explanation of why your optimisation is correct.

---

## Exercise 4 — Sum of Array Elements

**Practises:** loops versus array methods, `reduce`, initial values.

> The slide's title says *sum*, and its description says *sum of squares*. Do both.

### 4.1 — Sum, three ways

Write `sum(numbers)` three times: with a classic `for` loop, with `for...of`, and with
`reduce`. All three must return `0` for an empty array.

### 4.2 — Sum of squares

Write `sumOfSquares(numbers)`: the sum of each element multiplied by itself.

| Call | Result |
|---|---|
| `sumOfSquares([1, 2, 3, 4])` | `30` |
| `sumOfSquares([-3])` | `9` |
| `sumOfSquares([])` | `0` |

Write it once with `map` followed by `reduce`, and once with `reduce` alone.

### 4.3 — Variadic

Write `sumAll(...numbers)` using a **rest parameter** (Class 06, section 7), so it works as
`sumAll(1, 2, 3)` rather than `sumAll([1, 2, 3])`. Then call it with an existing array,
using **spread**.

**Deliverable:** `exercise.04.js`. Which version of `sum` do you find clearest, and why?

---

## Exercise 5 — Managing Objects

**Practises:** objects, destructuring, defaults, spread, shallow versus deep copies, JSON.

### 5.1 — The object

Create an object representing a person with `name`, `age` and `city`, and an `address`
object nested inside it with `street` and `postcode`.

### 5.2 — Describe it

Write `describe(person)` that returns a sentence:

```
Ana is 21 years old and lives in Skopje.
```

Use **destructuring in the parameter list** (Class 06, section 6) rather than writing
`person.name`, `person.age` everywhere. Give `city` a default of `"an unknown city"`, so
that a person without a city still produces a sensible sentence.

### 5.3 — Many people

Create an array of at least five people. Then:

1. Print a description of each one.
2. Produce a new array of people sorted by age — **without changing the original array**.
   Print both arrays to prove it.
3. Produce an array of the names of everyone over 20.

### 5.4 — Change without mutating

Write `birthday(person)` that returns a **new** object with `age` increased by one, leaving
the original untouched. Use spread.

Then write `moveHouse(person, newStreet)` the same way. Check carefully: after calling it,
has the *original* person's street changed? Explain what you see (Class 06, section 7) and
fix it.

### 5.5 — Save and load

Convert your array of people to a JSON string, and back. Add a `birthDate: new Date(...)`
property to one person first. What type is `birthDate` after the round trip?

**Deliverable:** `exercise.05.js`, and your explanations for 5.4 and 5.5.

---

## Exercise 6 — Filter and Reduce

**Practises:** `filter`, `reduce`, chaining, edge cases.

### 6.1 — The task

Write `sumOfEvens(numbers)`. It must use `filter` to keep only the even numbers, then
`reduce` to add them up.

| Call | Result |
|---|---|
| `sumOfEvens([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])` | `30` |
| `sumOfEvens([1, 3, 5])` | `0` |
| `sumOfEvens([])` | `0` |
| `sumOfEvens([-4, -3])` | `-4` |

The second and third rows will crash a careless solution. Make sure yours handles them.

### 6.2 — The other half

Write `sumOfOdds(numbers)` the same way, and test it on `[-3, -1, 2]`. The answer should be
`-4`. Check your result carefully.

### 6.3 — One pass

`filter` then `reduce` walks the array twice. Write a version that uses `reduce` alone and
walks it once. Which version is easier to read?

**Deliverable:** `exercise.06.js`, and what you discovered in 6.2.

---

## Exercise 7 — Name Map

**Practises:** `Map`, iteration, ties and empty collections.

### 7.1 — The map

Create a `Map` where each key is a name and each value is that person's age. Add at least
six people.

### 7.2 — The oldest

Write `findOldest(ages)` that returns the oldest person's name.

Then deal with the cases the slide does not mention:

- **A tie.** If two people share the top age, return **all** of them — as an array of
  names.
- **An empty map.** There is no oldest person. Decide what your function should do — return
  an empty array, `null`, or throw — and explain the choice in a comment.

### 7.3 — Why a Map?

Rewrite the data as a plain object, `{ Ana: 21, ... }`, and rewrite `findOldest` for it.
Then try to use a person's age, a number, as a key in each — `ages.set(21, ...)` versus
`obj[21] = ...`. What is the difference?

### 7.4 — JSON and Maps

Call `JSON.stringify` on your `Map`. What do you get? Find a way to save its contents as
JSON properly, and to rebuild the `Map` from that JSON.

**Deliverable:** `exercise.07.js`, and your answers to 7.3 and 7.4.

---

## Exercise 8 — Numbers to Words *(scary)*

**Practises:** breaking a problem into smaller functions, lookup tables, `switch`,
recursion, validation.

Write `toWords(n)` that spells out an integer in English.

### The rules

So that everyone solves the same problem:

- All lowercase.
- Numbers from 21 to 99 that are not multiples of ten use a **hyphen**: `forty-two`.
- Hundreds, thousands and millions are separated by spaces, with **no "and"**:
  `one hundred five`, not `one hundred and five`.
- Zero is `zero`. Negative numbers start with `minus`.
- Anything that is not an integer, or is outside the range you support, **throws a
  `RangeError`**.

### Levels

Work through them in order. Each one builds on the last.

| Level | Range |
|---|---|
| **1** — required | 0 to 999 |
| **2** — required | 0 to 999 999 |
| **3** | 0 to 999 999 999 |
| **4** | negative numbers too |

### Test table

| Call | Result |
|---|---|
| `toWords(0)` | `zero` |
| `toWords(7)` | `seven` |
| `toWords(13)` | `thirteen` |
| `toWords(40)` | `forty` |
| `toWords(42)` | `forty-two` |
| `toWords(100)` | `one hundred` |
| `toWords(105)` | `one hundred five` |
| `toWords(999)` | `nine hundred ninety-nine` |
| `toWords(1000)` | `one thousand` |
| `toWords(1001)` | `one thousand one` |
| `toWords(120000)` | `one hundred twenty thousand` |
| `toWords(999999)` | `nine hundred ninety-nine thousand nine hundred ninety-nine` |
| `toWords(1000000)` | `one million` |
| `toWords(2000017)` | `two million seventeen` |
| `toWords(-7)` | `minus seven` |
| `toWords(1.5)` | throws `RangeError` |

### `switch` or a table?

For the words "zero" to "nineteen", write the lookup **twice**: once as a `switch`
statement with a `case` for each number, and once as an array indexed by the number. Keep
the one you prefer, and say why.

**Deliverable:** `exercise.08.js`, with every row of the test table checked, and your
answer to the `switch` question.

---

## Exercise 9 — Pig Latin *(scary)*

**Practises:** strings, splitting and joining, careful rule-following.

Pig Latin is a word game in which English words are rearranged. There are many variants; to
make sure everyone solves the same problem, use exactly these rules.

### The rules

1. A word that **starts with a vowel** (`a e i o u`) gets `way` added: `apple` → `appleway`.
2. A word that **starts with consonants** has every consonant *before the first vowel*
   moved to the end, followed by `ay`: `pig` → `igpay`, `string` → `ingstray`.
3. **`qu`** counts as a single consonant: `quiet` → `ietquay`, `squeal` → `ealsquay`.
4. **`y`** is a consonant at the *start* of a word, and a vowel anywhere else:
   `yellow` → `ellowyay`, `rhythm` → `ythmrhay`.
5. A word with **no vowels at all** just gets `ay`: `hmm` → `hmmay`.
6. **Capitals:** if the original word started with a capital, so does the result, and the
   rest is lowercase: `Hello` → `Ellohay`.
7. **Punctuation** (`. , ! ?`) at the end of a word stays at the end: `world!` → `orldway!`.
8. Words are separated by single spaces.

### The function

Write `toPigLatin(sentence)`. Build it from a smaller `pigWord(word)` that handles one word,
and test that thoroughly first.

| Input | Output |
|---|---|
| `apple` | `appleway` |
| `eat` | `eatway` |
| `pig` | `igpay` |
| `string` | `ingstray` |
| `quiet` | `ietquay` |
| `squeal` | `ealsquay` |
| `yellow` | `ellowyay` |
| `rhythm` | `ythmrhay` |
| `hmm` | `hmmay` |
| `Hello` | `Ellohay` |
| `Hello, world!` | `Ellohay, orldway!` |
| `The quick brown fox.` | `Ethay ickquay ownbray oxfay.` |

**Stretch:** write `fromPigLatin(sentence)` that converts back. You will discover that it
cannot always work — find an example of a Pig Latin word that could have come from two
different English words.

**Deliverable:** `exercise.09.js` with every row checked, and your example for the stretch
goal if you attempted it.

---

## Exercise 10 — Quiz Time!

**Practises:** everything in this lecture *and* the DOM from Lecture 02 — data structures
driving a user interface.

Build a multiple-choice quiz as a web page.

### 10.1 — Questions are data

Store the questions as an array of objects — not as HTML:

```js
const questions = [
  {
    question: "What does typeof null return?",
    options: ["\"null\"", "\"object\"", "\"undefined\"", "\"boolean\""],
    answer: 1,      // index into options
  },
  // at least eight questions — make them about this course
];
```

### 10.2 — One question at a time

Show one question and its options. Below it, show progress: `Question 3 of 8`. Build the
options from the data with `createElement`, and handle clicks with **one** listener on the
options container (Lecture 02, Class 04, section 5).

### 10.3 — Feedback

When the user picks an option:

- mark it correct or wrong, with a class
- if it was wrong, also highlight the correct answer
- stop further clicks on this question
- show a **Next** button

### 10.4 — The result

After the last question, show the score — `6 / 8` — and a list of the questions answered
wrongly, each with its correct answer. A **Restart** button starts again.

### 10.5 — Shuffle

On every restart, shuffle the **order of the questions**, and the **order of the options**
within each question. Shuffling the options means the `answer` index has to stay correct —
think about this before you write any code.

Do not shuffle the original `questions` array in place; Restart must still work.

**Stretch:**

- A countdown timer per question. When it runs out, the question counts as wrong.
- Keyboard support: keys `1`–`4` pick an option, `Enter` goes to the next question.

**Deliverable:** `exercise.10.html` and `exercise.10.js`.

---

## Hints

Stuck? Open the hints for the exercise you are on. Each hint nudges you towards the next
step, and the **Check** lines tell you what result to expect, so you can confirm you are on
track. Try for a while before you open them.

<details>
<summary><strong>Exercise 1 — Factorial</strong></summary>

- **1.1** Start the result at `1`, not `0` — think about what multiplying by zero does.
  Starting the loop at `2` is fine too: multiplying by `1` changes nothing.
- **1.2** The base case is the smallest input you can answer without recursing. The
  recursive case must move towards it.
- **1.3** **Check:** without validation, `factorial(-1)` returns `1` and `factorial(2.5)`
  returns `3.75` — no crash at all.
- **1.3** `Number.isInteger(n)` tells you whether `n` is a whole number. Throw with
  `throw new RangeError("...")`, and in your `catch`, `error.message` holds that text.
- **1.4** **Check:** `factorial(171)` is `Infinity`. `factorialBig` needs `BigInt` values
  everywhere — `1n`, `BigInt(n)` — because `1n * 2` is a `TypeError`.
- **1.4** To compare the two versions, convert one to the other's type — for example
  `BigInt(factorialLoop(n)) === factorialBig(BigInt(n))`. **Check:** they first disagree
  at **23**, even though 19! is already above `MAX_SAFE_INTEGER`. Class 05, section 8
  explains why.

</details>

<details>
<summary><strong>Exercise 2 — FizzBuzz</strong></summary>

- **2.1** The order of your checks matters. What happens to 15 if you check for 3 first?
- **2.1** **Check:** from 1 to 100 there are 27 `Fizz`, 14 `Buzz` and 6 `FizzBuzz`.
- **2.3** Start with an empty string. Go through the rules and append the word for every
  divisor that matches. If the string is still empty at the end, use the number.
  `reduce` can do this in one expression, but a `for...of` loop is just as good.
- **2.3** **Check:** `fizzBuzz(105)` is `"FizzBuzzBazz"`, `fizzBuzz(21)` is `"FizzBazz"`
  and `fizzBuzz(35)` is `"BuzzBazz"`.

</details>

<details>
<summary><strong>Exercise 3 — Check for a Prime Number</strong></summary>

- **3.1** Handle the special cases first, with guard clauses (Class 05, section 1):
  anything that is not an integer, or is less than 2, is not prime.
- **3.2** Inside a function, `return false` stops the loop *and* the function in one step.
- **3.3** **Check:** checking every divisor below `n` takes **seconds** for
  1,000,000,007. The fast version should take about a millisecond.
- **3.3** Divisors come in pairs: if `a × b = n` and `a` is the smaller one, how large can
  `a` be at most? Writing the condition as `i * i <= n` avoids calling `Math.sqrt` at all.
- **3.4** **Check:** there are **25** primes below 100. The largest is 97.

</details>

<details>
<summary><strong>Exercise 4 — Sum of Array Elements</strong></summary>

- **4.1** For `reduce`, think about what the initial value should be — and what happens
  without one on an empty array.
- **4.2** `map` turns each number into its square; `reduce` then adds them. With `reduce`
  alone, do the squaring inside the callback.
- **4.3** `function sumAll(...numbers)` makes `numbers` a real array, so you can reuse your
  `sum`. To call it with an array: `sumAll(...myArray)`.

</details>

<details>
<summary><strong>Exercise 5 — Managing Objects</strong></summary>

- **5.2** `function describe({ name, age, city = "an unknown city" }) { ... }` — and build
  the sentence with a template literal.
- **5.3** `toSorted` (or `[...people].sort(...)`) leaves the original alone. To sort by
  age, the comparison function is `(a, b) => a.age - b.age`. Then chain `filter` and `map`
  for the names.
- **5.4** `{ ...person, age: person.age + 1 }` copies everything and then overrides `age`.
- **5.4** **Check:** after a naive `moveHouse` built the same way, the original person's
  street **has** changed. Look at what spread does to *nested* objects — and at
  `structuredClone`, or at spreading the inner object too.
- **5.5** **Check:** after the round trip, `typeof birthDate` is `"string"`. You may also
  notice the time has shifted — see Class 06, section 9.

</details>

<details>
<summary><strong>Exercise 6 — Filter and Reduce</strong></summary>

- **6.1** `reduce` on an empty array with no initial value throws a `TypeError`. When does
  `filter` produce an empty array?
- **6.2** **Check:** in JavaScript, `-3 % 2` is `-1`, not `1`. Test your "is odd" condition
  on a negative number before you trust it.
- **6.3** In the single-pass version, the callback decides for each number whether to add
  it, or to return the total unchanged.

</details>

<details>
<summary><strong>Exercise 7 — Name Map</strong></summary>

- **7.2** Loop with `for (const [name, age] of ages)`. Keep track of the highest age so far
  and the names that have it. Starting the highest age at `-Infinity` means the first person
  always beats it.
- **7.2** When an age *beats* the best, start a new list of names. When it *equals* the
  best, add to the list.
- **7.3** **Check:** `Object.keys` on an object always gives you strings — even for keys you
  set with a number.
- **7.4** **Check:** `JSON.stringify` on a `Map` gives `"{}"` — the data is silently lost.
  `Object.fromEntries(map)` gives a plain object that JSON can store, and `new Map(...)`
  accepts the output of `Object.entries(...)`.

</details>

<details>
<summary><strong>Exercise 8 — Numbers to Words</strong></summary>

- **Start small.** Get 0–19 working, then 20–99, then 100–999. Do not move on until the
  level you are on passes every test.
- Two arrays do most of the work: one for `zero` to `nineteen`, one for the tens
  (`twenty`, `thirty`, ...). Watch the spelling of **forty**.
- For 20–99: `Math.floor(n / 10)` gives the tens digit, and `n % 10` the units.
- **Level 2 is mostly free.** A number like 345 678 is "*three hundred forty-five*
  thousand *six hundred seventy-eight*" — the 0–999 function used twice. Write a helper for
  0–999 and reuse it for each group of three digits.
- Leave zero out of the helper. "Three thousand **zero**" is wrong, so zero is a special
  case for the whole number only.
- Negative numbers: what is `"minus " +` the words for the positive number?
- **Check:** every row of the test table, automatically. Put the table in an array of
  `[input, expected]` pairs and loop over it, printing only the rows that fail.

</details>

<details>
<summary><strong>Exercise 9 — Pig Latin</strong></summary>

- Get `pigWord` right for lowercase words with no punctuation first. Add capitals, then
  punctuation, as separate steps.
- To find where the leading consonants end, walk through the word until you reach a vowel.
  Then handle the two special cases: a `u` that comes right after a `q` is not a vowel, and
  a `y` is a vowel unless it is the first letter.
- `slice` (Class 06, section 2) splits a word at a position: `word.slice(0, i)` and
  `word.slice(i)`.
- Strip punctuation off the end before you transform the word, and put it back afterwards.
  `/[.,!?]+$/` matches punctuation at the end, if you want to use a regular expression.
- Remember whether the word started with a capital *before* you lowercase it.
- `sentence.split(" ")`, then `map` with `pigWord`, then `join(" ")`.
- **Check:** every row of the table, automatically — the same approach as Exercise 8.

</details>

<details>
<summary><strong>Exercise 10 — Quiz Time!</strong></summary>

- Keep the quiz's state in one place — current question index, score, wrong answers — and
  write one function that draws the screen from it. Every click changes the state and then
  redraws (the same idea as the Lecture 02 calculator).
- **10.2** Give each option button a `data-index`. In the single listener,
  `event.target.closest("button")` finds the clicked one.
- **10.3** Disabling every option button stops further clicks — or check a flag at the
  start of the listener.
- **10.5** Shuffling the options breaks the `answer` index. One fix: shuffle a copy of the
  options, then find where the correct option *text* ended up with `indexOf`. Another:
  shuffle objects such as `{ text, correct }` instead of bare strings.
- **10.5** `array.sort(() => Math.random() - 0.5)` looks like a shuffle, but it is not a
  fair one. **Check:** shuffle `[1, 2, 3]` a hundred thousand times and count how often each
  of the six orders appears — each should be close to one in six. Look up the
  **Fisher–Yates shuffle**.
- **10.5** Copy before you shuffle: `[...questions]` or `structuredClone(questions)`.
  Which one do you need if you also shuffle each question's options?

</details>
