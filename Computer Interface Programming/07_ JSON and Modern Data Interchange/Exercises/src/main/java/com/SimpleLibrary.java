import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class SimpleLibrary {
    private class Book {
        String title;
        String author;
        boolean isAvailable;

        Book(String title, String author) {
            this.title = title;
            this.author = author;
            this.isAvailable = true;
        }

        @Override
        public String toString() {
            return title + " by " + author;
        }
    }

    private List<Book> books = new ArrayList<>();
    private Scanner scanner = new Scanner(System.in);

    public SimpleLibrary() {
        // Hardcode initial books
        books.add(new Book("Pirej", "Petre M. Andreevski"));
        books.add(new Book("The Big Water", "Zhivko Chingo"));
        books.add(new Book("Papokot na svetot", "Venko Andonovski"));
    }

    private void showMenu() {
        System.out.println("\nLibrary Menu:");
        System.out.println("1. List available books");
        System.out.println("2. Add book");
        System.out.println("3. Reserve book");
        System.out.println("4. Exit");
        System.out.print("Choose: ");
    }

    private void listBooks() {
        System.out.println("\nAvailable Books:");
        boolean hasBooks = false;
        for (Book book : books) {
            if (book.isAvailable) {
                System.out.println(book);
                hasBooks = true;
            }
        }
        if (!hasBooks) {
            System.out.println("No books available.");
        }
    }

    private void addBook() {
        System.out.print("Enter title: ");
        String title = scanner.nextLine();
        System.out.print("Enter author: ");
        String author = scanner.nextLine();
        books.add(new Book(title, author));
        System.out.println("Book added.");
    }

    private void reserveBook() {
        System.out.print("Enter title to reserve: ");
        String title = scanner.nextLine();
        for (Book book : books) {
            if (book.title.equalsIgnoreCase(title) && book.isAvailable) {
                book.isAvailable = false;
                System.out.println("Book reserved.");
                return;
            }
        }
        System.out.println("Book not found or already reserved.");
    }

    public void run() {
        while (true) {
            showMenu();
            String choice = scanner.nextLine();
            switch (choice) {
                case "1": listBooks(); break;
                case "2": addBook(); break;
                case "3": reserveBook(); break;
                case "4":
                    System.out.println("Goodbye!");
                    scanner.close();
                    return;
                default: System.out.println("Invalid choice.");
            }
        }
    }

    public static void main(String[] args) {
        new SimpleLibrary().run();
    }
}