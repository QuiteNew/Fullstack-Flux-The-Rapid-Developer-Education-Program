public class Thermostat implements Device, Adjustable, Schedulable {
    private String deviceName;
    private String status; // e.g., "On", "Off"
    private int temperatureSetting; // in Celsius
    private String onSchedule;
    private String offSchedule;

    public Thermostat(String deviceName) {
        this.deviceName = deviceName;
        this.status = "Off";
        this.temperatureSetting = 22; // default temperature
        this.onSchedule = "Not Scheduled";
        this.offSchedule = "Not Scheduled";
    }

    // Device interface methods
    @Override
    public String getDeviceName() {
        return deviceName;
    }

    @Override
    public String getStatus() {
        return status;
    }

    // Adjustable interface methods
    @Override
    public void increaseSetting() {
        temperatureSetting += 1;
        System.out.println(deviceName + " temperature increased to " + temperatureSetting + "°C.");
    }

    @Override
    public void decreaseSetting() {
        temperatureSetting -= 1;
        System.out.println(deviceName + " temperature decreased to " + temperatureSetting + "°C.");
    }

    // Schedulable interface methods
    @Override
    public void scheduleOn(String time) {
        onSchedule = time;
        System.out.println(deviceName + " scheduled to turn On at " + time + ".");
    }

    @Override
    public void scheduleOff(String time) {
        offSchedule = time;
        System.out.println(deviceName + " scheduled to turn Off at " + time + ".");
    }

    // Additional methods to turn on/off manually
    public void turnOn() {
        status = "On";
        System.out.println(deviceName + " is turned On.");
    }

    public void turnOff() {
        status = "Off";
        System.out.println(deviceName + " is turned Off.");
    }

    // Additional method to display current settings
    public void displaySettings() {
        System.out.println("Device: " + deviceName);
        System.out.println("Status: " + status);
        System.out.println("Temperature Setting: " + temperatureSetting + "°C");
        System.out.println("On Schedule: " + onSchedule);
        System.out.println("Off Schedule: " + offSchedule);
    }
}
