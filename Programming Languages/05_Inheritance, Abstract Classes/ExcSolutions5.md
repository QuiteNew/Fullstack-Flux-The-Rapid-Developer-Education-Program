## **Assignment 1: The Journey of a Hero's Vehicle**

### **Goal**:
Create a `Vehicle` class with attributes for model, number of passengers, gas tank capacity, and fuel consumption. Add methods to calculate how far the vehicle can go with a full tank and compare the range of multiple vehicles.

### **Solution**:

```java
// Vehicle.java
public class Vehicle {
    // Attributes
    private String model;
    private int numberOfPassengers;
    private double gasTankCapacity; // in liters
    private double fuelConsumption; // liters per 100 km

    // Constructor
    public Vehicle(String model, int numberOfPassengers, double gasTankCapacity, double fuelConsumption) {
        this.model = model;
        this.numberOfPassengers = numberOfPassengers;
        this.gasTankCapacity = gasTankCapacity;
        this.fuelConsumption = fuelConsumption;
    }

    // Method to calculate range with a full tank
    public double calculateRange() {
        return (gasTankCapacity / fuelConsumption) * 100;
    }

    // Method to compare range with another vehicle
    public String compareRange(Vehicle other) {
        double thisRange = this.calculateRange();
        double otherRange = other.calculateRange();

        if (thisRange > otherRange) {
            return this.model + " can go farther (" + thisRange + " km) than " + other.model + " (" + otherRange + " km).";
        } else if (thisRange < otherRange) {
            return other.model + " can go farther (" + otherRange + " km) than " + this.model + " (" + thisRange + " km).";
        } else {
            return this.model + " and " + other.model + " have the same range (" + thisRange + " km).";
        }
    }

    // Main method to test the Vehicle class
    public static void main(String[] args) {
        // Instantiate vehicle objects
        Vehicle vehicle1 = new Vehicle("Speedster", 2, 50.0, 5.0);
        Vehicle vehicle2 = new Vehicle("RoadRunner", 4, 60.0, 6.0);

        // Calculate and print ranges
        System.out.println(vehicle1.model + " can travel " + vehicle1.calculateRange() + " km on a full tank.");
        System.out.println(vehicle2.model + " can travel " + vehicle2.calculateRange() + " km on a full tank.");

        // Compare ranges
        System.out.println(vehicle1.compareRange(vehicle2));
    }
}
```

### **Explanation**:

1. **Vehicle Class**:
    - **Attributes**: `model`, `numberOfPassengers`, `gasTankCapacity`, and `fuelConsumption`.
    - **Constructor**: Initializes the attributes.
    - **calculateRange()**: Calculates how far the vehicle can travel on a full tank using the formula:
      \[
      \text{Range} = \left( \frac{\text{Gas Tank Capacity}}{\text{Fuel Consumption}} \right) \times 100
      \]
    - **compareRange(Vehicle other)**: Compares the range of the current vehicle with another vehicle and returns a message indicating which one can travel farther.

2. **Main Method**:
    - Creates two `Vehicle` objects: `vehicle1` and `vehicle2`.
    - Calculates and prints the range of each vehicle.
    - Compares the ranges of the two vehicles and prints the result.

### **Sample Output**:

```
Speedster can travel 1000.0 km on a full tank.
RoadRunner can travel 1000.0 km on a full tank.
Speedster and RoadRunner have the same range (1000.0 km).
```

---

## **Assignment 2: Utility Management in the Hero’s Hideout**

### **Goal**:
Create a `Utility` class with attributes like the name of the utility and price. Initialize these using a constructor. Then, create an array of `Utility` objects, calculate the total cost, find the most expensive utility, and compute the average price.

### **Solution**:

