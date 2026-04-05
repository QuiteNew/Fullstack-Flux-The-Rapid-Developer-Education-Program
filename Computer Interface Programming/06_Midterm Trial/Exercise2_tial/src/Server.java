import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

    private static final int PORT = 8080;

    public static void main(String[] args) {
        // We initialize the server and log the start to the console.
        System.out.println("Server started on port " + PORT);

        // Try-with-resources ensures the ServerSocket closes if an error occurs.
        try (ServerSocket serverSocket = new ServerSocket(PORT)) {

            while (true) {
                // The accept() method blocks here until a client tries to connect.
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected");

                // We spawn a new thread for every client so one slow user doesn't hang the whole server.
                new Thread(() -> handleClient(clientSocket)).start();
            }

        } catch (IOException e) {
            System.out.println("Server error: " + e.getMessage());
        }
    }

    private static void handleClient(Socket socket) {
        // We set up the input (reading from client) and output (writing to client) streams.
        // PrintWriter's 'true' argument enables 'auto-flush', sending data immediately.
        try (
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(socket.getInputStream()));
                PrintWriter out = new PrintWriter(
                        socket.getOutputStream(), true);
        ) {
            String input;

            // This loop stays active as long as the client keeps sending lines of text.
            while ((input = in.readLine()) != null) {
                input = input.trim();

                int number;
                try {
                    // We must validate that the input is actually a number before proceeding.
                    number = Integer.parseInt(input);
                } catch (NumberFormatException e) {
                    out.println("ERROR: Invalid number");
                    continue;
                }

                // Instead of calculating here, we wrap the logic in a PrimeTask.
                // We then launch a new thread for the calculation so the handler can keep reading input.
                PrimeTask task = new PrimeTask(number, out);
                new Thread(task).start();
            }

        } catch (IOException e) {
            System.out.println("Client error: " + e.getMessage());
        } finally {
            try {
                // Cleanup is vital to prevent memory leaks and hanging ports.
                socket.close();
                System.out.println("Client disconnected");
            } catch (IOException ignored) {}
        }
    }
}
