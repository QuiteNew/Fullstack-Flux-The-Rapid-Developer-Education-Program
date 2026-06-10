# Spring Boot MVC Assignment – Course Management System



## Assignment Description



Create a Spring Boot application called \*\*CourseManagementSystem\*\* using:



- Spring Boot

- Spring MVC

- Spring Data JPA

- Hibernate

- H2 In-Memory Database



The application should follow the MVC architecture and contain:



- Controllers

- Services

- Repositories

- Entities

- DTOs (optional)

- Exception handling

- Hardcoded token security filter



---



# Functional Requirements



## Entities



Create the following entities:



### Student



Fields:

- id

- firstName

- lastName

- email



### Course



Fields:

- id

- title

- description

- duration



---



# Relationship



Implement a \*\*Many-to-Many\*\* relationship:



- One student can enroll in many courses

- One course can contain many students



---



# Repository Layer



Create repositories for:



- StudentRepository

- CourseRepository



Both should extend:



```java

JpaRepository

```



---



# Service Layer



Create services with business logic.



## StudentService Methods



Implement:



- getAllStudents()

- getStudentById(Long id)

- createStudent(Student student)

- updateStudent(Long id, Student student)

- deleteStudent(Long id)

- enrollStudentToCourse(Long studentId, Long courseId)

- removeStudentFromCourse(Long studentId, Long courseId)



## CourseService Methods



Implement:



- getAllCourses()

- getCourseById(Long id)

- createCourse(Course course)

- updateCourse(Long id, Course course)

- deleteCourse(Long id)



---



# Controller Layer



Create REST controllers.



## StudentController Endpoints



| Method | Endpoint | Description |

|---|---|---|

| GET | /students | Get all students |

| GET | /students/{id} | Get student by id |

| POST | /students | Create student |

| PUT | /students/{id} | Update student |

| DELETE | /students/{id} | Delete student |

| POST | /students/{studentId}/courses/{courseId} | Enroll student to course |

| DELETE | /students/{studentId}/courses/{courseId} | Remove student from course |



## CourseController Endpoints



| Method | Endpoint | Description |

|---|---|---|

| GET | /courses | Get all courses |

| GET | /courses/{id} | Get course by id |

| POST | /courses | Create course |

| PUT | /courses/{id} | Update course |

| DELETE | /courses/{id} | Delete course |



---



# Security Requirement



Secure all endpoints using a hardcoded token.



## Requirements



- Every request must contain header:



```text

Authorization: Bearer secret-token-123

```



- If token is missing or invalid return:



```text

401 Unauthorized

```



Implement security using:



- OncePerRequestFilter



---



# H2 Database



Use H2 in-memory database.



Configure:



- H2 Console

- Hibernate auto create-drop



---



# Bonus Requirements



Add:



- Global exception handling

- Validation annotations

- Proper HTTP status codes



---



# Expected Project Structure



```text

src/main/java/com/example/coursemanagement

│

├── controller

├── service

├── repository

├── entity

├── security

├── exception

└── CourseManagementApplication.java

```

