import java.io.*;
import java.net.*;
import java.util.Scanner;

/**
 * Exercise 5: Client that sends an array to the server
 * The server returns the minimum element in the array
 */
class Client5 {
    // Server connection details
    private static final String SERVER_IP = "127.0.0.1";
    private static final int SERVER_PORT = 8080;
    
    public static void main(String[] argv) {
        Socket clientSocket = null;
        
        try {
            // Connect to server
            System.out.println("Connecting to server at " + SERVER_IP + ":" + SERVER_PORT + "...");
            clientSocket = new Socket(SERVER_IP, SERVER_PORT);
            System.out.println("Connected successfully!");
            
            // Set up communication streams
            ObjectOutputStream toServer = new ObjectOutputStream(clientSocket.getOutputStream());
            ObjectInputStream fromServer = new ObjectInputStream(clientSocket.getInputStream());
            Scanner scanner = new Scanner(System.in);
            
            // Get array size from user
            System.out.print("Enter the size of the array: ");
            int size = scanner.nextInt();
            
            // Create and fill the array
            int[] numbers = new int[size];
            System.out.println("Enter " + size + " integers:");
            
            for (int i = 0; i < size; i++) {
                System.out.print("Element " + (i + 1) + ": ");
                numbers[i] = scanner.nextInt();
            }
            
            // Display the array
            System.out.print("Array to send: [");
            for (int i = 0; i < size; i++) {
                System.out.print(numbers[i]);
                if (i < size - 1) {
                    System.out.print(", ");
                }
            }
            System.out.println("]");
            
            // Send array size to server
            toServer.writeInt(size);
            
            // Send array elements to server
            for (int i = 0; i < size; i++) {
                toServer.writeInt(numbers[i]);
            }
            toServer.flush();
            
            System.out.println("Array sent to server. Waiting for response...");
            
            // Receive minimum element from server
            int minimum = fromServer.readInt();
            System.out.println("\nResult from server:");
            System.out.println("Minimum element in the array: " + minimum);
            
        } catch (UnknownHostException e) {
            System.err.println("Cannot find the server at " + SERVER_IP);
        } catch (IOException e) {
            System.err.println("Error communicating with server: " + e.getMessage());
        } finally {
            // Close resources
            try {
                if (clientSocket != null) {
                    clientSocket.close();
                    System.out.println("Connection closed.");
                }
            } catch (IOException e) {
                System.err.println("Error closing connection: " + e.getMessage());
            }
        }
    }
} 