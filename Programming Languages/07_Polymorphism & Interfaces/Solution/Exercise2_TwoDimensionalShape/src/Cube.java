public class Cube implements ThreeDimensionalShape{
    private double side;

    public Cube(double side) {
        this.side = side;
        System.out.println("A new cube has been created with side length: " + side);
    }

    @Override
    public double volume() {
        return side * side * side;
    }

    public double surfaceArea() {
        return 6 * side * side;
    }
}
