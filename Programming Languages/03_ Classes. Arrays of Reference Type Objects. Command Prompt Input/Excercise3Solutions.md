## **Assignment 1: "The Number Generator's Secret"**

**Objective:** Practice with `while` and `do-while` loops, and basic number generation.

### **Solution:**

```java
import java.util.Random;
import java.util.Scanner;

public class NumberGeneratorsSecret {
    public static void main(String[] args) {
        Random random = new Random();
        Scanner scanner = new Scanner(System.in);

        // 1. Generate random integers between 1 and 500 using a while loop to print 10 numbers
        System.out.println("Generating 10 random numbers between 1 and 500 using a while loop:");
        int count = 0;
        while (count < 10) {
            int number = random.nextInt(500) + 1; // 1 to 500
            System.out.print(number + " ");
            count++;
        }
        System.out.println("\n");

        // 2. Use a do-while loop to keep generating numbers until a number greater than 300 is produced
        System.out.println("Generating numbers using a do-while loop until a number > 300 is produced:");
        int generatedNumber;
        do {
            generatedNumber = random.nextInt(500) + 1;
            System.out.println("Generated number: " + generatedNumber);
        } while (generatedNumber <= 300);
        System.out.println();

        // 3. Count how many even numbers are generated in 20 trials
        System.out.println("Counting even numbers in 20 trials:");
        int evenCount = 0;
        for (int i = 1; i <= 20; i++) {
            int num = random.nextInt(500) + 1;
            System.out.println("Trial " + i + ": " + num);
            if (num % 2 == 0) {
                evenCount++;
            }
        }
        System.out.println("Total even numbers generated: " + evenCount + "\n");

        // 4. Stop generating numbers once one divisible by 7 is found
        System.out.println("Generating numbers until one divisible by 7 is found:");
        while (true) {
            int num = random.nextInt(500) + 1;
            System.out.println("Generated number: " + num);
            if (num % 7 == 0) {
                System.out.println("Number divisible by 7 found: " + num);
                break;
            }
        }

        scanner.close();
    }
}
```

### **Explanation:**

1. **Generating 10 Random Numbers with `while` Loop:**
    - A `while` loop is used to generate and print 10 random numbers between 1 and 500.
    - The loop continues until the `count` reaches 10.

2. **Generating Numbers with `do-while` Loop Until a Number > 300:**
    - A `do-while` loop ensures that at least one number is generated.
    - The loop continues to generate numbers until a number greater than 300 is produced.

3. **Counting Even Numbers in 20 Trials:**
    - A `for` loop runs 20 trials, generating a random number each time.
    - It checks if the number is even (`num % 2 == 0`) and increments `evenCount` accordingly.
    - After 20 trials, it prints the total count of even numbers generated.

4. **Stopping Generation When a Number Divisible by 7 is Found:**
    - An infinite `while` loop is used to continuously generate numbers.
    - Each generated number is checked to see if it's divisible by 7.
    - If a number divisible by 7 is found, it prints the number and breaks out of the loop.

---

## **Assignment 2: "The Vault of Secrets"**

**Objective:** Use arrays to store numbers and process them using loops.

### **Solution:**

```java
import java.util.Random;

public class VaultOfSecrets {
    public static void main(String[] args) {
        Random random = new Random();

        // 1. Create an array A of 15 elements, with values between 0 and 100
        int[] A = new int[15];
        for (int i = 0; i < A.length; i++) {
            A[i] = random.nextInt(101); // 0 to 100
        }

        // 2. Count how many numbers in the array are divisible by 3
        int divisibleBy3Count = 0;
        for (int num : A) {
            if (num % 3 == 0) {
                divisibleBy3Count++;
            }
        }

        // 3. Create another array B where B[i] = 100 - A[i]
        int[] B = new int[A.length];
        for (int i = 0; i < A.length; i++) {
            B[i] = 100 - A[i];
        }

        // 4. Print both arrays
        System.out.println("Array A (Original Numbers):");
        printArray(A);

        System.out.println("\nArray B (Complements):");
        printArray(B);

        System.out.println("\nNumbers in Array A divisible by 3: " + divisibleBy3Count);
    }

    // Helper method to print array elements
    public static void printArray(int[] array) {
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

### **Explanation:**

1. **Creating Array A:**
    - An integer array `A` of size 15 is created.
    - Each element of `A` is filled with a random number between 0 and 100 using a `for` loop.

2. **Counting Numbers Divisible by 3:**
    - Iterates through array `A` using an enhanced `for` loop.
    - Checks if each number is divisible by 3 (`num % 3 == 0`).
    - Increments `divisibleBy3Count` for each number that meets the condition.

3. **Creating Array B:**
    - An integer array `B` of the same size as `A` is created.
    - Each element of `B` is calculated as `100 - A[i]`, effectively storing the complement of each number in `A`.

4. **Printing Arrays and Count:**
    - The `printArray` helper method is used to print the elements of both arrays `A` and `B`.
    - Finally, it prints the total count of numbers in array `A` that are divisible by 3.

---

## **Assignment 3: "The Matrix Puzzle"**

**Objective:** Work with matrices, nested loops, and logic.

### **Solution:**

```java
import java.util.Random;

