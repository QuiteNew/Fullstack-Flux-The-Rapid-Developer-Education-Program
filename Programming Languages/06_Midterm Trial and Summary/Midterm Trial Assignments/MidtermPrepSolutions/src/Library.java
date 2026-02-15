import java.util.ArrayList;
import java.util.Comparator;

public class Library {
    private ArrayList<Book> books;

    // Constructor
    public Library() {
        books = new ArrayList<>();
    }

    // Method to add a book to the library
    public void addBook(Book book) {
        books.add(book);
    }

    // Method to display all books in the library
    public void displayAllBooks() {
        if (books.isEmpty()) {
            System.out.println("No books in the library.");
            return;
        }
        int count = 1;
        for (Book book : books) {
            System.out.println("Book " + count + ":");
            System.out.println(book);
            System.out.println();
            count++;
        }
    }

    // Method to find books by a specific author
    public void findBooksByAuthor(String author) {
        boolean found = false;
        System.out.println("\nBooks by " + author + ":");
        for (Book book : books) {
            if (book.getAuthor().equalsIgnoreCase(author.trim())) {
                System.out.println("Title: " + book.getTitle());
                System.out.println("Price: " + book.getPrice());
                System.out.println();
                found = true;
            }
        }
        if (!found) {
            System.out.println("No books found by the author \"" + author + "\".");
        }
    }

    // Method to sort books by price in ascending order
    public void sortBooksByPrice() {
        books.sort(Comparator.comparingDouble(Book::getPrice));
    }

    // Method to display books with only title and price
    public void displayBooksSimplified() {
        for (Book book : books) {
            System.out.println("Title: " + book.getTitle());
            System.out.println("Price: " + book.getPrice());
            System.out.println();
        }
    }

    // Getters for further functionalities
    public ArrayList<Book> getBooks() {
        return books;
    }
}