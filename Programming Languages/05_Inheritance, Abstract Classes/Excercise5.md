### Assignment 1: **The Journey of a Hero's Vehicle**
*Storyline*: The student is helping a hero design a special vehicle for an epic adventure.
- **Goal**: Create a `Vehicle` class with attributes for model, number of passengers, gas tank capacity, and fuel consumption. Add methods to calculate how far the vehicle can go with a full tank.
- **To-Do**:
    1. Create the `Vehicle` class with the required attributes and methods.
    2. Instantiate a vehicle object in the `main` method.
    3. Calculate and print how many kilometers the vehicle can travel on a full tank.
    4. Add a method to compare the range of multiple vehicles to help the hero choose the best one.
       *Gradual Challenge*: Start by designing the basic vehicle, then expand to comparing several vehicles using overloading.

### Assignment 2: **Utility Management in the Hero’s Hideout**
*Storyline*: The hero’s secret hideout has multiple utilities that need efficient management.
- **Goal**: Create a `Utility` class with attributes like the name of the utility and price. Use a constructor to initialize these values.
- **To-Do**:
    1. Create an array of 6 `Utility` objects with different utility types and prices (e.g., heating, electricity).
    2. Calculate and display the total utility cost, the most expensive utility, and the average price.
       *Gradual Challenge*: Begin with basic class creation, then move into array manipulation and calculations.

### Assignment 3: **Building the Hero's Dream Car**
*Storyline*: The hero needs a custom car for their missions.
- **Goal**: Design a `Car` class composed of parts like `Engine`, `Wheel`, and `Door`. Each part has its own behaviors (e.g., a door can open/close, a wheel can be inflated/deflated).
- **To-Do**:
    1. Create a `Car` class with nested `Engine`, `Wheel`, and `Door` classes.
    2. Allow the hero to start the engine, open all doors, inflate a wheel, and close the trunk.
    3. Add methods for each car part’s actions and create interactions between them.
       *Gradual Challenge*: Introduce class composition and object interactions through methods like starting the engine and checking wheel pressure.

### Assignment 4: **Emergency Situation: Wheel Deflation**
*Storyline*: While on a mission, one of the car’s wheels deflates, and the hero must fix it quickly.
- **Goal**: Modify the `Car` class to handle emergency situations like deflated tires or an empty gas tank.
- **To-Do**:
    1. Add a method in the `Wheel` class to check the tire’s air pressure and trigger a warning if it’s low.
    2. Add a `GasTank` class with methods for emptying and refilling the gas tank.
    3. Integrate the gas tank into the `Car` class, and simulate a scenario where the hero refuels the car.
       *Gradual Challenge*: Manage state changes in the car, introducing conditions and error handling.

### Assignment 5: **The Hero’s Smart Dashboard**
*Storyline*: The hero’s car is now equipped with a smart dashboard that uses data from various sensors.
- **Goal**: Use Java’s `Math` and `String` API classes to enhance the hero's car dashboard, showing various statistics and alerts.
- **To-Do**:
    1. Create a dashboard that displays the current date, time, fuel level, and tire status.
    2. Use `Math` methods to calculate tire wear, and string manipulation methods to alert the hero with custom messages (e.g., "Low fuel").
    3. Integrate `Math` class methods to calculate engine efficiency and display it on the dashboard.
       *Gradual Challenge*: Build familiarity with Java’s built-in API classes, starting with simple mathematical functions and progressing to string manipulation.

### Assignment 6: **Vehicle Comparison: Choose the Best Companion**
*Storyline*: The hero must choose between different cars based on their specifications for the next mission.
- **Goal**: Compare cars using both the `==` operator and the `equals()` method. Introduce object references and memory management.
- **To-Do**:
    1. Create several `Car` objects with different attributes (model, color, etc.).
    2. Use object comparison to check if two cars are identical based on their attributes.
    3. Modify one car and observe how changes affect object references and equality.
       *Gradual Challenge*: Teach the difference between reference equality (`==`) and value equality (`equals()`).

### Assignment 7: **Hero's Data Logger: Command Prompt Adventure**
*Storyline*: The hero’s car records mission data via a command-line interface, which will later be used for mission debriefing.
- **Goal**: Create a program that takes inputs like mission name, mission date, and fuel consumed via the command line, then converts these strings to appropriate data types.
- **To-Do**:
    1. Write a program that accepts command-line arguments (mission name, date, distance traveled).
    2. Parse these inputs using wrapper classes (e.g., `Integer`, `Double`).
    3. Convert and display the hero’s travel data, including binary, octal, and hexadecimal representations of the fuel consumed.
       *Gradual Challenge*: Introduce command-line input and parsing, as well as number conversion between different bases.