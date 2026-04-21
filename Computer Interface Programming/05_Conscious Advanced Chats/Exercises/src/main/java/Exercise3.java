import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class Exercise3 {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        StudentWithGrades student = new StudentWithGrades("John Doe", 20, "mitov@bss.com.mk",
                Map.of("course1", 2d,"course2",3d));
        String json = mapper.writeValueAsString(student);
        System.out.println("Serialized JSON: " + json);

        StudentWithGrades deserializedStudent = mapper.readValue(json, StudentWithGrades.class);
        System.out.println("Deserialized Student name: " + deserializedStudent.getName());
        System.out.println("Deserialized Student age: " + deserializedStudent.getAge());
        System.out.println("Deserialized Student email: " + deserializedStudent.getEmail());
        System.out.println("Deserialized Student grades:");

        for (Map.Entry<String, Double> entry : deserializedStudent.getGrades().entrySet()) {
            System.out.println("Course name:" + entry.getKey() + ", grade:" + entry.getValue());
        }
    }
}

class StudentWithGrades {
    private String name;
    private int age;
    @JsonProperty("emailAddress")
    private String email;
    Map<String, Double> grades;

    public StudentWithGrades() {
    }

    public StudentWithGrades(String name, int age, String email, Map<String, Double> grades) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.grades = grades;
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

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Map<String, Double> getGrades() {
        return grades;
    }

    public void setGrades(Map<String, Double> grades) {
        this.grades = grades;
    }
}