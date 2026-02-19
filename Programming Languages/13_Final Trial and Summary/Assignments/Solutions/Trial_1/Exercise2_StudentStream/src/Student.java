public class Student {
    //private String fullName;
    private String firstName;
    private String lastName;
    private String yearOfStudy;
    private double id;


//    public Student(String fullName, String yearOfStudy, double id) {
//        this.fullName = fullName;
//        this.yearOfStudy = yearOfStudy;
//        this.id = id;
//    }


    public Student(String firstName, String lastName, String yearOfStudy, double id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfStudy = yearOfStudy;
        this.id = id;
    }

//    public String getFullName() {
//        return fullName;
//    }


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public double getId() {
        return id;
    }
}
