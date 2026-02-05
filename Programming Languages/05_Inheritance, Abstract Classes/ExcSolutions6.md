## **Assignment 1: "The Tale of the Egg"**

**Objective:** Introduction to inheritance and method overriding.

### **Solution:**

```java
// Parent class Egg
class Egg {
    // Method EGG() displaying a common message
    public void EGG() {
        System.out.println("Each egg has an albumen and a yolk.");
    }

    // Method print() displaying egg properties
    public void print() {
        System.out.println("The egg is a nutritional product.");
    }
}

// Subclass OstrichEgg inheriting from Egg
class OstrichEgg extends Egg {
    // Overriding the EGG() method to provide specific implementation
    @Override
    public void EGG() {
        System.out.println("The albumen and yolk of an ostrich egg are the largest.");
    }
}

// Main class to test the Egg and OstrichEgg classes
public class TaleOfTheEgg {
    public static void main(String[] args) {
        // Instantiate an Egg object
        Egg regularEgg = new Egg();
        System.out.println("Regular Egg:");
        regularEgg.EGG();     // Calls Egg's EGG() method
        regularEgg.print();   // Calls Egg's print() method

        System.out.println();

        // Instantiate an OstrichEgg object
        OstrichEgg ostrichEgg = new OstrichEgg();
        System.out.println("Ostrich Egg:");
        ostrichEgg.EGG();    // Calls OstrichEgg's overridden EGG() method
        ostrichEgg.print();  // Calls Egg's print() method (inherited)
    }
}
```

### **Explanation:**

1. **Creating the `Egg` Class:**
    - The `Egg` class serves as the parent class.
    - It has two methods:
        - `EGG()`: Displays a message about the general properties of an egg.
        - `print()`: Displays that the egg is a nutritional product.

2. **Creating the `OstrichEgg` Subclass:**
    - The `OstrichEgg` class extends the `Egg` class, inheriting its methods.
    - It overrides the `EGG()` method to provide a specific message about ostrich eggs.

3. **Testing in the `main` Method:**
    - An instance of `Egg` is created and its methods are called, displaying the messages from the `Egg` class.
    - An instance of `OstrichEgg` is created and its overridden `EGG()` method is called, along with the inherited `print()` method from `Egg`.

4. **Output:**
   ```
   Regular Egg:
   Each egg has an albumen and a yolk.
   The egg is a nutritional product.

   Ostrich Egg:
   The albumen and yolk of an ostrich egg are the largest.
   The egg is a nutritional product.
   ```

---

## **Assignment 2: "The Cookie Factory"**

**Objective:** Constructor overloading and method overriding.

### **Solution:**

