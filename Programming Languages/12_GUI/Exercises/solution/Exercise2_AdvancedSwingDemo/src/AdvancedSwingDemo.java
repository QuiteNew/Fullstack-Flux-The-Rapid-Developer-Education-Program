import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;

public class AdvancedSwingDemo extends JFrame implements ActionListener {
    private JCheckBox checkBox1, checkBox2, checkBox3;
    private JRadioButton radio1, radio2, radio3;
    private JComboBox<String> comboBox;
    private JList<String> list;
    private JSlider slider;
    private JProgressBar progressBar;
    private JButton startButton, resetButton;
    private JTextArea summaryArray;
    private SelectionState selectionState = new SelectionState();

    public AdvancedSwingDemo() {
        setTitle("Advanced JAva Swing Demo");
        setSize(600, 500);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        JTabbedPane tabbedPane = new JTabbedPane();

        JPanel selectionPanel = createSelectionPanel();
        tabbedPane.addTab("Selection components", selectionPanel);

        JPanel valuePanel = createValuePanel();
        tabbedPane.addTab("Value components", valuePanel);

        JPanel displayPanel = createDisplayPanel();
        tabbedPane.addTab("Display components", displayPanel);

        add(tabbedPane, BorderLayout.CENTER);

        JPanel buttonPAnel = new JPanel(new FlowLayout());
        startButton = new JButton("Start demo");
        resetButton = new JButton("Reset");

        startButton.addActionListener(this);
        resetButton.addActionListener(this);

        checkBox1.addActionListener(e -> updateState());
        comboBox.addActionListener(e -> updateState());
        list.addListSelectionListener(e -> updateState());
        slider.addChangeListener(e -> updateState());
        // checkBox1.addItemListener(e -> updateState());
        // comboBox.addActionListener(e -> updateState());
        // slider.addChangeListener(e -> updateState());
        // list.addListSelectionListener(e -> updateState());


        buttonPAnel.add(startButton);
        buttonPAnel.add(resetButton);
        add(buttonPAnel, BorderLayout.SOUTH);
        setupKeyBindings();

        setVisible(true);

    }

    public JPanel createSelectionPanel() {
        JPanel panel = new JPanel(new GridLayout(4, 1, 10, 10));
        panel.setBorder(BorderFactory.createTitledBorder("Selection components"));


        JPanel checkPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        checkPanel.add(new JLabel("Checkbox: "));
        checkBox1 = new JCheckBox("Option 1");
        checkBox2 = new JCheckBox("Option 2");
        checkBox3 = new JCheckBox("Option 3");

        checkPanel.add(checkBox1);
        checkPanel.add(checkBox2);
        checkPanel.add(checkBox3);

        panel.add(checkPanel);


        JPanel radioPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        radioPanel.add(new JLabel("Radio button options: "));
        radio1 = new JRadioButton("Choice A");
        radio2 = new JRadioButton("Choice B");
        radio3 = new JRadioButton("Choice C");

        radioPanel.add(radio1);
        radioPanel.add(radio2);
        radioPanel.add(radio3);
        panel.add(radioPanel);


        JPanel comboPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        comboPanel.add(new JLabel("Combobox: "));
        String[] options = {"Item 1", "Item 2", "ITem 3"};
        comboBox = new JComboBox<>(options);
        comboPanel.add(comboBox);
        panel.add(comboPanel);

        JPanel listPanel =  new JPanel(new FlowLayout(FlowLayout.LEFT));
        listPanel.add(new JLabel("List multi-select options: "));
        String[] values = {"Apple", "Orange", "Blueberry"};
        list = new JList<>(values);
        JScrollPane scrollPane = new JScrollPane(list);
        listPanel.add(list);
        panel.add(listPanel);

        return panel;


    }

