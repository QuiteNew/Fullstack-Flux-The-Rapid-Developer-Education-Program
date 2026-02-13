

import java.io.IOException;
import java.io.InvalidObjectException;


public class InheritanceDemo {

    public static void main(String[] args) {
        // TODO Auto-generated method stub

        String fileName = "childclass.txt";

        ChildClass childClass = new ChildClass();
        childClass.setProductId(21);
		childClass.setProduct("Blog");
        childClass.setBrand("TechBeamers");

        try {
            SerializationLib.doSerialize(childClass, fileName);

            ChildClass newChild = (ChildClass) SerializationLib.doDeserialize(fileName);
            System.out.println(newChild);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

    }

}