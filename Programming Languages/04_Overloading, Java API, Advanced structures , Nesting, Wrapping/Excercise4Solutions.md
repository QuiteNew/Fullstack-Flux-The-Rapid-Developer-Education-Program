## 1. **The Hero’s Stats Tracker**

**Objective:** Practice creating and using simple classes and methods.

### **Solution:**

We'll create a `Hero` class with `health` and `strength` attributes. The class will include methods to display stats, take damage, and power up. In the `main` method, we'll create a `Hero` object, display its stats, apply damage and a power-up, and display the stats again.

### **Code:**

```java
// Hero.java
public class Hero {
    // Attributes
    private int health;
    private int strength;

    // Constructor
    public Hero(int health, int strength) {
        this.health = health;
        this.strength = strength;
    }

    // Method to display stats
    public void displayStats() {
        System.out.println("Hero Stats:");
        System.out.println("Health: " + health);
        System.out.println("Strength: " + strength);
        System.out.println("--------------------------");
    }

    // Method to take damage
    public void takeDamage(int damage) {
        health -= damage;
        if (health < 0) {
            health = 0;
        }
        System.out.println("Hero took " + damage + " damage.");
    }

    // Method to power up
    public void powerUp(int increaseStrength) {
        strength += increaseStrength;
        System.out.println("Hero's strength increased by " + increaseStrength + ".");
    }

    // Main method to test the Hero class
    public static void main(String[] args) {
        // Create a Hero object with 100 health and 50 strength
        Hero hero = new Hero(100, 50);

        // Display initial stats
        hero.displayStats();

        // Apply damage of 20
        hero.takeDamage(20);

        // Apply power-up of 10 strength
        hero.powerUp(10);

        // Display updated stats
        hero.displayStats();
    }
}
```

### **Explanation:**

1. **Attributes:**
    - `health` and `strength` are defined as private integers to encapsulate the data.

2. **Constructor:**
    - Initializes the `health` and `strength` attributes when a `Hero` object is created.

3. **Methods:**
    - `displayStats()`: Prints the current health and strength of the hero.
    - `takeDamage(int damage)`: Reduces the hero's health by the damage value. Ensures health doesn't go below zero.
    - `powerUp(int increaseStrength)`: Increases the hero's strength by the specified value.

4. **Main Method:**
    - Creates a `Hero` object with initial health and strength.
    - Displays the hero's stats.
    - Applies damage and a power-up.
    - Displays the updated stats to reflect the changes.

### **Sample Output:**

```
Hero Stats:
Health: 100
Strength: 50
--------------------------
Hero took 20 damage.
Hero's strength increased by 10.
Hero Stats:
Health: 80
Strength: 60
--------------------------
```

---

## 2. **The Car Showroom**

**Objective:** Work with constructors, getter and setter methods.

### **Solution:**

We'll create a `Car` class with attributes for `type`, `noSeats`, `fuelType`, and `color`. The class will include getter and setter methods for each attribute, as well as a parameterized constructor and a default constructor. In the `main` method, we'll create two `Car` objects using different constructors, modify the second car's attributes using setters, and print the details of both cars.

### **Code:**

```java
// Car.java
public class Car {
    // Attributes
    private String type;
    private int noSeats;
    private String fuelType;
    private String color;

    // Parameterized Constructor
    public Car(String type, int noSeats, String fuelType, String color) {
        this.type = type;
        this.noSeats = noSeats;
        this.fuelType = fuelType;
        this.color = color;
    }

    // Default Constructor
    public Car() {
        this.type = "Sedan";
        this.noSeats = 5;
        this.fuelType = "Petrol";
        this.color = "White";
    }

    // Getter and Setter methods
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public int getNoSeats() {
        return noSeats;
    }

    public void setNoSeats(int noSeats) {
        this.noSeats = noSeats;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    // Method to display car details
    public void displayDetails() {
        System.out.println("Car Details:");
        System.out.println("Type: " + type);
        System.out.println("Number of Seats: " + noSeats);
        System.out.println("Fuel Type: " + fuelType);
        System.out.println("Color: " + color);
        System.out.println("--------------------------");
    }

    // Main method to test the Car class
    public static void main(String[] args) {
        // Create a Car object using parameterized constructor
        Car car1 = new Car("SUV", 7, "Diesel", "Black");

        // Create a Car object using default constructor
        Car car2 = new Car();

        // Modify car2's attributes using setter methods
        car2.setType("Hatchback");
        car2.setNoSeats(4);
        car2.setFuelType("Electric");
        car2.setColor("Red");

        // Display details of both cars
        car1.displayDetails();
        car2.displayDetails();
    }
}
```

