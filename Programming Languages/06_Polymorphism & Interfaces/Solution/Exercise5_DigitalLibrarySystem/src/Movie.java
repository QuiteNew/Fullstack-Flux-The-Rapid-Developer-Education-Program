public class Movie implements MediaItem, Playable, Downloadable {
    private String title;
    private String creator; // Director
    private double fileSize; // in GB
    private double duration; // in hours

    public Movie(String title, String creator, double fileSize, double duration) {
        this.title = title;
        this.creator = creator;
        this.fileSize = fileSize;
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

    // Playable interface methods
    @Override
    public void play() {
        System.out.println("Playing Movie \"" + title + "\" directed by " + creator + ".");
    }

    @Override
    public void pause() {
        System.out.println("Movie \"" + title + "\" is paused.");
    }

    @Override
    public void stop() {
        System.out.println("Movie \"" + title + "\" has stopped.");
    }

    // Downloadable interface method
    @Override
    public void download() {
        System.out.println("Downloading Movie \"" + title + "\" (" + fileSize + "GB).");
    }
}