public class Circle implements TwoDimensionalShape{
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
        System.out.println("A new circle has been created with radius: " + radius);
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() { // Circumference
        return 2 * Math.PI * radius;
    }
}
