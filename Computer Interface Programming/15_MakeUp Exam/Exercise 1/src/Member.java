public class Member {
    private String memberId;
    private String firstName;
    private String lastName;
    private String email;
    private double membershipFee;

    public Member() {
    }

    public Member(String memberId, String firstName, String lastName, String email, double membershipFee) {
        this.memberId = memberId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.membershipFee = membershipFee;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getMembershipFee() {
        return membershipFee;
    }

    public void setMembershipFee(double membershipFee) {
        this.membershipFee = membershipFee;
    }

    @Override
    public String toString() {
        return "Member Info: " + firstName + " " + lastName + " (ID: " + memberId + "), Email: " + email + ", Fee: $" + membershipFee;
    }
}