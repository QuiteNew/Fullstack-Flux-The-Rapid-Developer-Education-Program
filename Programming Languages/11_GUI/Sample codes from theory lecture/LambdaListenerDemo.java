import javax.swing.*;
import java.awt.*;

public class LambdaListenerDemo extends JFrame {
    private final JButton colorButton;
    private final JButton labelButton;
    private final JLabel label;
    private final JPanel canvas;

    public LambdaListenerDemo() {
        setTitle("Solution 3: The Modern Way (Lambda Expressions)");
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

        // Solution 3: Lambda expressions - concise and clear!
        // ActionListener is a Functional Interface (only one abstract method:
        // actionPerformed)
        // This makes it a perfect candidate for a lambda.
        colorButton.addActionListener(event -> {
            canvas.setBackground(randomPastelColor());
            repaint();
        });

        labelButton.addActionListener(event -> label.setText("Ouch!"));

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 12, 10));
        buttonPanel.add(colorButton);
        buttonPanel.add(labelButton);

        add(canvas, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);

        setLocationRelativeTo(null);
        setVisible(true);
    }

    private static Color randomPastelColor() {
        int red = (int) (Math.random() * 256 + 255) / 2;
        int green = (int) (Math.random() * 256 + 255) / 2;
        int blue = (int) (Math.random() * 256 + 255) / 2;
        return new Color(red, green, blue);
    }

    public static void main(String[] args) {
        new LambdaListenerDemo();
    }
}
