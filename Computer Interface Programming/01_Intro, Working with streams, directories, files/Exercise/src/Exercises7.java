import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.LocalDate;
import java.time.ZoneId;

public class Exercises7 {
    public static void main(String[] args) {
        final Path startPath = Paths.get("Class1/src");
        final int days = 7; // Example: last 7 days

        try {
            Files.walkFileTree(startPath, 
            new SimpleFileVisitor<>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                    LocalDate lastModifiedTime = attrs.lastModifiedTime()
                            .toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    LocalDate now = LocalDate.now();
                    if (lastModifiedTime.isAfter(now.minusDays(days))) {
                        System.out.println(file);
                    }
                    return FileVisitResult.CONTINUE;
                }
            
            });
        } catch (IOException e) {
            System.err.println("Error occurred while listing files.");
            e.printStackTrace();
        }
    }

}