```java
// Utility.java
public class Utility {
    // Attributes
    private String name;
    private double price;

    // Constructor
    public Utility(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // Getters
    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    // Main method to manage utilities
    public static void main(String[] args) {
        // Create an array of 6 Utility objects
        Utility[] utilities = new Utility[6];
        utilities[0] = new Utility("Heating", 120.50);
        utilities[1] = new Utility("Electricity", 85.75);
        utilities[2] = new Utility("Water", 45.30);
        utilities[3] = new Utility("Internet", 60.00);
        utilities[4] = new Utility("Security System", 150.00);
        utilities[5] = new Utility("Garbage Collection", 30.25);

        double totalCost = 0;
        double maxPrice = utilities[0].getPrice();
        String mostExpensive = utilities[0].getName();

        // Calculate total cost and find the most expensive utility
        for (Utility utility : utilities) {
            totalCost += utility.getPrice();
            if (utility.getPrice() > maxPrice) {
                maxPrice = utility.getPrice();
                mostExpensive = utility.getName();
            }
        }

        // Calculate average price
        double averagePrice = totalCost / utilities.length;

        // Display the results
        System.out.println("Total Utility Cost: $" + totalCost);
        System.out.println("Most Expensive Utility: " + mostExpensive + " ($" + maxPrice + ")");
        System.out.println("Average Utility Price: $" + averagePrice);
    }
}
```

### **Explanation**:

1. **Utility Class**:
    - **Attributes**: `name` and `price`.
    - **Constructor**: Initializes the utility's name and price.
    - **Getters**: Methods to access the private attributes.

2. **Main Method**:
    - Creates an array of 6 `Utility` objects with different types and prices.
    - Iterates through the array to calculate the total cost and determine the most expensive utility.
    - Calculates the average price by dividing the total cost by the number of utilities.
    - Prints out the total cost, most expensive utility, and average price.

### **Sample Output**:

```
Total Utility Cost: $491.3
Most Expensive Utility: Security System ($150.0)
Average Utility Price: $81.88333333333334
```

---

## **Assignment 3: Building the Hero's Dream Car**

### **Goal**:
Design a `Car` class composed of parts like `Engine`, `Wheel`, and `Door`. Each part has its own behaviors. Allow interactions such as starting the engine, opening doors, inflating a wheel, and closing the trunk.

### **Solution**:

```java
// Car.java
public class Car {
    // Nested Engine class
    class Engine {
        private boolean isRunning;

        public Engine() {
            this.isRunning = false;
        }

        public void start() {
            if (!isRunning) {
                isRunning = true;
                System.out.println("Engine started.");
            } else {
                System.out.println("Engine is already running.");
            }
        }

        public void stop() {
            if (isRunning) {
                isRunning = false;
                System.out.println("Engine stopped.");
            } else {
                System.out.println("Engine is already off.");
            }
        }

        public boolean isRunning() {
            return isRunning;
        }
    }

    // Nested Wheel class
    class Wheel {
        private boolean isInflated;

        public Wheel() {
            this.isInflated = true;
        }

        public void inflate() {
            if (!isInflated) {
                isInflated = true;
                System.out.println("Wheel inflated.");
            } else {
                System.out.println("Wheel is already inflated.");
            }
        }

        public void deflate() {
            if (isInflated) {
                isInflated = false;
                System.out.println("Wheel deflated.");
            } else {
                System.out.println("Wheel is already deflated.");
            }
        }

        public boolean isInflated() {
            return isInflated;
        }
    }

    // Nested Door class
    class Door {
        private boolean isOpen;

        public Door() {
            this.isOpen = false;
        }

        public void open() {
            if (!isOpen) {
                isOpen = true;
                System.out.println("Door opened.");
            } else {
                System.out.println("Door is already open.");
            }
        }

        public void close() {
            if (isOpen) {
                isOpen = false;
                System.out.println("Door closed.");
            } else {
                System.out.println("Door is already closed.");
            }
        }

        public boolean isOpen() {
            return isOpen;
        }
    }

    // Car attributes
    private Engine engine;
    private Wheel[] wheels;
    private Door[] doors;
    private boolean isTrunkClosed;

    // Car constructor
    public Car(int numberOfWheels, int numberOfDoors) {
        engine = new Engine();
        wheels = new Wheel[numberOfWheels];
        doors = new Door[numberOfDoors];
        isTrunkClosed = true;

        // Initialize wheels and doors
        for (int i = 0; i < numberOfWheels; i++) {
            wheels[i] = new Wheel();
        }
        for (int i = 0; i < numberOfDoors; i++) {
            doors[i] = new Door();
        }
    }

    // Methods to interact with car parts
    public void startEngine() {
        engine.start();
    }

    public void stopEngine() {
        engine.stop();
    }

    public void openAllDoors() {
        for (Door door : doors) {
            door.open();
        }
    }

    public void closeAllDoors() {
        for (Door door : doors) {
            door.close();
        }
    }

    public void inflateWheel(int wheelIndex) {
        if (wheelIndex >= 0 && wheelIndex < wheels.length) {
            wheels[wheelIndex].inflate();
        } else {
            System.out.println("Invalid wheel index.");
        }
    }

    public void deflateWheel(int wheelIndex) {
        if (wheelIndex >= 0 && wheelIndex < wheels.length) {
            wheels[wheelIndex].deflate();
        } else {
            System.out.println("Invalid wheel index.");
        }
    }

    public void closeTrunk() {
        if (!isTrunkClosed) {
            isTrunkClosed = true;
            System.out.println("Trunk closed.");
        } else {
            System.out.println("Trunk is already closed.");
        }
    }

    public void openTrunk() {
        if (isTrunkClosed) {
            isTrunkClosed = false;
            System.out.println("Trunk opened.");
        } else {
            System.out.println("Trunk is already open.");
        }
    }

    // Main method to test the Car class
    public static void main(String[] args) {
        // Create a Car with 4 wheels and 2 doors
        Car heroCar = new Car(4, 2);

        // Start the engine
        heroCar.startEngine();

        // Open all doors
        heroCar.openAllDoors();

        // Inflate the first wheel (if needed)
        heroCar.inflateWheel(0);

        // Open the trunk
        heroCar.openTrunk();

        // Close the trunk
        heroCar.closeTrunk();

        // Stop the engine
        heroCar.stopEngine();
    }
}
```