public class MatrixPuzzle {
    public static void main(String[] args) {
        Random random = new Random();
        char[][] matrix = new char[3][3];

        // 1. Create a 3x3 matrix with randomly generated 'X' and 'O' values
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                int num = random.nextInt(100); // Generate a random number
                if (num % 2 != 0) {
                    matrix[i][j] = 'X';
                } else {
                    matrix[i][j] = 'O';
                }
            }
        }

        // 2. Output the matrix
        System.out.println("Generated 3x3 Matrix:");
        printMatrix(matrix);

        // 3. Check for any row, column, or diagonal with three 'X's or three 'O's
        String winner = checkWinner(matrix);

        // 4. Announce the result
        if (winner.equals("X") || winner.equals("O")) {
            System.out.println("Player '" + winner + "' wins!");
        } else {
            System.out.println("There is no winner.");
        }
    }

    // Helper method to print the matrix
    public static void printMatrix(char[][] matrix) {
        for (char[] row : matrix) {
            for (char symbol : row) {
                System.out.print(symbol + " ");
            }
            System.out.println();
        }
    }

    // Method to check for a winner
    public static String checkWinner(char[][] matrix) {
        // Check rows
        for (int i = 0; i < 3; i++) {
            if (matrix[i][0] == matrix[i][1] &&
                matrix[i][1] == matrix[i][2]) {
                return String.valueOf(matrix[i][0]);
            }
        }

        // Check columns
        for (int j = 0; j < 3; j++) {
            if (matrix[0][j] == matrix[1][j] &&
                matrix[1][j] == matrix[2][j]) {
                return String.valueOf(matrix[0][j]);
            }
        }

        // Check diagonals
        if (matrix[0][0] == matrix[1][1] &&
            matrix[1][1] == matrix[2][2]) {
            return String.valueOf(matrix[0][0]);
        }

        if (matrix[0][2] == matrix[1][1] &&
            matrix[1][1] == matrix[2][0]) {
            return String.valueOf(matrix[0][2]);
        }

        // No winner
        return "None";
    }
}
```

### **Explanation:**

1. **Creating the 3x3 Matrix:**
    - A 3x3 character matrix is created.
    - Each cell is filled with either 'X' or 'O' based on whether a randomly generated number is odd or even.

2. **Printing the Matrix:**
    - The `printMatrix` helper method iterates through each row and prints the symbols in a formatted manner.

3. **Checking for a Winner:**
    - The `checkWinner` method checks all possible winning conditions:
        - **Rows:** Checks if any row has three identical symbols.
        - **Columns:** Checks if any column has three identical symbols.
        - **Diagonals:** Checks both primary and secondary diagonals for three identical symbols.
    - If a winning condition is met, it returns the winning symbol ('X' or 'O').
    - If no winner is found, it returns "None".

4. **Announcing the Result:**
    - Based on the result from `checkWinner`, the program announces whether 'X' or 'O' wins or if there is no winner.

---

## **Assignment 4: "The Endless Loop of Doom"**

**Objective:** Work with `for`, `while`, and `do-while` loops, and `break` and `continue` statements.

### **Solution:**

```java
public class EndlessLoopOfDoom {
    public static void main(String[] args) {
        System.out.println("Starting the Endless Loop of Doom using a for loop:\n");

        // 1. Write a program using a for loop that runs 10 times
        for (int i = 1; i <= 10; i++) {
            // 2. Inside the loop, check if the current iteration is divisible by 2
            if (i % 2 == 0) {
                // If it is, use continue to skip printing the number
                System.out.println("Iteration " + i + " is divisible by 2. Skipping print.");
                continue;
            }

            // 3. If the iteration reaches 7, use break to exit the loop
            if (i == 7) {
                System.out.println("Iteration " + i + " reached. Breaking out of the loop.");
                break;
            }

            // Print the current iteration number
            System.out.println("Iteration " + i + ": Printing number " + i);
        }

        System.out.println("\nExplanation:");
        System.out.println("The 'continue' statement skips the current iteration when the number is divisible by 2.");
        System.out.println("The 'break' statement exits the loop when the iteration reaches 7.");
    }
}
```

### **Explanation:**

1. **Using a `for` Loop:**
    - The `for` loop runs from `i = 1` to `i = 10`, totaling 10 iterations.

2. **Using `continue` Statement:**
    - Inside the loop, it checks if the current iteration number `i` is divisible by 2 (`i % 2 == 0`).
    - If true, it prints a message indicating that the iteration is divisible by 2 and uses the `continue` statement to skip the rest of the loop body for that iteration. This means the number won't be printed.

3. **Using `break` Statement:**
    - It then checks if the iteration number `i` has reached 7.
    - If `i == 7`, it prints a message and uses the `break` statement to exit the loop immediately, regardless of whether the loop has completed all 10 iterations.

4. **Program Flow Control:**
    - **`continue`:** When invoked, it skips the remaining code in the current loop iteration and moves to the next iteration.
    - **`break`:** When invoked, it terminates the loop entirely, exiting out of it.

5. **Output:**
    - The program will print numbers from 1 to 10, skipping even numbers and stopping the loop once it reaches iteration 7.

---

## **Assignment 5: "The Treasure Map"**

**Objective:** Work with multidimensional arrays and matrix operations.

### **Solution:**

```java
import java.util.Random;

