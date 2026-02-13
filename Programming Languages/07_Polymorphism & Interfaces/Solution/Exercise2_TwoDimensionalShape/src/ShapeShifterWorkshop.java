public class ShapeShifterWorkshop {
    public static void main(String[] args) {

        System.out.println("Welcome to the Shape Shifter’s Workshop!\n");

        // Create a Square
        Square square = new Square(5.0);
        System.out.println("Square Area: " + square.area());
        System.out.println("Square Perimeter: " + square.perimeter());

        System.out.println();

        // Create a Circle
        Circle circle = new Circle(3.0);
        System.out.println("Circle Area: " + circle.area());
        System.out.println("Circle Circumference: " + circle.perimeter());

        System.out.println();

        // Create a Cube
        Cube cube = new Cube(4.0);
        System.out.println("Cube Volume: " + cube.volume());
        System.out.println("Cube Surface Area: " + cube.surfaceArea());
    }
}