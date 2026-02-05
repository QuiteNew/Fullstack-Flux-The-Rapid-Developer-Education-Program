public class GalacticTransportationHub {
    public static void main(String[] args) {

        // Instantiate AmphibiousCar
        AmphibiousCar amphibiousCar = new AmphibiousCar(50.0, 4, "varied terrains");
        System.out.println("AmphibiousCar Fuel Capacity: " + amphibiousCar.getFuelCapacity() + " liters");
        System.out.println("AmphibiousCar Passenger Capacity: " + amphibiousCar.getPassengerCapacity());
        amphibiousCar.drive();
        System.out.println("AmphibiousCar Terrain Type: " + amphibiousCar.getTerrainType());
        System.out.println();

        // Instantiate FlyingCar
        FlyingCar flyingCar = new FlyingCar(70.0, 2, "urban roads", 1000.0);
        System.out.println("FlyingCar Fuel Capacity: " + flyingCar.getFuelCapacity() + " liters");
        System.out.println("FlyingCar Passenger Capacity: " + flyingCar.getPassengerCapacity());
        flyingCar.drive();
        flyingCar.fly();
        System.out.println("FlyingCar Terrain Type: " + flyingCar.getTerrainType());
        System.out.println("FlyingCar Max Altitude: " + flyingCar.getMaxAltitude() + " meters");
        System.out.println();

        // Instantiate SpaceShuttle
        SpaceShuttle spaceShuttle = new SpaceShuttle(5000.0, 10, 200000.0, 35786.0);
        System.out.println("SpaceShuttle Fuel Capacity: " + spaceShuttle.getFuelCapacity() + " liters");
        System.out.println("SpaceShuttle Passenger Capacity: " + spaceShuttle.getPassengerCapacity());
        spaceShuttle.fly();
        spaceShuttle.launch();
        System.out.println("SpaceShuttle Max Altitude: " + spaceShuttle.getMaxAltitude() + " meters");
        System.out.println("SpaceShuttle Orbit Range: " + spaceShuttle.getOrbitRange() + " kilometers");
    }
}