### **Explanation:**

1. **Attributes:**
    - `type`, `noSeats`, `fuelType`, and `color` are defined as private to encapsulate the data.

2. **Constructors:**
    - **Parameterized Constructor:** Allows initializing all attributes when creating a `Car` object.
    - **Default Constructor:** Assigns default values to the attributes.

3. **Getter and Setter Methods:**
    - Provide access to private attributes and allow modification of their values.

4. **displayDetails() Method:**
    - Prints the details of the car.

5. **Main Method:**
    - Creates `car1` using the parameterized constructor with specific values.
    - Creates `car2` using the default constructor.
    - Uses setter methods to change `car2`'s attributes.
    - Displays details of both cars.

### **Sample Output:**

```
Car Details:
Type: SUV
Number of Seats: 7
Fuel Type: Diesel
Color: Black
--------------------------
Car Details:
Type: Hatchback
Number of Seats: 4
Fuel Type: Electric
Color: Red
--------------------------
```

---

## 3. **The Fleet Manager**

**Objective:** Introduce arrays of objects and methods that operate on them.

### **Solution:**

We'll create an array of 5 `Car` objects representing the fleet. Some cars will be initialized with specific values, while others will use default values. We'll implement methods to assign values to each car, print the details of each car, and find the car with the most seats.

### **Code:**

```java
// FleetManager.java
class Car {
    // Attributes
    private String type;
    private int noSeats;
    private String fuelType;
    private String color;

    // Parameterized Constructor
    public Car(String type, int noSeats, String fuelType, String color) {
        this.type = type;
        this.noSeats = noSeats;
        this.fuelType = fuelType;
        this.color = color;
    }

    // Default Constructor
    public Car() {
        this.type = "Sedan";
        this.noSeats = 5;
        this.fuelType = "Petrol";
        this.color = "White";
    }

    // Getter methods
    public String getType() {
        return type;
    }

    public int getNoSeats() {
        return noSeats;
    }

    public String getFuelType() {
        return fuelType;
    }

    public String getColor() {
        return color;
    }

    // Method to display car details
    public void displayDetails() {
        System.out.println("Type: " + type + ", Seats: " + noSeats + ", Fuel: " + fuelType + ", Color: " + color);
    }
}

public class FleetManager {
    public static void main(String[] args) {
        // Create an array of 5 Car objects
        Car[] fleet = new Car[5];

        // Assign values to each car
        fleet[0] = new Car("SUV", 7, "Diesel", "Black");
        fleet[1] = new Car(); // Default values
        fleet[2] = new Car("Hatchback", 4, "Electric", "Red");
        fleet[3] = new Car(); // Default values
        fleet[4] = new Car("Minivan", 8, "Gasoline", "Blue");

        // Print details of each car
        System.out.println("Fleet Details:");
        for (int i = 0; i < fleet.length; i++) {
            System.out.print("Car " + (i + 1) + ": ");
            fleet[i].displayDetails();
        }

        // Find the car with the most seats
        Car maxSeatsCar = fleet[0];
        for (int i = 1; i < fleet.length; i++) {
            if (fleet[i].getNoSeats() > maxSeatsCar.getNoSeats()) {
                maxSeatsCar = fleet[i];
            }
        }

        // Output the car with the most seats
        System.out.println("\nCar with the most seats:");
        maxSeatsCar.displayDetails();
    }
}
```

### **Explanation:**

1. **Car Class:**
    - Same as in Assignment 2, with attributes, constructors, getters, and a method to display details.

2. **FleetManager Class:**
    - **Main Method:**
        - Creates an array `fleet` of 5 `Car` objects.
        - Initializes some cars with specific values and others with default values.
        - Uses a loop to print the details of each car in the fleet.
        - Uses another loop to find the car with the most seats by comparing the `noSeats` attribute.
        - Displays the details of the car with the most seats.

### **Sample Output:**

```
Fleet Details:
Car 1: Type: SUV, Seats: 7, Fuel: Diesel, Color: Black
Car 2: Type: Sedan, Seats: 5, Fuel: Petrol, Color: White
Car 3: Type: Hatchback, Seats: 4, Fuel: Electric, Color: Red
Car 4: Type: Sedan, Seats: 5, Fuel: Petrol, Color: White
Car 5: Type: Minivan, Seats: 8, Fuel: Gasoline, Color: Blue

Car with the most seats:
Type: Minivan, Seats: 8, Fuel: Gasoline, Color: Blue
```

