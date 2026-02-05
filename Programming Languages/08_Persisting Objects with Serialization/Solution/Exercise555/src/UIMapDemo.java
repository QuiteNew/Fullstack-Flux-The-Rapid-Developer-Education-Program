import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class UIMapDemo {

    public static void main(String[] args) {

        String fileName = "uimap.properties";
        UIMap uiMap = new UIMap();
        uiMap.setId(23);
        uiMap.setLocator("cssSelector");
        uiMap.setValue("input[id=email]");

        try {

            FileOutputStream fileOutputStream = new FileOutputStream(fileName);
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);

            objectOutputStream.writeObject(uiMap);
            fileOutputStream.close();
            objectOutputStream.close();

            FileInputStream fis = new FileInputStream(fileName);
            ObjectInputStream ois = new ObjectInputStream(fis);
            UIMap p = (UIMap) ois.readObject();
            ois.close();
            System.out.println(p);

        } catch (IOException | ClassNotFoundException e) {
				e.printStackTrace();

        }

    }

}