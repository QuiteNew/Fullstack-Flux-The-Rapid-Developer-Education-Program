import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Exercises3 {
    public static void main(String[] args) {
        final Path startPath = Paths.get("Class1/src");
        final String fileExtension = ".java";

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(startPath, "*" + fileExtension)) {
            for (Path entry : stream) {
                System.out.println(entry);
            }
        } catch (IOException e) {
            System.err.println("Error occurred while searching for files.");
            e.printStackTrace();
        }
    }

}