```java
// Base class Cookie
class Cookie {
    protected double weight; // in grams
    protected String shape;

    // Default constructor
    public Cookie() {
        this.weight = 50.0; // default weight
        this.shape = "Round"; // default shape
    }

    // Parameterized constructor
    public Cookie(double weight, String shape) {
        this.weight = weight;
        this.shape = shape;
    }

    // Method to print cookie details
    public void print() {
        System.out.println("Cookie Details:");
        System.out.println("Weight: " + weight + " grams");
        System.out.println("Shape: " + shape);
    }
}

// Subclass ChocolateCookie extending Cookie
class ChocolateCookie extends Cookie {
    protected double percentChocolate; // percentage of chocolate

    // Default constructor
    public ChocolateCookie() {
        super(); // Calls Cookie's default constructor
        this.percentChocolate = 30.0; // default percentage
    }

    // Parameterized constructor
    public ChocolateCookie(double weight, String shape, double percentChocolate) {
        super(weight, shape); // Calls Cookie's parameterized constructor
        this.percentChocolate = percentChocolate;
    }

    // Overridden print method to include percentChocolate
    @Override
    public void print() {
        super.print(); // Calls Cookie's print method
        System.out.println("Chocolate Percentage: " + percentChocolate + "%");
    }
}

// Subclass ChocolateCookieWithExtras extending ChocolateCookie
class ChocolateCookieWithExtras extends ChocolateCookie {
    private String extra; // e.g., hazelnuts

    // Constructor
    public ChocolateCookieWithExtras(double weight, String shape, double percentChocolate, String extra) {
        super(weight, shape, percentChocolate); // Calls ChocolateCookie's constructor
        this.extra = extra;
    }

    // Overridden print method to include extras
    @Override
    public void print() {
        super.print(); // Calls ChocolateCookie's print method
        System.out.println("Extra: " + extra);
    }
}

// Main class to test the Cookie classes
public class CookieFactory {
    public static void main(String[] args) {
        // Instantiate a regular Cookie
        Cookie regularCookie = new Cookie();
        System.out.println("Regular Cookie:");
        regularCookie.print();

        System.out.println();

        // Instantiate a ChocolateCookie with parameters
        ChocolateCookie chocCookie = new ChocolateCookie(60.0, "Square", 50.0);
        System.out.println("Chocolate Cookie:");
        chocCookie.print();

        System.out.println();

        // Instantiate a ChocolateCookieWithExtras
        ChocolateCookieWithExtras chocCookieExtras = new ChocolateCookieWithExtras(70.0, "Heart", 60.0, "Hazelnuts");
        System.out.println("Chocolate Cookie with Extras:");
        chocCookieExtras.print();
    }
}
```

### **Explanation:**

1. **Creating the `Cookie` Class:**
    - **Fields:**
        - `weight`: Represents the weight of the cookie in grams.
        - `shape`: Represents the shape of the cookie.
    - **Constructors:**
        - **Default Constructor:** Initializes `weight` to 50 grams and `shape` to "Round".
        - **Parameterized Constructor:** Allows setting custom `weight` and `shape`.
    - **Method `print()`:** Displays the weight and shape of the cookie.

2. **Creating the `ChocolateCookie` Subclass:**
    - **Field:**
        - `percentChocolate`: Represents the percentage of chocolate in the cookie.
    - **Constructors:**
        - **Default Constructor:** Calls the `Cookie`'s default constructor and sets `percentChocolate` to 30%.
        - **Parameterized Constructor:** Allows setting custom `weight`, `shape`, and `percentChocolate`.
    - **Overridden Method `print()`:** Calls the superclass's `print()` method and adds the chocolate percentage.

3. **Creating the `ChocolateCookieWithExtras` Subclass:**
    - **Field:**
        - `extra`: Represents additional ingredients (e.g., hazelnuts).
    - **Constructor:**
        - Calls the `ChocolateCookie`'s parameterized constructor to set `weight`, `shape`, and `percentChocolate`.
        - Sets the `extra` field.
    - **Overridden Method `print()`:** Calls the superclass's `print()` method and adds information about the extra ingredient.

4. **Testing in the `main` Method:**
    - **Regular Cookie:** Created using the default constructor and its details are printed.
    - **Chocolate Cookie:** Created using the parameterized constructor with specific values and its details are printed.
    - **Chocolate Cookie with Extras:** Created with specific values including extras and its details are printed.

5. **Output:**
   ```
   Regular Cookie:
   Cookie Details:
   Weight: 50.0 grams
   Shape: Round

   Chocolate Cookie:
   Cookie Details:
   Weight: 60.0 grams
   Shape: Square
   Chocolate Percentage: 50.0%

   Chocolate Cookie with Extras:
   Cookie Details:
   Weight: 70.0 grams
   Shape: Heart
   Chocolate Percentage: 60.0%
   Extra: Hazelnuts
   ```

---

## **Assignment 3: "The Animal Kingdom"**

**Objective:** Polymorphism and using `instanceof`.

### **Solution:**

