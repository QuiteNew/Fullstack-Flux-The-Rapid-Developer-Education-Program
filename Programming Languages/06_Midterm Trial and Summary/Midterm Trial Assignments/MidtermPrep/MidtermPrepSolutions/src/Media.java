public class Media {
    protected String title;
    protected String creator; // Represents author or director

    // Constructor
    public Media(String title, String creator) {
        this.title = title;
        this.creator = creator;
    }

    // Method to display media information
    public void displayInfo() {
        System.out.println("Title: " + title);
        System.out.println("Creator: " + creator);
    }
}
