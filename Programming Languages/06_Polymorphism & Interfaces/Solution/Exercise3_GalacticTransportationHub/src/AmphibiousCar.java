public class AmphibiousCar implements Vehicle, GroundTransport{
    private double fuelCapacity;
    private int passengerCapacity;
    private String terrainType;

    public AmphibiousCar(double fuelCapacity, int passengerCapacity, String terrainType) {
        this.fuelCapacity = fuelCapacity;
        this.passengerCapacity = passengerCapacity;
        this.terrainType = terrainType;
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

    // GroundTransport interface methods
    @Override
    public void drive() {
        System.out.println("AmphibiousCar is driving on " + terrainType + ".");
    }

    @Override
    public String getTerrainType() {
        return terrainType;
    }
}
