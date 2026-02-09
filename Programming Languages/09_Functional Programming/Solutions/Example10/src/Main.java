import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {

        List<Integer> initialListOfNumbers = Arrays.asList(2,3,4,5,2);
        System.out.println("Map method demo: ");
        List<Integer> square = initialListOfNumbers.stream().map(x -> x*x).collect(Collectors.toList());
        System.out.println(square);

        List<String> listOfStrings = Arrays.asList("a", "b", "c");
        List<String> collect = listOfStrings.stream().map(x -> x.toUpperCase()).collect(Collectors.toList());
        System.out.println(collect);

        List<String> initialListOfNames = Arrays.asList("Reflection", "Collection", "Stream", "Java", "Sorting");
        List<String> result = initialListOfNames.stream().filter(x -> x.startsWith("S")).collect(Collectors.toList());
        System.out.println(result);


        List<String> sortedList = initialListOfNames.stream().sorted().collect(Collectors.toList());
        System.out.println(sortedList);


        Set<Integer> setNum = initialListOfNumbers.stream().map(x -> x*x).collect(Collectors.toSet());
        System.out.println(setNum);


        initialListOfNumbers.stream().map(x -> x*x).forEach(y -> System.out.println(y));

        boolean isBiggerThen = initialListOfNumbers.stream().allMatch(x -> x>1);
        System.out.println("Are all numbers in the list bigger then 1: " + isBiggerThen);


        boolean isSmaller = initialListOfNumbers.stream().noneMatch(x -> x > 1);
        System.out.println("Are all elements in the list smaller then 1: " + isSmaller);

    }
}
