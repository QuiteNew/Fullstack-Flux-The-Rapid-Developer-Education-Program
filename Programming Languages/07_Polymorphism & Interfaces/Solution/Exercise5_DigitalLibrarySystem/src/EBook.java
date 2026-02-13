public class EBook implements MediaItem, Readable, Downloadable {
    private String title;
    private String creator;
    private double fileSize; // in MB
    private int numberOfPages;

    public EBook(String title, String creator, double fileSize, int numberOfPages) {
        this.title = title;
        this.creator = creator;
        this.fileSize = fileSize;
        this.numberOfPages = numberOfPages;
    }

    // MediaItem interface methods
    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getCreator() {
        return creator;
    }

    // Readable interface methods
    @Override
    public void open() {
        System.out.println("EBook \"" + title + "\" is now open.");
    }

    @Override
    public void readPage(int pageNumber) {
        if(pageNumber > 0 && pageNumber <= numberOfPages) {
            System.out.println("Reading page " + pageNumber + " of \"" + title + "\".");
        } else {
            System.out.println("Page number out of range.");
        }
    }

    @Override
    public void close() {
        System.out.println("EBook \"" + title + "\" is now closed.");
    }

    // Downloadable interface method
    @Override
    public void download() {
        System.out.println("Downloading EBook \"" + title + "\" (" + fileSize + "MB).");
    }
}
