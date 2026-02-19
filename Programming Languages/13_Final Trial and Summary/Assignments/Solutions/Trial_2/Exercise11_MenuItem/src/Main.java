//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
void main() {
    Scanner input = new Scanner(System.in);

    ArrayList<MainDish> mainDishes = new ArrayList<>();
    ArrayList<Dessert> desserts = new ArrayList<>();

    int choice;

    do {
        System.out.println("\n--- Restaurant Menu ---");
        System.out.println("1. Add Main Dish");
        System.out.println("2. Add Dessert");
        System.out.println("3. Display all menu items");
        System.out.println("4. Find item with longest cook time");
        System.out.println("5. Find most expensive item");
        System.out.println("6. Calculate average price");
        System.out.println("7. Exit");
        System.out.print("Enter choice: ");

        choice = input.nextInt();
        input.nextLine();

            switch (choice) {
                case 1 -> {
                    System.out.print("Name: ");
                    String name = input.nextLine();
                    System.out.print("Category: ");
                    String category = input.nextLine();
                    System.out.print("Price: ");
                    double price = input.nextDouble();
                    System.out.print("Calories: ");
                    int calories = input.nextInt();
                    System.out.print("Cook time: ");
                    int cookTime = input.nextInt();
                    System.out.print("Vegetarian (true/false): ");
                    boolean veg = input.nextBoolean();

                    mainDishes.add(new MainDish(name, category, price, calories, cookTime, veg));
                }

                case 2 -> {
                    System.out.print("Name: ");
                    String name = input.nextLine();
                    System.out.print("Category: ");
                    String category = input.nextLine();
                    System.out.print("Price: ");
                    double price = input.nextDouble();
                    System.out.print("Calories: ");
                    int calories = input.nextInt();
                    System.out.print("Sugar content: ");
                    int sugar = input.nextInt();
                    System.out.print("Has nuts (true/false): ");
                    boolean nuts = input.nextBoolean();

                    desserts.add(new Dessert(name, category, price, calories, sugar, nuts));
                }

                case 3 -> {
                    for (MainDish m : mainDishes)
                        m.printDetails();
                    for (Dessert d : desserts)
                        d.printDetails();
                }

                case 4 -> {
                    MainDish longest = null;
                    for (MainDish m : mainDishes) {
                        if (longest == null || m.getCookTime() > longest.getCookTime())
                            longest = m;
                    }
                    if (longest != null)
                        longest.printDetails();
                    else
                        System.out.println("No main dishes available.");
                }

                case 5 -> {
                    MenuItem expensive = null;

                    for (MainDish m : mainDishes)
                        if (expensive == null || m.getPrice() > expensive.getPrice())
                            expensive = m;

                    for (Dessert d : desserts)
                        if (expensive == null || d.getPrice() > expensive.getPrice())
                            expensive = d;

                    if (expensive != null)
                        expensive.printDetails();
                }

                case 6 -> {
                    double total = 0;
                    int count = 0;

                    for (MainDish m : mainDishes) {
                        total += m.getPrice();
                        count++;
                    }
                    for (Dessert d : desserts) {
                        total += d.getPrice();
                        count++;
                    }

                    if (count > 0)
                        System.out.println("Average price: $" + (total / count));
                    else
                        System.out.println("No items available.");
                }

                case 7 -> System.out.println("Goodbye!");

                default -> System.out.println("Invalid choice.");
            }

    } while (choice != 7);

    input.close();

}