public class TreasureMap {
    public static void main(String[] args) {
        Random random = new Random();
        int rows = 5;
        int cols = 10;
        int[][] map = new int[rows][cols];
        int[] rowSums = new int[rows];

        // 1. Create a 5x10 matrix and fill it with random integers between 0 and 100
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                map[i][j] = random.nextInt(101); // 0 to 100
            }
        }

        // 2. Print the matrix
        System.out.println("Treasure Map (5x10 Matrix):");
        printMatrix(map);

        // 3. For each row, calculate the sum of the numbers
        for (int i = 0; i < rows; i++) {
            int sum = 0;
            for (int j = 0; j < cols; j++) {
                sum += map[i][j];
            }
            rowSums[i] = sum;
        }

        // 4. Output the row sums along with the matrix
        System.out.println("\nRow Sums:");
        for (int i = 0; i < rowSums.length; i++) {
            System.out.println("Sum of row " + (i + 1) + ": " + rowSums[i]);
        }
    }

    // Helper method to print the matrix
    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int num : row) {
                // Format the number to occupy 4 spaces for better alignment
                System.out.printf("%4d", num);
            }
            System.out.println();
        }
    }
}
```

### **Explanation:**

1. **Creating the 5x10 Matrix:**
    - A 5x10 integer matrix named `map` is created.
    - Each cell in the matrix is filled with a random integer between 0 and 100 using nested `for` loops.

2. **Printing the Matrix:**
    - The `printMatrix` helper method iterates through each row and prints the numbers in a formatted manner for better readability.

3. **Calculating Row Sums:**
    - An integer array `rowSums` of size 5 is created to store the sum of each row.
    - For each row, it iterates through all columns, adds up the numbers, and stores the sum in the corresponding index of `rowSums`.

4. **Outputting Row Sums:**
    - After calculating the sums, the program prints the sum of each row alongside the matrix for easy reference.

---

## **Assignment 6: "The Fortune Teller’s Array"**

**Objective:** Introduce methods with arrays and loops.

### **Solution:**

```java
import java.util.Random;

public class FortuneTellersArray {
    public static void main(String[] args) {
        int size = 10; // Define the size of the array
        int[] originalArray = new int[size];
        int[] complementArray = new int[size];
        int divisor = 5; // Example divisor

        // 1. Generate the original array with random numbers between 0 and 100
        generateArray(originalArray, size);
        System.out.println("Original Array:");
        printArray(originalArray);

        // 2. Count how many numbers are divisible by the given divisor
        int countDivisible = countDivisibleBy(originalArray, divisor);
        System.out.println("Numbers divisible by " + divisor + ": " + countDivisible);

        // 3. Create the complement array
        complementArray(originalArray, complementArray);
        System.out.println("Complement Array:");
        printArray(complementArray);
    }

