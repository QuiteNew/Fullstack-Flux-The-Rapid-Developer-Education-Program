public class MediaLibrary {
    // Method to display all media and invoke type-specific methods
    public void displayAllMedia(Media[] mediaArray) {
        for (Media media : mediaArray) {
            media.displayInfo();
            if (media instanceof BookMedia) {
                ((BookMedia) media).readSample();
            } else if (media instanceof Movie) {
                ((Movie) media).watchTrailer();
            }
            System.out.println(); // For spacing
        }
    }
}