---

## 4. **The Magic Number Box**

**Objective:** Practice using arrays and loops.

### **Solution:**

We'll create a `MagicBox` class that generates an array of 10 random integers between 1 and 100. The class will include methods to find the number of even numbers and to calculate the average of all numbers. In the `main` method, we'll create a `MagicBox` object, print the numbers, and display the count of even numbers and the average.

### **Code:**

```java
// MagicBox.java
import java.util.Random;

public class MagicBox {
    // Attribute
    private int[] numbers;

    // Constructor to generate 10 random integers between 1 and 100
    public MagicBox() {
        numbers = new int[10];
        Random rand = new Random();
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = rand.nextInt(100) + 1; // Generates numbers from 1 to 100
        }
    }

    // Method to find the number of even numbers
    public int findEvens() {
        int count = 0;
        for (int num : numbers) {
            if (num % 2 == 0) {
                count++;
            }
        }
        return count;
    }

    // Method to calculate the average of all numbers
    public double calculateAverage() {
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return (double) sum / numbers.length;
    }

    // Method to display the numbers
    public void displayNumbers() {
        System.out.print("MagicBox Numbers: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    // Main method to test the MagicBox class
    public static void main(String[] args) {
        // Create a MagicBox object
        MagicBox box = new MagicBox();

        // Display the numbers
        box.displayNumbers();

        // Find and display the number of even numbers
        int evens = box.findEvens();
        System.out.println("Number of even numbers: " + evens);

        // Calculate and display the average
        double average = box.calculateAverage();
        System.out.printf("Average of numbers: %.2f\n", average);
    }
}
```

### **Explanation:**

1. **Attributes:**
    - `numbers`: An array of 10 integers.

2. **Constructor:**
    - Initializes the `numbers` array with random integers between 1 and 100 using the `Random` class.

3. **Methods:**
    - `findEvens()`: Iterates through the `numbers` array and counts how many numbers are even.
    - `calculateAverage()`: Calculates the sum of all numbers and divides by the number of elements to find the average.
    - `displayNumbers()`: Prints all numbers in the `numbers` array.

4. **Main Method:**
    - Creates a `MagicBox` object.
    - Displays the generated numbers.
    - Displays the count of even numbers.
    - Displays the average of the numbers with two decimal places.

### **Sample Output:**

```
MagicBox Numbers: 23 56 78 45 12 89 34 67 90 11 
Number of even numbers: 5
Average of numbers: 48.50
```

*Note: The actual numbers will vary each time you run the program because they are randomly generated.*

---

## 5. **The Dungeon Explorer**

**Objective:** Practice using classes, loops, and conditional statements.

### **Solution:**

We'll create a `Room` class with `creatureStrength` and `creatureHealth` attributes. We'll create an array of 5 `Room` objects with random values. The player will have fixed strength and health. The `fight` method will simulate battles between the player and creatures in each room. Based on the outcome, we'll determine whether the player escapes the dungeon or is defeated.

### **Code:**

```java
// DungeonExplorer.java
import java.util.Random;

class Room {
    // Attributes
    private int creatureStrength;
    private int creatureHealth;

    // Constructor to assign random values
    public Room() {
        Random rand = new Random();
        this.creatureStrength = rand.nextInt(50) + 10; // Strength between 10 and 59
        this.creatureHealth = rand.nextInt(100) + 20;  // Health between 20 and 119
    }

    // Getter methods
    public int getCreatureStrength() {
        return creatureStrength;
    }

    public int getCreatureHealth() {
        return creatureHealth;
    }
}

public class DungeonExplorer {
    // Player attributes
    private int playerStrength;
    private int playerHealth;

    // Constructor
    public DungeonExplorer(int strength, int health) {
        this.playerStrength = strength;
        this.playerHealth = health;
    }

    // Method to simulate fight
    public boolean fight(Room room) {
        System.out.println("Encountered a creature with Strength: " + room.getCreatureStrength() + " and Health: " + room.getCreatureHealth());

        // Simple fight logic: if player's strength is greater than creature's strength, player wins
        if (playerStrength >= room.getCreatureStrength()) {
            System.out.println("Player defeats the creature!");
            return true;
        } else {
            // Creature deals damage to player
            playerHealth -= room.getCreatureStrength();
            System.out.println("Creature attacks! Player's health reduced by " + room.getCreatureStrength());
            if (playerHealth > 0) {
                System.out.println("Player survives with " + playerHealth + " health remaining.");
                return true;
            } else {
                System.out.println("Player has been defeated!");
                return false;
            }
        }
    }

    public static void main(String[] args) {
        // Initialize player with fixed strength and health
        DungeonExplorer player = new DungeonExplorer(50, 100);

        // Create an array of 5 Room objects
        Room[] dungeon = new Room[5];
        for (int i = 0; i < dungeon.length; i++) {
            dungeon[i] = new Room();
        }

        // Simulate fights in each room
        boolean escaped = true;
        for (int i = 0; i < dungeon.length; i++) {
            System.out.println("\nEntering Room " + (i + 1));
            boolean result = player.fight(dungeon[i]);
            if (!result) {
                escaped = false;
                break;
            }
        }

        // Final outcome
        if (escaped) {
            System.out.println("\nCongratulations! You have escaped the dungeon.");
        } else {
            System.out.println("\nYou were defeated in the dungeon.");
        }
    }
}
```

