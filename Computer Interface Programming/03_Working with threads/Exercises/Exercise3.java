class Exercise3 {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public static void main(String[] args) throws InterruptedException {
        Exercise3 counter = new Exercise3();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
                //this section is for the t2 thread to wait for 1 millisecond
                //try{Thread.sleep(1);}catch(InterruptedException e){e.printStackTrace();}
                }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
                //this section is for the t2 thread to wait for 1 millisecond
                //try{Thread.sleep(1);}catch(InterruptedException e){e.printStackTrace();}
                }
        });

        t1.start();
        t2.start();

        //this section is for the main thread to wait for the two threads to finish
        //t1.join();
        //t2.join();

        //this section is for the main thread to wait for 20 milliseconds
        //Thread.sleep(20);
        System.out.println("Count: " + counter.count);
    }
}