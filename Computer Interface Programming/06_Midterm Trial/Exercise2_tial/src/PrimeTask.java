import java.io.PrintWriter;

public class PrimeTask implements Runnable {

    private final int number;
    private final PrintWriter out;

    // Constructor captures the specific number to check and where to send the answer.
    public boolean PrimeTask(int number, PrintWriter out) {
        this.number = number;
        this.out = out;
    }

    @Override
    public void run() {
        // We log which thread is doing the work to see the concurrency in action.
        String threadName = Thread.currentThread().getName();
        System.out.println(threadName + ": Checking if " + number + " is prime");

        // The actual calculation happens here.
        String result = checkPrime(number);

        // Once finished, we log it on the server console and send the text back to the client.
        System.out.println(threadName + ": " + result);
        out.println(result);
    }

    private String checkPrime(int n) {
        // Basic mathematical edge cases: primes must be greater than 1.
        if (n <= 1) {
            return "NOT PRIME (must be > 1)";
        }

        // Two is the only even prime number.
        if (n == 2) {
            return "PRIME";
        }

        // If it is even and not 2, it is immediately disqualified.
        if (n % 2 == 0) {
            return "NOT PRIME - divisible by 2";
        }

        // Efficiency optimization: We only check odd numbers up to the square root of n.
        // We use the logic that if $n = a \times b$, one factor must be $\leq \sqrt{n}$.
        for (int i = 3; (long)i * i <= n; i += 2) {
            if (n % i == 0) {
                return "NOT PRIME - divisible by " + i;
            }
        }

        return "PRIME";
    }
}
