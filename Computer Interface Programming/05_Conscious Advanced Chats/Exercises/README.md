JSON and Its Use in Java
Introduction to JSON
JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write and easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. This property makes JSON an ideal data-interchange language.
Structure of JSON
JSON is built on two structures:
A collection of name/value pairs. In various languages, this is realized as an object, record, struct, dictionary, hash table, keyed list, or associative array.
An ordered list of values. In most languages, this is realized as an array, vector, list, or sequence.
Example of JSON Data
```json
{
  "name": "John Doe",
  "age": 30,
  "is_student": false,
  "courses": ["Computer Science", "Mathematics"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "country": "Anycountry"
  }
}
```
JSON in Java
In Java, JSON is used for storing and exchanging data. Since JSON is text, you can convert any JavaScript object into JSON and send JSON to the server. You can also convert any JSON received from the server into JavaScript objects. This way you can work with the data as JavaScript objects, with no complicated parsing and translations.
Working with JSON in Java
Java does not have its own built-in library for JSON like JavaScript. However, there are several libraries available for working with JSON in Java, such as:
`org.json`: A simple, lightweight JSON processor.
`Jackson`: A high-performance JSON processor.
`Gson`: A JSON library for Java by Google.
Example with Gson
```java
import com.google.gson.Gson;

public class Main {
  public static void main(String[] args) {
    Gson gson = new Gson();
    String json = "{"name":"John Doe","age":30}";
    Student student = gson.fromJson(json, Student.class);
    System.out.println(student.getName());
  }
}

class Student {
  private String name;
  private int age;

  // Getters and setters
}
```
In this example, we use the Gson library to convert a JSON string into a `Student` object. Gson can also be used to convert Java objects into JSON strings.
Conclusion
JSON is a versatile and widely-used format for data interchange. Its simplicity and language-independent nature make it an excellent choice for data exchange across the web. In Java, while there is no built-in support for JSON, several libraries make it easy to work with JSON data, allowing for easy serialization and deserialization of Java objects to and from JSON.
https://www.baeldung.com/jackson


Introduction to Maven
What is Maven?
Maven is a powerful project management tool that is used for managing a project's build, reporting, and documentation from a central piece of information. It simplifies the build process like ANT but is much more than a build tool. Maven uses a standard directory layout and a default build lifecycle to manage project builds.
Key Features of Maven
Project Object Model (POM): Maven is based on the POM (Project Object Model) concept which describes the project, its dependencies, build order, and required plugins.
Build Lifecycle: Maven has a defined build lifecycle for the development of any application. It includes phases for compiling the code, packaging binaries, and documentation.
Dependency Management: Maven automatically handles the downloading of dependencies from the central repository to your local repository.
Plugins: Maven uses plugins to interact with a host of build-related tasks.
Maven Directory Structure
A standard Maven project has a specific directory structure. At the root, there is a `pom.xml` file which contains the project configuration details. The main code is placed in the `src/main/java` directory, and resources like properties files are in `src/main/resources`. Tests are placed in `src/test/java` and their resources in `src/test/resources`.
The pom.xml File
The `pom.xml` file is the heart of any Maven project. It contains information about the project and configuration details used by Maven to build the project. Key elements include:
Project Coordinates: Including the `groupId`, `artifactId`, and `version`, which uniquely identify the project.
Dependencies: External libraries the project depends on.
Plugins: Build and management tools for the project.
Build Profiles: Different build settings for different environments.
Getting Started with Maven
To get started with Maven, you need to install it on your system. After installation, you can create a new Maven project using the Maven Archetype:
```shell
mvn archetype:generate -DgroupId=com.example -DartifactId=my-application -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```
This command creates a simple project with the standard directory layout and a sample `pom.xml` file.
Dependencies can be found on:
https://mvnrepository.com/repos/central
Conclusion
Maven is an essential tool for Java developers, providing a robust framework for building, documenting, and managing projects efficiently. Its use of conventions and the `pom.xml` file for project configuration makes it a powerful and flexible tool for developers.


Maven and JSON exercises
Exercise 1:
Create a Java class Student with properties name (String), age (int), and email (String).
Write a Java program to serialize an object of Student class into JSON.
Deserialize the JSON back into a Student object.
Exercise 2:
Create StudentWithCourses class to have the same fields as Student class but also include a new field List<String> courses but ignore it during serialization.
Customize the serialization of email field to appear as emailAddress in the JSON.
Handle null values gracefully during serialization.
Exercise 3:
Create StudentWithGrades class to have the same fields as StudentWithCourses class but also include a new field
Map<String, Double> grades representing course names and their corresponding grades.
Serialize an object of StudentWithGrades that includes a list of courses and a map of grades.
Deserialize the JSON back, ensuring the list and map are correctly populated. (print all student fields)
Exercise 4:
Create StudentWithBirthday class to have the same fields as Student class but also include a new field birthday
Create a LocalDateSerializer and LocalDateDeserializer for handling java.time.LocalDate fields in the Student class.
Add a LocalDate birthDate field to the Student class.
Serialize and deserialize a Student object, ensuring the birthDate is correctly handled.