```java
// Base class Animal
class Animal {
    protected String name;

    // Constructor
    public Animal(String name) {
        this.name = name;
    }

    // Method onomatopoeia() to be overridden by subclasses
    public void onomatopoeia() {
        System.out.println("There is no onomatopoeia for " + name + ".");
    }
}

// Subclass Dog extending Animal
class Dog extends Animal {
    // Constructor
    public Dog(String name) {
        super(name);
    }

    // Overridden onomatopoeia() method
    @Override
    public void onomatopoeia() {
        System.out.println(name + " says: Woof!");
    }
}

// Subclass Lion extending Animal
class Lion extends Animal {
    // Constructor
    public Lion(String name) {
        super(name);
    }

    // Overridden onomatopoeia() method
    @Override
    public void onomatopoeia() {
        System.out.println(name + " says: Roar!");
    }
}

// Subclass Frog extending Animal
class Frog extends Animal {
    // Constructor
    public Frog(String name) {
        super(name);
    }

    // Overridden onomatopoeia() method
    @Override
    public void onomatopoeia() {
        System.out.println(name + " says: Ribbit!");
    }
}

// Subclass SaraMountainDog extending Dog
class SaraMountainDog extends Dog {
    // Constructor
    public SaraMountainDog(String name) {
        super(name);
    }

    // Method traits() specific to SaraMountainDog
    public void traits() {
        System.out.println(name + " is strong, loyal, and has a thick coat.");
    }
}

// Main class to test polymorphism and instanceof
public class AnimalKingdom {
    public static void main(String[] args) {
        // Create an array of Animal objects with different animals
        Animal[] zoo = new Animal[5];
        zoo[0] = new Dog("Buddy");
        zoo[1] = new Lion("Simba");
        zoo[2] = new Frog("Freddy");
        zoo[3] = new SaraMountainDog("Max");
        zoo[4] = new Animal("GenericAnimal");

        // Iterate through the array and call onomatopoeia()
        for (Animal animal : zoo) {
            animal.onomatopoeia();

            // Use instanceof to check for SaraMountainDog
            if (animal instanceof SaraMountainDog) {
                SaraMountainDog specificDog = (SaraMountainDog) animal;
                specificDog.traits();
            }
        }
    }
}
```

### **Explanation:**

1. **Creating the `Animal` Class:**
    - **Field:**
        - `name`: Represents the name of the animal.
    - **Constructor:**
        - Initializes the `name` field.
    - **Method `onomatopoeia()`:**
        - Prints a generic message indicating no specific sound for the animal.
        - This method is intended to be overridden by subclasses.

2. **Creating Subclasses (`Dog`, `Lion`, `Frog`):**
    - Each subclass extends `Animal` and overrides the `onomatopoeia()` method to provide specific sounds:
        - **Dog:** Prints "Woof!"
        - **Lion:** Prints "Roar!"
        - **Frog:** Prints "Ribbit!"

3. **Creating the `SaraMountainDog` Subclass:**
    - Extends `Dog`, inheriting its properties and methods.
    - Adds a new method `traits()` that prints specific characteristics of a Sara Mountain Dog.

4. **Testing in the `main` Method:**
    - An array of `Animal` objects named `zoo` is created, containing different animal instances, including a `SaraMountainDog` and a generic `Animal`.
    - The program iterates through the `zoo` array and calls the `onomatopoeia()` method for each animal, demonstrating polymorphism as the correct overridden method is invoked based on the object's actual type.
    - The `instanceof` operator checks if the current animal is an instance of `SaraMountainDog`. If so, it casts the object to `SaraMountainDog` and calls the `traits()` method to display specific characteristics.

5. **Output:**
   ```
   Buddy says: Woof!
   Simba says: Roar!
   Freddy says: Ribbit!
   Max says: Woof!
   Max is strong, loyal, and has a thick coat.
   There is no onomatopoeia for GenericAnimal.
   ```

---

## **Assignment 4: "The Orchestra of Instruments"**

