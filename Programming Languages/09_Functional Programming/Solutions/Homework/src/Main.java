
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {

        List<Book> bookList = new ArrayList<>();
        bookList.add(new Book("BTitle", 1, 2000.0, 3));
        bookList.add(new Book("ATitle2", 2, 1000.0, 40));

//        bookList.sort(Comparator.comparing(book -> book.getTitle()));
//        System.out.println(bookList);
//

//        Immutable
//        bookList.stream().sorted(Comparator.comparing(book -> book.getTitle()));
//        System.out.println(bookList);

       List<Book> resultList = bookList.stream().sorted(Comparator.comparing(book -> book.getTitle())).collect(Collectors.toList());
//        System.out.println(resultList);
        resultList.stream().forEach(book -> System.out.println(book));

        Book cheapestBook = resultList.stream().min(Comparator.comparingDouble(book -> book.getPrice())).orElse(null);
        System.out.println("Cheapest: " + cheapestBook);

        resultList.stream().min(Comparator.comparingDouble(book -> book.getPrice())).ifPresent(book -> System.out.println("Cheapest book: " + book));
        resultList.stream().max(Comparator.comparingDouble(book -> book.getPrice())).ifPresent(book -> System.out.println("Most expensive" + book));

        System.out.println("CHecking if there is at least one book with quantity over 1000: " + resultList.stream().anyMatch(book -> book.getQuantity() > 1000));
        resultList.stream().filter(book -> book.getQuantity() > 1000).forEach(book -> System.out.println(book));



    }
}