### **Explanation:**

1. **Room Class:**
    - **Attributes:**
        - `creatureStrength`: Randomly assigned between 10 and 59.
        - `creatureHealth`: Randomly assigned between 20 and 119.
    - **Constructor:**
        - Initializes the attributes with random values.

2. **DungeonExplorer Class:**
    - **Attributes:**
        - `playerStrength`: Player's strength (fixed).
        - `playerHealth`: Player's health (fixed).
    - **Constructor:**
        - Initializes the player's strength and health.
    - **fight(Room room) Method:**
        - Simulates a fight between the player and a creature.
        - If the player's strength is greater than or equal to the creature's strength, the player wins.
        - Otherwise, the creature attacks the player, reducing the player's health.
        - Returns `true` if the player survives, `false` if defeated.
    - **Main Method:**
        - Creates a `DungeonExplorer` object with fixed strength and health.
        - Creates an array of 5 `Room` objects.
        - Iterates through each room, simulating fights.
        - Determines if the player escapes or is defeated based on fight outcomes.

### **Sample Output:**

```
Entering Room 1
Encountered a creature with Strength: 35 and Health: 80
Player defeats the creature!

Entering Room 2
Encountered a creature with Strength: 60 and Health: 50
Creature attacks! Player's health reduced by 60
Player survives with 40 health remaining.

Entering Room 3
Encountered a creature with Strength: 45 and Health: 70
Player defeats the creature!

Entering Room 4
Encountered a creature with Strength: 55 and Health: 90
Creature attacks! Player's health reduced by 55
Player has been defeated!

You were defeated in the dungeon.
```

*Note: The actual output will vary each time you run the program due to random values assigned to creatures.*

---

## 6. **The Inventory Manager**

**Objective:** Practice using arrays of objects and methods with parameters.

### **Solution:**

We'll create a `Product` class with `name`, `price`, and `quantity` attributes. The class will include methods to increase or decrease the quantity. In the `main` method, we'll create an array of 5 `Product` objects, display their details, restock some items, update quantities after sales, and find the product with the highest quantity.

### **Code:**

```java
// InventoryManager.java
class Product {
    // Attributes
    private String name;
    private double price;
    private int quantity;

    // Constructor
    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    // Getter methods
    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    // Method to increase quantity (restocking)
    public void increaseQuantity(int amount) {
        if (amount > 0) {
            quantity += amount;
            System.out.println(amount + " units added to " + name + ".");
        } else {
            System.out.println("Invalid restock amount for " + name + ".");
        }
    }

    // Method to decrease quantity (sales)
    public void decreaseQuantity(int amount) {
        if (amount > 0 && amount <= quantity) {
            quantity -= amount;
            System.out.println(amount + " units sold from " + name + ".");
        } else {
            System.out.println("Invalid sale amount for " + name + ".");
        }
    }

    // Method to display product details
    public void displayDetails() {
        System.out.println("Product: " + name + ", Price: $" + price + ", Quantity: " + quantity);
    }
}

public class InventoryManager {
    // Method to find the product with the highest quantity
    public static Product findHighestQuantity(Product[] products) {
        Product highest = products[0];
        for (int i = 1; i < products.length; i++) {
            if (products[i].getQuantity() > highest.getQuantity()) {
                highest = products[i];
            }
        }
        return highest;
    }

    public static void main(String[] args) {
        // Create an array of 5 Product objects
        Product[] inventory = new Product[5];
        inventory[0] = new Product("Laptop", 999.99, 10);
        inventory[1] = new Product("Smartphone", 499.99, 25);
        inventory[2] = new Product("Headphones", 79.99, 50);
        inventory[3] = new Product("Monitor", 199.99, 15);
        inventory[4] = new Product("Keyboard", 49.99, 30);

        // Display initial product details
        System.out.println("Initial Inventory:");
        for (Product p : inventory) {
            p.displayDetails();
        }

        System.out.println("\nRestocking Products:");
        // Restock some products
        inventory[0].increaseQuantity(5);  // Laptop: +5
        inventory[2].increaseQuantity(20); // Headphones: +20

        System.out.println("\nUpdating Sales:");
        // Update quantities after sales
        inventory[1].decreaseQuantity(5);  // Smartphone: -5
        inventory[3].decreaseQuantity(10); // Monitor: -10
        inventory[4].decreaseQuantity(15); // Keyboard: -15

        // Display updated product details
        System.out.println("\nUpdated Inventory:");
        for (Product p : inventory) {
            p.displayDetails();
        }

        // Find and display the product with the highest quantity
        Product highestQtyProduct = findHighestQuantity(inventory);
        System.out.println("\nProduct with the Highest Quantity:");
        highestQtyProduct.displayDetails();
    }
}
```

