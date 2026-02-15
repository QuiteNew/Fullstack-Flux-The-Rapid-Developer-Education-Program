public class Movie extends Media {
    private double duration; // in minutes

    // Constructor
    public Movie(String title, String creator, double duration) {
        super(title, creator);
        this.duration = duration;
    }

    // Unique method
    public void watchTrailer() {
        System.out.println("Trailer: Watch the trailer available.");
    }

    // Override displayInfo to include duration
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Duration: " + duration + " minutes");
    }
}
