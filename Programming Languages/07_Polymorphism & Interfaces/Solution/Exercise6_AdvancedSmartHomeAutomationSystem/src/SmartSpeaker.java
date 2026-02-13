public class SmartSpeaker implements Device, Switchable, Adjustable, Schedulable {
    private String deviceName;
    private String status;
    private int volumeLevel; // 0 to 100
    private String onSchedule;
    private String offSchedule;

    public SmartSpeaker(String deviceName) {
        this.deviceName = deviceName;
        this.status = "Off";
        this.volumeLevel = 50; // default volume
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
        if(volumeLevel < 100) {
            volumeLevel += 10;
            System.out.println(deviceName + " volume increased to " + volumeLevel + "%.");
        } else {
            System.out.println(deviceName + " volume is already at maximum.");
        }
    }

    @Override
    public void decreaseSetting() {
        if(volumeLevel > 0) {
            volumeLevel -= 10;
            System.out.println(deviceName + " volume decreased to " + volumeLevel + "%.");
        } else {
            System.out.println(deviceName + " volume is already at minimum.");
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
        System.out.println("Volume Level: " + volumeLevel + "%");
        System.out.println("On Schedule: " + onSchedule);
        System.out.println("Off Schedule: " + offSchedule);
    }
}