    public JPanel createValuePanel() {
        JPanel panel = new JPanel(new GridLayout(2,1,10,10));
        panel.setBorder(BorderFactory.createTitledBorder("Value components:"));

        JPanel sliderPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        sliderPanel.add(new JLabel("Slider (0-100)"));
        slider = new JSlider(0, 100, 50);
        slider.setPaintTicks(true);
        slider.setPaintLabels(true);
        slider.setMinorTickSpacing(5);
        slider.setMajorTickSpacing(20);
        sliderPanel.add(slider);
        panel.add(slider);



        JPanel progressBarPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        progressBarPanel.add(new JLabel("Progress bar"));
        progressBar = new JProgressBar(0, 100);
        progressBar.setStringPainted(true);
        progressBar.setValue(0);
        progressBarPanel.add(progressBar);
        panel.add(progressBarPanel);

        return panel;
    }

    public JPanel createDisplayPanel() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBorder(BorderFactory.createTitledBorder("Display components"));

        summaryArray = new JTextArea(10, 30);
        summaryArray.append("Summary output: ");
        summaryArray.append(selectionState.getSummary()
        );
        JScrollPane scrollPane = new JScrollPane(summaryArray);
        panel.add(scrollPane, BorderLayout.CENTER);
        return panel;
    }

    public void updateState() {
        selectionState.checkboxes[0] = checkBox1.isSelected();
        selectionState.checkboxes[1] = checkBox2.isSelected();
        selectionState.checkboxes[2] = checkBox3.isSelected();
        selectionState.selectedRadio = radio1.isSelected() ? "A" :
                radio2.isSelected() ? "B" : radio3.isSelected() ? "C" : "None";
        selectionState.comboSelection = (String) comboBox.getSelectedItem();
        selectionState.listSelection = list.getSelectedValuesList();
        selectionState.sliderValue = slider.getValue();
        summaryArray.setText(selectionState.getSummary());
    }


    //    private void updateState() {
//        state.checkboxes[0] = checkBox1.isSelected();
//        state.checkboxes[1] = checkBox2.isSelected();
//        state.checkboxes[2] = checkBox3.isSelected();
//        state.selectedRadio = radio1.isSelected() ? "A" : radio2.isSelected() ? "B" : radio3.isSelected() ? "C" : "None";
//        state.comboSelection = (String) comboBox.getSelectedItem();
//        state.listSelections = list.getSelectedValuesList();
//        state.sliderValue = slider.getValue();
//        summaryArea.setText(state.getSummary());
//    }

    public void setEnabled(boolean enabled) {
        checkBox1.setEnabled(enabled);
        checkBox2.setEnabled(enabled);
        checkBox3.setEnabled(enabled);
        radio1.setEnabled(enabled);
        radio2.setEnabled(enabled);
        radio3.setEnabled(enabled);
        comboBox.setEnabled(enabled);
        list.setEnabled(enabled);
        startButton.setEnabled(enabled);
    }

    public void setupKeyBindings() {

        InputMap im = getRootPane().getInputMap(JComponent.WHEN_IN_FOCUSED_WINDOW);
        ActionMap am = getRootPane().getActionMap();

        im.put(KeyStroke.getKeyStroke(KeyEvent.VK_R, Toolkit.getDefaultToolkit().getMenuShortcutKeyMask()), "reset");
        am.put("reset", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                resetForm();
            }
        });

    }




//        private void setupKeyBindings() {
//        InputMap im = getRootPane().getInputMap(JComponent.WHEN_IN_FOCUSED_WINDOW);
//        ActionMap am = getRootPane().getActionMap();
//
//
//        im.put(KeyStroke.getKeyStroke(KeyEvent.VK_R, Toolkit.getDefaultToolkit().getMenuShortcutKeyMask()), "reset");
//        am.put("reset", new AbstractAction() {
//            public void actionPerformed(ActionEvent e) {
//                resetForm();
//            }
//        });
//
//        im.put(KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, Toolkit.getDefaultToolkit().getMenuShortcutKeyMask()), "startDemo");
//        am.put("startDemo", new AbstractAction() {
//            public void actionPerformed(ActionEvent e) {
//                startDemo();
//            }
//        });
//    }

