import java.io.*;
import java.net.*;

/**
 * Exercise 4: Client that sends messages to the server
 * Can send "END" to terminate the server or "." to end the session
 */
class Client4 {
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
            DataOutputStream toServer = new DataOutputStream(clientSocket.getOutputStream());
            BufferedReader fromServer = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream()));
            BufferedReader userInput = new BufferedReader(
                new InputStreamReader(System.in));
            
            String message;
            
            System.out.println("Enter messages:");
            System.out.println("- Type '.' to end your session");
            System.out.println("- Type 'END' to terminate the server");
            
            // Send messages until "." or "END" is entered
            while (true) {
                System.out.print("> ");
                message = userInput.readLine();
                
                // Send message to server
                toServer.writeBytes(message + '\n');
                
                // Get response from server
                String response = fromServer.readLine();
                System.out.println("Server: " + response);
                
                // Exit if "." or "END" was entered
                if (message.equals(".")) {
                    System.out.println("Ending session...");
                    break;
                } else if (message.equals("END")) {
                    System.out.println("Terminating server...");
                    break;
                }
            }
            
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