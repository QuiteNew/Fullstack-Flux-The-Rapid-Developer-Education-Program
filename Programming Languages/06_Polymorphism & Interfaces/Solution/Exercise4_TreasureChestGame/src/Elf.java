public class Elf implements MagicalCreature, Guardian, Healer {
    private String name;
    private String treasure;
    private int healingPower;

    public Elf(String name, String treasure, int healingPower) {
        this.name = name;
        this.treasure = treasure;
        this.healingPower = healingPower;
    }

    // MagicalCreature interface method
    @Override
    public void interact() {
        System.out.println(name + " the Elf smiles warmly.");
    }

    // Guardian interface method
    @Override
    public void guardTreasure() {
        System.out.println(name + " is gracefully guarding the treasure: " + treasure + ".");
    }

    // Healer interface method
    @Override
    public void healPlayer(int healthPoints) {
        System.out.println(name + " heals the player for " + healthPoints + " health points.");
    }
}
