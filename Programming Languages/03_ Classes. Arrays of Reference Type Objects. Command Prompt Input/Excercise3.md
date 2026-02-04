### Assignment 1: *"The Number Generator's Secret"*
**Objective:** Practice with `while` and `do-while` loops, and basic number generation.

**Story:** A mysterious machine generates numbers between 1 and 500. Your job is to program the machine to output a series of numbers, but there’s a catch. You need to stop the machine once a certain condition is met.

**To-Do:**
- Generate random integers between 1 and 500.
- Use a `while` loop to print 10 numbers in a row.
- Use a `do-while` loop to keep generating numbers until a number greater than 300 is produced.
- Count how many even numbers are generated in 20 trials.
- Stop generating numbers once one divisible by 7 is found.

### Assignment 2: *"The Vault of Secrets"*
**Objective:** Use arrays to store numbers and process them using loops.

**Story:** You are in charge of managing a vault that stores secret numbers. These numbers hold the key to opening the vault, and you need to process them correctly to retrieve the vault’s treasure.

**To-Do:**
- Create an array `A` of 15 elements, with values between 0 and 100.
- Count how many numbers in the array are divisible by 3.
- Create another array `B` where each element is the complement of the corresponding element in `A` (i.e., `B[i] = 100 - A[i]`).
- Print both arrays.

### Assignment 3: *"The Matrix Puzzle"*
**Objective:** Work with matrices, nested loops, and logic.

**Story:** You’ve discovered a mystical 3x3 matrix filled with cryptic symbols, 'X' and 'O'. The matrix has the power to determine the outcome of a game, and your job is to find out who the winner is.

**To-Do:**
- Create a 3x3 matrix with randomly generated 'X' and 'O' values.
- For each cell, if the random number is odd, put 'X'; if even, put 'O'.
- Output the matrix.
- Check for any row, column, or diagonal that contains three 'X's or three 'O's.
- Announce whether 'X' or 'O' wins, or if there is no winner.

### Assignment 4: *"The Endless Loop of Doom"*
**Objective:** Work with `for`, `while`, and `do-while` loops, and `break` and `continue` statements.

**Story:** As part of your mission, you must travel through a seemingly endless loop. However, using your programming skills, you can break free from the loop by finding hidden patterns.

**To-Do:**
- Write a program using a `for` loop that runs 10 times.
- Inside the loop, check if the current iteration is divisible by 2. If it is, use `continue` to skip printing the number.
- If the iteration reaches 7, use `break` to exit the loop.
- Explain how the use of `break` and `continue` controls the flow of the program.

### Assignment 5: *"The Treasure Map"*
**Objective:** Work with multidimensional arrays and matrix operations.

**Story:** You’ve found an ancient treasure map encoded in a 5x10 grid. Each cell contains a number that represents a coordinate. The map is incomplete, and your task is to process the grid and extract the missing coordinates.

**To-Do:**
- Create a 5x10 matrix.
- Fill the matrix with random integers.
- Print the matrix.
- For each row, calculate the sum of the numbers.
- Output the row sums along with the matrix.

### Assignment 6: *"The Fortune Teller’s Array"*
**Objective:** Introduce methods with arrays and loops.

**Story:** A digital fortune teller uses arrays to predict the future. The fortune teller needs you to program a system that analyzes a set of numbers and returns useful predictions.

**To-Do:**
- Create a method `generateArray(int[] arr, int size)` that fills an array with random numbers between 0 and 100.
- Create a method `countDivisibleBy(int[] arr, int divisor)` that counts how many numbers in the array are divisible by a given divisor.
- Create a method `complementArray(int[] arr, int[] complement)` that fills a new array with the complements of the first array.
- Test the methods in the `main` function by generating an array, counting the divisible numbers, and printing both the original and complement arrays.

### Assignment 7: *"The Game of Shadows"*
**Objective:** Combine everything—arrays, loops, methods, and conditions—to create a more complex program.

**Story:** The Game of Shadows is an ancient game played on a 3x3 grid. The game decides the fate of two players, 'X' and 'O'. You must create a program that simulates the game and determines the winner.

**To-Do:**
- Create a method `generateMatrix(char[][] matrix)` that fills a 3x3 matrix with randomly placed 'X' and 'O' values.
- Create a method `printMatrix(char[][] matrix)` to output the matrix.
- Create a method `countLines(char[][] matrix, char symbol)` that counts how many rows, columns, and diagonals are filled with the given symbol.
- Create a method `announceWinner(int countX, int countO)` that compares the counts and prints whether 'X' or 'O' wins, or if there is no winner.
- In `main`, generate the matrix, print it, count the lines for 'X' and 'O', and announce the winner.