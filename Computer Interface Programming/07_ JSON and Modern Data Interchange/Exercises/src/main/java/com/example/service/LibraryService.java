package com.example.service;

import com.example.model.Book;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibraryService {
    private final List<Book> books;

    /*
    @Value: Spring annotation injects values from properties files
    ${library.books}: Reads the value from application.properties where library.books=Pirej|Petre M. Andreevski,The Big Water|Zhivko Chingo,Papokot na svetot|Venko Andonovski
    #{}: Spring Expression Language (SpEL) syntax for evaluating expressions
    .split(','): SpEL method call that splits the string on commas

    The injection process:
        Spring reads library.books property
        Splits it into a List<String> using the comma delimiter
        Injects this list into the constructor parameter bookEntries
        The constructor then processes each entry to create Book objects
        This injection happens when Spring creates the LibraryService bean during application startup.
     */

    public LibraryService(@Value("#{'${library.books}'.split(',')}") List<String> bookEntries) {
        this.books = bookEntries.stream()
                .map(entry -> {
                    String[] parts = entry.split("\\|");
                    return new Book(parts[0], parts[1]);
                })
                .collect(Collectors.toList());
    }

    public List<Book> getAvailableBooks() {
        return books.stream().filter(book -> !book.isReserved()).collect(Collectors.toList());
    }

    public void addBook(String title, String author) {
        books.add(new Book(title, author));
    }

    public boolean reserveBook(String title) {
        for (Book book : books) {
            if (book.getTitle().equalsIgnoreCase(title) && !book.isReserved()) {
                book.setReserved(true);
                return true;
            }
        }
        return false;
    }
}
