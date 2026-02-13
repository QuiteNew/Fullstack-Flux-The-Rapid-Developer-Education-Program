

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class StudentFileStream {


    public void writeToFIle(Student student, String fileName) {
        try{
            FileOutputStream fileOutputStream = new FileOutputStream(fileName);
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);

            objectOutputStream.writeObject(student);
            fileOutputStream.close();
            objectOutputStream.close();
            System.out.println("Obj serialized, before deserialization ");
            printData(student);

        } catch (IOException e) {
            System.out.println(e);
        }
    }

    public Student readFromFile(String fileName) {

        Student student = new Student();
        try{
            FileInputStream fileInputStream = new FileInputStream(fileName);
            ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);

            student = (Student) objectInputStream.readObject();
            fileInputStream.close();
            objectInputStream.close();
            System.out.println("Obj after deserialization ");
            printData(student);

        } catch (IOException e) {
            System.out.println(e);
        } catch (ClassNotFoundException e) {
            System.out.println(e);
        }
    return  student;
    }


    public void printData(Student  student) {
        System.out.println("Name = " + student.name);
        System.out.println("Index number = " + student.indexNum);
        System.out.println("Record number = " + student.recordNum);
        System.out.println("Phone number = " + student.phoneNum);
    }

}