### **Explanation**:

1. **Nested Classes**:
    - **Engine**: Can be started and stopped. Keeps track of whether it's running.
    - **Wheel**: Can be inflated or deflated. Keeps track of its inflation status.
    - **Door**: Can be opened or closed. Keeps track of whether it's open.

2. **Car Class**:
    - **Attributes**: Contains an `Engine` object, an array of `Wheel` objects, an array of `Door` objects, and a boolean `isTrunkClosed`.
    - **Constructor**: Initializes the engine, wheels, doors, and sets the trunk to closed.
    - **Methods**: Provides methods to start/stop the engine, open/close all doors, inflate/deflate a specific wheel, and open/close the trunk.

3. **Main Method**:
    - Creates a `Car` object named `heroCar` with 4 wheels and 2 doors.
    - Demonstrates interactions by starting the engine, opening doors, inflating a wheel, and managing the trunk.

### **Sample Output**:

```
Engine started.
Door opened.
Door opened.
Wheel is already inflated.
Trunk opened.
Trunk closed.
Engine stopped.
```

---

## **Assignment 4: Emergency Situation: Wheel Deflation**

### **Goal**:
Modify the `Car` class to handle emergency situations like deflated tires or an empty gas tank by adding methods to check tire pressure and manage the gas tank.

### **Solution**:

