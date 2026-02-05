public class SmartHomeSystem {
    public static void main(String[] args) {

        // Instantiate devices
        LightBulb lightBulb = new LightBulb("Living Room Light");
        Thermostat thermostat = new Thermostat("Lecture11.Main Thermostat");
        SmartSpeaker smartSpeaker = new SmartSpeaker("Kitchen Speaker");
        Fan fan = new Fan("Bedroom Fan");

        // Control LightBulb
        System.out.println("Controlling LightBulb:");
       // lightBulb.download(); // Not applicable, ignoring
        lightBulb.turnOn();
        lightBulb.increaseSetting();
        lightBulb.scheduleOff("22:00");
        lightBulb.displaySettings();
        System.out.println();

        // Control Thermostat
        System.out.println("Controlling Thermostat:");
        thermostat.turnOn();
        thermostat.increaseSetting();
        thermostat.scheduleOn("06:00");
        thermostat.scheduleOff("23:00");
        thermostat.displaySettings();
        System.out.println();

        // Control SmartSpeaker
        System.out.println("Controlling SmartSpeaker:");
        smartSpeaker.turnOn();
        smartSpeaker.decreaseSetting();
        smartSpeaker.scheduleOn("07:00");
        smartSpeaker.scheduleOff("23:30");
        smartSpeaker.displaySettings();
        System.out.println();

        // Control Fan
        System.out.println("Controlling Fan:");
        fan.turnOn();
        fan.increaseSetting();
        fan.displaySettings();
        System.out.println();
    }
}