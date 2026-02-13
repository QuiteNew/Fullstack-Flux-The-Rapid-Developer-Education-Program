public class InteractiveMagazine implements MediaItem, Readable, Playable, Downloadable {
    private String title;
    private String creator;
    private double fileSize; // in MB
    private int numberOfPages;
    private double duration; // for interactive content in hours

    public InteractiveMagazine(String title, String creator, double fileSize, int numberOfPages, double duration) {
        this.title = title;
        this.creator = creator;
        this.fileSize = fileSize;
        this.numberOfPages = numberOfPages;
        this.duration = duration;
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
        System.out.println("Interactive Magazine \"" + title + "\" is now open.");
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
        System.out.println("Interactive Magazine \"" + title + "\" is now closed.");
    }

    // Playable interface methods
    @Override
    public void play() {
        System.out.println("Playing interactive content of \"" + title + "\".");
    }

    @Override
    public void pause() {
        System.out.println("Interactive content of \"" + title + "\" is paused.");
    }

    @Override
    public void stop() {
        System.out.println("Interactive content of \"" + title + "\" has stopped.");
    }

    // Downloadable interface method
    @Override
    public void download() {
        System.out.println("Downloading Interactive Magazine \"" + title + "\" (" + fileSize + "MB).");
    }
}
