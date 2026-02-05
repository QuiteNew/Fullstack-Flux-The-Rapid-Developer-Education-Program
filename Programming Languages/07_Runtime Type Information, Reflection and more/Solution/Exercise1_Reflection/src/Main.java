import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) {

        try {
            Test testObj = new Test();
            Class classObj = testObj.getClass();

            System.out.println("Name of class: " + classObj.getName());
            System.out.println("COnstructor name: " + classObj.getConstructor());

            Method[] methods = classObj.getDeclaredMethods();
            for (Method method : methods) {
                System.out.println("Method name: " + method.getName());
            }

            Method methodCall1 = classObj.getDeclaredMethod("method1");
            methodCall1.invoke(testObj);

            Method methodCall2 = classObj.getDeclaredMethod("method2", int.class);
            methodCall2.invoke(testObj,19);

            Method method3Call = classObj.getDeclaredMethod("method3");
       method3Call.setAccessible(true);
            method3Call.invoke(testObj);

            Field field = classObj.getDeclaredField("s");
            field.setAccessible(true);
            field.set(testObj, "Java");
            System.out.println("New value: " + field.get(testObj));

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}