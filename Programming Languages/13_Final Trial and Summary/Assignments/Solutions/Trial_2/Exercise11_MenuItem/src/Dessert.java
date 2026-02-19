public class Dessert extends MenuItem {
    private int sugarContent;
    private boolean hasNuts;

    // No-argument constructor
    public Dessert() {
        super();
    }

    // Parameterized constructor
    public Dessert(String name, String category, double price, int calories,
                   int sugarContent, boolean hasNuts) {
        super(name, category, price, calories);
        this.sugarContent = sugarContent;
        this.hasNuts = hasNuts;
    }

    @Override
    public void printDetails() {
        System.out.println("Dessert:");
        System.out.println("Name: " + name);
        System.out.println("Category: " + category);
        System.out.println("Price: $" + price);
        System.out.println("Calories: " + calories);
        System.out.println("Sugar Content: " + sugarContent + "g");
        System.out.println("Has Nuts: " + hasNuts);
        System.out.println("----------------------");
    }

    @Override
    public double getPrice() {
        return price;
    }
}
