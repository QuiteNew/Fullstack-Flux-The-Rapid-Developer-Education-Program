/**
 * ThreadRacingExample - Demonstrates the concept of thread racing
 * 
 * This program simulates a race between multiple runners (threads) on a track.
 * Each runner advances at random speeds, and the first to reach the finish line wins.
 * This illustrates how threads can execute at unpredictable rates, leading to
 * non-deterministic outcomes in multi-threaded applications.
 */
public class ThreadRacingExample {
    
    public static void main(String[] args) {
        System.out.println("Thread Racing Demonstration - Race Track");
        System.out.println("========================================");
        System.out.println("Each runner will advance at random speeds.");
        System.out.println("Watch as they race to the finish line!\n");
        
        // Create multiple runner threads
        Runner runner1 = new Runner("Bolt");
        Runner runner2 = new Runner("Swift");
        Runner runner3 = new Runner("Flash");
        Runner runner4 = new Runner("Zoom");
        
        // Start the race
        runner1.start();
        runner2.start();
        runner3.start();
        runner4.start();
    }
    
    // Runner class represents a participant in the race
    static class Runner extends Thread {
        private static final int TRACK_LENGTH = 100;
        private static boolean hasWinner = false;
        private String name;
        
        public Runner(String name) {
            this.name = name;
        }
        
        @Override
        public void run() {
            int distance = 0;
            
            // Run until reaching the finish line
            while (distance < TRACK_LENGTH && !hasWinner) {
                // Advance a random amount (1-5 units)
                int step = (int) (Math.random() * 5) + 1;
                distance += step;
                
                // Print progress
                printProgress(distance);
                
                // Check if this runner won
                if (distance >= TRACK_LENGTH && !hasWinner) {
                    hasWinner = true;
                    System.out.println("\n🏆 " + name + " has won the race! 🏆");
                    System.out.println("Race is over. Other runners will stop.");
                }
                
                // Simulate different running speeds
                try {
                    Thread.sleep((int) (Math.random() * 200));
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
        
        // Visualize the runner's progress on the track
        private void printProgress(int distance) {
            StringBuilder track = new StringBuilder();
            
            // Create a visual representation of the track
            for (int i = 0; i < TRACK_LENGTH; i++) {
                if (i == Math.min(distance, TRACK_LENGTH - 1)) {
                    track.append(name.charAt(0)); // Runner's position
                } else {
                    track.append("-");
                }
            }
            
            // Add finish line
            track.append("🏁");
            
            System.out.println(name + ": " + track.toString() + " " + distance + "%");
        }
    }
} 