**Objective:** Abstract classes and method implementation.

### **Solution:**

```java
// Abstract class Instrument
abstract class Instrument {
    // Abstract method play()
    public abstract void play();

    // Method whatIsPlaying() returning a generic description
    public String whatIsPlaying() {
        return "Instrument";
    }
}

// Subclass Brass extending Instrument
class Brass extends Instrument {
    // Implementing the play() method
    @Override
    public void play() {
        System.out.println("Playing the brass instrument with a bright sound.");
    }

    // Overriding whatIsPlaying() method
    @Override
    public String whatIsPlaying() {
        return "Brass Instrument";
    }
}

// Subclass Percussion extending Instrument
class Percussion extends Instrument {
    // Implementing the play() method
    @Override
    public void play() {
        System.out.println("Playing the percussion instrument with rhythm.");
    }

    // Overriding whatIsPlaying() method
    @Override
    public String whatIsPlaying() {
        return "Percussion Instrument";
    }
}

// Subclass Wired extending Instrument
class Wired extends Instrument {
    // Implementing the play() method
    @Override
    public void play() {
        System.out.println("Playing the wired instrument with harmonious tones.");
    }

    // Overriding whatIsPlaying() method
    @Override
    public String whatIsPlaying() {
        return "Wired Instrument";
    }
}

// Specific instrument Trumpet extending Brass
class Trumpet extends Brass {
    // Implementing the play() method
    @Override
    public void play() {
        System.out.println("Trumpet is playing: Bright and powerful notes.");
    }
}

// Specific instrument Guitar extending Wired
class Guitar extends Wired {
    // Implementing the play() method
    @Override
    public void play() {
        System.out.println("Guitar is playing: Melodious and soothing sounds.");
    }

    // Additional method tweak()
    public void tweak() {
        System.out.println("Tuning the guitar strings for perfect pitch.");
    }
}

// Main class to test the Orchestra of Instruments
public class OrchestraOfInstruments {
    public static void main(String[] args) {
        // Create an array of Instrument objects
        Instrument[] orchestra = new Instrument[4];
        orchestra[0] = new Trumpet();
        orchestra[1] = new Guitar();
        orchestra[2] = new Percussion();
        orchestra[3] = new Brass(); // Generic Brass instrument

        // Iterate through the array, call play() and print instrument type
        for (Instrument instrument : orchestra) {
            instrument.play();
            System.out.println("Type: " + instrument.whatIsPlaying());

            // If the instrument is a Guitar, call tweak()
            if (instrument instanceof Guitar) {
                Guitar guitar = (Guitar) instrument;
                guitar.tweak();
            }

            System.out.println();
        }
    }
}
```

### **Explanation:**

1. **Creating the Abstract Class `Instrument`:**
    - **Abstract Method `play()`:**
        - Must be implemented by all subclasses.
    - **Method `whatIsPlaying()`:**
        - Returns a generic description "Instrument".
        - Can be overridden by subclasses for more specific descriptions.

2. **Creating Subclasses (`Brass`, `Percussion`, `Wired`):**
    - Each subclass extends `Instrument` and implements the `play()` method with behavior specific to the instrument type.
    - Each subclass overrides the `whatIsPlaying()` method to return a more specific type.

3. **Creating Specific Instruments (`Trumpet`, `Guitar`):**
    - **Trumpet:**
        - Extends `Brass` and overrides the `play()` method to provide a specific message.
    - **Guitar:**
        - Extends `Wired` and overrides the `play()` method.
        - Adds an additional method `tweak()` to demonstrate unique behavior.

4. **Testing in the `main` Method:**
    - An array of `Instrument` objects named `orchestra` is created, containing different instrument instances including a generic `Brass` instrument.
    - The program iterates through the `orchestra` array, calls the `play()` method for each instrument, and prints the type using `whatIsPlaying()`.
    - If the instrument is an instance of `Guitar`, it casts the object and calls the `tweak()` method to demonstrate accessing subclass-specific methods.

