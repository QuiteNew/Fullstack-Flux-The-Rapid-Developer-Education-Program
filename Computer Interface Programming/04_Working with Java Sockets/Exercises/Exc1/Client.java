import java.io.*;
import java.net.*;

/**
 * A simple Client application that connects to a server and requests addition of two numbers.
 * This client demonstrates basic socket programming concepts in Java.
 */
public class Client {
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
            System.out.println("Connecting to server at " + SERVER_ADDRESS + ":" + SERVER_PORT + "...");
            clientSocket = new Socket(SERVER_ADDRESS, SERVER_PORT);
            System.out.println("Connected successfully!");

            // Step 2: Set up communication streams
            outputToServer = new PrintWriter(new OutputStreamWriter(clientSocket.getOutputStream()), true);
            inputFromServer = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            userInput = new BufferedReader(new InputStreamReader(System.in));

            // Step 3: Send initial greeting to server
            outputToServer.println("Hello server");
            String serverResponse = inputFromServer.readLine();
            System.out.println("Server says: " + serverResponse);

            // Step 4: Get first number from user
            System.out.print("Please enter the first number: ");
            String number1 = userInput.readLine();
            outputToServer.println(number1);

            // Step 5: Get second number from user
            System.out.print("Please enter the second number: ");
            String number2 = userInput.readLine();
            outputToServer.println(number2);

            // Step 6: Receive and display the result
            String result = inputFromServer.readLine();
            System.out.println("\nCalculation Result:");
            System.out.println("-------------------");
            System.out.println(number1 + " + " + number2 + " = " + result);

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
}