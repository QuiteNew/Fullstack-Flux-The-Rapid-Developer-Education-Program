import java.net.*;
import java.util.*;

public class URLHeaderFields {
    public static void main(String[] args) {
        try {
            URI uri = URI.create("http://www.google.com");
            URL url = uri.toURL();
            URLConnection urlConnection = url.openConnection();
            Map<String, List<String>> headers = urlConnection.getHeaderFields();
            System.out.println("Header fields for the URL: ");
            for (Map.Entry<String, List<String>> entry : headers.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}