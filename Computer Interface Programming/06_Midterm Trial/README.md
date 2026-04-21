# Java Midterm Combination 9 - March 2026

## Assignment 1: File Properties Viewer with DNS Lookup
**Focus: Files and Directories + Networking APIs**
**Difficulty: Moderate**

### Description
Create a Java application called `FileProps` that displays file properties and performs DNS lookups.

### Requirements
1. Commands:
   - `props <filename>`: Displays detailed properties of the file.
   - `dns <domain>`: Shows all IP addresses for a domain using DNS.
   - `compare <file1> <file2>`: Compares two files and reports if identical.

### Properties to Display:
- File name, size, path
- Is regular file / directory
- Last modified timestamp
- Read/write/execute permissions

### Additional Requirements
- Use `java.nio.file.Files` and `BasicFileAttributes` for properties.
- Use `InetAddress.getAllByName()` for DNS lookup.
- For compare, read both files and check byte-by-byte equality.
- Handle errors gracefully.

### Sample Interaction
```
$ java FileProps props readme.txt
File: readme.txt
Size: 2,456 bytes
Type: Regular file
Path: /Users/name/readme.txt
Modified: 2026-03-20 14:30:00
Permissions: rw-r--r--

$ java FileProps dns example.com
example.com has 3 IP addresses:
93.184.216.34
2606:2800:220:1::

$ java FileProps compare file1.txt file2.txt
Files are identical: false
```

### Learning Objectives
- Reading file attributes and properties.
- DNS resolution with multiple addresses.
- File comparison.

---

## Assignment 2: Prime Checker Server
**Focus: Threads + Sockets**
**Difficulty: Moderate**

### Description
Create a Java application called `PrimeServer` that checks if numbers are prime using threaded workers.

### Requirements
1. Server listens on port 8080.
2. Client sends a number.
3. Server spawns a thread to check if the number is prime.
4. Return "PRIME" or "NOT PRIME" with explanation if not prime.

### Additional Requirements
- Use `Runnable` or `Thread` for prime checking.
- Handle numbers up to Integer.MAX_VALUE.
- For non-prime, optionally show smallest divisor.
- Display thread name and number being checked on server console.
- Handle invalid input (non-numeric).

### Sample Interaction
```
Server Console:
$ java PrimeServer
Server started on port 8080
Client connected
Thread-1: Checking if 17 is prime
Thread-1: PRIME
Thread-2: Checking if 100 is prime
Thread-2: NOT PRIME (divisible by 2)
Results sent to client
Client disconnected
```

### Learning Objectives
- Prime number algorithm.
- Thread creation for computation tasks.
- TCP socket communication.

---

## Grading and Bell Curve
- **Assignment 1:** Expected success rate: 70-85% - File attributes and DNS.
- **Assignment 2:** Expected success rate: 55-70% - Thread-based computation.
