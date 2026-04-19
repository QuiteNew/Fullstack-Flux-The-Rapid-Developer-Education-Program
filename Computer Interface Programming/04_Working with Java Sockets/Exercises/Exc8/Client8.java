import java.net.*;
import java.io.*;

/**
 * Exercise 8: Client that reads array data from a file, sends it to the server for sorting,
 * and writes the result to a file
 */
public class Client8 {
	// Server connection details
	private static final String SERVER_IP = "127.0.0.1";
	private static final int SERVER_PORT = 8080;
	
	// File paths
	private static final String INPUT_FILE = "Class4/Exc8/input.txt";
	private static final String OUTPUT_FILE = "Class4/Exc8/output.txt";
	
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
			
			// Read array from file
			System.out.println("Reading array from file: " + INPUT_FILE);
			int[] numbers = readArrayFromFile(INPUT_FILE);
			
			if (numbers == null || numbers.length == 0) {
				System.err.println("Error: No valid array data found in the input file.");
				return;
			}
			
			int size = numbers.length;
			
			// Display the original array
			System.out.print("\nOriginal array: [");
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
			
			System.out.println("Array sent to server for sorting...");
			
			// Receive sorted array from server
			int sortedSize = fromServer.readInt();
			int[] sortedArray = new int[sortedSize];
			
			for (int i = 0; i < sortedSize; i++) {
				sortedArray[i] = fromServer.readInt();
			}
			
			// Display the sorted array
			System.out.print("\nSorted array: [");
			for (int i = 0; i < sortedSize; i++) {
				System.out.print(sortedArray[i]);
				if (i < sortedSize - 1) {
					System.out.print(", ");
				}
			}
			System.out.println("]");
			
			// Write sorted array to output file
			writeArrayToFile(OUTPUT_FILE, sortedArray);
			System.out.println("Sorted array written to file: " + OUTPUT_FILE);
			
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
	
	/**
	 * Reads an array of integers from a file
	 * First line contains the number of elements
	 * Subsequent lines contain the elements
	 */
	private static int[] readArrayFromFile(String filename) {
		try {
			BufferedReader reader = new BufferedReader(new FileReader(filename));
			
			// Read array size
			String sizeLine = reader.readLine();
			int size = Integer.parseInt(sizeLine.trim());
			
			if (size <= 0) {
				reader.close();
				throw new IllegalArgumentException("Invalid array size: " + size);
			}
			
			// Read array elements
			int[] array = new int[size];
			for (int i = 0; i < size; i++) {
				String line = reader.readLine();
				if (line == null) {
					reader.close();
					throw new IOException("Not enough elements in the file");
				}
				array[i] = Integer.parseInt(line.trim());
			}
			
			reader.close();
			return array;
			
		} catch (IOException | NumberFormatException e) {
			System.err.println("Error reading from file: " + e.getMessage());
			return null;
		}
	}
	
	/**
	 * Writes an array of integers to a file
	 * First line contains the number of elements
	 * Subsequent lines contain the elements
	 */
	private static void writeArrayToFile(String filename, int[] array) {
		try {
			PrintWriter writer = new PrintWriter(new FileWriter(filename));
			
			// Write array size
			writer.println(array.length);
			
			// Write array elements
			writer.println("Original array size: " + array.length);
			writer.print("Original array: ");
			for (int i = 0; i < array.length; i++) {
				writer.print(array[i]);
				if (i < array.length - 1) {
					writer.print(", ");
				}
			}
			writer.println();
			
			writer.println("Sorted array: ");
			for (int i = 0; i < array.length; i++) {
				writer.print(array[i]);
				if (i < array.length - 1) {
					writer.print(", ");
				}
			}
			
			writer.close();
			
		} catch (IOException e) {
			System.err.println("Error writing to file: " + e.getMessage());
		}
	}
}