    // Method to fill an array with random numbers between 0 and 100
    public static void generateArray(int[] arr, int size) {
        Random random = new Random();
        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(101); // 0 to 100
        }
    }

    // Method to count how many numbers in the array are divisible by a given divisor
    public static int countDivisibleBy(int[] arr, int divisor) {
        int count = 0;
        for (int num : arr) {
            if (num % divisor == 0) {
                count++;
            }
        }
        return count;
    }

    // Method to fill the complement array where complement[i] = 100 - arr[i]
    public static void complementArray(int[] arr, int[] complement) {
        for (int i = 0; i < arr.length; i++) {
            complement[i] = 100 - arr[i];
        }
    }

    // Helper method to print array elements
    public static void printArray(int[] array) {
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

### **Explanation:**

1. **Generating the Original Array:**
    - The `generateArray` method fills the `originalArray` with random integers between 0 and 100.
    - It uses a `Random` object to generate the numbers.

2. **Counting Numbers Divisible by a Given Divisor:**
    - The `countDivisibleBy` method iterates through the `originalArray` and counts how many numbers are divisible by the specified `divisor`.
    - In this example, the divisor is set to 5, but it can be changed as needed.

3. **Creating the Complement Array:**
    - The `complementArray` method creates a new array `complementArray` where each element is the complement of the corresponding element in `originalArray` (i.e., `100 - arr[i]`).

4. **Printing Arrays and Count:**
    - The `printArray` helper method is used to display the elements of both the original and complement arrays.
    - It also prints the count of numbers in the original array that are divisible by the specified divisor.

---

## **Assignment 7: "The Game of Shadows"**

**Objective:** Combine everything—arrays, loops, methods, and conditions—to create a more complex program.

### **Solution:**

```java
import java.util.Random;

public class GameOfShadows {
    public static void main(String[] args) {
        char[][] matrix = new char[3][3];
        Random random = new Random();

        // 1. Generate the matrix with 'X' and 'O'
        generateMatrix(matrix);

        // 2. Print the matrix
        System.out.println("Game of Shadows Matrix:");
        printMatrix(matrix);

        // 3. Count lines for 'X' and 'O'
        int countX = countLines(matrix, 'X');
        int countO = countLines(matrix, 'O');

        // 4. Announce the winner
        announceWinner(countX, countO);
    }

    // Method to fill a 3x3 matrix with randomly placed 'X' and 'O'
    public static void generateMatrix(char[][] matrix) {
        Random random = new Random();
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                // Randomly assign 'X' or 'O'
                matrix[i][j] = random.nextBoolean() ? 'X' : 'O';
            }
        }
    }

    // Method to print the matrix
    public static void printMatrix(char[][] matrix) {
        for (char[] row : matrix) {
            for (char symbol : row) {
                System.out.print(symbol + " ");
            }
            System.out.println();
        }
    }

    // Method to count how many lines (rows, columns, diagonals) are filled with the given symbol
    public static int countLines(char[][] matrix, char symbol) {
        int count = 0;

        // Check rows
        for (int i = 0; i < 3; i++) {
            if (matrix[i][0] == symbol &&
                matrix[i][1] == symbol &&
                matrix[i][2] == symbol) {
                count++;
            }
        }

        // Check columns
        for (int j = 0; j < 3; j++) {
            if (matrix[0][j] == symbol &&
                matrix[1][j] == symbol &&
                matrix[2][j] == symbol) {
                count++;
            }
        }

        // Check primary diagonal
        if (matrix[0][0] == symbol &&
            matrix[1][1] == symbol &&
            matrix[2][2] == symbol) {
            count++;
        }

        // Check secondary diagonal
        if (matrix[0][2] == symbol &&
            matrix[1][1] == symbol &&
            matrix[2][0] == symbol) {
            count++;
        }

        return count;
    }

    // Method to announce the winner based on counts
    public static void announceWinner(int countX, int countO) {
        if (countX > countO) {
            System.out.println("Player 'X' wins with " + countX + " line(s)!");
        } else if (countO > countX) {
            System.out.println("Player 'O' wins with " + countO + " line(s)!");
        } else {
            System.out.println("It's a tie! No winner.");
        }
    }
}
```

### **Explanation:**

1. **Generating the Matrix:**
    - The `generateMatrix` method fills a 3x3 character matrix with randomly placed 'X' and 'O' symbols.
    - It uses `Random.nextBoolean()` to decide whether to place an 'X' or an 'O' in each cell.

2. **Printing the Matrix:**
    - The `printMatrix` method iterates through each row of the matrix and prints the symbols in a formatted manner.

3. **Counting Lines for 'X' and 'O':**
    - The `countLines` method counts how many complete lines (rows, columns, or diagonals) are filled with the specified symbol ('X' or 'O').
    - It checks all possible rows, columns, and both diagonals for three identical symbols.

4. **Announcing the Winner:**
    - The `announceWinner` method compares the counts of lines for 'X' and 'O'.
    - If 'X' has more lines, it declares 'X' as the winner. If 'O' has more lines, it declares 'O' as the winner.
    - If both have the same number of lines, it declares a tie with no winner.

5. **Program Flow:**
    - The `main` method orchestrates the flow by generating the matrix, printing it, counting lines for both players, and finally announcing the winner based on the counts.