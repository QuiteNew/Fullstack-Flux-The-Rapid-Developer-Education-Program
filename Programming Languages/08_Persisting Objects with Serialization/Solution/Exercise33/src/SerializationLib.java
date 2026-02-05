import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class SerializationLib {

 // Do serialize the Java object and save it to a file
    public static void doSerialize(Object obj, String outputFile) throws IOException {
        FileOutputStream fileOutputStream = new FileOutputStream(outputFile);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
        objectOutputStream.writeObject(obj);
        fileOutputStream.close();

    }

// Do deserialize the Java object from a given file
    public static Object doDeserialize(String inputFile) throws IOException, ClassNotFoundException{
        FileInputStream fileInputStream = new FileInputStream(inputFile);
        ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
        Object o = objectInputStream.readObject();
        return o;

    }

}