import java.io.*;
import java.net.*;

/**
 * Exercise 2: Simple Client that sends a message to the server
 * The server will return the message converted to uppercase
 */
class Client2 {
	// Server connection details
	private static final String SERVER_IP = "127.0.0.1";
	private static final int SERVER_PORT = 8080;
	
	public static void main(String argv[]) throws Exception {
		// Variables to store messages
		String message;
		String modifiedMessage;
		
		// Step 1: Set up input from keyboard
		BufferedReader userInput = new BufferedReader(
			new InputStreamReader(System.in));
		
		try {
			// Step 2: Connect to the server
			System.out.println("Connecting to server at " + SERVER_IP + ":" + SERVER_PORT + "...");
			Socket clientSocket = new Socket(SERVER_IP, SERVER_PORT);
			System.out.println("Connected successfully!");
			
			// Step 3: Set up communication streams
			DataOutputStream toServer = new DataOutputStream(
				clientSocket.getOutputStream());
			BufferedReader fromServer = new BufferedReader(
				new InputStreamReader(clientSocket.getInputStream()));
			
			// Step 4: Get user input
			System.out.print("Enter a message: ");
			message = userInput.readLine();
			
			// Step 5: Send message to server
			toServer.writeBytes(message + '\n');
			System.out.println("Message sent to server.");
			
			// Step 6: Receive and display server's response
			modifiedMessage = fromServer.readLine();
			System.out.println("Server response: " + modifiedMessage);
			
			// Step 7: Close the connection
			clientSocket.close();
			System.out.println("Connection closed.");
			
		} catch (UnknownHostException e) {
			System.err.println("Cannot find the server at " + SERVER_IP);
		} catch (IOException e) {
			System.err.println("Error communicating with server: " + e.getMessage());
		}
	}
}