## **Assignment 1: "The Magic Calculator"**

**Objective:** Understanding variable declaration, arithmetic operations, and basic output.

**Solution:**

```java
public class MagicCalculator {
    public static void main(String[] args) {
        // Declare two integer variables representing the magical numbers
        int number1 = 12;
        int number2 = 5;

        // Perform arithmetic operations
        int sum = number1 + number2;          // Addition
        int difference = number1 - number2;   // Subtraction
        int product = number1 * number2;      // Multiplication
        double quotient = (double) number1 / number2; // Division (cast to double for decimal result)

        // Output the results with messages
        System.out.println("The sum of the numbers is: " + sum);
        System.out.println("The difference of the numbers is: " + difference);
        System.out.println("The product of the numbers is: " + product);
        System.out.println("The quotient of the numbers is: " + quotient);

        // Calculate the average of the results
        double average = (sum + difference + product + quotient) / 4.0;
        System.out.println("The average of the results is: " + average);
    }
}
```

**Explanation:**

1. **Variable Declaration:** Two integer variables `number1` and `number2` are declared and initialized with values.

2. **Arithmetic Operations:**
    - **Addition (`sum`):** Adds `number1` and `number2`.
    - **Subtraction (`difference`):** Subtracts `number2` from `number1`.
    - **Multiplication (`product`):** Multiplies `number1` and `number2`.
    - **Division (`quotient`):** Divides `number1` by `number2`. Casting to `double` ensures the division results in a decimal if necessary.

3. **Output:** Each result is printed with a descriptive message.

4. **Average Calculation:** The average of all four results is calculated and printed.

---

## **Assignment 2: "Secret Agent Code"**

**Objective:** Working with Strings and characters.

**Solution:**

```java
import java.util.Scanner;

public class SecretAgentCode {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter the agent's full name
        System.out.print("Enter the agent's full name: ");
        String fullName = scanner.nextLine();

        // Output the agent’s full name
        System.out.println("Agent's Full Name: " + fullName);

        // Calculate the length of the name
        int length = fullName.length();
        System.out.println("Length of the name: " + length + " characters");

        // Determine the middle character
        char middleChar;
        if (length % 2 == 0) {
            // If even number of characters, choose the first of the two middle characters
            middleChar = fullName.charAt(length / 2 - 1);
        } else {
            // If odd, choose the exact middle character
            middleChar = fullName.charAt(length / 2);
        }

        // Print the message with the middle character
        System.out.println("Agent " + fullName + ", the middle character of your name is '" + middleChar + "'.");
        
        scanner.close();
    }
}
```

**Explanation:**

1. **User Input:** The program uses a `Scanner` to receive the agent's full name.

2. **Output Full Name:** Prints the entered full name.

3. **Calculate Length:** Uses `length()` method to determine the number of characters in the name.

4. **Determine Middle Character:**
    - **Even Length:** If the name has an even number of characters, it selects the first of the two middle characters.
    - **Odd Length:** If the name has an odd number of characters, it selects the exact middle character.

5. **Final Message:** Prints a personalized message displaying the agent's name and the middle character.

---

## **Assignment 3: "The Guessing Game"**

**Objective:** Practice control structures using `if-else` and random number generation.

**Solution:**

```java
import java.util.Random;

public class GuessingGame {
    public static void main(String[] args) {
        // Create an instance of Random
        Random random = new Random();

        // Generate a random score between 0 and 100
        int score = random.nextInt(101); // nextInt(101) generates 0 to 100 inclusive

        // Display the generated score (optional for debugging)
        System.out.println("Generated Score: " + score);

        // Use if-else to determine pass or fail
        if (score >= 60) {
            System.out.println("You have passed the exam!");
        } else {
            System.out.println("You have failed the exam.");
        }
    }
}
```

**Explanation:**

1. **Random Number Generation:** Uses `Random` class to generate a score between 0 and 100.

2. **Decision Making:**
    - **Pass:** If the score is 60 or higher.
    - **Fail:** If the score is below 60.

3. **Output:** Prints whether the player has passed or failed based on the generated score.

