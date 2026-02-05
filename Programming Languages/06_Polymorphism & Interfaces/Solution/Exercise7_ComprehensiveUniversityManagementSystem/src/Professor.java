import java.util.ArrayList;
import java.util.List;

public class Professor implements UniversityMember, Educator, Researcher {

    private String id;
    private String name;
    private String role;
    List<String> coursesTaught;
    List<String> researchTopics;

    public Professor(String id, String name) {
        this.id = id;
        this.name = name;
        this.role = "Professor";
        this.coursesTaught = new ArrayList<>();
        this.researchTopics = new ArrayList<>();
    }



    // UniversityMember interface methods
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

    // Educator interface method
    @Override
    public void teachCourse(String courseName){
        coursesTaught.add(courseName);
    }

    // Researcher interface method
    @Override
    public void conductResearch(String topic){
        researchTopics.add(topic);
        System.out.println(name + "is conducting research on: " + topic);
    }


    // Additional methods to display courses and research
    public void displayCoursesTaught(){
        System.out.println(name + "is teaching the following courses: ");
        for(String course : coursesTaught){
            System.out.println("- " + course);
        }
    }

    public void displayResearchTopics(){
        System.out.println(name + "is conducting research on: ");
        for(String topic : researchTopics){
            System.out.println("- " + topic);
        }
    }
}

//Professor:
//Implements UniversityMember, Educator, and Researcher.
//Attributes:
//id
//name
//role (e.g., "Professor")
//coursesTaught
//researchTopics
//Methods:
//Implement methods from the interfaces.
