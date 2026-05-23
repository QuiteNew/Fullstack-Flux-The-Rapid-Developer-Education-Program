##### Spring Boot - Spring Data, JPA, H2

## JPA (Java Persistence API)


JPA is a Java specification for accessing, persisting, and managing data between Java objects / classes and a relational database. It is a part of the Java EE platform that provides an ORM framework. This API is used to reduce the boilerplate code required for connecting to a database by defining a simple and standardized interface.


## Spring Data


Spring Data is a part of the Spring Framework, which provides simplified data access mechanisms to work with data stores. It offers consistent data access patterns to relational and non-relational databases, map-reduce frameworks, and cloud-based data services. Spring Data abstracts boilerplate code, providing a more streamlined way to access data with minimal effort.


## H2 Database


The H2 Database is a lightweight, in-memory database that offers fast performance for development, testing, and deployment phases. It supports both in-memory and on-disk databases. H2 is compatible with the SQL-92 standard and can be integrated into applications in both embedded and server modes, making it a versatile choice for various development needs.


## PostgresSQL

https://hub.docker.com/\_/postgres

docker pull postgres

docker run --name my-postgres --env POSTGRES\_PASSWORD=admin --publish 5432:5432 --detach postgres

## Spring Boot - Spring core

# Exercises:
## Exercise 1:
Take the code from the example project
https://github.com/marjanuacs/cip-exercises-for-class-and-home/tree/main/Class8/example/JPA
- Add BookStore service with methods:
```java
        logger.info("Get book store by book id");
        logger.info(bookStoreService.getBookStoreByBookId(savedBooks.getFirst().getId()).toString());

        logger.info("Get book store by book name");
        logger.info(bookStoreService.getBookStoreByBooksName(savedBooks.getFirst().getName()).toString());

        logger.info("Get book store by name and address");
        logger.info(bookStoreService.getBookStoreByNameAndAddress(savedBookStore.getFirst().getName(),savedBookStore.getFirst().getAddress()).toString());
```
## Exercise 2:
Create new Spring Boot project with Spring data and H2 (similar as the example project) with:
- Two tables "Post" and "PostComment"
- One Post can have multiple comments
- One Comment can be related to one post
- Post table should have: id, text, date
- PostComment table should have: id, text, date

Populate with test data (2 Posts and 5 Comments) and implement services for:
- get all posts before date
- get all comments for one post after some date
- get all posts containing some text
- get all posts comments containing some text




