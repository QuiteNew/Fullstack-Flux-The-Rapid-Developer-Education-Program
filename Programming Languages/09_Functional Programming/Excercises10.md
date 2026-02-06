### Assignment 1: *Java Stream API for processing list of integers*
**Objective:** Practice with basic Sream API

**Task Description:** Using Java Streams write a Java program that calculates the square of each number in given list.

**To-Do:**
- Create a list of integers Convert the list into a stream
- Using stream compute the square of each number in the list
- Collect all squared values into a new list
- Print the result list containing the squared values.
  
### Assignment 2: *Filtering a List of Names Using Java Stream*

**Task Description:** Using Java Streams write a Java program that from a given name list selects only the names with length greater than 6.

**To-Do:**
- Create a list of names
- Process by converting the list into stream
- Apply a filter to select only the names whose length is greater than 6 characters
- Collect the filtered results into a new list
- Print each name from the filtered list

**Expected Output:** The program should display only the names that have more than 6 characters.
  
### Assignment 3: *Filtering a List of Names Using Java Stream*

**Task Description:** Using Java Streams write a Java program that from a given name list selects only the names with length between 6 and 8.

**Expected Output:** The program should display only the names that have more than 6 and less than 8 characters.

### Assignment 4: *Filtering a List of Names Using Java Streams*

**Task Description:** From a given list of strings filter only those that are not null and display the result.

**To-Do:**
- Create a list of strings
- Process the list by first converting the list into stream
- Apply a filter to select only the strings that are not null
- Collect the filtered results into a new list
- Print each string from the filtered list

**Expected Output:** The program should display the strings that are not null.

### Assignment 7: *Filtering Entries From a HashMap using Java Streams*
**Objective:** Work with Stream API on hashmap.

**Task Description::** Write a Java program that from a given hashmap filter the entries which key value is less than or equal to 22.

**To-Do:**
- Create a HashMap<Integer, String> to store a list of fruit names, where each fruit has an associated integer key. 
- Add the following key-value pairs to the HashMap: - 11 -> "Apple" - 22 -> "Orange" - 33 -> "Kiwi" - 44 -> "Banana". 
- Convert the entrySet() of the HashMap into a stream
- Filter the entries to include only those where the key value is less than or equal to 22
- Collect the filtered entries back into a new Map.
- Prints the resulting filtered map.

**Expected Output:** The program should display the filtered map containing only the entries whose keys are less than or equal to 22.

### Assignment 8: *Filtering Entries From a HashMap using Java Streams*
**Objective:** Work with Stream API on hashmap.

**Task Description::** Write a Java program that for a given hashMap select the entries with key value less than or equal to 2 and which value starts with "A"

**To-Do:**
- Creates a HashMap<Integer, String> to store a list of strings, where each string has an associated integer key. 
- Adds the following key-value pairs to the HashMap: - 1 -> "ABC" - 2 -> "XCB"
- Convert the entrySet() of the HashMap into a stream
- Select the entries where the key value is less than or equal to 2 and which value starts with "A" 
- Collect the filtered entries back into a new Map
- Prints the resulting filtered map.

**Expected Output:** The program should display the filtered map containing only the entries whose keys are less than or equal to 2 and which have values that starts with "A"


### Assignment 9: *Filtering Entries From a HashMap using Java Streams*
**Task Description::** Write a Java program that for a given hashMap select the entries with value "Orange"

**To-Do:**
- Create a HashMap<Integer, String> to store a list of strings, where each string has an associated integer key.
- Adds the following key-value pairs to the HashMap: - 11 -> "Apple" - 22 -> "Orange" - 33 -> "Kiwi" - 44 -> "Banana" 
- Use the Stream API to: - Convert the entrySet() of the HashMap into a stream
- Filter the entries to include only those with value "Orange"
- Collect the filtered entries back into a new Map
- Prints the resulting filtered map

**Expected Output:** The program should display the filtered map containing only the entries with value "Orange"


