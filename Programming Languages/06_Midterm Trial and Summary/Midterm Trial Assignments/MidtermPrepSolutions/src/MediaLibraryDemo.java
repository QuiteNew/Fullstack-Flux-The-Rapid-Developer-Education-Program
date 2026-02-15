public class MediaLibraryDemo {
    public static void main(String[] args) {
        // Create instances of BookMedia and Movie
        BookMedia book1 = new BookMedia("Java Essentials", "Alice Johnson", 320);
        Movie movie1 = new Movie("Learning AI", "Bob Smith", 120.0);
        BookMedia book2 = new BookMedia("Effective Programming", "Carol White", 450);

        // Store them in a Media array
        Media[] mediaArray = {book1, movie1, book2};

        // Create MediaLibrary instance and display all media
        MediaLibrary mediaLibrary = new MediaLibrary();
        mediaLibrary.displayAllMedia(mediaArray);
    }
}