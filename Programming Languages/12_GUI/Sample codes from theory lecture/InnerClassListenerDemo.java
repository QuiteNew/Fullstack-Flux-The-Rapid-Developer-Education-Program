import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class InnerClassListenerDemo extends JFrame {
    private final JButton colorButton;
    private final JButton labelButton;
    private final JLabel label;
    private final JPanel canvas;

    public InnerClassListenerDemo() {
        setTitle("Solution 2: A Class Within a Class (Inner Classes)");
        setSize(520, 220);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout(10, 10));

        label = new JLabel("Click a button...", SwingConstants.CENTER);
        label.setFont(label.getFont().deriveFont(Font.BOLD, 18f));

        canvas = new JPanel(new BorderLayout());
        canvas.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        canvas.add(label, BorderLayout.CENTER);

        colorButton = new JButton("Color");
        labelButton = new JButton("Label");

        // Register two DIFFERENT listeners (inner classes), one per button.
        colorButton.addActionListener(new ColorListener());
        labelButton.addActionListener(new LabelListener());

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 12, 10));
        buttonPanel.add(colorButton);
        buttonPanel.add(labelButton);

        add(canvas, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);

        setLocationRelativeTo(null);
        setVisible(true);
    }

    // Inner class #1: only responsible for the Color button.
    private class ColorListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent event) {
            canvas.setBackground(randomPastelColor());
            repaint();
        }
    }

    // Inner class #2: only responsible for the Label button.
    private class LabelListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent event) {
            label.setText("That hurt!");
        }
    }

    private static Color randomPastelColor() {
        int red = (int) (Math.random() * 256 + 255) / 2;
        int green = (int) (Math.random() * 256 + 255) / 2;
        int blue = (int) (Math.random() * 256 + 255) / 2;
        return new Color(red, green, blue);
    }

    public static void main(String[] args) {
        new InnerClassListenerDemo();
    }
}