```java
// CarWithEmergency.java
public class CarWithEmergency {
    // Nested Engine class
    class Engine {
        private boolean isRunning;

        public Engine() {
            this.isRunning = false;
        }

        public void start() {
            if (!isRunning) {
                isRunning = true;
                System.out.println("Engine started.");
            } else {
                System.out.println("Engine is already running.");
            }
        }

        public void stop() {
            if (isRunning) {
                isRunning = false;
                System.out.println("Engine stopped.");
            } else {
                System.out.println("Engine is already off.");
            }
        }

        public boolean isRunning() {
            return isRunning;
        }
    }

    // Nested Wheel class
    class Wheel {
        private boolean isInflated;

        public Wheel() {
            this.isInflated = true;
        }

        public void inflate() {
            if (!isInflated) {
                isInflated = true;
                System.out.println("Wheel inflated.");
            } else {
                System.out.println("Wheel is already inflated.");
            }
        }

        public void deflate() {
            if (isInflated) {
                isInflated = false;
                System.out.println("Wheel deflated.");
            } else {
                System.out.println("Wheel is already deflated.");
            }
        }

        public boolean isInflated() {
            return isInflated;
        }

        // Method to check air pressure and trigger warning
        public void checkPressure() {
            if (!isInflated) {
                System.out.println("Warning: Wheel is deflated!");
            } else {
                System.out.println("Wheel pressure is normal.");
            }
        }
    }

    // Nested GasTank class
    class GasTank {
        private double capacity; // in liters
        private double currentFuel;

        public GasTank(double capacity) {
            this.capacity = capacity;
            this.currentFuel = capacity; // start with full tank
        }

        public void emptyTank() {
            currentFuel = 0;
            System.out.println("Gas tank is now empty!");
        }

        public void refillTank() {
            currentFuel = capacity;
            System.out.println("Gas tank refilled.");
        }

        public double getCurrentFuel() {
            return currentFuel;
        }

        public void consumeFuel(double amount) {
            if (currentFuel >= amount) {
                currentFuel -= amount;
                System.out.println("Consumed " + amount + " liters of fuel.");
            } else {
                currentFuel = 0;
                System.out.println("Fuel exhausted!");
            }
        }
    }

    // Car attributes
    private Engine engine;
    private Wheel[] wheels;
    private GasTank gasTank;
    private boolean isTrunkClosed;

    // Car constructor
    public CarWithEmergency(int numberOfWheels, double gasTankCapacity) {
        engine = new Engine();
        wheels = new Wheel[numberOfWheels];
        gasTank = new GasTank(gasTankCapacity);
        isTrunkClosed = true;

        // Initialize wheels
        for (int i = 0; i < numberOfWheels; i++) {
            wheels[i] = new Wheel();
        }
    }

    // Methods to interact with car parts
    public void startEngine() {
        engine.start();
    }

    public void stopEngine() {
        engine.stop();
    }

    public void deflateWheel(int wheelIndex) {
        if (wheelIndex >= 0 && wheelIndex < wheels.length) {
            wheels[wheelIndex].deflate();
        } else {
            System.out.println("Invalid wheel index.");
        }
    }

    public void checkAllWheelsPressure() {
        for (int i = 0; i < wheels.length; i++) {
            System.out.print("Wheel " + (i + 1) + ": ");
            wheels[i].checkPressure();
        }
    }

    public void refillGasTank() {
        gasTank.refillTank();
    }

    public void consumeFuel(double amount) {
        gasTank.consumeFuel(amount);
    }

    // Main method to simulate emergency
    public static void main(String[] args) {
        // Create a Car with 4 wheels and a 60-liter gas tank
        CarWithEmergency heroCar = new CarWithEmergency(4, 60.0);

        // Start the engine
        heroCar.startEngine();

        // Simulate fuel consumption
        heroCar.consumeFuel(50.0);

        // Empty the gas tank
        heroCar.consumeFuel(15.0); // This will trigger fuel exhaustion

        // Stop the engine
        heroCar.stopEngine();

        // Deflate the second wheel
        heroCar.deflateWheel(1);

        // Check all wheels' pressure
        heroCar.checkAllWheelsPressure();

        // Refuel the gas tank
        heroCar.refillGasTank();
    }
}
```

### **Explanation**:

1. **GasTank Class**:
    - **Attributes**: `capacity` and `currentFuel`.
    - **Methods**:
        - `emptyTank()`: Empties the gas tank.
        - `refillTank()`: Refills the gas tank to full capacity.
        - `consumeFuel(double amount)`: Consumes a specified amount of fuel. If the fuel is insufficient, it sets `currentFuel` to 0 and notifies that the fuel is exhausted.

2. **Wheel Class Enhancements**:
    - Added `checkPressure()` method to check if the wheel is inflated and trigger a warning if it's deflated.

3. **CarWithEmergency Class**:
    - **Attributes**: Contains `Engine`, array of `Wheel`, and `GasTank`.
    - **Constructor**: Initializes the engine, wheels, and gas tank.
    - **Methods**:
        - `deflateWheel(int wheelIndex)`: Deflates a specific wheel.
        - `checkAllWheelsPressure()`: Checks the pressure of all wheels.
        - `refillGasTank()`: Refills the gas tank.
        - `consumeFuel(double amount)`: Consumes a specified amount of fuel.

4. **Main Method**:
    - Creates a `CarWithEmergency` object with 4 wheels and a 60-liter gas tank.
    - Starts the engine, consumes fuel, handles fuel exhaustion, stops the engine, deflates a wheel, checks wheel pressure, and refills the gas tank.

### **Sample Output**:

```
Engine started.
Consumed 50.0 liters of fuel.
Consumed 15.0 liters of fuel.
Fuel exhausted!
Engine stopped.
Wheel deflated.
Wheel 1: Wheel pressure is normal.
Wheel 2: Warning: Wheel is deflated!
Wheel 3: Wheel pressure is normal.
Wheel 4: Wheel pressure is normal.
Gas tank refilled.
```

