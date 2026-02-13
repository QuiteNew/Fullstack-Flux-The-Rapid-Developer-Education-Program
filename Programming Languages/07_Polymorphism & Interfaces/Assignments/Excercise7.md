**### 1. **Assignment: The Animal Kingdom Council**

**Story**: In the magical Animal Kingdom, different animals gather for a council meeting. Each animal has unique abilities and traits they bring to the table. Your job is to create an application that models this scenario.

**Tasks**:
- Create an interface `Animal` with methods `sound()`, `move()`, and `sleep()`.
- Define constants like `String KINGDOM_NAME = "Animalia"`.
- Create classes `Lion`, `Bird`, and `Fish` that implement the `Animal` interface.
- Implement the methods uniquely in each class: `Lion` might roar, `Bird` chirp, and `Fish` make bubbling sounds.
- Add a main class `AnimalKingdomCouncil` that creates objects of each type and calls their methods.

### 2. **Assignment: The Shape Shifter’s Workshop**

**Story**: The Shape Shifter owns a workshop where she creates various 2D and 3D shapes. She needs a program to keep track of each shape's properties.

**Tasks**:
- Define interfaces `TwoDimensionalShape` (with methods `area()` and `perimeter()`) and `ThreeDimensionalShape` (with methods `volume()`).
- Create classes `Square`, `Circle`, and `Cube` that implement these interfaces as appropriate.
- In each class, define relevant attributes (e.g., `side` for `Square` and `radius` for `Circle`).
- Implement constructors for each shape that display a message, such as “A new square has been created.”
- Create a main class `ShapeShifterWorkshop` to create and display the properties of each shape.

### 3. **Assignment: Galactic Transportation Hub**

**Story**: In a futuristic transportation hub, various vehicles operate across different environments—ground, air, and space. Some advanced vehicles can function in multiple environments. Your task is to model this versatile transportation system using multiple interfaces.

**Tasks**:

- **Define Interfaces**:
    - **`Vehicle`**:
        - Methods:
            - `getFuelCapacity()`: Returns the fuel capacity of the vehicle.
            - `getPassengerCapacity()`: Returns the passenger capacity.
    - **`GroundTransport`**:
        - Methods:
            - `drive()`: Action of driving the vehicle.
            - `getTerrainType()`: Returns the type of terrain the vehicle operates on.
    - **`AirTransport`**:
        - Methods:
            - `fly()`: Action of flying the vehicle.
            - `getMaxAltitude()`: Returns the maximum altitude the vehicle can reach.
    - **`SpaceTransport`**:
        - Methods:
            - `launch()`: Action of launching the vehicle into space.
            - `getOrbitRange()`: Returns the orbital range of the vehicle.

- **Create Classes**:
    - **`AmphibiousCar`**:
        - Implements `Vehicle` and `GroundTransport`.
        - Attributes:
            - `fuelCapacity`
            - `passengerCapacity`
            - `terrainType`
        - Methods:
            - Implement all methods from the interfaces.
    - **`FlyingCar`**:
        - Implements `Vehicle`, `GroundTransport`, and `AirTransport`.
        - Attributes:
            - `fuelCapacity`
            - `passengerCapacity`
            - `terrainType`
            - `maxAltitude`
        - Methods:
            - Implement all methods from the interfaces.
    - **`SpaceShuttle`**:
        - Implements `Vehicle`, `AirTransport`, and `SpaceTransport`.
        - Attributes:
            - `fuelCapacity`
            - `passengerCapacity`
            - `maxAltitude`
            - `orbitRange`
        - Methods:
            - Implement all methods from the interfaces.

- **Main Class**:
    - **`GalacticTransportationHub`**:
        - Contains the `main` method.
        - Tasks:
            - Instantiate objects of `AmphibiousCar`, `FlyingCar`, and `SpaceShuttle`.
            - Call their methods to demonstrate their capabilities.
            - Display the outputs of each method to show how each vehicle operates in its respective environment.

---

### 4. **Assignment: The Treasure Chest Game**

**Story**: In a mystical game, players encounter treasure chests guarded by magical creatures with multiple abilities. Some creatures can guard treasures, heal players, or cast curses. You need to represent these multifaceted creatures using multiple interfaces.

**Tasks**:

