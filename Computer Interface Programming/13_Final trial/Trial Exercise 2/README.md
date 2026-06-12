# Spring Boot Final Assignment – Enterprise Project Management System

# ASSIGNMENT

## Assignment Description

Create a Spring Boot application called:

`EnterpriseProjectManagementSystem`

using:

- Java 17
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- H2 In-Memory Database
- Bean Validation
- Lombok
- Custom Security Filter

The application should follow layered MVC architecture and contain:

- Controllers
- Services
- Repositories
- Entities
- DTOs
- Exception Handling
- Validation
- Security Filter

---

# Business Scenario

A software company manages:

- Employees
- Projects
- Tasks
- Departments

Employees belong to departments, work on multiple projects, and receive tasks assigned by managers.

Managers should be able to:

- Create and manage departments
- Create employees
- Create projects
- Assign employees to projects
- Create tasks
- Assign tasks to employees
- Track project progress
- View overdue tasks
- Calculate department budget usage

---

# Functional Requirements

# 1. Entities

## Department

Fields:

- id
- name
- location
- budget

Relationships:

- One Department has many Employees

---

## Employee

Fields:

- id
- firstName
- lastName
- email
- role (`DEVELOPER`, `QA`, `MANAGER`)
- salary
- active

Relationships:

- Many Employees belong to one Department
- Many Employees can work on many Projects
- One Employee can have many assigned Tasks

---

## Project

Fields:

- id
- name
- description
- startDate
- endDate
- status (`PLANNED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`)
- budget

Relationships:

- Many Projects can contain many Employees
- One Project has many Tasks

---

## Task

Fields:

