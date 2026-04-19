import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Exercises2 {
    public static void main(String[] args) {
        Path filePath = Paths.get("Class1/src/example.txt");

        try {
            List<String> lines = Files.readAllLines(filePath);
            System.out.println("Number of lines: " + lines.size());
        } catch (IOException e) {
            System.err.println("Error occurred while reading the file.");
            e.printStackTrace();
        }
    }

}