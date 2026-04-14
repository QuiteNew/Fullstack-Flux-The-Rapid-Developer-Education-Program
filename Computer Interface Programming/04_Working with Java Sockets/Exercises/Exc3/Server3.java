import java.io.*;
import java.net.*;

/**
 * Exercise 3: Server that converts client messages to uppercase
 * Continues running after clients disconnect and handles multiple clients
 * Client can send messages until "." is entered
 */
class Server3 {
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
                
                // Create a new thread to handle this client
                ClientHandler3 handler = new ClientHandler3(clientSocket);
                new Thread(handler).start();
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
}

/**
 * Handler class for each client connection
 */
class ClientHandler3 implements Runnable {
    private Socket clientSocket;
    
    public ClientHandler3(Socket socket) {
        this.clientSocket = socket;
    }
    
    @Override
    public void run() {
        try {
            // Set up communication streams
            BufferedReader fromClient = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream()));
            DataOutputStream toClient = new DataOutputStream(
                clientSocket.getOutputStream());
                
            String clientMessage;
            
            // Process messages until "." is received
            while ((clientMessage = fromClient.readLine()) != null) {
                System.out.println("Received from " + clientSocket.getInetAddress() + ": " + clientMessage);
                
                // Convert message to uppercase and send back
                String uppercaseMessage = clientMessage.toUpperCase() + '\n';
                toClient.writeBytes(uppercaseMessage);
                
                // If client sends ".", end this client's session
                if (clientMessage.equals(".")) {
                    System.out.println("Client " + clientSocket.getInetAddress() + " sent termination signal.");
                    break;
                }
            }
            
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