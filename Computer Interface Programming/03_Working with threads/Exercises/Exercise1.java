public class Exercise1 extends Thread {
    private int counter = 3;
    private static int threadCount = 0;
    private int threadNo = ++threadCount;
    public Exercise1() {
        System.out.println("Creating thread no. " + threadNo);
    }
    public void run() {
        while(true) {
            System.out.println("Thread " +	threadNo + "(" + counter + ")");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("Thread " + threadNo + " interrupted");
            }
            counter--;
            if(counter == 0) return;
        }
    }
    public static void main(String[] args) {
        for(int i = 0; i < 5; i++){
            Exercise1 exercise1=new Exercise1();
            exercise1.start();
            System.out.println("Thread name is " + exercise1.getName());
            exercise1.setPriority((i+1));
            System.out.println("Thread priority is " + exercise1.getPriority());
            System.out.println("Is the thread alive? " + exercise1.isAlive());
            System.out.println("Thread declaration: " + exercise1);
        }
        System.out.println("All threads are running");
    }
}