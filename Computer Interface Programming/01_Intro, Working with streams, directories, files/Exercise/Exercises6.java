import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class Exercises6 {
    public static void main(String[] args) {
        Path filePath = Paths.get("Class1/src/example.txt");
        String textToAppend = "Java is fun!\n";

        try {
            Files.write(filePath, textToAppend.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            System.out.println("Text appended to file successfully.");
        } catch (IOException e) {
            System.err.println("Error occurred while appending to the file.");
            e.printStackTrace();
        }
    }

}