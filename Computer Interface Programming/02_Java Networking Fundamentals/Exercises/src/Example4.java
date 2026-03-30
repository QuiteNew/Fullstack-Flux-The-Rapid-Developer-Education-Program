import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public class Example4 {

    public static void downloadFromUrl(String urlString, String outputFilePath) {
        try (InputStream in = new BufferedInputStream(new URL(urlString).openStream());
             FileOutputStream fileOutputStream = new FileOutputStream(outputFilePath)) {
            byte dataBuffer[] = new byte[1024];
            int bytesRead;
            while ((bytesRead = in.read(dataBuffer, 0, dataBuffer.length)) != -1) {
                fileOutputStream.write(dataBuffer, 0, bytesRead);
            }
            System.out.println("Download completed. Content saved to: " + outputFilePath);
        } catch (IOException e) {
            System.out.println("Error during download or save: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        String url = "https://github.com/"; // URL to download from
        String outputPath = "git_hub_downloaded_content.txt"; // File path to save content
        downloadFromUrl(url, outputPath);
    }
}