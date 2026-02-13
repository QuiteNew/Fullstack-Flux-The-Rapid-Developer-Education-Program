import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SwingDemo extends JFrame implements ActionListener
{

    private JLabel label;
    private JTextField textField;
    private JTextArea textArea;
    private JButton button1, button2, button3;
    private JTextField ageField;
    private JLabel statusLabel;

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == button1) {
            String name = textField.getText();
            if (!name.trim().isEmpty()) {
                textArea.append("Hello, " + name + "! Welcome to Java Swing GUI demo.\n");
                textArea.append("This demonstrates basic Swing components:\n");
                textArea.append("- JFrame (main window)\n");
                textArea.append("- JButton (interactive buttons)\n");
                textArea.append("- JTextField (text input)\n");
                textArea.append("- JLabel (text display)\n");
                textArea.append("- JTextArea (multi-line text display)\n");
                textArea.append("- JScrollPane (scrollable area)\n");
                textArea.append("- JPanel (component containers)\n");
                textArea.append("- Layout managers (BorderLayout, FlowLayout)\n");
                textArea.append("- Event handling (ActionListener)\n\n");
            } else {
                textArea.append("Please enter your name first!\n\n");
            }
        } else if (e.getSource() == button2) {
            textField.setText("");
            textArea.setText("");
        } else if (e.getSource() == button3) {
            System.exit(0);
        }
    }

    public SwingDemo() throws HeadlessException {

        setTitle("Java Swing GUI Demo");
        setSize(500, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        label = new JLabel("Enter your name: ");

        textField = new JTextField(20);
        textField.addActionListener(new GreetAction());
        button1 = new JButton("Greet");
        button2 = new JButton("Clear");
        button3 = new JButton("Exit");

        textArea = new JTextArea(10, 30);
        textArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(textArea);

        JPanel topPanel = new JPanel(new FlowLayout());
        topPanel.add(label);
        topPanel.add(textField);
        topPanel.add(new JLabel("Age: "));
        ageField = new JTextField(5);
        topPanel.add(ageField);

        JPanel bottomPanel = new JPanel(new BorderLayout());
        JPanel buttonPanel = new JPanel(new FlowLayout());
        buttonPanel.add(button1);
        buttonPanel.add(button2);
        buttonPanel.add(button3);

        statusLabel = new JLabel("Ready");
        statusLabel.setBorder(BorderFactory.createEmptyBorder(5,10,5,10));
        bottomPanel.add(buttonPanel, BorderLayout.CENTER);
        bottomPanel.add(statusLabel, BorderLayout.SOUTH);
        add(topPanel, BorderLayout.NORTH);
        add(scrollPane, BorderLayout.CENTER);
        add(bottomPanel, BorderLayout.SOUTH);
 //       add(buttonPanel, BorderLayout.SOUTH);

//        button1.addActionListener(this);
//        button2.addActionListener(this);
//        button3.addActionListener(this);

        button1.addActionListener(new GreetAction());
        button2.addActionListener(new ClearAction());
        button3.addActionListener(e -> System.exit(0));

        setVisible(true);
    }

    public class GreetAction implements ActionListener  {

        @Override
        public void actionPerformed(ActionEvent e) {
            String name = textField.getText().trim();
            String ageText = ageField.getText().trim();

            if (name.length() < 2) {
                textArea.setText("Error: Name must be at least 2 characters long");
                statusLabel.setText("Invalid input");
                return;
            }

            int age;
            try{
                age = Integer.parseInt(ageText);
                if (age < 1 || age > 120) {
                    throw new NumberFormatException();
                }
            } catch (NumberFormatException exception) {
                textArea.setText("Error: Age must be number between 1 and 120");
                statusLabel.setText("Invalid input");
                return;
            }

            textArea.setText("");
            textArea.append("Hello " + textField.getText() + "\n");
            textArea.append("You are " + age + " years old \n");
            textArea.append("This demonstrates basic swing components");
            statusLabel.setText("Greeting displayed");
        }
    }


    public class ClearAction implements ActionListener {

        @Override
        public void actionPerformed(ActionEvent e) {
            textField.setText("");
            ageField.setText("");
            textArea.setText("");
            statusLabel.setText("Cleared");
        }
    }
}
