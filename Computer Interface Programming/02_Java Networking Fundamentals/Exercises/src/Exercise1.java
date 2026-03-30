import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Scanner;

public class Exercise1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a hostname: ");
        String hostname = scanner.nextLine();

        try {
            InetAddress address = InetAddress.getByName(hostname);
            System.out.println("IP Address: " + address.getHostAddress());
            System.out.println("Canonical host name: " + address.getCanonicalHostName());
            System.out.println("Is reachable: " + address.isReachable(5000));
        } catch (UnknownHostException e) {
            System.out.println("Could not find IP address for: " + hostname);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}