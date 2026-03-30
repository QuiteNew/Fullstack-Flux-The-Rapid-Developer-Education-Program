import java.io.*;
import java.net.URI;
import java.net.URL;

public class Exercise3 {
    public static void main(String[] args) {
        try {
            URI uri = URI.create("https://uacs.edu.mk/home/home/");
            URL url = uri.toURL();
            //URL url = new URL("https://uacs.edu.mk/home/home/");
            System.out.println(url.getAuthority());
            System.out.println(url.getDefaultPort());
            System.out.println(url.getHost());
            System.out.println(url.getPort());
            System.out.println(url.getQuery());
            System.out.println(url.getFile());
            System.out.println(url.getPath());
            System.out.println(url.getProtocol());
            System.out.println(url);

            BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
            BufferedWriter out = new BufferedWriter(new FileWriter("downloaded_content.html"));

            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                out.write(inputLine);
                out.newLine();
            }
            in.close();
            out.close();
            System.out.println("Content downloaded successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}