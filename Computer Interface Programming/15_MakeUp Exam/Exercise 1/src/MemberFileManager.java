import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.time.LocalDate;

public class MemberFileManager {

    private final ObjectMapper objectMapper;

    public MemberFileManager() {
        this.objectMapper = new ObjectMapper();
    }

    public void saveMemberToFile(Member member, String fileName) {
        try {
            objectMapper.writeValue(new File(fileName), member);
            System.out.println("Member saved successfully to " + fileName);
        } catch (IOException e) {
            System.err.println("Error saving member to file: " + e.getMessage());
        }
    }

    public void appendMembershipPayment(String memberId, double fee, String filename) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename, true))) {
            String date = LocalDate.now().toString();
            String record = String.format("MemberID: [%s], Amount: [%.2f], Date: [%s];\n", memberId, fee, date);
            writer.write(record);
            System.out.println("Payment record appended successfully to " + filename);
        } catch (IOException e) {
            System.err.println("Error appending payment record: " + e.getMessage());
        }
    }

    public Member loadMemberFromFile(String fileName) {
        try {
            return objectMapper.readValue(new File(fileName), Member.class);
        } catch (IOException e) {
            System.err.println("Error loading member from file: " + e.getMessage());
            return null;
        }
    }
}