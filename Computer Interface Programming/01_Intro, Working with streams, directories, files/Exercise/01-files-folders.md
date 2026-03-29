# Working with Files and Folders in Java

Java provides extensive support for file and directory manipulation through its `java.nio.file` package, introduced in Java 7 and enhanced in subsequent versions. This package offers a more intuitive and flexible file I/O mechanism than the original `java.io` package.

## Key Classes and Interfaces

- **Paths and Path**: Represents a system-dependent file path. `Paths` is a utility class that provides methods to create `Path` instances.

- **Files**: A utility class that provides static methods to operate on files and directories. Methods include creation, deletion, reading, and writing operations, among others.

- **FileChannel**: Offers a way to read, write, map, and manipulate files. It's part of the `java.nio.channels` package.

- **FileSystem and FileSystems**: Represents the underlying file system. `FileSystems` is a utility class to access `FileSystem` instances.

- **FileVisitor and SimpleFileVisitor**: Interfaces for traversing file trees. `SimpleFileVisitor` provides an implementation of the `FileVisitor` interface with default methods.

## Common Operations

- **Creating a File/Directory**: Use `Files.createFile(Path)` for files or `Files.createDirectories(Path)` for directories.

- **Reading and Writing Files**: `Files.readAllLines(Path)` and `Files.write(Path, Iterable)` are commonly used methods for small files. For larger files, consider using `Files.newBufferedReader(Path)` and `Files.newBufferedWriter(Path, OpenOption...)`.

- **Copying and Moving Files/Directories**: `Files.copy(Path, Path, CopyOption...)` and `Files.move(Path, Path, CopyOption...)` can be used for these operations.

- **Deleting Files/Directories**: `Files.delete(Path)` or `Files.deleteIfExists(Path)` can be used to remove files or directories.

- **Listing Directory Contents**: `Files.list(Path)` returns a stream of paths representing the files in the directory.

- **Walking a File Tree**: Use `Files.walkFileTree(Path, FileVisitor<? super Path>)` to traverse a directory tree.

Remember, working with files and directories is a common task that can involve complex operations and error handling, especially when dealing with file system permissions, symbolic links, and large directories.

# Exercises on Working with Files and Folders in Java

## Example 1: Create a New Text File

Create a new text file named `example.txt` in a directory of your choice and write the text "Hello UACS!" into it.

### Solution

```java
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;

public class CreateFileExample {
    public static void main(String[] args) {
        Path path = Paths.get("path/to/directory/example.txt");
        String content = "Hello UACS!";
        try {
            Files.write(path, content.getBytes(StandardCharsets.UTF_8));
            System.out.println("File created successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
## Example 2: List Files in a Directory
List all files in a directory and print each file name.

### Solution
```java
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;

public class ListFiles {
    public static void main(String[] args) {
        Path dir = Paths.get("path/to/directory");
        try (Stream<Path> stream = Files.list(dir)) {
            stream.forEach(System.out::println);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
## Example 3: Copy a File
Copy 'source.txt' to 'destination.txt'.

### Solution
```java
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;

public class ListFiles {
    public static void main(String[] args) {
        Path source = Paths.get("path/to/source.txt");
        Path destination = Paths.get("path/to/destination.txt");
        try {
            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File copied successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
## Exercise 4: Delete a File

Delete a file named `delete-me.txt`. Check if the file exists before attempting to delete it.

### Solution

```java
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;

public class DeleteFile {
    public static void main(String[] args) {
        Path fileToDelete = Paths.get("path/to/delete-me.txt");
        try {
            if (Files.exists(fileToDelete)) {
                Files.delete(fileToDelete);
                System.out.println("File deleted successfully.");
            } else {
                System.out.println("File does not exist.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
## Exercise 5: Read a File into a List

Read the contents of a file named 'read-me.txt' and print each line to the console.

### Solution

```java
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.io.IOException;

public class ReadFileToList {
    public static void main(String[] args) {
        Path filePath = Paths.get("path/to/read-me.txt");
        try {
            List<String> lines = Files.readAllLines(filePath);
            lines.forEach(System.out::println);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

## Exercise 6: Walk File Tree and Print File Names

Write a program that walks through a directory tree starting from a given directory and prints the name of each file and directory.

### Solution

```java
import java.nio.file.*;
import java.io.IOException;

public class WalkFileTreeExample {
    public static void main(String[] args) {
        Path startingDir = Paths.get("path/to/start");
        try {
            Files.walkFileTree(startingDir, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                    System.out.println(file);
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
                    System.out.println(dir);
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}


```
## Exercise 7: Create a Directory Tree

Read the contents of a file named 'read-me.txt' and print each line to the console.

### Solution

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

public class CreateDirectoryTree {
    public static void main(String[] args) {
        Path rootPath = Paths.get("path/to/ProjectRoot");
        Path srcPath = rootPath.resolve("src");
        Path binPath = rootPath.resolve("bin");

        try {
            Files.createDirectories(srcPath);
            Files.createDirectories(binPath);
            System.out.println("Directory tree created successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}


```





