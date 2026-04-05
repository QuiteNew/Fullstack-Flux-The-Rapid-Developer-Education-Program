import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class Client {
    public static void main(String[] args) throws Exception {
        // This line initiates the TCP handshake with the server.
        Socket socket = new Socket("localhost", 8080);

        // We wrap the socket streams for convenient text-based reading and writing.
        BufferedReader in = new BufferedReader(
                new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(
                socket.getOutputStream(), true);

        // Send '17' to the server.
        out.println("17");
        // in.readLine() blocks here until the server responds with the result.
        System.out.println(in.readLine());

        // Send '100' to the server.
        out.println("100");
        // Read the second result.
        System.out.println(in.readLine());

        // Closing the socket tells the server we are done, triggering its finally block.
        socket.close();
    }
}
