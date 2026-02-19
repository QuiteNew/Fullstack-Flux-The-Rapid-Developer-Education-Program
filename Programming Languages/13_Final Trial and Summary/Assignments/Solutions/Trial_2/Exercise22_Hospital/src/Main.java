private static final Random random = new Random();

// Register patient method
public static Patient registerPatient(String firstName, String lastName) {
    Patient patient = new Patient();
    patient.setFirstName(firstName);
    patient.setLastName(lastName);
    patient.setPatientNumber("P-" + (1000 + random.nextInt(9000)));
    patient.setRoomNumber(100 + random.nextInt(300));
    return patient;
}

// Display patient method
public static void displayPatient(Patient patient) {
    System.out.println(
            "Patient Number: " + patient.getPatientNumber() +
                    ", Name: " + patient.getFirstName() + " " + patient.getLastName() +
                    ", Room: " + patient.getRoomNumber()
    );
}

public static void main(String[] args) {

    // 1. Create ArrayList of patient names
    ArrayList<String> names = new ArrayList<>(List.of(
            "John Smith", "Jane Doe", "Alice Brown", "Bob White", "Chris Green",
            "Emma Black", "Liam Gray", "Sophia Hall", "Noah Young", "Olivia King"
    ));

    // 2. Using streams, create Patient objects
    List<Patient> patients = names.stream()
            .map(name -> {
                String[] parts = name.split(" ");
                return registerPatient(parts[0], parts[1]);
            })
            .collect(Collectors.toList());

    // 3. Print all patient details
    System.out.println("ALL PATIENTS:");
    patients.forEach(patient -> displayPatient(patient));

    // 4. Filter patients: room 200–299 AND odd room number
    List<Patient> filteredPatients = patients.stream()
            .filter(p -> p.getRoomNumber() >= 200 && p.getRoomNumber() <= 299)
            .filter(p -> p.getRoomNumber() % 2 != 0)
            .collect(Collectors.toList());

    System.out.println("\nFILTERED PATIENTS (Room 200–299 and odd):");
    filteredPatients.forEach(patient -> displayPatient(patient));
}