5. **Output:**
   ```
   Trumpet is playing: Bright and powerful notes.
   Type: Brass Instrument

   Guitar is playing: Melodious and soothing sounds.
   Type: Wired Instrument
   Tuning the guitar strings for perfect pitch.

   Playing the percussion instrument with rhythm.
   Type: Percussion Instrument

   Playing the brass instrument with a bright sound.
   Type: Brass Instrument
   ```

---

## **Assignment 5: "The Family Tree"**

**Objective:** Inheritance and constructor chaining with `super()`.

### **Solution:**

```java
// Base class Person
class Person {
    protected String name;
    protected int age;

    // Constructor for Person
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Method to display person's details
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

// Subclass RoyalFamilyMember extending Person
class RoyalFamilyMember extends Person {
    protected String title;

    // Constructor for RoyalFamilyMember using super() to call Person's constructor
    public RoyalFamilyMember(String name, int age, String title) {
        super(name, age); // Calls Person's constructor
        this.title = title;
    }

    // Overridden method to display royal member's details
    @Override
    public void displayInfo() {
        super.displayInfo(); // Calls Person's displayInfo()
        System.out.println("Title: " + title);
    }
}

// Specific Royal Family Members

// King class
class King extends RoyalFamilyMember {
    public King(String name, int age) {
        super(name, age, "King");
    }
}

// Queen class
class Queen extends RoyalFamilyMember {
    public Queen(String name, int age) {
        super(name, age, "Queen");
    }
}

// Prince class
class Prince extends RoyalFamilyMember {
    public Prince(String name, int age) {
        super(name, age, "Prince");
    }
}

// Main class to test the Family Tree
public class FamilyTree {
    public static void main(String[] args) {
        // Create objects for each royal family member
        King king = new King("Arthur", 50);
        Queen queen = new Queen("Elizabeth", 48);
        Prince prince = new Prince("William", 25);

        // Display their details
        System.out.println("King's Details:");
        king.displayInfo();

        System.out.println("\nQueen's Details:");
        queen.displayInfo();

        System.out.println("\nPrince's Details:");
        prince.displayInfo();
    }
}
```

### **Explanation:**

1. **Creating the `Person` Class:**
    - **Fields:**
        - `name`: Represents the person's name.
        - `age`: Represents the person's age.
    - **Constructor:**
        - Initializes the `name` and `age` fields.
    - **Method `displayInfo()`:**
        - Prints the person's name and age.

2. **Creating the `RoyalFamilyMember` Subclass:**
    - Extends `Person`, inheriting `name` and `age`.
    - **Field:**
        - `title`: Represents the royal title (e.g., King, Queen).
    - **Constructor:**
        - Uses `super(name, age)` to call the `Person` class's constructor, initializing `name` and `age`.
        - Initializes the `title` field.
    - **Overridden Method `displayInfo()`:**
        - Calls the superclass's `displayInfo()` method to print `name` and `age`.
        - Adds printing of the `title`.

3. **Creating Specific Royal Family Member Classes (`King`, `Queen`, `Prince`):**
    - Each class extends `RoyalFamilyMember`.
    - Their constructors call the `RoyalFamilyMember` constructor with specific titles:
        - `King`: "King"
        - `Queen`: "Queen"
        - `Prince`: "Prince"

4. **Testing in the `main` Method:**
    - Instances of `King`, `Queen`, and `Prince` are created with specific names and ages.
    - The `displayInfo()` method is called on each instance to print their details.

5. **Output:**
   ```
   King's Details:
   Name: Arthur
   Age: 50
   Title: King

   Queen's Details:
   Name: Elizabeth
   Age: 48
   Title: Queen

   Prince's Details:
   Name: William
   Age: 25
   Title: Prince
   ```

---

## **Assignment 6: "The Battle of the Superheroes"**

