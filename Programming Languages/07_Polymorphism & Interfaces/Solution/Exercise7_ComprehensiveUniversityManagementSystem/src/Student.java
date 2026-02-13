import java.util.ArrayList;
import java.util.List;

public class Student implements UniversityMember, Learner{
//    Student(id, name, role, coursesEnrolled) implement UniversityMember, Learner
    private String id;
    private String name;
    private String role;
    private List<String> coursesEnrolled;

//    private String id;
//    private String name;
//    private String role;
//    private List<String> coursesEnrolled;

    public Student(String id, String name) {
        this.id = id;
        this.name = name;
        this.role = "Student";
        this.coursesEnrolled = new ArrayList<>();
    }


//    public Student(String id, String name) {
//        this.id = id;
//        this.name = name;
//        this.role = "Student";
//        this.coursesEnrolled = new ArrayList<>();
//    }


    @Override
    public String getID(){
        return id;
    }

    @Override
    public String getName(){
        return name;
    }

    @Override
    public String getRole(){
        return role;
    }


    // UniversityMember interface methods
//    @Override
//    public String getID() {
//        return id;
//    }
//
//    @Override
//    public String getName() {
//        return name;
//    }
//
//    @Override
//    public String getRole() {
//        return role;
//    }


    @Override
    public void attendClass(String courseName){
        coursesEnrolled.add(courseName);
        System.out.println(name + "is attending class: " + courseName);
    }

    // Learner interface method
//    @Override
//    public void attendClass(String courseName) {
//        coursesEnrolled.add(courseName);
//        System.out.println(name + " is attending class: " + courseName + ".");
//    }

    public void displayCourses(){
        System.out.println("Student " + name + "is enrolled in the following courses: ");
        for(String course: coursesEnrolled){
            System.out.println("- " + course);
        }

    }


    // Additional method to display enrolled courses
//    public void displayCourses() {
//        System.out.println(name + " is enrolled in the following courses:");
//        for(String course : coursesEnrolled) {
//            System.out.println("- " + course);
//        }
//    }
}

//Student:
//Implements UniversityMember and Learner.
//Attributes:
//id
//name
//role (e.g., "Student")
//coursesEnrolled
//Methods:
//Implement methods from the interfaces.