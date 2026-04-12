import java.net.*;
import java.io.*;

/**
 * A simple Server application that performs addition of two numbers received from a client.
 * This server demonstrates basic socket programming concepts in Java.
 */
public class Server {
    // Define constants for better maintainability
    private static final int SERVER_PORT = 8080;
    
    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        Socket clientSocket = null;
        PrintWriter outputToClient = null;
        BufferedReader inputFromClient = null;

        try {
            // Step 1: Create a server socket and bind it to a specific port
            System.out.println("Starting server on port " + SERVER_PORT + "...");
            serverSocket = new ServerSocket(SERVER_PORT);
            System.out.println("Server is running and waiting for client connections...");

            // Step 2: Wait for a client to connect
            clientSocket = serverSocket.accept();
            System.out.println("Client connected from: " + clientSocket.getInetAddress());

            // Step 3: Set up input and output streams for communication
            outputToClient = new PrintWriter(new OutputStreamWriter(clientSocket.getOutputStream()), true);
            inputFromClient = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

            // Step 4: Handle initial greeting
            String clientGreeting = inputFromClient.readLine();
            System.out.println("Client says: " + clientGreeting);
            outputToClient.println("Hello, client! Ready to perform calculations.");

            // Step 5: Receive numbers from client and perform addition
            int number1 = Integer.parseInt(inputFromClient.readLine());
            System.out.println("Received first number: " + number1);

            int number2 = Integer.parseInt(inputFromClient.readLine());
            System.out.println("Received second number: " + number2);

            // Calculate the sum and send it back to client
            int sum = number1 + number2;
            outputToClient.println(sum);
            System.out.println("Sent result to client: " + sum);

        } catch (IOException e) {
            System.err.println("Error occurred in server: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.err.println("Invalid number format received from client: " + e.getMessage());
        } finally {
            // Step 6: Clean up resources
            try {
                if (outputToClient != null) outputToClient.close();
                if (inputFromClient != null) inputFromClient.close();
                if (clientSocket != null) clientSocket.close();
                if (serverSocket != null) serverSocket.close();
                System.out.println("Server shutdown complete.");
            } catch (IOException e) {
                System.err.println("Error while closing resources: " + e.getMessage());
            }
        }
    }
}

