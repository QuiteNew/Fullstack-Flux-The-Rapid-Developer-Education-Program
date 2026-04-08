# Java Threads Exercises and Solutions

## Exercise 1: Print thread properties

For Each Thread:
– Print the
• Name
• Priority
• Check if thread the is “alive”
• Thread Declaration (Name, Priority & Group)
– Change the priority of each previously created
thread (meaning, increase its priority by 1, i.e. its
count in the FOR cycle)

## Exercise 2: Create TickTack class
That has name and rate attributes and implement Runnable interface where Tick/Tack will be after the rate period example: rate 500 : Tick , sleep period 500ms, Tack, sleep period 500ms, Tick....
Create a constructor of TickTack that will obtain a value for a name and the clock’s ticking rate
– E.g. Seiko, 600
Create 2 clocks with different names and ticking rates and run them

## Exercise 3: Synchronize Access to a Shared Variable
Create a program where two threads increment the same int variable 1000 times each. Use synchronization to ensure that the final value of the variable is 2000.

## Exercise 4: Utilize a Thread Pool
Write a program that uses a thread pool to execute multiple tasks concurrently. Use Executors.newFixedThreadPool to create a pool and submit a few simple tasks that print out messages to the console.
Example:

pool-1-thread-3 (Start) message = 2 <br>
pool-1-thread-1 (Start) message = 0 <br>
pool-1-thread-4 (Start) message = 3 <br>
pool-1-thread-5 (Start) message = 4 <br>
pool-1-thread-2 (Start) message = 1 <br>
pool-1-thread-2 (End) <br>
pool-1-thread-1 (End) <br>
pool-1-thread-4 (End) <br>
pool-1-thread-5 (End) <br>
pool-1-thread-5 (Start) message = 8 <br>
pool-1-thread-3 (End) <br>
pool-1-thread-3 (Start) message = 9 <br>
pool-1-thread-1 (Start) message = 6 <br>
pool-1-thread-2 (Start) message = 5 <br>
pool-1-thread-4 (Start) message = 7 <br>
pool-1-thread-2 (End) <br>
pool-1-thread-1 (End) <br>
pool-1-thread-4 (End) <br>
pool-1-thread-3 (End) <br>
pool-1-thread-5 (End) <br>
Finished all threads

## Exercise 5: Restaurant Kitchen Simulation (Producer–Consumer Pattern)

### Objective
Implement a multithreaded Java application that simulates the workflow in a restaurant kitchen using the **Producer–Consumer pattern**. The program should demonstrate **thread synchronization**, **bounded buffers**, and coordination between multiple threads using `wait()` and `notifyAll()`.

### Problem Description
In a busy restaurant kitchen, **chefs prepare dishes** and place them on a **serving counter**, while **waiters pick up the dishes** and deliver them to customers.

However, the serving counter has **limited capacity**, meaning:
- Chefs **cannot place new dishes** if the counter is full.
- Waiters **cannot take dishes** if the counter is empty.

Threads must coordinate properly so that chefs wait when the counter is full and waiters wait when there are no dishes available.

### Requirements

#### 1. Serving Counter (Shared Resource)
Implement a class that represents a **serving counter**.

The counter should:
- Act as a **bounded buffer** with a fixed capacity.
- Store prepared dishes.
- Provide synchronized methods to:
  - **Add a dish** to the counter (used by chefs).
  - **Take a dish** from the counter (used by waiters).

Use `wait()` and `notifyAll()` to coordinate threads when:
- The counter is **full**.
- The counter is **empty**.

#### 2. Chef (Producer)
Implement a `Chef` class that implements `Runnable`.

Each chef should:
- Randomly prepare dishes from a predefined list.
- Simulate cooking time using `Thread.sleep()`.
- Place prepared dishes on the serving counter.

#### 3. Waiter (Consumer)
Implement a `Waiter` class that implements `Runnable`.

Each waiter should:
- Take dishes from the serving counter.
- Simulate the time required to serve customers.
- Display messages when a dish is delivered.

#### 4. Main Simulation
Create a main program that:

- Creates a serving counter with a **limited capacity** (e.g., 5 dishes).
- Creates multiple **chef threads (producers)**.
- Creates multiple **waiter threads (consumers)**.
- Starts all threads and runs the simulation for a fixed amount of time (e.g., 15 seconds).
- Prints messages describing the system activity.

