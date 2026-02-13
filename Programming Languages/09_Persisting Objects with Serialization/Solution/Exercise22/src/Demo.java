public class Demo {

    public static void main(String[] args) {
        Student student = new Student("Student", "07667843", 1005, 1323);
        StudentFileStream fileStream = new StudentFileStream();
        String fileName = "student.txt";
        fileStream.writeToFIle(student, fileName);
        fileStream.readFromFile(fileName);

    }

}