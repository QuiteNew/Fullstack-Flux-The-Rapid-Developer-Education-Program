import java.io.*;
import java.net.Socket;
import java.net.UnknownHostException;

public class ClientTemplate {
    /*
    // Define constants for better maintainability
    private static final String SERVER_ADDRESS = "localhost";
    private static final int SERVER_PORT = 8080;

    public static void main(String[] args) {
        Socket clientSocket = null;
        PrintWriter outputToServer = null;
        BufferedReader inputFromServer = null;
        BufferedReader userInput = null;

        try {
            // Step 1: Connect to the server

            // Step 2: Set up communication streams

            // Step 3: Send initial greeting to server

            // Step 4: Get first number from user

            // Step 5: Get second number from user

            // Step 6: Receive and display the result

        } catch (UnknownHostException e) {
            System.err.println("Cannot find the server at " + SERVER_ADDRESS);
        } catch (IOException e) {
            System.err.println("Error in communication with server: " + e.getMessage());
        } finally {
            // Step 7: Clean up resources
            try {
                if (outputToServer != null) outputToServer.close();
                if (inputFromServer != null) inputFromServer.close();
                if (userInput != null) userInput.close();
                if (clientSocket != null) clientSocket.close();
                System.out.println("\nConnection closed.");
            } catch (IOException e) {
                System.err.println("Error while closing resources: " + e.getMessage());
            }
        }
    }
    */
}
