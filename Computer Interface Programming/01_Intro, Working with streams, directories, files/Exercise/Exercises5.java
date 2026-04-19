import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class Exercises5 {
    public static void main(String[] args) {
        Path filePath = Paths.get("Class1/src/binaryData.bin");
        byte[] dataToWrite = {1, 2, 3, 4, 5, 10, 'C'};

        try {
            // Write binary data to file
            Files.write(filePath, dataToWrite);
            System.out.println("Data written to file.");

            // Read binary data from file
            byte[] readData = Files.readAllBytes(filePath);
            System.out.print("Read data: ");
            for (byte b : readData) {
                System.out.print(b + " ");
            }
        } catch (IOException e) {
            System.err.println("Error occurred while handling the file.");
            e.printStackTrace();
        }
    }

}