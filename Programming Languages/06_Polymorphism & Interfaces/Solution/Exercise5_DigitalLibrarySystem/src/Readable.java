public interface Readable {
    void open();
    void readPage(int pageNumber);
    void close();
}
