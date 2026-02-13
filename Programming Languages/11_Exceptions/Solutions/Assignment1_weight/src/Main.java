import javax.imageio.IIOException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) 	{
        InputStreamReader inputStreamReader = new InputStreamReader(System.in);
        BufferedReader bufferedReader = new BufferedReader(inputStreamReader);

        String name = "";
        double height = 0;
        int year = 0;
        int weight = 0;

        try {
            System.out.println("WHat is your name? ");
            name = bufferedReader.readLine();

            System.out.println("Which year were you born in: ");
            year = Integer.parseInt(bufferedReader.readLine());


            System.out.println("How tall (in meteres) are you? ");
            height = Double.parseDouble(bufferedReader.readLine());


            System.out.println("What is your weight (in kilograms)? ");
            weight = Integer.parseInt(bufferedReader.readLine());

        } catch (IOException e) {
            System.out.println("HANDLE IO Exception");
        } catch (NumberFormatException e) {
            System.out.println("Handling number format exception");
        }

        System.out.println("Your name is: " + name);
        System.out.println("This year you'll turn: " + (2024-year) + "years");
        System.out.println("YOur body-mass index is: " + weight/(height*height));

    }
}