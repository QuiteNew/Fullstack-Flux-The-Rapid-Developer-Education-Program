
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