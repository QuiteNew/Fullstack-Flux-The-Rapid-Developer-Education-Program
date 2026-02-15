public class BookMedia extends Media {
    private int numPages;

    // Constructor
    public BookMedia(String title, String creator, int numPages) {
        super(title, creator);
        this.numPages = numPages;
    }

    // Unique method
    public void readSample() {
        System.out.println("Sample: Sample pages are available to read.");
    }

    // Override displayInfo to include number of pages
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Pages: " + numPages);
    }
}