- **Define Interfaces**:
    - **`MagicalCreature`**:
        - Method:
            - `interact()`: General interaction with the creature.
    - **`Guardian`**:
        - Method:
            - `guardTreasure()`: Action of guarding a treasure.
    - **`Healer`**:
        - Method:
            - `healPlayer(int healthPoints)`: Heals the player by a certain number of health points.
    - **`Curser`**:
        - Method:
            - `castCurse(int damagePoints)`: Inflicts damage to the player by casting a curse.

- **Create Classes**:
    - **`Dragon`**:
        - Implements `MagicalCreature`, `Guardian`, and `Curser`.
        - Attributes:
            - `name`
            - `treasure`
            - `curseDamage`
        - Methods:
            - Implement all methods from the interfaces with unique behaviors.
    - **`Elf`**:
        - Implements `MagicalCreature`, `Guardian`, and `Healer`.
        - Attributes:
            - `name`
            - `treasure`
            - `healingPower`
        - Methods:
            - Implement all methods from the interfaces with unique behaviors.
    - **`Goblin`**:
        - Implements `MagicalCreature`, `Guardian`, and `Curser`.
        - Attributes:
            - `name`
            - `treasure`
            - `curseDamage`
        - Methods:
            - Implement all methods from the interfaces with unique behaviors.

- **Main Class**:
    - **`TreasureChestGame`**:
        - Contains the `main` method.
        - Tasks:
            - Instantiate objects of `Dragon`, `Elf`, and `Goblin`.
            - Simulate player interactions with each creature.
            - Display the outcomes, such as health changes and treasures guarded.

---

### 5. **Assignment: Digital Media Library System**

**Story**: A digital library hosts various media items. Some media can be read, played, or downloaded. Certain items might offer multiple forms of interaction. Your goal is to model this diverse media system using multiple interfaces.

**Tasks**:

- **Define Interfaces**:
    - **`MediaItem`**:
        - Methods:
            - `getTitle()`: Returns the title of the media item.
            - `getCreator()`: Returns the creator (author, director, etc.) of the media item.
    - **`Readable`**:
        - Methods:
            - `open()`: Opens the media item for reading.
            - `readPage(int pageNumber)`: Reads a specific page.
            - `close()`: Closes the media item.
    - **`Playable`**:
        - Methods:
            - `play()`: Plays the media item.
            - `pause()`: Pauses playback.
            - `stop()`: Stops playback.
    - **`Downloadable`**:
        - Method:
            - `download()`: Downloads the media item.

- **Create Classes**:
    - **`EBook`**:
        - Implements `MediaItem`, `Readable`, and `Downloadable`.
        - Attributes:
            - `title`
            - `creator`
            - `fileSize`
            - `numberOfPages`
        - Methods:
            - Implement all methods from the interfaces.
    - **`AudioBook`**:
        - Implements `MediaItem`, `Playable`, and `Downloadable`.
        - Attributes:
            - `title`
            - `creator`
            - `fileSize`
            - `duration`
        - Methods:
            - Implement all methods from the interfaces.
    - **`Movie`**:
        - Implements `MediaItem`, `Playable`, and `Downloadable`.
        - Attributes:
            - `title`
            - `creator`
            - `fileSize`
            - `duration`
        - Methods:
            - Implement all methods from the interfaces.
    - **`InteractiveMagazine`**:
        - Implements `MediaItem`, `Readable`, `Playable`, and `Downloadable`.
        - Attributes:
            - `title`
            - `creator`
            - `fileSize`
            - `numberOfPages`
            - `duration` (for interactive media content)
        - Methods:
            - Implement all methods from the interfaces.

- **Main Class**:
    - **`DigitalMediaLibrary`**:
        - Contains the `main` method.
        - Tasks:
            - Instantiate objects of `EBook`, `AudioBook`, `Movie`, and `InteractiveMagazine`.
            - Demonstrate each media item's capabilities by calling their methods.
            - Display messages indicating actions taken, such as opening a book, playing a movie, or downloading an item.

---

### 6. **Assignment: Advanced Smart Home Automation System**

**Story**: In a smart home, devices are multifunctional. They can be switched on/off, adjusted, and scheduled for operation. Your task is to represent these devices using multiple interfaces.

**Tasks**:

- **Define Interfaces**:
    - **`Device`**:
        - Methods:
            - `getDeviceName()`: Returns the name of the device.
            - `getStatus()`: Returns the current status (e.g., "On", "Off") of the device.
    - **`Switchable`**:
        - Methods:
            - `turnOn()`: Turns the device on.
            - `turnOff()`: Turns the device off.
    - **`Adjustable`**:
        - Methods:
            - `increaseSetting()`: Increases the device's setting (e.g., brightness, volume).
            - `decreaseSetting()`: Decreases the device's setting.
    - **`Schedulable`**:
        - Methods:
            - `scheduleOn(String time)`: Schedules the device to turn on at a specific time.
            - `scheduleOff(String time)`: Schedules the device to turn off at a specific time.

