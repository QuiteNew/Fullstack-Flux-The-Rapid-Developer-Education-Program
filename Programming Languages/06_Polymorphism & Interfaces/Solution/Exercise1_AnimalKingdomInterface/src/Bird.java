public class Bird implements Animal{
    @Override
    public void sound() {
        System.out.println("Bird chirps: Chirp Chirp!");
    }

    @Override
    public void move() {
        System.out.println("Bird flies high in the sky.");
    }

    @Override
    public void sleep() {
        System.out.println("Bird sleeps perched on a branch.");
    }
}
