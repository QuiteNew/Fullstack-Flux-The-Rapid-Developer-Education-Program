import java.io.IOException;
import java.io.InvalidObjectException;
import java.io.ObjectInputStream;
import java.io.ObjectInputValidation;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class ChildClass extends ParentClass implements Serializable, ObjectInputValidation {

    private String brand;

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Override
    public String toString() {
        return getProduct() + " " + getProductId() + " " + brand;
    }


    private void writeObject(ObjectOutputStream objectOutputStream) throws IOException {

        objectOutputStream.defaultWriteObject();
        objectOutputStream.writeInt(getProductId());
        objectOutputStream.writeObject(getProduct());

    }

    private void readObject(ObjectInputStream objectInputStream) throws IOException, ClassNotFoundException {

        objectInputStream.defaultReadObject();
        setProductId(objectInputStream.readInt());
        setProduct((String) objectInputStream.readObject());

    }


    @Override
    public void validateObject() throws InvalidObjectException {
        if (brand == null || brand.equals(" ")) {
            throw new InvalidObjectException("Brand not set or empty");
        }
        if (getProductId() <= 0) {
            throw new InvalidObjectException("Product id not set or zero");
        }
    }

}

