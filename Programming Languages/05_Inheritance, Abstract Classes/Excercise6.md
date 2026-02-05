### Assignment 1: *"The Tale of the Egg"*
**Objective:** Introduction to inheritance and method overriding.

**Story:** In a mystical land, eggs come in different shapes and sizes. You are tasked with creating two types of eggs: a regular egg and an ostrich egg. Each type of egg shares common properties but also has its unique characteristics.

**To-Do:**
1. Create a class `Egg` with a method `EGG()` that displays the message: "Each egg has an albumen and a yolk."
2. Create another method `print()` that displays: "The egg is a nutritional product."
3. Create a class `OstrichEgg` that inherits from `Egg` and overrides the `EGG()` method to display: "The albumen and yolk of an ostrich egg are the largest."
4. In the `main` class, instantiate both `Egg` and `OstrichEgg` and invoke their methods.

**Code Explanation:**
- `Egg` serves as the parent class, while `OstrichEgg` extends it, demonstrating inheritance.
- Method overriding is shown when `OstrichEgg` provides its specific implementation of `EGG()`.

---

### Assignment 2: *"The Cookie Factory"*
**Objective:** Constructor overloading and method overriding.

**Story:** You are managing a cookie factory that produces a variety of cookies. Each cookie type has its shape, weight, and percentage of chocolate. Now, you need to write a program that manages these cookies and prints their details.

**To-Do:**
1. Create a class `Cookie` with fields `weight` and `shape`, and a `print()` method that displays these properties.
2. Create a subclass `ChocolateCookie` that extends `Cookie` and adds a new field `percentChocolate`. Override the `print()` method to include chocolate percentage.
3. Create another subclass `ChocolateCookieWithExtras` that extends `ChocolateCookie`, adding an `extra` field (e.g., hazelnuts).
4. Instantiate objects of each type (regular cookie, chocolate cookie, and chocolate cookie with extras) and print their details.

**Code Explanation:**
- Each class demonstrates inheritance, constructor overloading, and method overriding.
- Students learn how the `super()` call works when invoking a superclass constructor from a subclass.

---

### Assignment 3: *"The Animal Kingdom"*
**Objective:** Polymorphism and using `instanceof`.

**Story:** You are a zookeeper managing various animals. Each animal has a name and makes a unique sound. You must create different animal species in your zoo and make them "speak."

**To-Do:**
1. Create a class `Animal` with a field `name` and a method `onomatopoeia()` that prints "There is no onomatopoeia for [name]."
2. Create subclasses `Dog`, `Lion`, and `Frog` that inherit from `Animal` and override the `onomatopoeia()` method with sounds like "Woof," "Roar," and "Ribbit."
3. Create a subclass `SaraMountainDog` that inherits from `Dog` and adds a method `traits()` that prints special characteristics.
4. In the `main` class, create an array of `Animal` objects with different animals and call `onomatopoeia()` for each. Use `instanceof` to check for `SaraMountainDog` and invoke `traits()`.

**Code Explanation:**
- Demonstrates polymorphism by using an array of `Animal` objects and calling overridden methods.
- Use of `instanceof` to downcast and access subclass-specific methods.

---

### Assignment 4: *"The Orchestra of Instruments"*
**Objective:** Abstract classes and method implementation.

**Story:** You are organizing an orchestra with different musical instruments. Each instrument type needs to implement certain behaviors like "play" and "tweak." Your job is to define an abstract structure for these instruments and create specific instruments.

**To-Do:**
1. Create an abstract class `Instrument` with an abstract method `play()` and a method `whatIsPlaying()` that returns "Instrument."
2. Create subclasses `Brass`, `Percussion`, and `Wired` that inherit from `Instrument`. Each should implement `play()` and override `whatIsPlaying()`.
3. Create specific instruments like `Trumpet` (extends `Brass`) and `Guitar` (extends `Wired`) with their own implementations of `play()` and `tweak()`.
4. In the `main` class, create an array of `Instrument` objects (e.g., `Trumpet`, `Guitar`, etc.), call `play()` on each, and print the instrument type.

**Code Explanation:**
- Focus on abstract classes, abstract methods, and their implementations in subclasses.
- Introduces the idea of having common behavior across different objects while allowing customization in subclasses.

---

### Assignment 5: *"The Family Tree"*
**Objective:** Inheritance and constructor chaining with `super()`.

**Story:** You are tasked with building a family tree for a royal family. Each family member inherits certain traits from their parents but also has unique characteristics.

**To-Do:**
1. Create a class `Person` with fields `name` and `age`. Include a constructor that sets these values.
2. Create a subclass `RoyalFamilyMember` that inherits from `Person`, adding a field `title` and a constructor that calls the superclass constructor using `super()`.
3. Create specific members of the royal family like `King`, `Queen`, and `Prince`, each with their own titles.
4. In the `main` method, create objects for each royal family member and print their details.

**Code Explanation:**
- Demonstrates constructor chaining using `super()` to invoke superclass constructors.
- Students learn how inheritance helps reuse code while adding unique traits.

---

### Assignment 6: *"The Battle of the Superheroes"*
**Objective:** Polymorphism and abstract classes in a battle simulation.

**Story:** In a world of superheroes, each hero has different powers and abilities. You are tasked with creating a battle simulation where different heroes fight, each using their own unique power.

**To-Do:**
1. Create an abstract class `Superhero` with a method `fight()` that is abstract.
2. Create subclasses `FlyingHero`, `StrengthHero`, and `SpeedHero`, each implementing the `fight()` method in their unique way.
3. Add a field `heroName` in the abstract class and constructors in the subclasses to set the name.
4. In the `main` method, create a few heroes of each type and call `fight()` to see how they engage in battle.

**Code Explanation:**
- Emphasizes abstract classes and polymorphism where each superhero exhibits unique behavior while following a common interface.

---

### Assignment 7: *"The Vehicle Factory"*
**Objective:** Abstract classes and method overloading.

**Story:** You are working in a futuristic vehicle factory that builds different types of vehicles. Each vehicle must implement its own method for moving and refueling.

**To-Do:**
1. Create an abstract class `Vehicle` with abstract methods `move()` and `refuel()`.
2. Create subclasses `Car`, `Motorcycle`, and `ElectricCar` that extend `Vehicle`, implementing the abstract methods.
3. In `ElectricCar`, overload the `refuel()` method to accept a different type of input (e.g., charging time instead of fuel amount).
4. In the `main` class, instantiate each vehicle type and call `move()` and `refuel()`.

**Code Explanation:**
- Students see the power of method overloading and how it can be used to change the behavior based on input type while maintaining the common interface of abstract methods.