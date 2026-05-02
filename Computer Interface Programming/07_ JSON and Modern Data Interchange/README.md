# Spring Core Concepts Guide and Exercises

## Introduction to Spring Core

Spring Core, the foundation of the Spring Framework, provides a comprehensive programming and configuration model for modern Java-based enterprise applications. At its heart lies the principle of Inversion of Control (IoC) and Dependency Injection (DI), which helps in decoupling the construction of objects from their usage.

## Key Concepts

### 1\. Inversion of Control (IoC)

IoC is a principle where the control of objects or portions of a program is transferred to a container or framework. In Spring, IoC is achieved through the ApplicationContext, which manages the lifecycle and configuration of application objects.

### 2\. Dependency Injection (DI)

DI is a design pattern used by IoC to achieve loose coupling. Dependencies (services or objects that a class needs to perform its function) are injected into classes rather than the classes creating or finding the dependencies themselves.

### 3\. Bean Management

In Spring, objects that form the backbone of your application and are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and managed by a Spring IoC container.



# Setting Up a Basic Spring Boot Project Using Spring Initializer



\## Introduction

Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". It takes an opinionated view of the Spring platform, which paves the way for a faster and more efficient development ecosystem.



\## Getting Started with Spring Initializer

Spring Initializer is an online tool that provides a convenient way to generate Spring Boot projects. With just a few clicks, you can set up your project base and start coding.



\### Step 1: Generate Your Project

\- Go to \[Spring Initializer](https://start.spring.io/)

\- Choose your preferred project metadata (Group, Artifact, Name, Description).

\- Select your Spring Boot version. Usually, the default selected version is the recommended one.

\- Add dependencies according to your project requirement. For a basic project, consider adding 'Spring Web'.



\### Step 2: Download and Open Your Project

\- Click on the "Generate" button.

\- Extract the downloaded ZIP file and open it with your favorite IDE (e.g., IntelliJ IDEA, Eclipse).



\## Exploring Spring Core Concepts in Spring Boot



\### Dependency Injection

Spring Boot leverages Spring's dependency injection mechanism to simplify the management of application components and services.



\#### Example

Create a simple service and inject it into a controller.



\*\*MyService.java\*\*

```java

import org.springframework.stereotype.Service;



@Service

public class MyService {

&#x20;   public String getHelloMessage() {

&#x20;       return "Hello, Spring Boot!";

&#x20;   }

}





## Exercise 1:

Create Spring boot application for simple library console application

* current books should be loaded from application properties
* there should be option for adding new book
* there should be option for listing the available books
* there should be option to reserve the books
* if one book is reserved should not be listed in available books
* the app should be console with menu for the user to send commands and receive response
* use Spring beans for code organization
* for every spring bean write print Creation time and destroy time



Use Spring SpEL, @Bean, Constructor initialization, application.properties



