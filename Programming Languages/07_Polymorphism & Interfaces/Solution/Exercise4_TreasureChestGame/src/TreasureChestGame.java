public class TreasureChestGame {
    public static void main(String[] args) {
        // Instantiate creatures
        Dragon dragon = new Dragon("Draco", "Golden Crown", 50);
        Elf elf = new Elf("Elara", "Silver Chalice", 30);
        Goblin goblin = new Goblin("Glim", "Emerald Necklace", 20);

        // Simulate interactions with Dragon
        System.out.println("Interacting with Dragon:");
        dragon.interact();
        dragon.guardTreasure();
        dragon.castCurse(dragon.getCurseDamage());
        System.out.println();

        // Simulate interactions with Elf
        System.out.println("Interacting with Elf:");
        elf.interact();
        elf.guardTreasure();
        elf.healPlayer(25);
        System.out.println();

        // Simulate interactions with Goblin
        System.out.println("Interacting with Goblin:");
        goblin.interact();
        goblin.guardTreasure();
        goblin.castCurse(goblin.getCurseDamage());
    }
}