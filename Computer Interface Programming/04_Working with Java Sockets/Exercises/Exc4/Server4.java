import java.io.*;
import java.net.*;
import java.util.concurrent.*;

/**
 * Exercise 4: Server that converts client messages to uppercase
 * Can be terminated by a client sending "END" message
 */
class Server4 {
    // Port the server listens on
    private static final int PORT = 8080;
    // Flag to control server execution
    private static volatile boolean running = true;
    // Thread pool for client handlers
    private static ExecutorService threadPool;

    public static void main(String[] argv) {
        ServerSocket serverSocket = null;
        threadPool = Executors.newCachedThreadPool();

        try {
            // Create server socket
            serverSocket = new ServerSocket(PORT);
            System.out.println("Server started on port " + PORT);
            System.out.println("Waiting for clients...");
            System.out.println("Server will terminate if a client sends 'END'");

            // Main server loop
            while (running) {
                try {
                    // Set a timeout so we can check the running flag periodically
                    serverSocket.setSoTimeout(1000);
                    
                    // Accept client connection
                    Socket clientSocket = serverSocket.accept();
                    System.out.println("Client connected from: " + clientSocket.getInetAddress());
                    
                    // Create a new thread to handle this client
                    ClientHandler4 handler = new ClientHandler4(clientSocket);
                    threadPool.submit(handler);
                    
                } catch (SocketTimeoutException e) {
                    // This is expected, just continue and check running flag
                }
            }
            
            System.out.println("Server is shutting down...");
            
        } catch (IOException e) {
            System.err.println("Server error: " + e.getMessage());
        } finally {
            // Shutdown thread pool
            threadPool.shutdown();
            try {
                // Wait for existing tasks to terminate
                if (!threadPool.awaitTermination(15, TimeUnit.SECONDS)) {
                    threadPool.shutdownNow();
                }
            } catch (InterruptedException e) {
                threadPool.shutdownNow();
            }
            
            // Close server socket
            try {
                if (serverSocket != null) {
                    serverSocket.close();
                    System.out.println("Server socket closed.");
                }
            } catch (IOException e) {
                System.err.println("Error closing server socket: " + e.getMessage());
            }
            
            System.out.println("Server terminated.");
        }
    }
    
    // Method to stop the server
    public static void stopServer() {
        running = false;
    }
}

/**
 * Handler class for each client connection
 */
class ClientHandler4 implements Runnable {
    private Socket clientSocket;
    
    public ClientHandler4(Socket socket) {
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
            
            // Process messages until "." or "END" is received
            while ((clientMessage = fromClient.readLine()) != null) {
                System.out.println("Received from " + clientSocket.getInetAddress() + ": " + clientMessage);
                
                // Check for termination command
                if (clientMessage.equals("END")) {
                    System.out.println("Received termination command from client: " + clientSocket.getInetAddress());
                    toClient.writeBytes("SERVER SHUTTING DOWN\n");
                    Server4.stopServer();
                    break;
                }
                
                // Convert message to uppercase and send back
                String uppercaseMessage = clientMessage.toUpperCase() + '\n';
                toClient.writeBytes(uppercaseMessage);
                
                // If client sends ".", end this client's session
                if (clientMessage.equals(".")) {
                    System.out.println("Client " + clientSocket.getInetAddress() + " sent session termination signal.");
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