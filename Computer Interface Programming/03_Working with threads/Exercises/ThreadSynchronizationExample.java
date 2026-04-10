/**
 * ThreadSynchronizationExample - Demonstrates the concept of thread synchronization
 * 
 * This program simulates a bank account with multiple transactions happening
 * concurrently. It shows how synchronization prevents race conditions and ensures
 * data consistency when multiple threads access shared resources.
 */
public class ThreadSynchronizationExample {
    
    public static void main(String[] args) {
        System.out.println("Thread Synchronization Demonstration - Bank Account");
        System.out.println("==================================================");
        
        // Create a shared bank account with initial balance
        BankAccount account = new BankAccount(1000);
        
        // Create threads for different transactions
        Thread depositThread1 = new Thread(new DepositTask(account, "Deposit-1", 200));
        Thread depositThread2 = new Thread(new DepositTask(account, "Deposit-2", 300));
        Thread withdrawThread1 = new Thread(new WithdrawTask(account, "Withdraw-1", 400));
        Thread withdrawThread2 = new Thread(new WithdrawTask(account, "Withdraw-2", 150));
        
        // Start all transaction threads
        depositThread1.start();
        withdrawThread1.start();
        depositThread2.start();
        withdrawThread2.start();
        
        // Wait for all transactions to complete
        try {
            depositThread1.join();
            depositThread2.join();
            withdrawThread1.join();
            withdrawThread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Display final balance
        System.out.println("\nAll transactions completed!");
        System.out.println("Final account balance: $" + account.getBalance());
        System.out.println("\nNote: Without synchronization, the final balance would be unpredictable");
        System.out.println("due to race conditions between threads accessing the account simultaneously.");
    }
    
    // BankAccount class represents a shared resource
    static class BankAccount {
        private double balance;
        
        public BankAccount(double initialBalance) {
            this.balance = initialBalance;
            System.out.println("Created account with initial balance: $" + initialBalance);
        }
        
        // Synchronized method to ensure thread-safe deposits
        public synchronized void deposit(double amount, String transactionName) {
            System.out.println(transactionName + ": Starting deposit of $" + amount);
            System.out.println(transactionName + ": Balance before deposit: $" + balance);
            
            // Simulate some processing time
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            // Update balance
            double newBalance = balance + amount;
            
            // Simulate more processing time
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            balance = newBalance;
            System.out.println(transactionName + ": Deposit completed. New balance: $" + balance);
        }
        
        // Synchronized method to ensure thread-safe withdrawals
        public synchronized boolean withdraw(double amount, String transactionName) {
            System.out.println(transactionName + ": Starting withdrawal of $" + amount);
            System.out.println(transactionName + ": Balance before withdrawal: $" + balance);
            
            // Check if there's enough balance
            if (balance < amount) {
                System.out.println(transactionName + ": Insufficient funds! Withdrawal failed.");
                return false;
            }
            
            // Simulate some processing time
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            // Update balance
            double newBalance = balance - amount;
            
            // Simulate more processing time
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            
            balance = newBalance;
            System.out.println(transactionName + ": Withdrawal completed. New balance: $" + balance);
            return true;
        }
        
        public double getBalance() {
            return balance;
        }
    }
    
    // Task for depositing money
    static class DepositTask implements Runnable {
        private BankAccount account;
        private String name;
        private double amount;
        
        public DepositTask(BankAccount account, String name, double amount) {
            this.account = account;
            this.name = name;
            this.amount = amount;
        }
        
        @Override
        public void run() {
            account.deposit(amount, name);
        }
    }
    
    // Task for withdrawing money
    static class WithdrawTask implements Runnable {
        private BankAccount account;
        private String name;
        private double amount;
        
        public WithdrawTask(BankAccount account, String name, double amount) {
            this.account = account;
            this.name = name;
            this.amount = amount;
        }
        
        @Override
        public void run() {
            account.withdraw(amount, name);
        }
    }
} 