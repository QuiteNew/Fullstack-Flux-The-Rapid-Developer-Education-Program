import java.util.Scanner;

public class LibraryDemoPartA {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Library library = new Library();

        // Prompt user to enter details for three books
        for (int i = 1; i <= 3; i++) {
            System.out.println("Enter details for Book " + i + ":");

            System.out.print("Title: ");
            String title = scanner.nextLine();

            System.out.print("Author: ");
            String author = scanner.nextLine();

            double price = 0;
            while (true) {
                System.out.print("Price: ");
                if (scanner.hasNextDouble()) {
                    price = scanner.nextDouble();
                    scanner.nextLine(); // Consume newline
                    if (price >= 0) {
                        break;
                    } else {
                        System.out.println("Price cannot be negative. Please enter again.");
                    }
                } else {
                    System.out.println("Invalid input. Please enter a numerical value.");
                    scanner.next(); // Clear invalid input
                }
            }

            Book book = new Book(title, author, price);
            library.addBook(book);
            System.out.println();
        }

        // Display all entered book details
        System.out.println("Books in the Library:");
        library.displayAllBooks();

        scanner.close();
    }
}

