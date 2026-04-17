import java.io.*;
import java.net.*;
import java.util.Scanner;

/**
 * Exercise 6: Client that sends calculation requests to the server
 * The server performs the requested arithmetic operation and returns the result
 */
class Client6 {
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
            PrintWriter toServer = new PrintWriter(clientSocket.getOutputStream(), true);
            BufferedReader fromServer = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            Scanner scanner = new Scanner(System.in);
            
            // Receive available operations from server
            String operationsStr = fromServer.readLine();
            String[] operations = operationsStr.split(",");
            
            System.out.println("\nAvailable operations:");
            for (String op : operations) {
                System.out.println("  " + op);
            }
            
            // Main client loop
            while (true) {
                try {
                    System.out.println("\n--- New Calculation ---");
                    
                    // Get first number
                    System.out.print("Enter first number (or 'exit' to quit): ");
                    String input = scanner.nextLine();
                    if (input.equalsIgnoreCase("exit")) {
                        break;
                    }
                    double num1 = Double.parseDouble(input);
                    
                    // Get second number
                    System.out.print("Enter second number: ");
                    double num2 = Double.parseDouble(scanner.nextLine());
                    
                    // Get operator
                    System.out.print("Enter operator (" + operationsStr + "): ");
                    String operator = scanner.nextLine();
                    
                    // Send data to server
                    toServer.println(num1);
                    toServer.println(num2);
                    toServer.println(operator);
                    
                    // Receive and display result
                    String result = fromServer.readLine();
                    if (result.startsWith("ERROR")) {
                        System.out.println("Error: " + result.substring(7));
                    } else {
                        System.out.println("\nResult: " + num1 + " " + operator + " " + num2 + " = " + result);
                    }
                    
                } catch (NumberFormatException e) {
                    System.err.println("Invalid number format. Please try again.");
                } catch (Exception e) {
                    System.err.println("Error: " + e.getMessage());
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