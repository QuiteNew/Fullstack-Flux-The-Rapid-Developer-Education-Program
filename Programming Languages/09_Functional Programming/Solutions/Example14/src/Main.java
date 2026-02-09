import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {

        List<String> alphabets = Arrays.asList("A", "B", "C");
        List<String> names = Arrays.asList("Sansa", "Jon", "Arya");

        Stream<String> opstream = Stream.concat(alphabets.stream(), names.stream());
        opstream.forEach(str -> System.out.print(str + " "));
    }
}
