public class Lion implements Animal{
    @Override
    public void sound() {
        System.out.println("Lion roars: Roar!");
    }

    @Override
    public void move() {
        System.out.println("Lion moves gracefully on the savannah.");
    }

    @Override
    public void sleep() {
        System.out.println("Lion sleeps under the shade.");
    }
}
