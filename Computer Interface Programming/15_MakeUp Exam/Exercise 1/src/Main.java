public class Main {
    public static void main(String[] args) {
        MemberFileManager fileManager = new MemberFileManager();
        String jsonFileName = "member_data.json";
        String paymentFileName = "payment_history.txt";

        try {
            System.out.println("--- Starting Library System Test ---");

            Member newMember = new Member("M1001", "Jane", "Doe", "jane.doe@example.com", 50.00);
            System.out.println("\nStep 1: Saving new member to JSON...");
            fileManager.saveMemberToFile(newMember, jsonFileName);

            System.out.println("\nStep 2: Loading member from JSON...");
            Member loadedMember = fileManager.loadMemberFromFile(jsonFileName);

            if (loadedMember != null) {
                System.out.println("\nStep 3: Loaded Member Information:");
                System.out.println(loadedMember.toString());

                System.out.println("\nStep 4: Appending payment record...");
                fileManager.appendMembershipPayment(loadedMember.getMemberId(), loadedMember.getMembershipFee(), paymentFileName);
            } else {
                System.out.println("Failed to load member. Aborting further operations.");
            }

            System.out.println("\n--- Library System Test Complete ---");

        } catch (Exception e) {
            System.err.println("An unexpected error occurred in the main application: " + e.getMessage());
        }
    }
}