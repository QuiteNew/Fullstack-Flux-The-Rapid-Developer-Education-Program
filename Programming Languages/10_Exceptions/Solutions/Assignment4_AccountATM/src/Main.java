import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] s) {

        int choice = 0;
        String text;
        int amount;
        Account myAccount;
        InputStreamReader isr = new InputStreamReader(System.in);
        BufferedReader bufferedReader = new BufferedReader(isr);

        try{
            System.out.println("Input a bank: ");
            text = bufferedReader.readLine();
            System.out.println("Input initial amount: ");
            amount = Integer.parseInt(bufferedReader.readLine());
            myAccount = new Account(amount,text);

            while(myAccount.getAmount() >0) {
                System.out.println("Choose from the menu: ");
                System.out.println("1 = Bank overview");
                System.out.println("2 = Amount overview");
                System.out.println("3 = Cash addition");
                System.out.println("4 = Cash withdraw");
                System.out.println("5 = Account clearing");

                choice = Integer.parseInt(bufferedReader.readLine());
                switch (choice) {

                    case 1:
                        System.out.println("Your account is in the bank: " + myAccount.getBank());
                        break;
                    case 2:
                        System.out.println("On your account you have: " + myAccount.getAmount() + " den.");
                        break;
                    case 3:
                        System.out.println("Input the amount to add: ");
                        amount = Integer.parseInt(bufferedReader.readLine());
                        myAccount.add(amount);
                        break;
                    case 4:
                        System.out.println("Input the amount to withdraw: ");
                        amount = Integer.parseInt(bufferedReader.readLine());
                        myAccount.withdraw(amount);
                        break;
                    case 5:
                        myAccount.withdraw(myAccount.getAmount());
                        System.out.println("You have withdrawn the entire amount from your account");
                        break;
                    default:
                        System.out.println("No such option");

                }
            }

        } catch (IOException e) {
            System.out.println("HANDLE IO: " + e);
        } catch (NumberFormatException e) {
            System.out.println("HANDLE Number format exception: " + e);
        catch (CustomException e) {
            System.out.println(e.getMessage());
        }

    }
}