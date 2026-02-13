public class LightBulb implements Device, Switchable, Adjustable, Schedulable {
    private String deviceName;
    private String status;
    private int brightnessLevel; // 0 to 100
    private String onSchedule;
    private String offSchedule;

    public LightBulb(String deviceName) {
        this.deviceName = deviceName;
        this.status = "Off";
        this.brightnessLevel = 50; // default brightness
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
        if(brightnessLevel < 100) {
            brightnessLevel += 10;
            System.out.println(deviceName + " brightness increased to " + brightnessLevel + "%.");
        } else {
            System.out.println(deviceName + " brightness is already at maximum.");
        }
    }

    @Override
    public void decreaseSetting() {
        if(brightnessLevel > 0) {
            brightnessLevel -= 10;
            System.out.println(deviceName + " brightness decreased to " + brightnessLevel + "%.");
        } else {
            System.out.println(deviceName + " brightness is already at minimum.");
        }
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

    // Additional method to display current settings
    public void displaySettings() {
        System.out.println("Device: " + deviceName);
        System.out.println("Status: " + status);
        System.out.println("Brightness Level: " + brightnessLevel + "%");
        System.out.println("On Schedule: " + onSchedule);
        System.out.println("Off Schedule: " + offSchedule);
    }
}
