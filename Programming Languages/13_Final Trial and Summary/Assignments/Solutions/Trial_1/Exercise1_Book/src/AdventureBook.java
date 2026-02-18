public class AdventureBook extends Book{
    private int publishYear;
    private boolean childrenBook;

    public AdventureBook(String title, String author, double price, String language, int publishYear, boolean childrenBook) {
        super(title, author, price, language);
        this.publishYear = publishYear;
        this.childrenBook = childrenBook;
    }

    @Override
    public void printAttributes() {
        System.out.println("Adventure book info: ");
        System.out.println("Title: " + title);
        System.out.println("Author: " + author);
        System.out.println("Price: " + price);
        System.out.println("Language: " + language);
        System.out.println("Publish year: " + publishYear);
        System.out.println("Is it a children book? " + childrenBook);
    }

    @Override
    public double getPrice() {
        return price;
    }

    public int getPublishYear() {
        return publishYear;
    }

    public boolean isChildrenBook() {
        return childrenBook;
    }

}