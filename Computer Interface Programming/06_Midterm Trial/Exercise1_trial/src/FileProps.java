import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.text.SimpleDateFormat;
import java.util.Arrays;

public class FileProps {

    public static void main(String[] args) {
        // First, check if the user provided enough arguments to run a command.
        // The requirements specify three commands, each needing at least one additional argument.
        if (args.length < 2) {
            printUsage();
            return;
        }

        // The first argument (args[0]) determines which operation the program performs.
        String command = args[0];

        try {
            switch (command) {
                case "props":
                    // This case handles the 'props' requirement to show file metadata.
                    showFileProperties(args[1]);
                    break;

                case "dns":
                    // This case handles the 'dns' requirement for IP address lookups.
                    dnsLookup(args[1]);
                    break;

                case "compare":
                    // The 'compare' command specifically requires two files, so we check args.length again.
                    if (args.length < 3) {
                        System.out.println("Error: compare requires two files.");
                        return;
                    }
                    compareFiles(args[1], args[2]);
                    break;

                default:
                    // If the user enters an unrecognized command, show the help guide.
                    printUsage();
            }
        } catch (Exception e) {
            // Graceful error handling prevents the program from crashing and shows the cause of failure.
            System.out.println("Error: " + e.getMessage());
        }
    }

    public static void showFileProperties(String filename) throws IOException {
        // Convert the string filename into a NIO Path object for modern file handling.
        Path path = Paths.get(filename);

        // It is a best practice to verify the file exists before attempting to read attributes.
        if (!Files.exists(path)) {
            System.out.println("FIle does not exist");
            return;
        }

        // BasicFileAttributes allows us to fetch size, creation time, and type in one call.
        BasicFileAttributes basicFileAttributes = Files.readAttributes(path, BasicFileAttributes.class);
        System.out.println("File name: " + path.getFileName());
        System.out.println("Size: " + basicFileAttributes.size());

        // Check if the path points to a file, directory, or something else (like a symbolic link).
        if (basicFileAttributes.isRegularFile())
            System.out.println("Regular file");
        else if (basicFileAttributes.isDirectory()) {
            System.out.println("dir");
        } else {
            System.out.println("Other");
        }

        // Absolute paths provide the full location from the root directory.
        System.out.println("Absolute path: " + path.toAbsolutePath());

        // Formatting the timestamp into a human-readable string as requested.
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formated = simpleDateFormat.format(basicFileAttributes.lastModifiedTime().toMillis());
        System.out.println("Last modified time: " + formated);

        // Calls a helper method to determine r/w/x permissions.
        System.out.println("File permissions: " + getPermissions(path));
    }

    private static void dnsLookup(String domain) {
        try {
            // InetAddress.getAllByName returns an array containing all IPs (IPv4/IPv6) for a host.
            InetAddress[] addresses = InetAddress.getAllByName(domain);

            System.out.println(domain + " has " + addresses.length + " IP addresses:");
            for (InetAddress addr : addresses) {
                // getHostAddress converts the raw IP into its standard string representation.
                System.out.println(addr.getHostAddress());
            }

        } catch (UnknownHostException e) {
            // If the domain is invalid or the network is down, we catch the UnknownHostException.
            System.out.println("Unable to resolve domain: " + domain);
        }
    }

    private static void compareFiles(String file1, String file2) throws IOException {
        Path path1 = Paths.get(file1);
        Path path2 = Paths.get(file2);

        // Ensure both files are present before reading them to avoid IOExceptions.
        if (!Files.exists(path1) || !Files.exists(path2)) {
            System.out.println("One or both files do not exist.");
            return;
        }

        // Files.readAllBytes is efficient for small-to-medium files; it loads the whole file into a byte array.
        byte[] fileBytes1 = Files.readAllBytes(path1);
        byte[] fileBytes2 = Files.readAllBytes(path2);

        // Arrays.equals performs the byte-by-byte comparison required by the midterm prompt.
        boolean identical = Arrays.equals(fileBytes1, fileBytes2);
        System.out.println("Files are identical: " + identical);
    }

    private static String getPermissions(Path path) {
        // StringBuilder is used here to construct the "rwx" permission string efficiently.
        StringBuilder perms = new StringBuilder();

        // Use the Files class utility methods to check specific OS-level permissions.
        perms.append(Files.isReadable(path) ? "r" : "-");
        perms.append(Files.isWritable(path) ? "w" : "-");
        perms.append(Files.isExecutable(path) ? "x" : "-");

        return perms.toString();
    }

    private static void printUsage() {
        // A helper method to show the user exactly how to run the program.
        System.out.println("Usage:");
        System.out.println("  java FileProps props <filename>");
        System.out.println("  java FileProps dns <domain>");
        System.out.println("  java FileProps compare <file1> <file2>");
    }
}
