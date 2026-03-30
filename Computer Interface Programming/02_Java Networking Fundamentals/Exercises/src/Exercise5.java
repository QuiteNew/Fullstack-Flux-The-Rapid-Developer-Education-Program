import java.awt.*;
import java.io.File;
import java.io.IOException;

public class Exercise5 {
    public static void main(String[] args) {
        if (!Desktop.isDesktopSupported()) {
            System.out.println("Desktop operations are not supported.");
            return;
        }

        Desktop desktop = Desktop.getDesktop();
        File file = new File("Class1/src/example.txt"); // Ensure this file exists on your system
        try {
            desktop.open(file);
        } catch (IOException e) {
            System.out.println("An error occurred opening the file.");
            e.printStackTrace();
        }
        System.out.println("this");
    }
}