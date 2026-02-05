public class Fan implements Device, Switchable, Adjustable {
    private String deviceName;
    private String status;
    private int speedLevel; // 0 to 5

    public Fan(String deviceName) {
        this.deviceName = deviceName;
        this.status = "Off";
        this.speedLevel = 3; // default speed
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

    // Switchable interface methods
    @Override
    public void turnOn() {
        status = "On";
        System.out.println(deviceName + " is turned On.");
    }

    @Override
    public void turnOff() {
        status = "Off";
        System.out.println(deviceName + " is turned Off.");
    }

    // Adjustable interface methods
    @Override
    public void increaseSetting() {
        if(speedLevel < 5) {
            speedLevel += 1;
            System.out.println(deviceName + " speed increased to level " + speedLevel + ".");
        } else {
            System.out.println(deviceName + " speed is already at maximum.");
        }
    }

    @Override
    public void decreaseSetting() {
        if(speedLevel > 0) {
            speedLevel -= 1;
            System.out.println(deviceName + " speed decreased to level " + speedLevel + ".");
        } else {
            System.out.println(deviceName + " speed is already at minimum.");
        }
    }

    // Additional method to display current settings
    public void displaySettings() {
        System.out.println("Device: " + deviceName);
        System.out.println("Status: " + status);
        System.out.println("Speed Level: " + speedLevel);
    }
}
