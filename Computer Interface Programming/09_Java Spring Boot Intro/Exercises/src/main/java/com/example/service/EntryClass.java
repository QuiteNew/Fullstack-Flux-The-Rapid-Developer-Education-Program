package com.example.service;

import com.example.entity.Book;
import com.example.entity.Bookstore;
import com.example.repository.BookRepository;
import com.example.repository.BookstoreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Component
public class EntryClass {

    Logger logger = LoggerFactory.getLogger(EntryClass.class);

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookstoreRepository bookstoreRepository;

    @Autowired
    private BookService bookService;
    @Autowired
    private BookstoreService bookstoreService;


    @EventListener(ApplicationStartedEvent.class)
    @Transactional
    public void populateDb() {
        //

        var savedBookStore = bookstoreRepository.saveAll(List.of(new Bookstore("First store", "Address1"),
                new Bookstore("Second store", "Adress2"),
                new Bookstore("Third store", "Adress2")));

        Bookstore existingBookstore = bookstoreRepository.findBookstoreById(Long.parseLong("55"));
        // book1.setBookStore(savedBookStore);
        var savedBooks = bookRepository.saveAll(List.of(new Book("Book 1", "Author 1", savedBookStore.get(0)),
                new Book("Book 2", "Author 2", savedBookStore.get(1)),
                new Book("Book 3", "Author 2", savedBookStore.get(0)),
                new Book("Book 4", "Author 1", savedBookStore.get(1)),
                new Book("Book 5", "Author 3", existingBookstore)));

        existingBookstore = bookstoreRepository.findBookstoreById(Long.parseLong("55"));
//        System.out.println("Existing bookstore: " + existingBookstore);
        var books = existingBookstore.getBooks();
        Bookstore changedBookStore = bookstoreRepository.findBookstoreById(savedBookStore.get(1).getId());
        System.out.println("Bookstore to be changed: " + changedBookStore.getName());
//        System.out.println("Before change: ");
//        savedBookStore.get(1).getBooks().forEach(book -> System.out.println(book));
        Book testBook = savedBooks.get(0);
//        savedBookStore.get(1).getBooks().add(testBook);
        savedBookStore.get(1).addBook(testBook);
//        testBook.setBookStore(savedBookStore.get(1));

        bookRepository.save(testBook);
        bookRepository.flush();
//        bookstoreRepository.flush();
        System.out.println("After change: ");

        changedBookStore = bookstoreRepository.findBookstoreById(savedBookStore.get(1).getId());
        changedBookStore.getBooks().forEach(book -> System.out.println(book.getBookStore()));
//        System.out.println("changedBookStore" + changedBookStore.getName());

        bookRepository.findAll().forEach(System.out::println);
        logger.info(savedBookStore.toString());
        bookstoreRepository.findAll().forEach(System.out::println);

        logger.info("Get books by Author");

        bookService.getBooksByAuthor("Author 1").forEach(System.out::println);

        logger.info("Get books by store");
        bookService.getBooksByBookstore(savedBookStore.get(1)).forEach(System.out::println);

        logger.info("Get books by id");
        logger.info(String.valueOf(bookService.getBookById(savedBooks.get(0).getId())));

//        logger.info("Get book store by book id");
//        logger.info(bookStoreService.getBookStoreByBookId(savedBooks.getFirst().getId()).toString());

//        logger.info("Get book store by book name");
//        List<BookStore> bookStoreByBooksName = bookStoreService.getBookStoreByBooksName(savedBooks.getFirst().getName());
//        bookStoreByBooksName.forEach(bookStore -> logger.info(bookStore.toString()));
//
//        logger.info("Get book store by name and address");
//        List<BookStore> bookStoreByNameAndAddress = bookStoreService.getBookStoreByNameAndAddress(savedBookStore.getFirst().getName(), savedBookStore.getFirst().getAddress());
//        bookStoreByNameAndAddress.forEach(bookStore -> logger.info(bookStore.toString()));

        System.out.println("From here starts the actual data init: ");

        Bookstore store1 = new Bookstore("Central Library", "123 Main St");
        Bookstore store2 = new Bookstore("Westside Books", "456 Elm St");


//        Bookstore bookStore = new Bookstore();
//            bookStore.setName("City Bookstore");

        Book book11 = new Book("Spring Boot Guide", "Author1", store1);
        Book book22 = new Book("Hibernate Basics", "Author2", store1);
        Book book1 = new Book("Spring Guide","Author1", store1);
        Book book2 = new Book("Java Basics", "Author1", store2);

//            store1.setBooks(Set.of(book11, book22, book1));
            store2.setBooks(Set.of(book2));

            bookstoreRepository.save(store1);
            bookstoreRepository.save(store2);
            bookRepository.saveAll(List.of(book11, book22, book1, book2));

            System.out.println("Sample data initialized");


        bookstoreService.getBookstoreByBookId(book1.getId()).ifPresent(
                store -> logger.info("Found bookstore by book ID: {}", store));

        bookstoreService.getBookstoreByBooksName(book1.getName()).ifPresent(
                store -> logger.info("Found bookstore by book name: {}", store));

        bookstoreService.getBookstoreByNameAndAddress(store1.getName(), store1.getAddress()).ifPresent(
                store -> logger.info("Found bookstore by name and address: {}", store));
    };

        }