### **Explanation:**

1. **Product Class:**
    - **Attributes:**
        - `name`: Name of the product.
        - `price`: Price of the product.
        - `quantity`: Available quantity in inventory.
    - **Constructor:**
        - Initializes the attributes.
    - **Methods:**
        - `increaseQuantity(int amount)`: Adds the specified amount to the product's quantity.
        - `decreaseQuantity(int amount)`: Subtracts the specified amount from the product's quantity if valid.
        - `displayDetails()`: Prints the product's details.

2. **InventoryManager Class:**
    - **findHighestQuantity(Product[] products) Method:**
        - Iterates through the array of products to find the one with the highest quantity.
    - **Main Method:**
        - Creates an array of 5 `Product` objects with initial values.
        - Displays the initial inventory.
        - Restocks some products by increasing their quantities.
        - Updates quantities after sales by decreasing their quantities.
        - Displays the updated inventory.
        - Finds and displays the product with the highest quantity.

### **Sample Output:**

```
Initial Inventory:
Product: Laptop, Price: $999.99, Quantity: 10
Product: Smartphone, Price: $499.99, Quantity: 25
Product: Headphones, Price: $79.99, Quantity: 50
Product: Monitor, Price: $199.99, Quantity: 15
Product: Keyboard, Price: $49.99, Quantity: 30

Restocking Products:
5 units added to Laptop.
20 units added to Headphones.

Updating Sales:
5 units sold from Smartphone.
10 units sold from Monitor.
15 units sold from Keyboard.

Updated Inventory:
Product: Laptop, Price: $999.99, Quantity: 15
Product: Smartphone, Price: $499.99, Quantity: 20
Product: Headphones, Price: $79.99, Quantity: 70
Product: Monitor, Price: $199.99, Quantity: 5
Product: Keyboard, Price: $49.99, Quantity: 15

Product with the Highest Quantity:
Product: Headphones, Price: $79.99, Quantity: 70
```

---

## 7. **The Galactic Fleet Commander**

**Objective:** Combine concepts of arrays, objects, and methods to solve a more complex problem.

### **Solution:**

We'll create a `Spaceship` class with attributes for `name`, `crewSize`, `firepower`, and `shieldStrength`. We'll create an array of 5 `Spaceship` objects. The class will include methods to increase firepower and repair shields. We'll simulate a battle where each ship either increases its firepower or repairs shields based on a random event. After the battle, we'll display the ship with the highest firepower.

### **Code:**