**Objective:** Polymorphism and abstract classes in a battle simulation.

### **Solution:**

```java
// Abstract class Superhero
abstract class Superhero {
    protected String heroName;

    // Constructor
    public Superhero(String heroName) {
        this.heroName = heroName;
    }

    // Abstract method fight()
    public abstract void fight();
}

// Subclass FlyingHero extending Superhero
class FlyingHero extends Superhero {
    // Constructor
    public FlyingHero(String heroName) {
        super(heroName);
    }

    // Implementing fight() method
    @Override
    public void fight() {
        System.out.println(heroName + " takes to the skies and attacks from above!");
    }
}

// Subclass StrengthHero extending Superhero
class StrengthHero extends Superhero {
    // Constructor
    public StrengthHero(String heroName) {
        super(heroName);
    }

    // Implementing fight() method
    @Override
    public void fight() {
        System.out.println(heroName + " uses super strength to overpower enemies!");
    }
}

// Subclass SpeedHero extending Superhero
class SpeedHero extends Superhero {
    // Constructor
    public SpeedHero(String heroName) {
        super(heroName);
    }

    // Implementing fight() method
    @Override
    public void fight() {
        System.out.println(heroName + " moves at lightning speed to dodge attacks and strike swiftly!");
    }
}

// Main class to simulate the battle
public class BattleOfSuperheroes {
    public static void main(String[] args) {
        // Create an array of Superhero objects
        Superhero[] heroes = new Superhero[6];
        heroes[0] = new FlyingHero("SkyMaster");
        heroes[1] = new StrengthHero("PowerPunch");
        heroes[2] = new SpeedHero("FlashBolt");
        heroes[3] = new FlyingHero("AeroStar");
        heroes[4] = new StrengthHero("IronFist");
        heroes[5] = new SpeedHero("QuickSilver");

        // Simulate the battle by calling fight() on each hero
        System.out.println("Battle of the Superheroes Begins!\n");
        for (Superhero hero : heroes) {
            hero.fight();
        }
    }
}
```

### **Explanation:**

1. **Creating the Abstract Class `Superhero`:**
    - **Field:**
        - `heroName`: Represents the name of the superhero.
    - **Constructor:**
        - Initializes the `heroName` field.
    - **Abstract Method `fight()`:**
        - Must be implemented by all subclasses to define how each superhero fights.

2. **Creating Subclasses (`FlyingHero`, `StrengthHero`, `SpeedHero`):**
    - Each subclass extends `Superhero` and provides a unique implementation of the `fight()` method:
        - **FlyingHero:** Describes fighting by flying and attacking from above.
        - **StrengthHero:** Describes fighting using super strength.
        - **SpeedHero:** Describes fighting with high speed and agility.

3. **Testing in the `main` Method:**
    - An array of `Superhero` objects named `heroes` is created, containing various heroes of different types.
    - The program iterates through the `heroes` array and calls the `fight()` method for each hero, demonstrating polymorphism as each hero's specific `fight()` method is invoked based on its actual type.

4. **Output:**
   ```
   Battle of the Superheroes Begins!

   SkyMaster takes to the skies and attacks from above!
   PowerPunch uses super strength to overpower enemies!
   FlashBolt moves at lightning speed to dodge attacks and strike swiftly!
   AeroStar takes to the skies and attacks from above!
   IronFist uses super strength to overpower enemies!
   QuickSilver moves at lightning speed to dodge attacks and strike swiftly!
   ```

---

## **Assignment 7: "The Vehicle Factory"**

**Objective:** Abstract classes and method overloading.

### **Solution:**