### Assignment 10: *Mapping a List of Integers, Converting Strings to Uppercase, Filtering Strings Based on a Condition, Sorting a List of Strings, Mapping to a Set, using forEach(), allMatch(), anyMatch()*
**Objective:** Demonstrate unnderstanding and practical use of Java Sream API, incliding the operations map(), filter(), sorted(), collect(), forEach(), anuMatch() and allMatch(). Work with lists, sets and lambda expressions  to transform and process data.

**Task Description:** Task 1 (Mapping a List of Integers): For a given list of integers calculate square of each list element

**Task Description:** Task 2 (Converting Strings to Uppercase): For a given list of strings convert each string to uppercase

**Task Description:** Task 3 (Filtering Strings Based on a Condition): For a given list of strings select the elements with starting letter "S"

**Task Description:** Task 4 (Sorting a List of Strings): For a given list of names, sort the same list of names in alphabetical order

**Task Description:** Task 5 (Mapping to a Set): Map initial integer list to a new set where each element is doubled

**Task Description:** Task 6 (forEach()): For a given integer list print each element using forEach()

**Task Description:** Task 7 (allMatch()): Check if all the elements in integer list are greater than a given value

**Task Description:** Task 8 (anyMatch()): Check if any element in given integer list is smaller than a given value


**To-Do:**
- Task 1: Create an initial list of integers: {2, 3, 4, 5}. Then using the map() function square each number, collect the results into a new list and print it
- Task 2: Create a list of strings: {"a", "b", "c"}, then convert each string to uppercase using map{String::toUpperCase} and finally collect and print the resulting list 
- Task 3: Create a list of words: {"Reflection", "Collection", "Stream", "Java", "Sorting"}, then filter the list to include only the elements taht start with the letter "S", and then collect and print the filtered list
- Task 4: Create a list of names, sort the same list in alphabetical order using sorted(), and then print the sorted list
- Task 5: Create an initial list of integers, then map the initial integer list to a new set where each element is doubled. Use Collectors.toSet() to remove duplicated, and print the resulting set.
- Task 6: Create initial list of integers. Then use forEach() to print each element of the mapped integer list individually
- Task 7: For given list of integers, check if all the elements in the list are greater than a given value (e.g., x > 1). Then print the result as a boolean value.
- Task 8: For given list of integers, check if any element in the list is smaller than a given value (e.g., x < 1). Then print the result as a boolean value.


**Expected Output:** Your program should display:
- A list of squared numbers
- A list of uppercase strings
- FIltered list (words starting with "S")
- Alphabetically sorted list
- A set of doubled integers
- Individual printed values from forEach()
- Boolean results from allMatch() and anyMatch()


### Assignment 11: *Advanced Java Stream API Opearations*
**Objective:** Practicing advanced operations of the Java Stream API, including filtering, counting, mapping, collecting, joining, generating statistics, creating random numbers, and working with parallel streams. You will apply functional-style programming concepts to process collections of strings and integers.

**Task Description:** Task 1 (Working With Streams of Strings): For given list of strings, count the number of empty strings, count number of strings of length three, and merge non-empty strings into a single string.

**Task Description:** Task 2 (Working With Integer Streams): For a given integer list create a distinct square list

**Task Description:** Task 3 (Statistical Operations): Using Stream API, for a given list of integers calculate maximum, minimum, sum and average value of all elements.

**Task Description:** Task 4 (Generating Random Numbers): Using Java Streams generate and print 10 sorted random integers

**Task Description:** Task 5 (Using Parallel Streams): Using parallelStreams() for a given string list count empty strings

**Task Description:** Task 6 (forEach()): For a given integer list print each element using forEach()

**Task Description:** Task 7 (allMatch()): Check if all the elements in integer list are greater than a given value

**Task Description:** Task 8 (anyMatch()): Check if any element in given integer list is smaller than a given value


