# Java Networking APIs Overview

In this guide, we explore how to interact with network resources using Java's `InetAddress`, `URL`, and `Desktop` API classes. These classes offer a high-level interface to accomplish common networking tasks, such as querying DNS information, accessing web resources, and interacting with the system's desktop.

## InetAddress

The `InetAddress` class in Java is used for handling IP addresses. It allows Java programs to get the IP address of any hostname. For example, finding the IP address of `google.com`.

### Key Methods
- `getByName(String host)`: Determines the IP address of a host, given the host's name.
- `getLocalHost()`: Returns the address of the localhost.

https://docs.oracle.com/javase/jp/21/docs/api/java.base/java/net/InetAddress.html

```java
import java.net.*;
import java.util.Scanner;

public class HostnameResolver {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a hostname: ");
        String hostname = scanner.nextLine();

        try {
            InetAddress address = InetAddress.getByName(hostname);
            System.out.println("IP Address: " + address.getHostAddress());
        } catch (UnknownHostException e) {
            System.out.println("Could not find IP address for: " + hostname);
        }
    }
}
```

## URL
The `URL` class represents a Uniform Resource Locator, a pointer to a "resource" on the World Wide Web.
A resource can be something as simple as a file or a directory, or it can be a reference to a more complicated object,
such as a query to a database or to a search engine.

### Key Methods
- `openStream()`: Opens a stream for reading from the URL.
- `getContent()`: Gets the contents of the URL.
- `toURI()`: Converts the URL to a URI object.

https://docs.oracle.com/javase/jp/21/docs/api/java.base/java/net/URL.html

```java
import java.net.*;
import java.util.*;

public class URLHeaderFields {
    public static void main(String[] args) {
        try {
            URI uri = URI.create("http://www.google.com");
            URL url = uri.toURL();
            URLConnection urlConnection = url.openConnection();
            Map<String, List<String>> headers = urlConnection.getHeaderFields();
            System.out.println("Header fields for the URL: ");
            for (Map.Entry<String, List<String>> entry : headers.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```


## Desktop
The `Desktop` class allows Java applications to interact with the default desktop applications on the host system, such as opening a URL in a browser.

### Key Methods
- `browse(URI uri)`: Opens the default browser to display a URI.
- `open(File file)`: Opens a file with the default application associated with the file type.

https://docs.oracle.com/javase/jp/21/docs/api/java.desktop/java/awt/Desktop.html

```java
import java.awt.*;
import java.net.URI;

public class OpenWebPage {
    public static void main(String[] args) {
        if (!Desktop.isDesktopSupported()) {
            System.out.println("Desktop is not supported");
            return;
        }

        Desktop desktop = Desktop.getDesktop();
        if (!desktop.isSupported(Desktop.Action.BROWSE)) {
            System.out.println("Desktop doesn't support the browse action");
            return;
        }

        try {
            URI uri = new URI("http://www.example.com");
            desktop.browse(uri);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```



# Java Networking Exercises and Solutions

## Exercise 1: Resolve a Hostname

Write a Java program that uses the `InetAddress` class to host address, canonical host name and is it reachable in 5 seconds. The host address should
be taken as input parameter from console.

## Exercise 2: List All Host Addresses for a Given Domain Name
Write a Java program that lists all IP addresses associated with a given domain name.

## Exercise 3: Print URL properties
Create a program that will take the following
URL: https://uacs.edu.mk/home/home/  and produce the output of the following : getAuthority() getContent()
getDefaultPort() getFile()
getHost() getPath()
getPort() getProtocol()
getQuery() toString()

## Exercise 4: Download Content from a URL to a File
Create a Java program that downloads the content of a URL and saves it to a file on the local filesystem.

## Exercise 5: Open a Text File Using the Desktop Class
Write a Java program that opens a specified text file on the desktop.

## Exercises 6: Launch a Mail Client to Send an Email
Write a Java program that launches the user's default mail client pre-filled with a recipient's email address, subject, and body.
