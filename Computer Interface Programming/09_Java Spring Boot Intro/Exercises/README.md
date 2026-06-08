\# Spring REST Basics



\## Introduction

Spring REST is part of the Spring Framework, which facilitates the creation of RESTful web services. 

It leverages the Spring MVC framework to handle HTTP requests and seamlessly integrate with your application's service layers.



\## Setting Up a Basic Project

To set up a basic Spring REST project, you can use Spring Boot, which simplifies the configuration and setup process.



\### Dependencies

Include the following dependencies in your `pom.xml` if you are using Maven:



```xml

<dependencies>

&#x20;   <dependency>

&#x20;       <groupId>org.springframework.boot</groupId>

&#x20;       <artifactId>spring-boot-starter-web</artifactId>

&#x20;   </dependency>

</dependencies>

Spring Boot - Spring core
Exercise 1:
Take the code from the example project
https://github.com/marjanuacs/cip-exercises-for-class-and-home/tree/main/Class8/example/JPA
create Rest controller for BookStore and provide endpoints for :
get all book stores
get book store by id
create new book store
update new book store
delete existing book store
add existing book to existing book store
add new book to existing book store
remove book from a book store




