import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) {
        InputStreamReader inputStreamReader = new InputStreamReader(System.in);
        BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
        int[][] field;
        int rows = 0;
        int columns = 0;
        int sum = 10;

        try {
            System.out.println("Number fo rows: ");
            rows = Integer.parseInt(bufferedReader.readLine());


            System.out.println("Number fo columns: ");
            columns = Integer.parseInt(bufferedReader.readLine());


            field = new int[rows][columns];
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < columns; j++) {
                    System.out.println("Enter value for element [" + i + "][" + j + "]: ");
                    field[i][j] = Integer.parseInt(bufferedReader.readLine());
                    sum += field[i][j];
                }
            }
        } catch (IOException e) {
            System.out.println("An exception has occurred");
        } catch (NumberFormatException numberFormatException) {
            System.out.println("HANDLE NumFormExcept");
        }

        System.out.println("The sum: " + sum);
        System.out.println("The average: " + (double) sum/0);



    }
}