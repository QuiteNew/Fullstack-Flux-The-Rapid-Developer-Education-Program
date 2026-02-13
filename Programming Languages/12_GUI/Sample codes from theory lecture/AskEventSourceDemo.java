import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class AskEventSourceDemo extends JFrame implements ActionListener {
    private final JButton colorButton;
    private final JButton labelButton;
    private final JLabel label;
    private final JPanel canvas;

    public AskEventSourceDemo() {
        setTitle("Solution 1: Ask the Event Object (getSource())");
        setSize(520, 220);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        label = new JLabel("Click a button...", SwingConstants.CENTER);
        label.setFont(label.getFont().deriveFont(Font.BOLD, 18f));

        canvas = new JPanel();

        canvas.add(label, BorderLayout.CENTER);

        colorButton = new JButton("Color");
        labelButton = new JButton("Label");
        colorButton.addActionListener(this);
        labelButton.addActionListener(this);

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 12, 10));
        buttonPanel.add(colorButton);
        buttonPanel.add(labelButton);

        add(canvas, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);

        setLocationRelativeTo(null);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent event) {
        // Solution 1: identify which component fired the event.
        if (event.getSource() == colorButton) {
            canvas.setBackground(randomPastelColor());
            repaint();
        } else if (event.getSource() == labelButton) {
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
        new AskEventSourceDemo();
    }
}