- **Create Classes**:
    - **`LightBulb`**:
        - Implements `Device`, `Switchable`, `Adjustable`, and `Schedulable`.
        - Attributes:
            - `deviceName`
            - `status`
            - `brightnessLevel`
            - `onSchedule`
            - `offSchedule`
        - Methods:
            - Implement all methods from the interfaces.
    - **`Thermostat`**:
        - Implements `Device`, `Adjustable`, and `Schedulable`.
        - Attributes:
            - `deviceName`
            - `status`
            - `temperatureSetting`
            - `onSchedule`
            - `offSchedule`
        - Methods:
            - Implement methods from the interfaces except `Switchable`.
    - **`SmartSpeaker`**:
        - Implements `Device`, `Switchable`, `Adjustable`, and `Schedulable`.
        - Attributes:
            - `deviceName`
            - `status`
            - `volumeLevel`
            - `onSchedule`
            - `offSchedule`
        - Methods:
            - Implement all methods from the interfaces.
    - **`Fan`**:
        - Implements `Device`, `Switchable`, and `Adjustable`.
        - Attributes:
            - `deviceName`
            - `status`
            - `speedLevel`
        - Methods:
            - Implement methods from the interfaces except `Schedulable`.

- **Main Class**:
    - **`SmartHomeSystem`**:
        - Contains the `main` method.
        - Tasks:
            - Instantiate objects of `LightBulb`, `Thermostat`, `SmartSpeaker`, and `Fan`.
            - Control each device by calling their methods to turn them on/off, adjust settings, and set schedules where applicable.
            - Display the status and settings of each device after operations.

---

### 7. **Assignment: Comprehensive University Management System**

**Story**: The university needs an advanced system to manage students, faculty, and administrative staff, some of whom have multiple roles. For example, a professor might also be a department head and a researcher.

**Tasks**:

- **Define Interfaces**:
    - **`UniversityMember`**:
        - Methods:
            - `getID()`: Returns the university ID.
            - `getName()`: Returns the member's name.
            - `getRole()`: Returns the role(s) of the member.
    - **`Learner`**:
        - Methods:
            - `attendClass(String courseName)`: Records attendance in a class.
    - **`Educator`**:
        - Methods:
            - `teachCourse(String courseName)`: Assigns a course to teach.
    - **`Researcher`**:
        - Methods:
            - `conductResearch(String topic)`: Records research activities.
    - **`Administrator`**:
        - Methods:
            - `manageDepartment(String departmentName)`: Assigns a department to manage.

- **Create Classes**:
    - **`Student`**:
        - Implements `UniversityMember` and `Learner`.
        - Attributes:
            - `id`
            - `name`
            - `role` (e.g., "Student")
            - `coursesEnrolled`
        - Methods:
            - Implement methods from the interfaces.
    - **`Professor`**:
        - Implements `UniversityMember`, `Educator`, and `Researcher`.
        - Attributes:
            - `id`
            - `name`
            - `role` (e.g., "Professor")
            - `coursesTaught`
            - `researchTopics`
        - Methods:
            - Implement methods from the interfaces.
    - **`DepartmentHead`**:
        - Extends `Professor`, implements `Administrator`.
        - Attributes:
            - Inherits attributes from `Professor`
            - `departmentName`
        - Methods:
            - Implement methods from `Administrator` and inherited interfaces.
    - **`StaffMember`**:
        - Implements `UniversityMember` and `Administrator`.
        - Attributes:
            - `id`
            - `name`
            - `role` (e.g., "Staff Member")
            - `departmentName`
        - Methods:
            - Implement methods from the interfaces.

- **Main Class**:
    - **`UniversityManagementSystem`**:
        - Contains the `main` method.
        - Tasks:
            - Instantiate objects of `Student`, `Professor`, `DepartmentHead`, and `StaffMember`.
            - Demonstrate their roles by calling their methods:
                - Students attending classes.
                - Professors teaching courses and conducting research.
                - Department heads managing departments.
                - Staff members managing administrative tasks.
            - Display information about each university member, including their ID, name, role(s), and activities.