---

## **Assignment 4: "The Weather Oracle"**

**Objective:** Explore the `switch` control structure.

**Solution:**

```java
import java.util.Scanner;

public class WeatherOracle {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the oracle to enter the temperature
        System.out.print("Enter the temperature: ");
        int temperature = scanner.nextInt();

        // Use switch to evaluate the temperature
        switch (temperature) {
            case 30:
                System.out.println("The temperature is 30 degrees, it's hot!");
                break;
            case 20:
                System.out.println("The temperature is 20 degrees, it's warm!");
                break;
            case 10:
                System.out.println("The temperature is 10 degrees, it's cool!");
                break;
            case 0:
                System.out.println("The temperature is 0 degrees, it's cold!");
                break;
            default:
                if (temperature < 0) {
                    System.out.println("It's freezing!");
                } else {
                    System.out.println("The temperature is " + temperature + " degrees.");
                }
                break;
        }

        scanner.close();
    }
}
```

**Explanation:**

1. **User Input:** The program prompts the user (the oracle) to enter a temperature value.

2. **Switch Statement:**
    - **Cases 30, 20, 10, 0:** Each specific temperature has a corresponding message.
    - **Default Case:**
        - If the temperature is below 0, it prints "It's freezing!"
        - For any other temperatures not specifically handled, it prints a generic message.

3. **Output:** Displays the appropriate weather message based on the temperature entered.

---

## **Assignment 5: "Grading the Knight’s Challenge"**

**Objective:** Use `if` and `switch` together to provide feedback on a student's performance based on grades.

**Solution:**

```java
import java.util.Random;

public class GradingKnightsChallenge {
    public static void main(String[] args) {
        // Create an instance of Random
        Random random = new Random();

        // Generate a random score from 0 to 100
        int score = random.nextInt(101); // 0 to 100 inclusive
        System.out.println("Generated Score: " + score);

        String grade;
        String message;

        // Determine the grade using if-else statements
        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else if (score >= 60) {
            grade = "D";
        } else {
            grade = "F";
        }

        // Provide a personalized message based on the grade using switch
        switch (grade) {
            case "A":
                message = "Excellent work!";
                break;
            case "B":
                message = "Great job!";
                break;
            case "C":
                message = "Good effort!";
                break;
            case "D":
                message = "Needs improvement.";
                break;
            case "F":
                message = "Failed. Better luck next time!";
                break;
            default:
                message = "Unknown grade.";
                break;
        }

        // Output the grade and message
        System.out.println("You've earned a " + grade + "! " + message);
    }
}
```

**Explanation:**

1. **Random Score Generation:** Generates a score between 0 and 100.

2. **Grade Assignment (`if-else`):**
    - **A:** 90-100
    - **B:** 80-89
    - **C:** 70-79
    - **D:** 60-69
    - **F:** Below 60

3. **Personalized Message (`switch`):** Based on the assigned grade, a corresponding message is selected.

4. **Output:** Prints the grade along with the personalized message.

---

## **Assignment 6: "The Time Traveler's Challenge"**

**Objective:** Introducing loops and user input.

**Solution:**

```java
import java.util.Scanner;

public class TimeTravelersChallenge {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input;
        
        while (true) {
            // Prompt the user to enter a year or 'STOP' to exit
            System.out.print("Enter a year to check if it's a leap year (or type 'STOP' to exit): ");
            input = scanner.nextLine();

            // Check if the user wants to stop
            if (input.equalsIgnoreCase("STOP")) {
                System.out.println("Exiting the Time Traveler's Challenge. Safe travels!");
                break;
            }

            try {
                // Convert input to integer
                int year = Integer.parseInt(input);

                // Check if the year is a leap year
                if (isLeapYear(year)) {
                    System.out.println(year + " is a leap year.");
                } else {
                    System.out.println(year + " is not a leap year.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input! Please enter a valid year or 'STOP' to exit.");
            }
        }

        scanner.close();
    }

    // Method to determine if a year is a leap year
    public static boolean isLeapYear(int year) {
        // A year is a leap year if it's divisible by 4,
        // but years divisible by 100 are not leap years unless divisible by 400
        if (year % 4 != 0) {
            return false;
        } else if (year % 100 != 0) {
            return true;
        } else return year % 400 == 0;
    }
}
```

