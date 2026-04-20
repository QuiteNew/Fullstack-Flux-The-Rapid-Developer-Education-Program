import com.fasterxml.jackson.databind.ObjectMapper;

public class Exercise1 {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        // Serialization
        Student student = new Student("John Doe", 20, "johndoe@example.com");
        String json = mapper.writeValueAsString(student);
        System.out.println("Serialized JSON: " + json);

        // Deserialization
        Student deserializedStudent = mapper.readValue(json, Student.class);
        System.out.println("Deserialized Student: " + deserializedStudent.getName());
    }
}

class Student {
    private String name;
    private int age;
    private String email;

    public Student() {
    }

    public Student(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}