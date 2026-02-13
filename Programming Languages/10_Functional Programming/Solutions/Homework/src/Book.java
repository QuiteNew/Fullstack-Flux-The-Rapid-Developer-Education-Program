public class Book {
    private String title;
    private int id;
    private  double price;

    private int quantity;

    public Book(String title, int id, double price, int quantity) {
        this.title = title;
        this.id = id;
        this.price = price;
        this.quantity = quantity;
    }

    public String getTitle() {
        return title;
    }

    public int getId() {
        return id;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    @Override
    public String toString(){
        return "Book title: " + title + ", id: " + id + ", price: " + price + ", quantity: " + quantity;
    }

}
