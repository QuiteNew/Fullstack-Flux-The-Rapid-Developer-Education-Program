### 1. **The Hero’s Stats Tracker**
**Objective:** Practice creating and using simple classes and methods.

**Story:** You are a game developer working on a role-playing game. Your task is to create a class to manage a hero's basic stats, like health and strength.

**Tasks:**
1. Create a `Hero` class with attributes for `health` (int) and `strength` (int).
2. Include a method `displayStats` that prints the hero’s current health and strength.
3. Create a method `takeDamage` that reduces the hero's health based on an input damage value.
4. Create a method `powerUp` that increases the hero’s strength by a given value.
5. In the main method, create a `Hero` object, display its stats, apply damage and a power-up, and display the stats again.

---

### 2. **The Car Showroom**
**Objective:** Work with constructors, getter and setter methods.

**Story:** You work in a car showroom and need to manage details of cars. Each car has properties like the type, number of seats, fuel type, and color.

**Tasks:**
1. Create a `Car` class with attributes: `type` (String), `noSeats` (int), `fuelType` (String), and `color` (String).
2. Provide getter and setter methods for each attribute.
3. Create a constructor that initializes all attributes, and another default constructor that assigns default values.
4. In the main class, create two `Car` objects: one using the parameterized constructor and another using the default constructor.
5. Use setter methods to change the second car’s attributes and print the details of both cars using the getter methods.

---

### 3. **The Fleet Manager**
**Objective:** Introduce arrays of objects and methods that operate on them.

**Story:** You are responsible for managing a fleet of vehicles for a company. The fleet consists of multiple cars, and you need to organize and track them.

**Tasks:**
1. Create an array of 5 `Car` objects representing different cars in the fleet.
2. Use a loop to assign values to each car (some with default values).
3. Implement a method that prints the details of each car in the array.
4. Use a loop to find the car with the most seats and output its details.

---

### 4. **The Magic Number Box**
**Objective:** Practice using arrays and loops.

**Story:** You have found a magical box that generates numbers. You need to perform calculations to determine which numbers are special.

**Tasks:**
1. Create a class `MagicBox` that contains an array of 10 random integers between 1 and 100.
2. Include a method `findEvens` that returns the number of even numbers in the array.
3. Create a method `calculateAverage` to find and return the average of all the numbers.
4. In the main method, generate a `MagicBox` object, print the numbers, and display how many of them are even along with the average.

---

### 5. **The Dungeon Explorer**
**Objective:** Practice using classes, loops, and conditional statements.

**Story:** You are an explorer trapped in a dungeon. The dungeon contains a series of rooms, each guarded by a creature. You must defeat the creatures to escape.

**Tasks:**
1. Create a class `Room` with attributes `creatureStrength` (int) and `creatureHealth` (int).
2. Create an array of 5 `Room` objects, each with random values for creature strength and health.
3. Implement a method `fight` where the player (with fixed strength and health) fights the creatures in each room.
4. If the player wins (based on the strength comparison), they proceed to the next room.
5. Output a message indicating whether the player escaped the dungeon or was defeated.

---

### 6. **The Inventory Manager**
**Objective:** Practice using arrays of objects and methods with parameters.

**Story:** You are managing a store’s inventory, and each product has details like name, price, and quantity. You need to update and manage the products in the store.

**Tasks:**
1. Create a class `Product` with attributes `name` (String), `price` (double), and `quantity` (int).
2. Implement methods to increase or decrease the product quantity based on sales or restocking.
3. In the main class, create an array of 5 `Product` objects.
4. Use loops to display product details, restock some items, and update their quantities after sales.
5. Include a method that finds the product with the highest quantity and displays its details.

---

### 7. **The Galactic Fleet Commander**
**Objective:** Combine concepts of arrays, objects, and methods to solve a more complex problem.

**Story:** As a commander of a galactic fleet, you are responsible for managing different spaceships. Each ship has unique attributes, and your mission is to prepare your fleet for an intergalactic battle.

**Tasks:**
1. Create a `Spaceship` class with attributes: `name` (String), `crewSize` (int), `firepower` (int), and `shieldStrength` (int).
2. Create an array of 5 `Spaceship` objects.
3. Implement methods to increase the firepower of a ship and repair its shields.
4. Use a loop to simulate a battle where each ship either increases its firepower or repairs shields, based on a random event.
5. After the battle, display the ship with the highest firepower.