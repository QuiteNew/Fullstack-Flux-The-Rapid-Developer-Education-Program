# Developing Client-Server Applications in Java

## Overview

Client-server applications in Java are foundational for understanding network programming.
Java provides two main classes for network communications: `Socket` and `ServerSocket`.
These classes enable developers to implement TCP connections easily, allowing for the two-way exchange of data between a client and a server.

- Client - server communication : TCP or UDP

- The server class represents a server which expects a connection of the desired type
    -  ServerSocket– a class for TCP connection
    -  DatagramSocket– a class for UDP connection

- The client class represents a basic class for carrying out the communication
    - Socket – a class for TCP communication
    - DatagramSocket– a class for UDP communication

- The basic class for implementation of TCP communication

  https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/Socket.html

  ❑ After the connection has been established, the communication
  is carried out through Stream classes.

    - InputStream getInputStream()
    - OutputStream getOutputStream()

- ServerSocket class

https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/ServerSocket.html

The primary method for accepting a connection:
- Socket accept()

Communication protocol
- When communication between a server and a client
  needs to be established, a communication protocol MUST
  be defined.
    - Things that need to be specified
    - Who initiates the communication
    - In which order the network packages are sent and received
    - What type of a package is sent/received in each step
    - Who finalizes the communication
    - How to deal with errors in communication.

- In every communication, it is the SERVER that gets activated first
  (since the client can’t establish communication with an inactive server)

The server
```java
ServerSocket s = new ServerSocket(8080);
Socket p = s.accept();
```

// streams for sending messages towards a client
```java
PrintWriter x = new PrintWriter(
new OutputStreamWriter( p.getOutputStream() ), true );
```

// each message through the DataOutputStream must end with “\n”
```java
DataOutputStream os = new
DataOutputStream(client.getOutputStream());

```
// a stream for receiving messages from the client
```java
BufferedReader is = new BufferedReader(
new InputStreamReader(p.getInputStream()));
```

The client
```java
String server = "localhost";
int port = 8080;
Socket client = new Socket(server, port);
```
// streams for sending messages towards the server

// each message through DataOutputStream must end with a “\n”
```java
DataOutputStream os = new
DataOutputStream(client.getOutputStream());
PrintWriter os = new PrintWriter(
        new OutputStreamWriter( client.getOutputStream() ), true );
```
// a stream for accepting messages from the server
```java
BufferedReader is = new BufferedReader(
new InputStreamReader(client.getInputStream()));
```
Simple server
```java
import java.net.*;
import java.io.*;

public class Server {
  public static void main(String[] a) throws Exception {
    ServerSocket s = new ServerSocket(8080);
    Socket p = s.accept();
    PrintWriter x = new PrintWriter(
            new OutputStreamWriter(p.getOutputStream()), true);
    x.println("Hello, client");
    p.close();
  }
}
```

```java
import java.net.*;
import java.io.*;

public class Client {
  public static void main(String[] a) throws Exception {
    Socket s = new Socket("127.0.0.1", 8080);
    BufferedReader b = new BufferedReader(
            new InputStreamReader(s.getInputStream()));
    String message = b.readLine();
    System.out.println(message);
    b.close();
  }
}
```
## UDP communication
# DatagramSocket
- This class can be used both as a client and as a server.
-  UDP communication is a connectionless way of communication by its nature, where the packages send by one client don’t have to reach the receiving side in the order of sending, and it’s possible
   that some may not arrive at all.
# Object construction
- The server is construed by using a constructor that assigns a port on which the server will accept incoming packets


```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UDPServer {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket(4445);
        byte[] buffer = new byte[256];
// packet accepting
        DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
        socket.receive(packet);
        String dString = new String(packet.getData(), 0, packet.getLength());
        System.out.println(dString);
// packet sending
        InetAddress address = packet.getAddress();
        int port = packet.getPort();
        String message = "Message from the server";
        byte[] buffer2 = message.getBytes();
        packet = new DatagramPacket(buffer2, buffer2.length, address, port);
        socket.send(packet);
        socket.close();
    }
}
```
```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UDPClient {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
// the packet
        String message = "UDP Client";
        byte[] buffer = message.getBytes();
        DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
        packet.setAddress(InetAddress.getByName("127.0.0.1"));
        packet.setPort(4445);
        socket.send(packet);
// accepting
        byte[] buffer2 = new byte[256];
        DatagramPacket packet2 = new DatagramPacket(buffer2, buffer2.length);
        socket.receive(packet2);
        String dString = new String(buffer2);
        System.out.println(dString);
// another package sent to the server from which packet2 has been received
        InetAddress address = packet2.getAddress();
        int port = packet.getPort();
        packet = new DatagramPacket(buffer, buffer.length, address, port);
        socket.send(packet);
        socket.close();
    }
}
```



# Client-Server Applications in Java

## Exercise 1: 
Use the code for the server and the client and establish a client-server communication:
1. The client sends a message “Hello, server” towards the server, and the server responds with “Hello, client”.
2. After this, the client sends two numbers towards the server, and the server returns their sum.
## Exercise 2:
Create a client and a server application. The client sends a String to the server, which returns the same string, in all uppercase letters.
- The server operates even after the client gets disconnected, i.e. a new client may connect to it.
- Define a communication protocol
## Exercise 3:
Modify the client in Exercise 2, in such a way that it will send messages to the server until “.” is entered
- The server doesn’t stop working in the meantime
- Set up two (or more) clients.
## Exercise 4:
Modify the client in Assignment 3 in such a way that the client can send a message “END” that will also terminate the server.
## Exercise 5:
Create a client – server application in which the client sends an array of n numbers towards the server. The server processes the array and returns the minimal
element from the array.
## Exercise 6:
Use the code for server and client to create the following client-server communication.
1. The server sends a list of offered operations towards the client: “+”, “-”, “*”, “/”
2. The client needs to send towards the server
- two (double) numbers
- an operator
3. The server needs to perform the necessary calculation and return the result to the client.
   The server may work with more clients, i.e. it should not terminate after a calculation has been performed.
## Exercise 7:
Create a client-server application with which the client sends an array of n numbers to the server.
- The server processes the array and returns it as sorted in ascending order.
- The size of the array end the elements are to be input through the keyboard
## Exercise 8:
Modify Exercise 7 so that the data are read from a file and results output to a file as well