---

## **Assignment 5: The Hero’s Smart Dashboard**

### **Goal**:
Use Java’s `Math` and `String` API classes to enhance the hero's car dashboard, showing various statistics and alerts such as current date, time, fuel level, tire status, tire wear, and engine efficiency.

### **Solution**:

```java
// SmartDashboard.java
import java.util.Date;
import java.text.SimpleDateFormat;

public class SmartDashboard {
    // Attributes
    private double fuelLevel; // in liters
    private double[] tireWear; // percentage per tire
    private double engineEfficiency; // example metric

    // Constructor
    public SmartDashboard(double fuelLevel, double engineEfficiency) {
        this.fuelLevel = fuelLevel;
        this.engineEfficiency = engineEfficiency;
        // Initialize tire wear for 4 tires at 0%
        tireWear = new double[4];
        for (int i = 0; i < tireWear.length; i++) {
            tireWear[i] = 0.0;
        }
    }

    // Method to display current date and time
    public void displayDateTime() {
        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateTime = formatter.format(now);
        System.out.println("Current Date and Time: " + dateTime);
    }

    // Method to display fuel level
    public void displayFuelLevel() {
        System.out.println("Fuel Level: " + fuelLevel + " liters");
        if (fuelLevel < 10.0) {
            System.out.println("Alert: Low fuel!");
        }
    }

    // Method to display tire status
    public void displayTireStatus() {
        for (int i = 0; i < tireWear.length; i++) {
            System.out.println("Tire " + (i + 1) + " Wear: " + tireWear[i] + "%");
            if (tireWear[i] > 75.0) {
                System.out.println("Alert: Tire " + (i + 1) + " needs replacement.");
            }
        }
    }

    // Method to calculate and display tire wear
    public void calculateTireWear(double distanceTraveled) {
        // Simple wear calculation: wear increases by 0.05% per km
        for (int i = 0; i < tireWear.length; i++) {
            tireWear[i] += distanceTraveled * 0.05;
            if (tireWear[i] > 100.0) {
                tireWear[i] = 100.0;
            }
        }
    }

    // Method to display engine efficiency
    public void displayEngineEfficiency() {
        // Example: engine efficiency = fuelLevel / engineEfficiency metric
        double efficiency = Math.round((fuelLevel / engineEfficiency) * 100.0) / 100.0;
        System.out.println("Engine Efficiency: " + efficiency + " km/liter");
    }

    // Main method to simulate the dashboard
    public static void main(String[] args) {
        // Create a SmartDashboard with 50 liters of fuel and an efficiency metric of 5.0
        SmartDashboard dashboard = new SmartDashboard(50.0, 5.0);

        // Display date and time
        dashboard.displayDateTime();

        // Display fuel level
        dashboard.displayFuelLevel();

        // Simulate driving 100 km
        dashboard.calculateTireWear(100.0);

        // Display tire status
        dashboard.displayTireStatus();

        // Display engine efficiency
        dashboard.displayEngineEfficiency();

        // Update fuel level after consumption
        dashboard.fuelLevel -= 20.0;
        System.out.println("\nAfter consuming 20 liters of fuel:");

        // Display updated fuel level
        dashboard.displayFuelLevel();
    }
}
```

### **Explanation**:

1. **SmartDashboard Class**:
    - **Attributes**:
        - `fuelLevel`: Current fuel level in liters.
        - `tireWear`: Array representing wear percentage for each tire.
        - `engineEfficiency`: A metric to calculate engine efficiency.

    - **Constructor**: Initializes fuel level, engine efficiency, and sets all tire wear percentages to 0%.

2. **Methods**:
    - `displayDateTime()`: Uses `Date` and `SimpleDateFormat` to display the current date and time.
    - `displayFuelLevel()`: Shows the current fuel level and alerts if it's below 10 liters.
    - `displayTireStatus()`: Displays the wear percentage of each tire and alerts if any tire wear exceeds 75%.
    - `calculateTireWear(double distanceTraveled)`: Increases tire wear based on the distance traveled. Here, tire wear increases by 0.05% per kilometer.
    - `displayEngineEfficiency()`: Calculates and displays engine efficiency using the `Math` class for rounding.

