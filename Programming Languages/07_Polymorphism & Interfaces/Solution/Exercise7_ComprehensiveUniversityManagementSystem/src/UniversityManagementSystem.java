public class UniversityManagementSystem {
    public static void main(String[] args) {
    //Instantiate objects of Student, Professor, DepartmentHead, and StaffMember.
        Student student = new Student("S123", "Alice");
        Professor professor = new Professor("P456", "Dr. Bob");
        DepartmentHead departmentHead = new DepartmentHead("DH789", "Dr. Carol", "Computer Science");
        StaffMember staffMember = new StaffMember("SM012", "David", "Admissions");

        //Demonstrate their roles by calling their methods:

        //1. Students attending classes.
        System.out.println("Student Activities:");
        student.attendClass("Data Structures");
        student.attendClass("Operating Systems");
        student.displayCourses();
        System.out.println();

        //2. Professor teaches courses and conducts research
        System.out.println("Professor Activities:");
        professor.teachCourse("Algorithms");
        professor.teachCourse("Database Systems");
        professor.conductResearch("Artificial Intelligence");
        professor.conductResearch("Machine Learning");
        professor.displayCoursesTaught();
        professor.displayResearchTopics();
        System.out.println();

        // 3. DepartmentHead manages department and also teaches & researches
        System.out.println("Department Head Activities:");
        departmentHead.teachCourse("Computer Networks");
        departmentHead.conductResearch("Cybersecurity");
        departmentHead.manageDepartment("Information Technology");
        departmentHead.displayCoursesTaught();
        departmentHead.displayResearchTopics();
        departmentHead.displayDepartment();
        System.out.println();

        //4. StaffMember manages administrative tasks
        System.out.println("Staff Member Activities:");
        staffMember.manageDepartment("Student Affairs");
        staffMember.displayDepartment();
        System.out.println();

        // Display information about each member
        System.out.println("University Members Information:");
        displayMemberInfo(student);
        displayMemberInfo(professor);
        displayMemberInfo(departmentHead);
        displayMemberInfo(staffMember);
    }

    // Helper method to display member information
    public static void displayMemberInfo(UniversityMember member) {
        System.out.println("ID: " + member.getID());
        System.out.println("Name: " + member.getName());
        System.out.println("Role: " + member.getRole());
        System.out.println();
    }
}

//Interfaces:
//UniversityMember(getID(), getName(), getRole())
//Learner(attendClass(String courseName))
//Educator(teachCourse(String courseName))
//Researcher(conductResearch(String topic)):
//Administrator(manageDepartment(String departmentName))

//Classes:
//1. Student(id, name, role, coursesEnrolled) implement UniversityMember, Learner
//2. Professor(id, name, role, coursesTaught, researchTopics) implement UniversityMember, Educator, Researcher
//3. DepartmentHead(super, departmentName) extends Professor, implement Administrator
//4. StaffMember(id, name, role, departmentName) implement UniversityMember and Administrator


//Lecture11.Main class - UniversityManagementSystem
//Instantiate objects of Student, Professor, DepartmentHead, and StaffMember.
//Demonstrate their roles by calling their methods:
//1. Students attending classes.
//2. Professors teaching courses and conducting research.
//3. Department heads managing departments.
//4. Staff members managing administrative tasks.
//Display information about each university member, including their ID, name, role(s), and activities.