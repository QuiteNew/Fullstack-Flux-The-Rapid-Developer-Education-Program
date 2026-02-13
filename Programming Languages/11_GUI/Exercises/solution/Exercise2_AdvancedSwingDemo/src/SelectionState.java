import java.util.ArrayList;
import java.util.List;

public class SelectionState {
    public boolean[] checkboxes = new boolean[3];
    public String selectedRadio;
    public String comboSelection;
    public List<String> listSelection = new ArrayList<>();
    public int sliderValue;

    public String getSummary() {
        return "SelectionState{" +
                //"checkboxes=" + Arrays.toString(checkboxes) +
                "checkboxes= " + (checkboxes[0] ? "Option 1 " : "") +
                (checkboxes[1] ? "Option 2 " : "") +
                (checkboxes[2] ? "Option 3" : "") +
                ", selectedRadio='" + selectedRadio + '\'' +
                ", comboSelection='" + comboSelection + '\'' +
                ", listSelection=" + listSelection +
                ", sliderValue=" + sliderValue +
                '}';
    }

    //    public boolean[] checkboxes = new boolean[3];
//    public String selectedRadio;
//    public String comboSelection;
//    public List<String> listSelections = new ArrayList<>();
//    public int sliderValue;
//
//
//
//    public String getSummary() {
//        return String.format("Selected Checkboxes: %s\nSelected Radio: %s\nSelected ComboBox: %s\nList Selections: %s\nSlider Value: %d",
//                Arrays.toString(checkboxes),
//                selectedRadio,
//                comboSelection,
//                listSelections.toString(),
//                sliderValue);
//    }

}
