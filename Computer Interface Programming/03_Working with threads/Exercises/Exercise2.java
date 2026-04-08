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

public class Exercise2 {
    public static void main(String[] x) {
        Thread c = new Thread(new TickTack("Casio", 600));
        Thread c2 = new Thread(new TickTack("Flea market clock", 750));
        c2.start();
        c.start();
    }
}