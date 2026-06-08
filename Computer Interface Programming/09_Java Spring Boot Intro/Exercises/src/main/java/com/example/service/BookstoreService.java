package com.example.service;

import com.example.entity.Book;
import com.example.entity.Bookstore;
import com.example.repository.BookRepository;
import com.example.repository.BookstoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookstoreService {

    @Autowired
    private BookstoreRepository bookstoreRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookService bookService;

    public List<Bookstore> getAllBookstores() {
        return bookstoreRepository.findAll();
    }

    public Optional<Bookstore> getBookstoreById(Long id) {
        return bookstoreRepository.findById(id);
    }

    public Bookstore createBookstore(Bookstore bookstore) {
        return bookstoreRepository.save(bookstore);
    }

    public Bookstore updateBookstore(Long id, Bookstore bookstoreDetails) {
        return bookstoreRepository.findById(id).map(bookstore -> { bookstore.setName(bookstoreDetails.getName());
        bookstore.setAddress(bookstoreDetails.getAddress());
        return bookstoreRepository.save(bookstore);}).orElseThrow(() -> new RuntimeException("Bookstore not found"));
    }

    public void deleteBookstore(Long id) {
        bookstoreRepository.deleteById(id);
    }

    public Bookstore addBookToBookstore(Long bookstoreId, Book book) {
        return bookstoreRepository.findById(bookstoreId).map(bookstore -> {
            book.setBookStore(bookstore);
//            bookRepository.save(book);
//            bookstore.getBooks().add(book);
            bookService.getBooksByBookstore(bookstore).forEach(b -> System.out.println(b));
            return
                    bookstore;
//                    bookstoreRepository.save(bookstore);
        }).orElseThrow(() -> new RuntimeException("Bookstore not found"));
    }

    public void removeBookFromBookstore(Long bookstoreId, Long bookId) {
        bookstoreRepository.findById(bookstoreId).ifPresent(bookstore -> {
            bookRepository.findById(bookId).ifPresent(book -> {
                bookstore.getBooks().remove(book);
                bookRepository.delete(book);
            });
        });
    }

    public Optional<Bookstore> getBookstoreByBookId(Long bookId) {
        return bookstoreRepository.findByBooks_Id(bookId);
    }

    public Optional<Bookstore> getBookstoreByBooksName(String bookName) {
        return bookstoreRepository.findByBooks_Name(bookName);
    }

    public Optional<Bookstore> getBookstoreByNameAndAddress(String name, String address) {
        return bookstoreRepository.findByNameAndAddress(name, address);
    }

    public void saveBookStore(Bookstore bookstore) {
        bookstoreRepository.save(bookstore);
    }
}