- id
- title
- description
- priority (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
- status (`TODO`, `IN_PROGRESS`, `DONE`)
- estimatedHours
- actualHours
- dueDate

Relationships:

- Many Tasks belong to one Project
- Many Tasks are assigned to one Employee

---

# 2. Relationships

Implement:

## One-To-Many

- Department → Employees
- Project → Tasks
- Employee → Tasks

## Many-To-Many

- Employee ↔ Project

Use:

- mappedBy
- JoinTable
- CascadeType
- FetchType

---

# 3. Repository Layer

Create repositories for:

- Employee
- Department
- Project
- Task

All repositories should extend:

```java
JpaRepository<Entity, Long>
```

---

# 4. DTO Layer

Create DTOs for employees.

Required DTOs:

```java
CreateEmployeeRequest
EmployeeResponse
```

The CreateEmployeeRequest DTO should contain:

- firstName
- lastName
- email
- role
- salary
- active
- departmentId

---

# 5. Service Layer

Implement business logic in service classes.

---

## DepartmentService

Implement the following methods:

```java
List<Department> getAllDepartments()

Department getDepartmentById(Long id)

Department createDepartment(Department department)

Department updateDepartment(Long id, Department department)

void deleteDepartment(Long id)

List<Employee> getDepartmentEmployees(Long departmentId)

double getDepartmentBudgetUsage(Long departmentId)
```

Business Rules:

- Department budget cannot be negative
- Budget usage formula:

```text
(total employee salaries / department budget) * 100
```

---

## EmployeeService

Implement the following methods:

```java
List<Employee> getAllEmployees()

Employee getEmployeeById(Long id)

Employee createEmployee(CreateEmployeeRequest request)

Employee updateEmployee(Long id, Employee employee)

void deleteEmployee(Long id)

Employee assignEmployeeToProject(Long employeeId, Long projectId)

Employee removeEmployeeFromProject(Long employeeId, Long projectId)

List<Task> getEmployeeTasks(Long employeeId)
```

Business Rules:

- Employee must belong to an existing department
- Inactive employees cannot join projects

---

## ProjectService

Implement the following methods:

```java
List<Project> getAllProjects()

Project getProjectById(Long id)

Project createProject(Project project)

Project updateProject(Long id, Project project)

void deleteProject(Long id)

List<Project> searchProjects(String keyword)

Project addTaskToProject(Long projectId, Task task)

double getProjectProgress(Long projectId)
```

Business Rules:

- Project end date cannot be before start date
- Project progress formula:

```text
DONE tasks / total tasks * 100
```

---

## TaskService

Implement the following methods:

```java
List<Task> getAllTasks()

Task getTaskById(Long id)

Task createTask(Task task)

Task updateTaskStatus(Long id, TaskStatus status)

void deleteTask(Long id)

Task assignTask(Long taskId, Long employeeId)

List<Task> getTasksByPriority(TaskPriority priority)

List<Task> getOverdueTasks()
```

Business Rules:

- Task due date cannot be in the past
- Cannot assign tasks to inactive employees
- Overdue tasks are tasks with dueDate before today

---

# 6. REST Controllers

Create REST APIs using ResponseEntity.

---

# DepartmentController

Base URL:

```text
/departments
```

Endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | /departments | Get all departments |
| GET | /departments/{id} | Get department by id |
| POST | /departments | Create department |
| PUT | /departments/{id} | Update department |
| DELETE | /departments/{id} | Delete department |
| GET | /departments/{id}/employees | Get all department employees |
| GET | /departments/{id}/budget-usage | Get budget usage percentage |

---

# EmployeeController

Base URL:

```text
/employees
```

Endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | /employees | Get all employees |
| GET | /employees/{id} | Get employee by id |
| POST | /employees | Create employee |
| PUT | /employees/{id} | Update employee |
| DELETE | /employees/{id} | Delete employee |
| POST | /employees/{employeeId}/projects/{projectId} | Assign employee to project |
| DELETE | /employees/{employeeId}/projects/{projectId} | Remove employee from project |
| GET | /employees/{id}/tasks | Get employee tasks |

---

# ProjectController

Base URL:

```text
/projects
```

Endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | /projects | Get all projects |
| GET | /projects/{id} | Get project by id |
| POST | /projects | Create project |
| PUT | /projects/{id} | Update project |
| DELETE | /projects/{id} | Delete project |
| GET | /projects/search?keyword=value | Search projects by keyword |
| POST | /projects/{projectId}/tasks | Add task to project |
| GET | /projects/{id}/progress | Get project completion percentage |

---

# TaskController

Base URL:

```text
/tasks
```

Endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | /tasks | Get all tasks |
| GET | /tasks/{id} | Get task by id |
| POST | /tasks | Create task |
| PUT | /tasks/{id}/status?status=DONE | Update task status |
| DELETE | /tasks/{id} | Delete task |
| GET | /tasks/priority/{priority} | Get tasks by priority |
| GET | /tasks/overdue | Get overdue tasks |
| POST | /tasks/{taskId}/assign/{employeeId} | Assign task to employee |

---

# 7. Validation Requirements

Use validation annotations.

## Employee Validation

```java
@NotBlank
```

for:

- firstName
- lastName

```java
@Email
```

for:

- email

```java
@Positive
```

for:

- salary

---

## Department Validation

- budget cannot be negative

---

## Project Validation

- endDate cannot be before startDate

---

## Task Validation

- dueDate cannot be in the past

Controllers must use:

```java
@Valid
```

for request body validation.

---

# 8. Exception Handling

Create:

```java
ResourceNotFoundException
```

Create global exception handling using:

```java
@RestControllerAdvice
```

Handle:

- ResourceNotFoundException
- MethodArgumentNotValidException
- IllegalStateException

Return proper:

- HTTP status codes
- Validation messages
- Error messages

---

# 9. Security Requirement

Secure all endpoints using a hardcoded token filter.

Required request header:

```http
Authorization: Bearer company-secret-token
```

If token is invalid or missing return:

```http
401 Unauthorized
```

Implement using:

```java
OncePerRequestFilter
```

Exclude:

```text
/h2-console/**
```

from security filter.

---

# 10. H2 Database Configuration

Configure:

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=create-drop
spring.h2.console.enabled=true
spring.jpa.show-sql=true
```

---

# Expected Project Structure

```text
src/main/java/com/example/enterprise
│
├── controller
├── dto
├── entity
├── enums
├── exception
├── repository
├── security
├── service
└── EnterpriseProjectManagementApplication.java
```

