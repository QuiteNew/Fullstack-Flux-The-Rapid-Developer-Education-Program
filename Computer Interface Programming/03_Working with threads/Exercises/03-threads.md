# Introduction to Multithreading in Java

Multithreading is a Java feature that allows concurrent execution of two or more parts of a program for maximum utilization of CPU. Each part of such program is called a thread, and each thread defines a separate path of execution.

## Objectives

- Understand what threads are in the context of Java.
- Learn how to create and start threads.
- Explore ways to execute threads using the `Thread` class and `Runnable` interface.

## Creating and Starting Threads

Java provides two ways to create a thread:
1. By extending the `Thread` class. https://docs.oracle.com/javase/jp/21/docs/api/java.base/java/lang/Thread.html
2. By implementing the `Runnable` interface. https://docs.oracle.com/javase/jp/21/docs/api/java.base/java/lang/Runnable.html

### Extending the `Thread` Class

```java
class HelloThread extends Thread {
    public void run() {
        System.out.println("Hello from a thread!");
    }

    public static void main(String[] args) {
        (new HelloThread()).start();
    }
}
```
### Implementing the Runnable Interface
```java
class HelloRunnable implements Runnable {
public void run() {
System.out.println("Hello from a thread!");
}

    public static void main(String[] args) {
        (new Thread(new HelloRunnable())).start();
    }
}
```
```java
public class AThread extends Thread {
    private int counter = 10;
    private static int countThreads = 0;
    private int threadNo = ++countThreads;

    public AThread() {
        System.out.println("Creating thread no." + threadNo);
    }

    public void run() {
        while (true) {
            System.out.println("Thread" + threadNo + " (" + counter +
                    ")");
            counter --;
            if (counter == 0) return;
        }
    }

    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            AThread at = new AThread();
            at.start();
        }
        System.out.println("All threads have been started");
    }
}
```
```java
class TickTack implements Runnable {
    String name;
    int rate;

    TickTack(String name, int rate) {
        this.name = name;
        this.rate = rate;
    }

    public void run() {
        while (true) {
            System.out.println(name + ": Tick");
            try {
                Thread.sleep(rate);
            } catch (InterruptedException e) {
                throw new RuntimeException("InterruptedException");
            }
            System.out.println(name + ": Tack");
            try {
                Thread.sleep(rate);
            } catch (InterruptedException e) {
                throw new RuntimeException("InterruptedException");
            }
        }
    }
}
```

# Synchronization in Multithreading

In a multithreading application, threads share resources such as objects and variables.
Synchronization is a mechanism that ensures that two or more concurrent threads do not simultaneously run specific segments of
code that access shared resources.

## Objectives

- Understand the importance of synchronization in multithreading.
- Learn how to use the `synchronized` keyword to prevent thread interference.
- Explore how to synchronize a block of code to control access to resources.

## Using the `synchronized` Keyword

The `synchronized` keyword in Java is used to control the access of multiple threads to any shared resource.

### Synchronizing a Method

```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }
}
```

## Synchronizing a Block
```java
class BlockSync {
    private int count = 0;

    public void increment() {
        synchronized (this) {
            count++;
        }
    }
}
```
```java
class SharedCounter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized void decrement() {
        count--;
    }

    public static void main(String[] args) throws InterruptedException {
        Exercise3 counter = new Exercise3();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                counter.increment();
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                counter.decrement();
            }
        });

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Count: " + counter.count);
    }
}

```