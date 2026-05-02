package com.example.console;

import com.example.service.LibraryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Scanner;

@Component
public class LibraryConsoleApp implements CommandLineRunner {
    private final LibraryService libraryService;
    private final Scanner scanner = new Scanner(System.in);
    /*
    The @Component annotation marks LibraryConsoleApp as a Spring-managed component
    The constructor is automatically used by Spring for constructor injection
    Spring will:
        - Find a bean of type LibraryService in the application context
        - Create an instance of that LibraryService implementation
        - Pass it as the libraryService parameter to this constructor
        - The constructor then assigns it to the instance field this.libraryService
        - The constructor parameter libraryService is provided by Spring's IoC container,
            while this.libraryService is the class field where we store that injected dependency for later use in the class methods.
    */
    public LibraryConsoleApp(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    //The run method is executed automatically when the Spring Boot application starts because the class implements the CommandLineRunner interface.
    @Override
    public void run(String... args) {
        while (true) {
            System.out.println("\nLibrary Menu:");
            System.out.println("1. List available books");
            System.out.println("2. Add a new book");
            System.out.println("3. Reserve a book");
            System.out.println("4. Exit");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    libraryService.getAvailableBooks().forEach(
                            book -> System.out.println(book.getTitle() + " by " + book.getAuthor())
                    );
                    break;
                case 2:
                    System.out.print("Enter book title: ");
                    String title = scanner.nextLine();
                    System.out.print("Enter author name: ");
                    String author = scanner.nextLine();
                    libraryService.addBook(title, author);
                    System.out.println("Book added successfully!");
                    break;
                case 3:
                    System.out.print("Enter book title to reserve: ");
                    String bookTitle = scanner.nextLine();
                    if (libraryService.reserveBook(bookTitle)) {
                        System.out.println("Book reserved!");
                    } else {
                        System.out.println("Book not found or already reserved.");
                    }
                    break;
                case 4:
                    System.out.println("Exiting application...");
                    return;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }
}