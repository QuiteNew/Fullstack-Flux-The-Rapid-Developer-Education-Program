/**
 * RestaurantProducerConsumerExample - Demonstrates the Producer-Consumer pattern with threads
 * 
 * This program simulates a restaurant kitchen where:
 * - Chefs (producers) prepare dishes and add them to a limited-size serving counter
 * - Waiters (consumers) take dishes from the counter and serve them to customers
 * 
 * This example demonstrates:
 * 1. Thread coordination using wait() and notifyAll()
 * 2. Bounded buffer (the serving counter with limited capacity)
 * 3. Producer-Consumer pattern in a real-world scenario
 */
public class RestaurantProducerConsumerExample {
    
    public static void main(String[] args) {
        System.out.println("Restaurant Kitchen Simulation - Producer-Consumer Pattern");
        System.out.println("=========================================================");
        
        // Create the shared serving counter (bounded buffer)
        ServingCounter counter = new ServingCounter(5); // Counter can hold 5 dishes max
        
        // Create chef threads (producers)
        Thread chef1 = new Thread(new Chef(counter, "Chef Gordon", new String[]{"Pizza", "Pasta", "Risotto"}));
        Thread chef2 = new Thread(new Chef(counter, "Chef Jamie", new String[]{"Burger", "Steak", "Salad"}));
        
        // Create waiter threads (consumers)
        Thread waiter1 = new Thread(new Waiter(counter, "Waiter James"));
        Thread waiter2 = new Thread(new Waiter(counter, "Waiter Emily"));
        
        // Start all threads
        chef1.start();
        chef2.start();
        waiter1.start();
        waiter2.start();
        
        // Let the simulation run for a while
        try {
            Thread.sleep(15000); // Run for 15 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // End the simulation
        System.out.println("\nRestaurant is closing!");
        System.exit(0);
    }
    
    // The shared resource - a bounded buffer
    static class ServingCounter {
        private String[] dishes;
        private int count = 0;
        private int capacity;
        
        public ServingCounter(int capacity) {
            this.capacity = capacity;
            this.dishes = new String[capacity];
            System.out.println("Serving counter ready with capacity for " + capacity + " dishes.");
        }
        
        // Method for chefs to add dishes to the counter
        public synchronized void addDish(String chef, String dish) {
            // Wait if the counter is full
            while (count >= capacity) {
                try {
                    System.out.println(chef + " waits - counter is full!");
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            
            // Add the dish to the counter
            dishes[count] = dish;
            count++;
            
            // Display the current state of the counter
            System.out.println(chef + " prepared: " + dish);
            displayCounter();
            
            // Notify waiting waiters that a new dish is available
            notifyAll();
        }
        
        // Method for waiters to take dishes from the counter
        public synchronized String takeDish(String waiter) {
            // Wait if the counter is empty
            while (count <= 0) {
                try {
                    System.out.println(waiter + " waits - no dishes available!");
                    wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            
            // Take a dish from the counter
            String dish = dishes[count - 1];
            dishes[count - 1] = null;
            count--;
            
            // Display the current state of the counter
            System.out.println(waiter + " served: " + dish);
            displayCounter();
            
            // Notify waiting chefs that there's space on the counter
            notifyAll();
            
            return dish;
        }
        
        // Display the current state of the serving counter
        private void displayCounter() {
            StringBuilder sb = new StringBuilder("Counter: [");
            
            for (int i = 0; i < capacity; i++) {
                if (i < count) {
                    sb.append(dishes[i]);
                } else {
                    sb.append("empty");
                }
                
                if (i < capacity - 1) {
                    sb.append(", ");
                }
            }
            
            sb.append("]");
            System.out.println(sb.toString());
        }
    }
    
    // Chef class - the producer
    static class Chef implements Runnable {
        private ServingCounter counter;
        private String name;
        private String[] specialties;
        
        public Chef(ServingCounter counter, String name, String[] specialties) {
            this.counter = counter;
            this.name = name;
            this.specialties = specialties;
        }
        
        @Override
        public void run() {
            try {
                while (true) {
                    // Choose a random dish to prepare
                    String dish = specialties[(int) (Math.random() * specialties.length)];
                    
                    // Simulate cooking time
                    System.out.println(name + " is preparing " + dish + "...");
                    Thread.sleep((int) (Math.random() * 1000) + 500);
                    
                    // Place the dish on the counter
                    counter.addDish(name, dish);
                    
                    // Take a short break
                    Thread.sleep((int) (Math.random() * 1000));
                }
            } catch (InterruptedException e) {
                System.out.println(name + " is going home.");
            }
        }
    }
    
    // Waiter class - the consumer
    static class Waiter implements Runnable {
        private ServingCounter counter;
        private String name;
        
        public Waiter(ServingCounter counter, String name) {
            this.counter = counter;
            this.name = name;
        }
        
        @Override
        public void run() {
            try {
                while (true) {
                    // Take a dish from the counter
                    String dish = counter.takeDish(name);
                    
                    // Simulate serving time
                    System.out.println(name + " is serving " + dish + " to the table...");
                    Thread.sleep((int) (Math.random() * 2000) + 1000);
                    
                    System.out.println(name + " delivered " + dish + " to customers!");
                }
            } catch (InterruptedException e) {
                System.out.println(name + " is going home.");
            }
        }
    }
} 