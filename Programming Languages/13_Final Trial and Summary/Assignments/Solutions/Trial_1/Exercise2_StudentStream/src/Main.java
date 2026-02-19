//public static Student createStudent (String fullName, String yearOfStudy, double id){
//    return new Student(fullName,  yearOfStudy, id);
//}

public static Student createStudent (String firstName, String lastName, String yearOfStudy, double id){
    return new Student(firstName, lastName, yearOfStudy, id);
}

public static void print(Student student) {
    System.out.println("Student info:");
    System.out.println("Name: " + student.getFirstName() + " " + student.getLastName());
    System.out.println("Year od study: " + student.getYearOfStudy());
    System.out.println("ID: "+ student.getId());
}

public static void main(String[] args) {

    Random random = new Random();
//    List<String> names=  Arrays.asList("Alice", "Emma", "Liam");
    List<String> names=  Arrays.asList("Alice Brown", "Emma Black", "Liam Gray");
   //    List<Student> students = names.stream().map(name ->
//            createStudent(name, Integer.toString(random.nextInt(3) + 1),
//                    random.nextDouble(9999 - 1000 + 1) + 1000)).collect(Collectors.toList());

    List<Student> students = names.stream().map(name ->
            {
                String[] parts = name.split(" ");
                return createStudent(parts[0], parts[1], Integer.toString(random.nextInt(3) + 1),
                        random.nextDouble(9999 - 1000 + 1) + 1000);
            }).collect(Collectors.toList());

    System.out.println("Print all students:");
    students.stream().forEach(student -> print(student));

    System.out.println("Student from second year: ");
    students.stream().filter(student -> student.getYearOfStudy().equals("2")).forEach(student ->  print(student));

}