3. **Main Method**:
    - Creates a `SmartDashboard` object with 50 liters of fuel and an efficiency metric of 5.0.
    - Displays the current date and time.
    - Displays the current fuel level.
    - Simulates driving 100 km, which increases tire wear.
    - Displays tire status and engine efficiency.
    - Simulates consuming additional fuel and displays the updated fuel level.

### **Sample Output**:

```
Current Date and Time: 2024-04-27 15:30:45
Fuel Level: 50.0 liters
Tire 1 Wear: 5.0%
Tire 2 Wear: 5.0%
Tire 3 Wear: 5.0%
Tire 4 Wear: 5.0%
Engine Efficiency: 10.0 km/liter

After consuming 20 liters of fuel:
Fuel Level: 30.0 liters
```

*Note: The actual date and time will vary based on when you run the program.*

---

## **Assignment 6: Vehicle Comparison: Choose the Best Companion**

### **Goal**:
Compare cars using both the `==` operator and the `equals()` method. Understand the difference between reference equality (`==`) and value equality (`equals()`).

### **Solution**:

```java
// CarComparison.java
public class CarComparison {
    // Car class with basic attributes
    static class Car {
        private String model;
        private String color;
        private int year;

        // Constructor
        public Car(String model, String color, int year) {
            this.model = model;
            this.color = color;
            this.year = year;
        }

        // Overriding equals() method for value comparison
        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null || getClass() != obj.getClass())
                return false;
            Car car = (Car) obj;
            return year == car.year &&
                   model.equals(car.model) &&
                   color.equals(car.color);
        }

        // Overriding toString() for better output readability
        @Override
        public String toString() {
            return model + " (" + color + ", " + year + ")";
        }
    }

    // Main method to compare cars
    public static void main(String[] args) {
        // Create several Car objects
        Car car1 = new Car("Falcon", "Red", 2020);
        Car car2 = new Car("Falcon", "Red", 2020);
        Car car3 = car1; // Reference to car1
        Car car4 = new Car("Eagle", "Blue", 2021);

        // Using '==' operator to compare
        System.out.println("Using '==' operator:");
        System.out.println("car1 == car2: " + (car1 == car2)); // false
        System.out.println("car1 == car3: " + (car1 == car3)); // true

        // Using 'equals()' method to compare
        System.out.println("\nUsing 'equals()' method:");
        System.out.println("car1.equals(car2): " + car1.equals(car2)); // true
        System.out.println("car1.equals(car3): " + car1.equals(car3)); // true
        System.out.println("car1.equals(car4): " + car1.equals(car4)); // false

        // Modify car2's color
        System.out.println("\nAfter modifying car2's color:");
        // Since attributes are private, let's assume we have setters or recreate car2
        car2 = new Car("Falcon", "Green", 2020);
        System.out.println("car1.equals(car2): " + car1.equals(car2)); // false

        // Observe object references
        System.out.println("\nObject References:");
        System.out.println("car1: " + car1);
        System.out.println("car2: " + car2);
        System.out.println("car3: " + car3);
        System.out.println("car4: " + car4);
    }
}
```

### **Explanation**:

1. **Car Class**:
    - **Attributes**: `model`, `color`, and `year`.
    - **Constructor**: Initializes the car's model, color, and year.
    - **equals() Method**: Overridden to compare cars based on their attributes (`model`, `color`, `year`).
    - **toString() Method**: Overridden to provide a readable representation of the car object.

2. **Main Method**:
    - Creates four `Car` objects:
        - `car1` and `car2` have the same attributes but are different objects.
        - `car3` is a reference to `car1`.
        - `car4` has different attributes.
    - **Using `==` Operator**:
        - `car1 == car2`: Checks if both references point to the same object (expected `false`).
        - `car1 == car3`: Checks if both references point to the same object (expected `true`).
    - **Using `equals()` Method**:
        - `car1.equals(car2)`: Checks if the objects have the same attribute values (expected `true`).
        - `car1.equals(car3)`: Checks if the objects have the same attribute values (expected `true`).
        - `car1.equals(car4)`: Checks if the objects have the same attribute values (expected `false`).
    - **Modifying `car2`**:
        - Reassigns `car2` to a new `Car` object with a different color.
        - Now, `car1.equals(car2)` should return `false`.
    - **Printing Object References**:
        - Displays the current state of all car objects.

