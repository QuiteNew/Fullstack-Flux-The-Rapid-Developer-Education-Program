package com.example.model;

public class Book {
    private String title;
    private String author;
    private boolean reserved;

    // Constructor
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.reserved = false;
    }

    // Getters and Setters
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public boolean isReserved() { return reserved; }
    public void setReserved(boolean reserved) { this.reserved = reserved; }
}