### Expected Concepts Demonstrated
Your implementation should demonstrate:

- **Multithreading in Java**
- **Producer–Consumer pattern**
- **Thread synchronization**
- **Use of `wait()` and `notifyAll()`**
- **Bounded buffer management**
- **Coordination between producers and consumers**

## Exercise 6: Thread Racing Simulation

### Objective
Create a Java program that demonstrates **thread racing** and the **non-deterministic behavior of concurrent threads**. Multiple threads will simulate runners racing on a track, each moving forward at random speeds until one runner reaches the finish line.

### Problem Description
In this simulation, several runners compete in a race. Each runner is represented by a separate thread. During the race:

- Every runner advances forward by a **random number of steps**.
- Each runner sleeps for a **random time interval** to simulate different running speeds.
- The race continues until **one runner reaches the finish line**.
- Once a runner wins, the race ends and the other runners stop.

This exercise demonstrates how threads run independently and may finish in different orders each time the program is executed.

### Requirements

#### 1. Runner Class
Create a `Runner` class that extends `Thread`.

Each runner should:
- Have a **name** representing the runner.
- Move forward along a **track of fixed length** (e.g., 100 units).
- Advance a **random number of steps** (e.g., between 1 and 5) during each iteration.
- Pause briefly using `Thread.sleep()` to simulate different speeds.

#### 2. Race Progress
Each runner should print its progress along the track using a **visual representation** of the race track.

#### 3. Determining the Winner
- When a runner reaches or passes the finish line, they are declared the **winner**.
- The program should print a message announcing the winner.
- Other runners should stop once a winner has been determined.


#### 4. Main Program
The main program should:

- Create several runner threads (e.g., 4 runners).
- Assign each runner a unique name.
- Start all threads simultaneously to begin the race.

### Concepts Demonstrated

This exercise demonstrates:

- **Thread creation using the Thread class**
- **Concurrent execution of multiple threads**
- **Non-deterministic behavior of threads**
- **Thread sleeping using `Thread.sleep()`**
- **Basic thread coordination through shared variables**

## Exercise 7: Thread Synchronization – Bank Account Transactions

### Objective
Create a Java program that demonstrates **thread synchronization** when multiple threads access and modify a shared resource. The program should simulate **bank account transactions** performed concurrently by different threads.

### Problem Description
In a banking system, multiple transactions such as deposits and withdrawals may occur at the same time. If several threads access the same bank account without proper synchronization, **race conditions** may occur and lead to incorrect account balances.

Your task is to implement a simulation where multiple threads perform deposits and withdrawals on a **shared bank account**, while ensuring **data consistency using synchronized methods**.

### Requirements

#### 1. BankAccount Class
Create a class `BankAccount` that represents a shared bank account.

The class should:
- Store the **current balance** of the account.
- Provide a **synchronized deposit method** that:
  - Adds a specified amount to the balance.
  - Displays the balance before and after the transaction.
- Provide a **synchronized withdraw method** that:
  - Subtracts a specified amount from the balance if sufficient funds exist.
  - Prints an error message if the withdrawal cannot be completed.
- Provide a method to **retrieve the current balance**.

Use `Thread.sleep()` inside the transaction methods to simulate **processing delays**, helping illustrate the importance of synchronization.

#### 2. Deposit Task
Create a class `DepositTask` that implements `Runnable`.

This class should:
- Receive a reference to the shared `BankAccount`.
- Receive the amount to deposit.
- Perform the deposit operation when the thread runs.

#### 3. Withdraw Task
Create a class `WithdrawTask` that implements `Runnable`.

This class should:
- Receive a reference to the shared `BankAccount`.
- Receive the amount to withdraw.
- Perform the withdrawal operation when the thread runs.

#### 4. Main Program
The main program should:

- Create a **shared BankAccount** with an initial balance (e.g., $1000).
- Create multiple transaction threads, including:
  - Several **deposit threads**
  - Several **withdrawal threads**
- Start all threads to perform transactions concurrently.
- Wait for all threads to complete using `join()`.
- Print the **final account balance** after all transactions are finished.

