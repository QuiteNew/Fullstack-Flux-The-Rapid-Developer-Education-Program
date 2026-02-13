public class Fish implements Animal{
    @Override
    public void sound() {
        System.out.println("Fish makes bubbling sounds.");
    }

    @Override
    public void move() {
        System.out.println("Fish swims swiftly in the water.");
    }

    @Override
    public void sleep() {
        System.out.println("Fish rests quietly in the depths.");
    }

}
