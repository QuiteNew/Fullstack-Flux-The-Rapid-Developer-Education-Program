public class Dragon implements MagicalCreature, Guardian, Curser {
    private String name;
    private String treasure;
    private int curseDamage;

    public Dragon(String name, String treasure, int curseDamage) {
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
        System.out.println(name + " the Dragon snarls fiercely!");
    }

    // Guardian interface method
    @Override
    public void guardTreasure() {
        System.out.println(name + " is guarding the treasure: " + treasure + ".");
    }

    // Curser interface method
    @Override
    public void castCurse(int damagePoints) {
        System.out.println(name + " casts a curse dealing " + damagePoints + " damage!");
    }
}
