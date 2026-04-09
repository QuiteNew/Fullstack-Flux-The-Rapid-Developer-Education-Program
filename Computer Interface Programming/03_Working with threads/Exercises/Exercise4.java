import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Exercise4 {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(5);

        for (int i = 0; i < 10; i++) {
            Runnable worker = new WorkerThread("Logical thread " + i);
            executor.execute(worker);
        }
        executor.shutdown();
        while (!executor.isTerminated()) {
            //System.out.println("Still working");
        }
        System.out.println("Finished all threads");
    }
}

class WorkerThread implements Runnable {
    private String message;

    public WorkerThread(String message) {
        this.message = message;
    }

    public void run() {
        System.out.println(Thread.currentThread().getName() + " (Start) " + message);
        processMessage();
        System.out.println(Thread.currentThread().getName() + " (End) " + message);
    }

    private void processMessage() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}