public class AudioBook implements MediaItem, Playable, Downloadable {
    private String title;
    private String creator;
    private double fileSize; // in MB
    private double duration; // in hours

    public AudioBook(String title, String creator, double fileSize, double duration) {
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
        System.out.println("Playing AudioBook \"" + title + "\".");
    }

    @Override
    public void pause() {
        System.out.println("AudioBook \"" + title + "\" is paused.");
    }

    @Override
    public void stop() {
        System.out.println("AudioBook \"" + title + "\" has stopped.");
    }

    // Downloadable interface method
    @Override
    public void download() {
        System.out.println("Downloading AudioBook \"" + title + "\" (" + fileSize + "MB).");
    }
}