```java
// Abstract class Vehicle
abstract class Vehicle {
    protected String model;

    // Constructor
    public Vehicle(String model) {
        this.model = model;
    }

    // Abstract methods move() and refuel()
    public abstract void move();
    public abstract void refuel();
}

// Subclass Car extending Vehicle
class Car extends Vehicle {
    // Constructor
    public Car(String model) {
        super(model);
    }

    // Implementing move() method
    @Override
    public void move() {
        System.out.println(model + " is driving on the road.");
    }

    // Implementing refuel() method
    @Override
    public void refuel() {
        System.out.println("Refueling " + model + " with gasoline.");
    }
}

// Subclass Motorcycle extending Vehicle
class Motorcycle extends Vehicle {
    // Constructor
    public Motorcycle(String model) {
        super(model);
    }

    // Implementing move() method
    @Override
    public void move() {
        System.out.println(model + " is speeding down the highway.");
    }

    // Implementing refuel() method
    @Override
    public void refuel() {
        System.out.println("Refueling " + model + " with gasoline.");
    }
}

// Subclass ElectricCar extending Vehicle
class ElectricCar extends Vehicle {
    // Constructor
    public ElectricCar(String model) {
        super(model);
    }

    // Implementing move() method
    @Override
    public void move() {
        System.out.println(model + " is driving silently on the road.");
    }

    // Implementing refuel() method (overloaded)
    // Original method: refuel()
    @Override
    public void refuel() {
        System.out.println("Charging " + model + " with electricity.");
    }

    // Overloaded method: refuel with charging time
    public void refuel(int chargingTimeInHours) {
        System.out.println("Charging " + model + " for " + chargingTimeInHours + " hours.");
    }
}

// Main class to test the Vehicle Factory
public class VehicleFactory {
    public static void main(String[] args) {
        // Instantiate each vehicle type
        Vehicle car = new Car("Sedan");
        Vehicle motorcycle = new Motorcycle("Harley");
        ElectricCar electricCar = new ElectricCar("Tesla Model S");

        // Call move() and refuel() methods
        System.out.println("Vehicle Operations:\n");

        car.move();
        car.refuel();

        System.out.println();

        motorcycle.move();
        motorcycle.refuel();

        System.out.println();

        electricCar.move();
        electricCar.refuel(); // Calls the overridden refuel()
        electricCar.refuel(5); // Calls the overloaded refuel(int chargingTimeInHours)
    }
}
```

### **Explanation:**

1. **Creating the Abstract Class `Vehicle`:**
    - **Field:**
        - `model`: Represents the model of the vehicle.
    - **Constructor:**
        - Initializes the `model` field.
    - **Abstract Methods `move()` and `refuel()`:**
        - Must be implemented by all subclasses to define how each vehicle moves and refuels.

2. **Creating Subclasses (`Car`, `Motorcycle`, `ElectricCar`):**
    - Each subclass extends `Vehicle` and provides specific implementations of the `move()` and `refuel()` methods:
        - **Car:**
            - **`move()`:** Describes driving on the road.
            - **`refuel()`:** Describes refueling with gasoline.
        - **Motorcycle:**
            - **`move()`:** Describes speeding down the highway.
            - **`refuel()`:** Describes refueling with gasoline.
        - **ElectricCar:**
            - **`move()`:** Describes driving silently on the road.
            - **`refuel()`:** Describes charging with electricity.
            - **Overloaded `refuel(int chargingTimeInHours)`:**
                - Allows specifying the charging time in hours, demonstrating method overloading.

3. **Testing in the `main` Method:**
    - Instances of `Car`, `Motorcycle`, and `ElectricCar` are created with specific models.
    - The `move()` and `refuel()` methods are called on each instance:
        - For `ElectricCar`, both the original and overloaded `refuel()` methods are called to demonstrate method overloading.

4. **Output:**
   ```
   Vehicle Operations:

   Sedan is driving on the road.
   Refueling Sedan with gasoline.

   Harley is speeding down the highway.
   Refueling Harley with gasoline.

   Tesla Model S is driving silently on the road.
   Charging Tesla Model S with electricity.
   Charging Tesla Model S for 5 hours.
   ```