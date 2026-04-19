import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class Exercises4 {
    public static void main(String[] args) {
        Path directoryPath = Paths.get("Class1/src/empty");

        try (Stream<Path> entries = Files.list(directoryPath)) {
            if (entries.findFirst().isPresent()) {
                System.out.println("Directory is not empty.");
            } else {
                System.out.println("Directory is empty.");
            }
        } catch (IOException e) {
            System.err.println("Error occurred while checking the directory.");
            e.printStackTrace();
        }
    }

}