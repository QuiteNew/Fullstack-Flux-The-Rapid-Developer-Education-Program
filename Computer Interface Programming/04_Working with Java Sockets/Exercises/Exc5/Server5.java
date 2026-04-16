import java.io.*;
import java.net.*;

/**
 * Exercise 5: Server that finds the minimum element in an array sent by the client
 */
class Server5 {
    // Port the server listens on
    private static final int PORT = 8080;

    public static void main(String[] argv) {
        ServerSocket serverSocket = null;

        try {
            // Create server socket
            serverSocket = new ServerSocket(PORT);
            System.out.println("Server started on port " + PORT);
            System.out.println("Waiting for clients...");

            // Main server loop
            while (true) {
                // Accept client connection
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected from: " + clientSocket.getInetAddress());
                
                // Handle client in a new thread
                new Thread(() -> handleClient(clientSocket)).start();
            }
        } catch (IOException e) {
            System.err.println("Server error: " + e.getMessage());
        } finally {
            try {
                if (serverSocket != null) {
                    serverSocket.close();
                }
            } catch (IOException e) {
                System.err.println("Error closing server socket: " + e.getMessage());
            }
        }
    }
    
    /**
     * Handles communication with a client
     */
    private static void handleClient(Socket clientSocket) {
        try {
            // Set up communication streams
            ObjectInputStream fromClient = new ObjectInputStream(clientSocket.getInputStream());
            ObjectOutputStream toClient = new ObjectOutputStream(clientSocket.getOutputStream());
            
            // Read array size
            int arraySize = fromClient.readInt();
            System.out.println("Receiving array of size: " + arraySize);
            
            // Read array elements
            int[] numbers = new int[arraySize];
            for (int i = 0; i < arraySize; i++) {
                numbers[i] = fromClient.readInt();
            }
            
            // Print received array
            System.out.print("Received array: [");
            for (int i = 0; i < arraySize; i++) {
                System.out.print(numbers[i]);
                if (i < arraySize - 1) {
                    System.out.print(", ");
                }
            }
            System.out.println("]");
            
            // Find minimum element
            int min = findMinimum(numbers);
            System.out.println("Minimum element: " + min);
            
            // Send result back to client
            toClient.writeInt(min);
            toClient.flush();
            
            // Close resources
            fromClient.close();
            toClient.close();
            clientSocket.close();
            System.out.println("Client disconnected: " + clientSocket.getInetAddress());
            
        } catch (IOException e) {
            System.err.println("Error handling client: " + e.getMessage());
        }
    }
    
    /**
     * Finds the minimum element in an array
     */
    private static int findMinimum(int[] array) {
        if (array.length == 0) {
            throw new IllegalArgumentException("Array is empty");
        }
        
        int min = array[0];
        for (int i = 1; i < array.length; i++) {
            if (array[i] < min) {
                min = array[i];
            }
        }
        
        return min;
    }
} 