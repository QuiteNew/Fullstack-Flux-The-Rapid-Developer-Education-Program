import java.io.IOException;

public class SerializationDemo {

    public static void main(String[] args) {

        String outputFile="serializationdemo.txt";
        SerializationDef def = new SerializationDef();
        def.setProduct("testProduct");
        def.setFeature("testFeature");
        def.setFeatureCount(10);

        // Serialize the object into a file.
        try {
            SerializationLib.doSerialize(def, outputFile);
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        // Deserialize from a file into an object.
        SerializationDef defNext = null;
        try {
            defNext = (SerializationDef) SerializationLib.doDeserialize(outputFile);
        } catch (ClassNotFoundException | IOException e) {
            e.printStackTrace();
        }

        System.out.println("def():\n --"+"\n  |\n  "+def);
        System.out.println(System.lineSeparator());
        System.out.println("defNext():\n --"+"\n  |\n  "+defNext);
    }

}