package com.example.controller;

import com.example.entity.Book;
import com.example.entity.Bookstore;
import com.example.service.BookService;
import com.example.service.BookstoreService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookstores")
//@RequestMapping("/bookstore")
@RequiredArgsConstructor
public class BookstoreController {

    private static final Logger logger = LoggerFactory.getLogger(BookstoreController.class);
    @Autowired
    private BookstoreService bookStoreService;
    @Autowired
    private BookService bookService;

    @GetMapping("/byBookId/{id}")
    public Optional<Bookstore> getBookstoreByBookId(@PathVariable Long id) {
        logger.info("Get book store by book id");
        return bookStoreService.getBookstoreByBookId(id);
    }

    @GetMapping("/byBookName/{name}")
    public Optional<Bookstore> getBookStoreByBooksName(@PathVariable String name) {
        logger.info("Get book store by book name");
        return bookStoreService.getBookstoreByBooksName(name);
    }

    @GetMapping
    public List<Bookstore> getAllBookStores() {
        return bookStoreService.getAllBookstores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bookstore> getBookStoreById(@PathVariable Long id) {
        Optional<Bookstore> bookStore = bookStoreService.getBookstoreById(id);
        return bookStore.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(value="/addBook"
//            , consumes = {"application/json"}
    )
    public Bookstore createBookStore(@RequestBody Bookstore bookStore) {
        System.out.println("Here");
        return bookStoreService.createBookstore(bookStore);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bookstore> updateBookStore(@PathVariable Long id, @RequestBody Bookstore bookStore) {
        try {
            return ResponseEntity.ok(bookStoreService.updateBookstore(id, bookStore));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookStore(@PathVariable Long id) {
        bookStoreService.deleteBookstore(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{bookStoreId}/books")
    public ResponseEntity<Bookstore> addBookToBookStore(@PathVariable Long bookStoreId, @RequestBody Book book) {
        try {
            return ResponseEntity.ok(bookStoreService.addBookToBookstore(bookStoreId, book));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value="/{bookStoreId}/{bookId}/books")
    public ResponseEntity<Bookstore> addExistingBookToBookStore(@PathVariable Long bookStoreId, @PathVariable Long bookId) {
        try {
            Book book = bookService.getBookById(bookId);
            return ResponseEntity.ok(bookStoreService.addBookToBookstore(bookStoreId, book));

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{bookStoreId}/books/{bookId}")
    public ResponseEntity<Void> removeBookFromBookStore(@PathVariable Long bookStoreId, @PathVariable Long bookId) {
        bookStoreService.removeBookFromBookstore(bookStoreId, bookId);
        return ResponseEntity.noContent().build();
    }

}
