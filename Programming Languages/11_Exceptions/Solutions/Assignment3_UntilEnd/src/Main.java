import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String []args)	{
        InputStreamReader isr = new InputStreamReader(System.in);
        BufferedReader bufferedReader = new BufferedReader(isr);
        String text = "";

        try{
            while (true){
                System.out.println("Enter the text, or END to finish inputting: ");
                text = bufferedReader.readLine();
                if (text.equalsIgnoreCase("END")) break;;
                int weight = 0;
                for(int i=0; i<text.length(); i++){
                    weight +=text.charAt(i);

                }

                System.out.println(text + "has :" + text.length() + " characters, and its weight is: " + weight);
            }
        } catch (IOException e) {
            System.out.println("Thank you for using the program");
        }


    }

}