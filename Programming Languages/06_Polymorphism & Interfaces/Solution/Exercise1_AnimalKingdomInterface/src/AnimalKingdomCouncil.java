public class AnimalKingdomCouncil {
    public static void main(String[] args) {
        System.out.println("Welcome to the " + Animal.KINGDOM_NAME + " Council Meeting!\n");

        Animal lion = new Lion();
        Animal bird = new Bird();
        Animal fish = new Fish();

        System.out.println("Lion:");
        lion.sound();
        lion.move();
        lion.sleep();

        System.out.println("\nBird:");
        bird.sound();
        bird.move();
        bird.sleep();

        System.out.println("\nFish:");
        fish.sound();
        fish.move();
        fish.sleep();
    }
}