**To-Do:**
- Task 1: Create initial list of strings. Then: count empty strings, count how many strings in the list are empty, count strings of length three and print the count results. After that, merge non-empty strings into a single string by first filtering out empty strings, and then merge remaining strings into one string separated by commas using: Collectors.joining(", "), and then finally print the merged result.
- Task 2: Create initial integer list, then map each integer to its square using map(i -> i * i). After that apply distinct() to remove duplicate values, and collect the squares into a list. Print the result list. 
- Task 3: Using "integers.stream().mapToInt( x -> x).summaryStatistics()" extract and print individually with descriptive labels the following sumary statistics: 1. Maximum value 2. Minimum value 3. Sum 4. Average 
- Task 4: Generate 10 sorted random integers by using "random.ints().limit(10).sorted()" and print ten random sorted integers to the console
- Task 5: Using "strings.parallelStream()" print the  number of empty strings prefixed with an appropriate label


**Expected Output Highlights:** Your program should display:
- Number of empty strings
- Number of strings with length 3
- A merged string of non-empty values
- A list of distinct squared integers
- Statistical results (max, min, sum, average)
- Ten sorted random integers
- Empty string count using parallel processing


### Assignment 12: *Working With Streams of Strings*

**Task Description:** For given list of names, count how many names have length less than 6 using Java Streams

**To-Do:**
- Set initial list of names
- Use a filter to count names with length less than 6
- Print the count

### Assignment 13: *Working With Java 7 for Processing List of Strings*

**Task Description:** For given list of names, count how many names have length less than 6 using Java 7

**To-Do:**
- Set initial list of names
- Count names with length less than 6
- Print the count

### Assignment 14: *Combining Streams in Java*

**Task Description:** We need to merge two separate streams into one using Stream.concat() method. Finally, we will iterate through the combined stream and print the elements

**To-Do:**
- Create a list named alphabets containing: "A", "B", "C"
- Create another list named names containing: "Sansa", "Jon", "Arya"
- Convert both the alphabets lists and the names list into streams
- By Using "Stream.concat(alphabets.stream(), names.stream())" create a single combined merged stream named opstream that contains all elements from both lists
- Print Combined Stream Elements

Example output format: A B C Sansa Jon Arya

**Expected Output:** Your program should display all elements from both lists printed in sequence, demonstrating that the two streams have been successfully combined.


### Assignment 15: *Using Java Streams to Generate a Sequence of Numbers*

**Objective:** Demonstrate the use of the Stream.iterate() method, along with filtering limiting and printing elements in a stream.

**Task Description:** You are required to create a Java program that generate 6 integers, starting from 1 by taking only numbers divisible by 3. 

**To-Do:**
- Using Stream.iterate(initialValue, unaryOperator) generate an infinite stream of integers, starting from 1, where each subsequent number increments by 1.
- Filter the stream so that only numbers divisible by 3 are included
- Limit hte stream to the first 6 numbers that satisfy the condition
- Print each number using forEach

**Expected Output:** The program should print the first six numbers divisible by 3
3 6 9 12 15 18

### Assignment 16: *Working with Predicates and Stream API in Java*

**Objective:** This assignment focuses on using Java Streams, Predicates and the noneMatch() terminal operation to evaluate conditions on a collection of custom objects. You will learn how to define predicate conditions, and test them using Stream operations

**Task Description:** You are required to create a Java program that will process student information. Inside Main class create predicates to test Student properties by checking whether none of the sutdents have names with starting letter L, and whether none of the students are less than 28 and have names with the starting letter "P".  

**To-Do:**
- Define a Student class with fields: stuId(int), stuAde(int), stuName(String)
- Inside Student class add constructor to initialize all fields, getter methods, and a static method getStudents() that returns a list of predefined Student objects (example student records: - (11, 28, "Lucy") - (28, 27, "Kiku") - (32, 30, "Dani") - (49, 27, "Steve"))
- Inside Main claass create predicate p1 that checks whether the student's name starts with the letter "L"
- Create predicate p2, that checks whether the student's age is less than 28, AND name starts with the letter "P".
- Use Student.getStudents() and then apply the noneMatch() method with both predicatesUse to check whether none of the sutdents satisfy the given predicates (to check whether none of the sutdents have names with starting letter L, and whether none of the students are less than 28 and have names with the starting letter "P") 

**Expected Output:** Format The output of your program should display the results of both tests. Example: list.stream().noneMatch(p1): false list.stream().noneMatch(p2): true


### Assignment 17: *Java Streams and Predicates Manipulation*

