import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Exercises1 {
    public static void main(String[] args) throws IOException {
        // File f= new File("C:\\test\\text.txt");
//        File f= new File("text.txt");
//        if (! f.exists()){
//            f.createNewFile();
//            System.out.println("You have created a new file");
//        }
//        else{
//            System.out.println("There is already a file with that name on that location" );
//        }

        long timestamp = System.currentTimeMillis();
        String pathString = "uniqueFile_" + timestamp + ".txt";
        Path filePath = Paths.get(pathString);

        Files.createFile(filePath);
        System.out.println("Unique file created successfully: " + filePath);


        File f = new File(pathString);
        //name
        System.out.println("Name: " + f.getName());
        //location
        System.out.println("Path: " + f.getPath());

        //location
        //System.out.println("Absolute path: (String) " + f.getAbsolutePath());
        //canonical
        //System.out.println("Canonical path: (String)" + f.getCanonicalPath());
        //location
        System.out.println("Absolute path of file: " + f.getAbsoluteFile());
        //canonical
        System.out.println("Canonical path of file: " + f.getCanonicalFile());
        //can it be read from
        System.out.println("Reading privilege: " + f.canRead());
        //can it be written into
        System.out.println("Writing privileges: " + f.canWrite());

        //can it be executed
        System.out.println("Executing privileges: "+f.canExecute());
    }

}