import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {

        List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd", "", "jkl");
        System.out.println("list: " + strings);
        long count = getCountEmptyStringsUsingJava7(strings);
        System.out.println("Count empty strings:" + count);
        count = getCountLength3UsingJava7(strings);
        System.out.println("Count strings with length 3: " + count);

        List<String> filtered = deleteEmptyStringsUsingJava7(strings);
        System.out.println("Filtered: " + filtered);


        String mergedString = getMergedStringUsingJava7(strings, ", ");
        System.out.println("Merged string: " + mergedString);

        List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);

        List<Integer> squareList = getSquare(numbers);
        System.out.println("Square list: " + squareList);

       List<Integer> integers = Arrays.asList(1,2,13,4,15,6,17,8,19);

        System.out.println("List: " + integers);
        System.out.println("Max num in list is: " + getMax(integers));
        System.out.println("Min num of list is: " + getMin(integers));
        System.out.println("Sum of elements in list is: " + getSum(integers));
        System.out.println("Average of elements in list is: " + getAverage(integers));
        System.out.println("Random numbers: ");

        Random random = new Random();

        for (int i =0; i<10; i++) {
            System.out.println("random num: " + random.nextInt());
        }

        System.out.println("Using java 8: ");
        System.out.println("list: " + strings);

        count  = strings.stream().filter(string -> string.isEmpty()).count();
        System.out.println("Empty str count: " + count);
        count = strings.stream().filter(string -> string.length() == 3).count();
        System.out.println("Count length 3 str: " + count);

        filtered = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList());
        System.out.println("Filtered java 8: " + filtered);

        mergedString = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.joining(", "));
        System.out.println("Merged str: " + mergedString);

        squareList = numbers.stream().map(i -> i*i).distinct().collect(Collectors.toList());
        System.out.println("Square list java 8: " + squareList);

        System.out.println("List: " + integers);
        IntSummaryStatistics stats = integers.stream().mapToInt((x) -> x).summaryStatistics();

        System.out.println("Max in list java 8:" + stats.getMax());
        System.out.println("Min java 8: " + stats.getMin());
        System.out.println("SUm java 8: "+ stats.getSum());
        System.out.println("avg java 8: " + stats.getAverage());
        System.out.println("Random numbers: ");

        random.ints().limit(10).sorted().forEach(System.out::println);

        count = strings.parallelStream().filter(str -> str.isEmpty()).count();
        System.out.println("EMpty str: " + count);



    }

    public static int getCountEmptyStringsUsingJava7(List<String> strings){
        int count = 0;

        for (String string : strings) {
            if (string.isEmpty()) {
                count++;
            }
        }
        return count;
    }

    public static int getCountLength3UsingJava7(List<String> strings){
        int count = 0;

        for (String string : strings) {
            if (string.length() == 3) {
                count++;
            }
        }
        return count;
    }

    public static List<String> deleteEmptyStringsUsingJava7(List<String> strings) {
        List<String> filteredList = new ArrayList<>();
        for (String string : strings) {
            if(!string.isEmpty()) {
                filteredList.add(string);
            }
        }
        return filteredList;
    }


    public static String getMergedStringUsingJava7(List<String> strings, String separator){
        StringBuilder stringBuilder = new StringBuilder();

        for(String string : strings) {
            if(!string.isEmpty()) {
                stringBuilder.append(string);
                stringBuilder.append(separator);

            }
        }
        String mergedString = stringBuilder.toString();
        return mergedString.substring(0, mergedString.length() -2);
    }

    public static List<Integer> getSquares(List<Integer> numbers) {
        List<Integer> squareList = new ArrayList<>();

        for(Integer number : numbers) {
            Integer square = number * number;
//            Integer square = new Integer(number.intValue() * number.intValue());
            if(!squareList.contains(square)) {
                squareList.add(square);
            }

        }
        return squareList;
    }

    public static List<Integer> getSquare(List<Integer> numbers) {
        List<Integer> squaredList = new ArrayList<Integer>();

        for (Integer number : numbers) {
            Integer square = number * number;

            if(!squaredList.contains(square)) {
                squaredList.add(square);
            }
        }

        return squaredList;
    }

    public static int getMax(List<Integer> numbers){
        int max = numbers.get(0);

        for (int i=1; i<numbers.size(); i++) {
            Integer num = numbers.get(i);

            if(num > max) {
                max = num;
            }
        }

        return max;
    }

    public static int getMin(List<Integer> numbers){
        int min = numbers.get(0);

        for (int i=1; i<numbers.size(); i++) {
            Integer num = numbers.get(i);

            if(num < min) {
                min = num;
            }
        }

        return min;
    }

    public static int getSum(List<Integer> numbers){
        int sum = numbers.get(0);

        for (int i=1; i<numbers.size(); i++) {
            sum += numbers.get(i).intValue();
        }

        return sum;
    }


    public static int getAverage(List<Integer> numbers) {
         return getSum(numbers)/numbers.size();
    }

}
