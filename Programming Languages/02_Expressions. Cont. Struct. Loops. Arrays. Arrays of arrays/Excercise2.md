### Assignment 1: *"The Magic Calculator"*
**Objective:** Understanding variable declaration, arithmetic operations, and basic output.

**Story:** You are tasked with building a magic calculator for a wizard that can perform various arithmetic operations on two magical numbers. The wizard will give you two numbers and ask you to perform all arithmetic operations (addition, subtraction, multiplication, and division) and store the results.

**To-Do:**
- Declare two integer variables representing the magical numbers.
- Perform all arithmetic operations on them.
- Store the result of each operation in separate variables.
- Output all the results with a message for each (e.g., "The sum of the numbers is...").
- Finally, calculate and output the average of the results.

### Assignment 2: *"Secret Agent Code"*
**Objective:** Working with Strings and characters.

**Story:** As a secret agent, you need to write a program that will receive your full name and analyze it for encryption purposes. The program should calculate the length of your name and identify the middle character.

**To-Do:**
- Output the agent’s full name.
- Calculate and output the length of the name.
- Determine the character in the middle of the name and display it.
- Print a message: “Agent [Name], the middle character of your name is [Character].”

### Assignment 3: *"The Guessing Game"*
**Objective:** Practice control structures using `if-else` and random number generation.

**Story:** You are developing a game where the player has to guess if they have passed a magical exam. The computer will randomly generate a score between 0 and 100, and if the score is 60 or higher, the player passes. Otherwise, they fail.

**To-Do:**
- Generate a random score between 0 and 100.
- Use an `if-else` statement to check if the score is 60 or higher.
- Print a message: "You have passed the exam!" if the score is above 60, or "You have failed the exam" if the score is lower.

### Assignment 4: *"The Weather Oracle"*
**Objective:** Explore the `switch` control structure.

**Story:** You are tasked with writing a program for a mystical weather oracle. Based on a temperature value that the oracle provides, the program should output a message about the weather.

**To-Do:**
- Use the `switch` statement to evaluate the temperature (which will be an integer value).
- If the temperature is 30, output: "The temperature is 30 degrees, it's hot!"
- If the temperature is 20, output: "The temperature is 20 degrees, it's warm!"
- Add cases for temperatures of 10 and 0 degrees.
- Include a `default` case for temperatures below 0, saying: "It's freezing!"

### Assignment 5: *"Grading the Knight’s Challenge"*
**Objective:** Use `if` and `switch` together to provide feedback on a student's performance based on grades.

**Story:** As the headmaster of a knight academy, you are responsible for grading the squires based on the points they have gathered in training. The computer will generate a random score from 0 to 100. Based on that score, you will assign a grade.

**To-Do:**
- Generate a random score from 0 to 100.
- Using `if` statements or a `switch`, assign grades: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60).
- Output the grade along with a personalized message (e.g., "You’ve earned a B! Great job!").

### Assignment 6: *"The Time Traveler's Challenge"*
**Objective:** Introducing loops and user input.

**Story:** A time traveler is trying to test his time machine. Every time he inputs a year, the machine should tell him whether the year is a leap year or not, until he decides to stop.

**To-Do:**
- Use a `while` loop to allow the traveler to input years continuously.
- For each year, check if it is a leap year using the formula (year % 4 == 0).
- Output whether the year is a leap year or not.
- Exit the loop when the user inputs a special keyword like "STOP".

### Assignment 7: *"The Treasure Hunt"*
**Objective:** Combine loops, random number generation, and control structures.

**Story:** The player is on a treasure hunt. The program will generate a random location on a 10x10 grid (x and y coordinates between 1 and 10). The player has a limited number of attempts (5) to guess the correct coordinates and find the treasure.

**To-Do:**
- Randomly generate x and y coordinates for the treasure.
- Allow the player to input their guesses for the treasure's coordinates (x and y).
- Use a `for` loop to limit the number of attempts to 5.
- Provide feedback after each guess (e.g., "Too far! Try again!").
- If the player finds the correct coordinates, output: "Congratulations! You've found the treasure!"
- If they fail to guess correctly after 5 attempts, output: "Game over! The treasure was at [x, y]."