**Explanation:**

1. **User Input Loop (`while`):** Continuously prompts the user to enter a year or type "STOP" to exit.

2. **Input Handling:**
    - **Exit Condition:** If the user types "STOP" (case-insensitive), the loop breaks, and the program exits.
    - **Year Validation:** Attempts to parse the input as an integer. If parsing fails, it notifies the user of invalid input.

3. **Leap Year Check (`isLeapYear` method):**
    - **Basic Rule:** A year is a leap year if it's divisible by 4.
    - **Exception:** If the year is divisible by 100, it must also be divisible by 400 to be a leap year.

4. **Output:** Informs the user whether the entered year is a leap year.

---

## **Assignment 7: "The Treasure Hunt"**

**Objective:** Combine loops, random number generation, and control structures.

**Solution:**

```java
import java.util.Random;
import java.util.Scanner;

public class TreasureHunt {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        // Generate random treasure coordinates between 1 and 10 for both x and y
        int treasureX = random.nextInt(10) + 1; // 1 to 10
        int treasureY = random.nextInt(10) + 1; // 1 to 10

        // Uncomment the following lines to see the treasure location (for debugging)
        // System.out.println("Treasure Location: (" + treasureX + ", " + treasureY + ")");

        System.out.println("Welcome to the Treasure Hunt!");
        System.out.println("Guess the treasure's location on a 10x10 grid (coordinates between 1 and 10).");
        System.out.println("You have 5 attempts to find the treasure.");

        boolean found = false;

        // Allow the player 5 attempts
        for (int attempt = 1; attempt <= 5; attempt++) {
            System.out.println("\nAttempt " + attempt + ":");

            // Prompt the player to enter x coordinate
            int guessX = 0;
            while (true) {
                System.out.print("Enter your guess for X (1-10): ");
                String inputX = scanner.nextLine();
                try {
                    guessX = Integer.parseInt(inputX);
                    if (guessX >= 1 && guessX <= 10) {
                        break;
                    } else {
                        System.out.println("Please enter a number between 1 and 10.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Invalid input! Please enter a valid integer.");
                }
            }

            // Prompt the player to enter y coordinate
            int guessY = 0;
            while (true) {
                System.out.print("Enter your guess for Y (1-10): ");
                String inputY = scanner.nextLine();
                try {
                    guessY = Integer.parseInt(inputY);
                    if (guessY >= 1 && guessY <= 10) {
                        break;
                    } else {
                        System.out.println("Please enter a number between 1 and 10.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Invalid input! Please enter a valid integer.");
                }
            }

            // Check if the guess is correct
            if (guessX == treasureX && guessY == treasureY) {
                System.out.println("Congratulations! You've found the treasure at (" + treasureX + ", " + treasureY + ")!");
                found = true;
                break;
            } else {
                System.out.println("Too far! Try again!");
            }
        }

        // If the treasure wasn't found after 5 attempts
        if (!found) {
            System.out.println("\nGame over! The treasure was at (" + treasureX + ", " + treasureY + ").");
        }

        scanner.close();
    }
}
```

**Explanation:**

1. **Treasure Location Generation:**
    - Randomly generates `treasureX` and `treasureY` between 1 and 10.

2. **Game Instructions:** Provides the player with information about the game and the number of attempts.

3. **Attempt Loop (`for`):** Allows the player up to 5 attempts to guess the correct coordinates.

4. **Input Validation:**
    - Ensures that the player enters integers between 1 and 10 for both `X` and `Y` coordinates.
    - Handles invalid inputs gracefully by prompting the user again.

5. **Guess Checking:**
    - If both `guessX` and `guessY` match the treasure's coordinates, the player wins, and the loop breaks.
    - If not, informs the player that the guess is too far and continues to the next attempt.

6. **Game Conclusion:**
    - If the player doesn't find the treasure within 5 attempts, reveals the treasure's location.