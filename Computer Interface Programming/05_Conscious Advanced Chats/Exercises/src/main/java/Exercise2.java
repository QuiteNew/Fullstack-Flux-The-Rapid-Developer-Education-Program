import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class Exercise2 {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        // Serialization
        StudentWithCourses student = new StudentWithCourses("John Doe", 20, null, List.of("course1", "course2"));
        String json = mapper.writeValueAsString(student);
        System.out.println("Serialized JSON: " + json);

        // Deserialization
        StudentWithCourses deserializedStudent = mapper.readValue(json, StudentWithCourses.class);
        System.out.println("Deserialized Student: " + deserializedStudent.getName());
    }
}

class StudentWithCourses {
    private String name;
    private int age;
    @JsonProperty("emailAddress")
    private String email;

    @JsonIgnore
    private List<String> courses;


    public StudentWithCourses() {
    }

    public StudentWithCourses(String name, int age, String email, List<String> courses) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.courses = courses;
    }

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
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
}