**Objective:** The purpose of this assignment is to help practice working with Java Streams API, Lambda expressions and predicates, filtering, matching and collecting stream results. 

**Task Description:** You are required to implement a Java program that manages a list of students using the Java Stream API for filtering and matching operations using predicates and display results on the console.  We need to perform checks such as: whether all students are younger than 25, whether at least one student is older than 25, whether no student has a name starting with "A" (and on each check print the result)


**To-Do:**
- Create a Student class with fields: String name, int indexNo, int age. Add constructor to initialize all fields, and getter methods. 
- Inside Main class Implement a static method for student creation -> createStudent(String name, int indexNo, int age) -> this method should return a new Student object
- Inside Main class create a method printValues(Student s) that should display Student Details
- Inside Main class create a method List<Student> getStudents() that will return a list containing at least five predefined Student objects
- Inside Main, create list of example names and use Random to automatically generate students with random index numbers and ages, and than print all autogenerated students
- Define following predicates: p1 (selects students whose name starts with "A"), p2 (selects students whose names starts with "S" and age is less than 28), p3 (selects students older than 25)
- Then using Streams and the predefined predicates filter the students, and collect and print the filtered results

**Expected Output:** Your program should display autogenerated students with their details, filtered results for predicate conditions (Boolean results from allMatch(), noneMatch() and anyMatch() checks)


### Assignment 18: *Calculating Average Age of Students Using Java Streams*

**Objective:** The purpose of this assignment is to demonstrate the use of the Stream API by creating a list of student objects and calculate the average age using Collectors. averagingInt() method

**Task Description:** Write a Java program that defines a Student class with attributes id, name and age. Create a list of students, store multiple students in it and compute the average age of all students using Java Stream operations.

**To-Do:**
- Create Student Class with 3 fields: id (integer), name(String) and age(integer)
- Include a constructor to initialize these fields
- In main class, create an ArrayList<Student> to store student information
- Add multiple student objects with different details
- Use Stream API to calculate the average age
- Print the calculated average age.

### Assignment 19: *Counting the frequency of Names Using Java Streams *

**Objective:** The purpose of this assignment is to demonstrate the use of Java Streams, Collectors and groupingBy() to count the frequency of repeated elements in a list

**Task Description:** Write a Java program that takes a list of names and counts how many times each name appears. Use "Collectors.groupingBy()" and "Collectors.counting()" methods to generate a frequency map of the names.

**To-Do:**
- Create a list of names containing duplicates
- Convert the list into a stream 
- Use "groupingBy(Function.identity(), counting())" to group identical names together and count the occurences of each name
- Store the result in a Map<String, Long>
- Print the resulting map to display the frequency of each name

**Expected Output:** The program should print a map showing how many times each name appears (E.g. {Jon=2, Ajeet=3, Steve=1})

### Assignment 20: *Filtering Student Records and Storing Results in a Set Using Java Streams*

**Objective:** The purpose of this assignment is ti demonstrate how to work with Stream API, focusing on filtering student records based on a condition and storing the filtered results in a Set using Collectors.toSet()

**Task Description:** Using the same Student class definition from previous assignment write a Java program that stores student information in a list, filters students based on their ID value using Java Streams, and collects the filtered student inti a Set. Finally, iterate through the Set and print the each student's details

**To-Do:**
- Create Student Class with 3 fields: id (integer), name(String) and age(integer)
- Include a constructor to initialize these fields
- In Main Class create an ArrayList<Student> to hold multiple student records
- Add several student objects to the list
- Using Stream API Filter students whose ID is greater than 20 and collect the filtered results into a Set using Collectors.toSet()
- Iterate over the Set and print each student's ID, name and age.

**Expected Output:** The output will display only those students whose IDs are greater than 20

### Assignment 21: *Extracting Student Names Using Java Streams*

**Objective:** The purpose of this assignment is to demonstrate the use of Stream API to process object data.

**Task Description:** Write program that extracts only the names of students from a list of Student objects using the map() operation.
 

### Assignment 22: * Filter Long Names Using Java Streams*

**Task Description:** From given list of names, filter the names with more than 6 characters. After storing the result print the filtered list.