```java
// GalacticFleetCommander.java
import java.util.Random;

class Spaceship {
    // Attributes
    private String name;
    private int crewSize;
    private int firepower;
    private int shieldStrength;

    // Constructor
    public Spaceship(String name, int crewSize, int firepower, int shieldStrength) {
        this.name = name;
        this.crewSize = crewSize;
        this.firepower = firepower;
        this.shieldStrength = shieldStrength;
    }

    // Getter methods
    public String getName() {
        return name;
    }

    public int getCrewSize() {
        return crewSize;
    }

    public int getFirepower() {
        return firepower;
    }

    public int getShieldStrength() {
        return shieldStrength;
    }

    // Method to increase firepower
    public void increaseFirepower(int amount) {
        firepower += amount;
        System.out.println(name + " firepower increased by " + amount + ". New firepower: " + firepower);
    }

    // Method to repair shields
    public void repairShields(int amount) {
        shieldStrength += amount;
        System.out.println(name + " shield strength repaired by " + amount + ". New shield strength: " + shieldStrength);
    }

    // Method to display spaceship details
    public void displayDetails() {
        System.out.println("Name: " + name + ", Crew Size: " + crewSize + ", Firepower: " + firepower + ", Shield Strength: " + shieldStrength);
    }
}

public class GalacticFleetCommander {
    public static void main(String[] args) {
        // Create an array of 5 Spaceship objects
        Spaceship[] fleet = new Spaceship[5];
        fleet[0] = new Spaceship("Nebula", 50, 200, 150);
        fleet[1] = new Spaceship("Orion", 60, 180, 160);
        fleet[2] = new Spaceship("Phoenix", 55, 220, 140);
        fleet[3] = new Spaceship("Titan", 65, 190, 155);
        fleet[4] = new Spaceship("Eclipse", 58, 210, 145);

        Random rand = new Random();

        // Simulate a battle
        System.out.println("Battle Simulation Begins!\n");
        for (int i = 0; i < fleet.length; i++) {
            System.out.println("Processing " + fleet[i].getName() + ":");
            // Random event: 0 for firepower increase, 1 for shield repair
            int event = rand.nextInt(2);
            if (event == 0) {
                // Increase firepower by a random amount between 10 and 30
                int increase = rand.nextInt(21) + 10;
                fleet[i].increaseFirepower(increase);
            } else {
                // Repair shields by a random amount between 5 and 25
                int repair = rand.nextInt(21) + 5;
                fleet[i].repairShields(repair);
            }
            System.out.println();
        }

        // Find the spaceship with the highest firepower
        Spaceship highestFirepowerShip = fleet[0];
        for (int i = 1; i < fleet.length; i++) {
            if (fleet[i].getFirepower() > highestFirepowerShip.getFirepower()) {
                highestFirepowerShip = fleet[i];
            }
        }

        // Display all spaceships
        System.out.println("Fleet Status After Battle:");
        for (Spaceship ship : fleet) {
            ship.displayDetails();
        }

        // Display the spaceship with the highest firepower
        System.out.println("\nSpaceship with the Highest Firepower:");
        highestFirepowerShip.displayDetails();
    }
}
```

### **Explanation:**

1. **Spaceship Class:**
    - **Attributes:**
        - `name`: Name of the spaceship.
        - `crewSize`: Number of crew members.
        - `firepower`: Offensive capability.
        - `shieldStrength`: Defensive capability.
    - **Constructor:**
        - Initializes all attributes.
    - **Methods:**
        - `increaseFirepower(int amount)`: Increases the spaceship's firepower by the specified amount.
        - `repairShields(int amount)`: Repairs the spaceship's shields by the specified amount.
        - `displayDetails()`: Prints the spaceship's details.

2. **GalacticFleetCommander Class:**
    - **Main Method:**
        - Creates an array of 5 `Spaceship` objects with initial values.
        - Simulates a battle where each spaceship either increases its firepower or repairs its shields based on a random event.
            - Uses `Random` to determine the event type and the amount to increase or repair.
        - After the battle, displays the status of all spaceships.
        - Finds and displays the spaceship with the highest firepower.

### **Sample Output:**

```
Battle Simulation Begins!

Processing Nebula:
Nebula firepower increased by 25. New firepower: 225

Processing Orion:
Orion shield strength repaired by 18. New shield strength: 178

Processing Phoenix:
Phoenix shield strength repaired by 12. New shield strength: 152

Processing Titan:
Titan firepower increased by 15. New firepower: 205

Processing Eclipse:
Eclipse shield strength repaired by 20. New shield strength: 165

Fleet Status After Battle:
Name: Nebula, Crew Size: 50, Firepower: 225, Shield Strength: 150
Name: Orion, Crew Size: 60, Firepower: 180, Shield Strength: 178
Name: Phoenix, Crew Size: 55, Firepower: 220, Shield Strength: 152
Name: Titan, Crew Size: 65, Firepower: 205, Shield Strength: 155
Name: Eclipse, Crew Size: 58, Firepower: 210, Shield Strength: 165

Spaceship with the Highest Firepower:
Name: Nebula, Crew Size: 50, Firepower: 225, Shield Strength: 150
```

*Note: The actual output will vary each time you run the program due to random events.*

---