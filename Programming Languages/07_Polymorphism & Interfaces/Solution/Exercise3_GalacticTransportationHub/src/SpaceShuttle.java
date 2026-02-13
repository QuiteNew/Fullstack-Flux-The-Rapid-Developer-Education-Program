public class SpaceShuttle implements Vehicle, AirTransport, SpaceTransport {
    private double fuelCapacity;
    private int passengerCapacity;
    private double maxAltitude;
    private double orbitRange;

    public SpaceShuttle(double fuelCapacity, int passengerCapacity, double maxAltitude, double orbitRange) {
        this.fuelCapacity = fuelCapacity;
        this.passengerCapacity = passengerCapacity;
        this.maxAltitude = maxAltitude;
        this.orbitRange = orbitRange;
    }

    // Vehicle interface methods
    @Override
    public double getFuelCapacity() {
        return fuelCapacity;
    }

    @Override
    public int getPassengerCapacity() {
        return passengerCapacity;
    }

    // AirTransport interface methods
    @Override
    public void fly() {
        System.out.println("SpaceShuttle is flying to an altitude of " + maxAltitude + " meters.");
    }

    @Override
    public double getMaxAltitude() {
        return maxAltitude;
    }

    // SpaceTransport interface methods
    @Override
    public void launch() {
        System.out.println("SpaceShuttle is launching into space!");
    }

    @Override
    public double getOrbitRange() {
        return orbitRange;
    }
}