### **Sample Output**:

```
Using '==' operator:
car1 == car2: false
car1 == car3: true

Using 'equals()' method:
car1.equals(car2): true
car1.equals(car3): true
car1.equals(car4): false

After modifying car2's color:
car1.equals(car2): false

Object References:
car1: Falcon (Red, 2020)
car2: Falcon (Green, 2020)
car3: Falcon (Red, 2020)
car4: Eagle (Blue, 2021)
```

### **Key Points**:

- **`==` Operator**: Checks if two references point to the same object in memory.
- **`equals()` Method**: Checks if two objects are logically equal based on their attributes. By default, it behaves like `==`, but when overridden, it can compare based on values.

---

## **Assignment 7: Hero's Data Logger: Command Prompt Adventure**

### **Goal**:
Create a program that takes inputs like mission name, mission date, and fuel consumed via the command line, parses these inputs using wrapper classes, and displays the hero’s travel data, including binary, octal, and hexadecimal representations of the fuel consumed.

### **Solution**:

```java
// DataLogger.java
public class DataLogger {
    public static void main(String[] args) {
        // Check if the required number of arguments are provided
        if (args.length < 3) {
            System.out.println("Usage: java DataLogger <MissionName> <MissionDate> <FuelConsumed>");
            System.out.println("Example: java DataLogger RescueMission 2024-09-15 35.5");
            return;
        }

        // Parse command-line arguments
        String missionName = args[0];
        String missionDate = args[1];
        String fuelConsumedStr = args[2];

        try {
            // Convert fuelConsumed to double using Double wrapper class
            double fuelConsumed = Double.parseDouble(fuelConsumedStr);

            // Display mission data
            System.out.println("Mission Name: " + missionName);
            System.out.println("Mission Date: " + missionDate);
            System.out.println("Fuel Consumed: " + fuelConsumed + " liters");

            // Convert fuelConsumed to integer for binary, octal, and hexadecimal
            int fuelInt = (int) fuelConsumed;

            String binary = Integer.toBinaryString(fuelInt);
            String octal = Integer.toOctalString(fuelInt);
            String hexadecimal = Integer.toHexString(fuelInt).toUpperCase();

            System.out.println("Fuel Consumed (Binary): " + binary);
            System.out.println("Fuel Consumed (Octal): " + octal);
            System.out.println("Fuel Consumed (Hexadecimal): " + hexadecimal);

        } catch (NumberFormatException e) {
            System.out.println("Error: FuelConsumed must be a numeric value.");
        }
    }
}
```

### **Explanation**:

1. **Command-Line Arguments**:
    - The program expects three command-line arguments:
        1. `MissionName`: Name of the mission.
        2. `MissionDate`: Date of the mission (e.g., `2024-09-15`).
        3. `FuelConsumed`: Amount of fuel consumed in liters (e.g., `35.5`).

2. **Parsing Inputs**:
    - **Mission Name** and **Mission Date** are taken as `String` inputs.
    - **Fuel Consumed** is parsed into a `double` using `Double.parseDouble()`.
    - If the fuel consumed value is not numeric, a `NumberFormatException` is caught, and an error message is displayed.

3. **Displaying Data**:
    - Prints the mission name, date, and fuel consumed.
    - Converts the integer part of `fuelConsumed` to binary, octal, and hexadecimal using Java's `Integer` wrapper class methods:
        - `Integer.toBinaryString(int)`
        - `Integer.toOctalString(int)`
        - `Integer.toHexString(int)`

4. **Sample Usage**:
    - To run the program, use the command line as follows:
      ```
      java DataLogger RescueMission 2024-09-15 35.5
      ```

### **Sample Output**:

```
Mission Name: RescueMission
Mission Date: 2024-09-15
Fuel Consumed: 35.5 liters
Fuel Consumed (Binary): 100011
Fuel Consumed (Octal): 43
Fuel Consumed (Hexadecimal): 23
```

### **Notes**:

- The program truncates the `fuelConsumed` value to an integer for binary, octal, and hexadecimal representations. For `35.5`, it uses `35`.
- To handle decimal parts in different representations, more complex parsing would be required, which is beyond the scope of this assignment.
- Always ensure to provide the correct number of command-line arguments to avoid runtime errors.