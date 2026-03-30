import java.awt.*;
import java.net.URI;

public class Exercise6 {
    public static void main(String[] args) {
        if (!Desktop.isDesktopSupported()) {
            System.out.println("Desktop operations are not supported");
            return;
        }
        Desktop desktop = Desktop.getDesktop();
        try {
            URI mailto = new URI("mailto:mitov@bss.com.mk?subject=Test%20Subject&body=Message%20Body");
            desktop.mail(mailto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}