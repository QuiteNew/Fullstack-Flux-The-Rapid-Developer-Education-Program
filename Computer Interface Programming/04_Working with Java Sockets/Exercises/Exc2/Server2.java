import java.io.*;
import java.net.*;

/**
 * Exercise 2: Simple Server that converts client messages to uppercase
 * This server continues running after clients disconnect
 */
class Server2 {
	// Port the server listens on
	private static final int PORT = 8080;
	
	public static void main(String argv[]) {
		// Variables to store messages
		String clientMessage;
		String uppercaseMessage;
		ServerSocket serverSocket = null; // Declare here for later use
		
		try {
			// Step 1: Create a server socket bound to the specified port
			serverSocket = new ServerSocket(PORT);
			System.out.println("Server started on port " + PORT);
			System.out.println("Waiting for clients...");
			
			// Main server loop - keeps running to accept multiple clients
			while(true) {
				// Step 2: Wait for and accept client connection
				Socket connectionSocket = serverSocket.accept();
				System.out.println("Client connected from: " + connectionSocket.getInetAddress());
				
				// Step 3: Set up communication streams
				BufferedReader fromClient = new BufferedReader(
					new InputStreamReader(connectionSocket.getInputStream()));
				DataOutputStream toClient = new DataOutputStream(
					connectionSocket.getOutputStream());
				
				// Step 4: Read message from client
				clientMessage = fromClient.readLine();
				System.out.println("Received: " + clientMessage);
				
				// Step 5: Process the message (convert to uppercase)
				uppercaseMessage = clientMessage.toUpperCase() + '\n';
				
				// Step 6: Send processed message back to client
				toClient.writeBytes(uppercaseMessage);
				System.out.println("Sent: " + uppercaseMessage.trim());
				
				// Close the connection but keep the server running
				connectionSocket.close();
				System.out.println("Client disconnected. Waiting for new connections...\n");
			}
		} catch (IOException e) {
			System.err.println("Error: " + e.getMessage());
		} finally {
			// Close the server socket when done
			try {
				if (serverSocket != null) {
					serverSocket.close();
					System.out.println("Server socket closed.");
				}
			} catch (IOException e) {
				System.err.println("Error closing server socket: " + e.getMessage());
			}
		}
	}
}