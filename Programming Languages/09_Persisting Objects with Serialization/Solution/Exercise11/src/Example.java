import java.io.Serializable;

public class Example implements Serializable {

    transient int transientInt;
    static int staticInt;
    String name;
    int age;



    public Example(String name, int age, int transientInt, int staticInt) {
        this.name = name;
        this.age = age;
        this.transientInt = transientInt;
        this.staticInt = staticInt;
    }

}
