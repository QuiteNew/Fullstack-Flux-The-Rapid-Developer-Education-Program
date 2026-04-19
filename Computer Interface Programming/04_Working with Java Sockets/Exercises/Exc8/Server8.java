import java.net.*;
import java.io.*;
import java.util.Arrays;

/**
 * Exercise 8: Server that sorts an array received from the client
 * Returns the array sorted in ascending order
 * Similar to Exercise 7 but client reads from file and writes to file
 */
public class Server8 {
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
				try {
					// Accept client connection
					Socket clientSocket = serverSocket.accept();
					System.out.println("Client connected from: " + clientSocket.getInetAddress());
					
					// Handle client in a new thread
					new Thread(() -> handleClient(clientSocket)).start();
				} catch (IOException e) {
					System.err.println("Error accepting client: " + e.getMessage());
				}
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
			
			// Sort the array
			Arrays.sort(numbers);
			System.out.println("Array sorted successfully");
			
			// Send sorted array back to client
			toClient.writeInt(arraySize);
			for (int i = 0; i < arraySize; i++) {
				toClient.writeInt(numbers[i]);
			}
			toClient.flush();
			System.out.println("Sorted array sent to client");
			
			// Close resources
			fromClient.close();
			toClient.close();
			clientSocket.close();
			System.out.println("Client disconnected: " + clientSocket.getInetAddress());
			
		} catch (IOException e) {
			System.err.println("Error handling client: " + e.getMessage());
		}
	}
}