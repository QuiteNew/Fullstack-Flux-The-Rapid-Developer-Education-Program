class Account{

    private int amount;
    private String bank;

    public Account(int amount, String bank) {
        this.amount = amount;
        this.bank = bank;
    }

    public int getAmount() {
        return amount;
    }

    public String getBank() {
        return bank;
    }

    public void add(int plus) {
        amount+=plus;
    }

    public void withdraw(int minus) {
        if (minus <= amount) {
            amount-=minus;
        } else {
            throw new CustomException("Not sufficient amount on the account");
//            System.out.println("Not sufficient amount on the account");
        }

    }

}