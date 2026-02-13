public class Goblin implements MagicalCreature, Guardian, Curser {
    private String name;
    private String treasure;
    private int curseDamage;

    public Goblin(String name, String treasure, int curseDamage) {
        this.name = name;
        this.treasure = treasure;
        this.curseDamage = curseDamage;
    }

    public int getCurseDamage() {
        return curseDamage;
    }

    // MagicalCreature interface method
    @Override
    public void interact() {
        System.out.println(name + " the Goblin grins mischievously.");
    }

    // Guardian interface method
    @Override
    public void guardTreasure() {
        System.out.println(name + " is slyly guarding the treasure: " + treasure + ".");
    }

    // Curser interface method
    @Override
    public void castCurse(int damagePoints) {
        System.out.println(name + " casts a sneaky curse dealing " + damagePoints + " damage!");
    }
}