//    private void setControlsEnabled(boolean enabled) {
//        checkBox1.setEnabled(enabled);
//        checkBox2.setEnabled(enabled);
//        checkBox3.setEnabled(enabled);
//        radio1.setEnabled(enabled);
//        radio2.setEnabled(enabled);
//        radio3.setEnabled(enabled);
//        comboBox.setEnabled(enabled);
//        list.setEnabled(enabled);
//        slider.setEnabled(enabled);
//        startButton.setEnabled(enabled);
//        resetButton.setEnabled(enabled);
//    }
//

    public void resetForm() {
        setEnabled(true);
        checkBox1.setSelected(false);
        checkBox2.setSelected(false);
        checkBox3.setSelected(false);
        radio1.setSelected(false);
        radio2.setSelected(false);
        radio3.setSelected(false);
        comboBox.setSelectedIndex(0);
        list.clearSelection();
        slider.setValue(50);
        progressBar.setValue(0);
        updateState();
    }

    public void startDemo() {
        setEnabled(false);
        Timer timer = new Timer(100, new ActionListener() {
            int progress = 0;
            @Override
            public void actionPerformed(ActionEvent e) {
                progress += 5;
                progressBar.setValue(progress);
                if (progress >= 100) {
                    ((Timer) e.getSource()).stop();
//                        JOptionPane.showMessageDialog(AdvancedSwingDemo.this, "this works" +
//                                "Java GUI summary \n "
//                                + "Selected checkbox: " + (checkBox1.isSelected() ? "Option 1" : "") +
//                                (checkBox2.isSelected() ? "Option 2" : "") + (checkBox3.isSelected() ? "Option 3" : "") + "\n" +
//                                "Selected radio: " + (radio1.isSelected() ? "A" : radio2.isSelected() ? "B" : radio3.isSelected() ? "C" : "None") + "\n"+
//                                "Combobox: " + comboBox.getSelectedItem() + "\n" +
//                                "List: " + list.getSelectedValuesList() + "\n" +
//                                "Slider value: " + slider.getValue()
//                                , "Summary for Advanced GUI demo", JOptionPane.INFORMATION_MESSAGE);
//                    }
                    JOptionPane.showMessageDialog(AdvancedSwingDemo.this,
                            selectionState.getSummary(), "Summary for Advanced GUI demo", JOptionPane.INFORMATION_MESSAGE);
                }
            }
        });
        updateState();
        timer.start();

    }

    @Override
    public void actionPerformed(ActionEvent e) {

        if (e.getSource() == startButton) {
            setEnabled(false);
            Timer timer = new Timer(100, new ActionListener() {
                int progress = 0;
                @Override
                public void actionPerformed(ActionEvent e) {
                    progress += 5;
                    progressBar.setValue(progress);
                    if (progress >= 100) {
                        ((Timer) e.getSource()).stop();
//                        JOptionPane.showMessageDialog(AdvancedSwingDemo.this, "this works" +
//                                "Java GUI summary \n "
//                                + "Selected checkbox: " + (checkBox1.isSelected() ? "Option 1" : "") +
//                                (checkBox2.isSelected() ? "Option 2" : "") + (checkBox3.isSelected() ? "Option 3" : "") + "\n" +
//                                "Selected radio: " + (radio1.isSelected() ? "A" : radio2.isSelected() ? "B" : radio3.isSelected() ? "C" : "None") + "\n"+
//                                "Combobox: " + comboBox.getSelectedItem() + "\n" +
//                                "List: " + list.getSelectedValuesList() + "\n" +
//                                "Slider value: " + slider.getValue()
//                                , "Summary for Advanced GUI demo", JOptionPane.INFORMATION_MESSAGE);
//                    }
                        JOptionPane.showMessageDialog(AdvancedSwingDemo.this,
                                selectionState.getSummary(), "Summary for Advanced GUI demo", JOptionPane.INFORMATION_MESSAGE);
                        setEnabled(true);
                    }
                }
            });
            updateState();
            timer.start();

        } if (e.getSource() == resetButton) {
            setEnabled(true);
            checkBox1.setSelected(false);
            checkBox2.setSelected(false);
            checkBox3.setSelected(false);
            radio1.setSelected(false);
            radio2.setSelected(false);
            radio3.setSelected(false);
            comboBox.setSelectedIndex(0);
            list.clearSelection();
            slider.setValue(50);
            progressBar.setValue(0);
            updateState();
        }

    }

}
