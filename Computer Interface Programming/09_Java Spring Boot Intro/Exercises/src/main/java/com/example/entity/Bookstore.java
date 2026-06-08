package com.example.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Bookstore {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String address;

    @OneToMany(orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.ALL
            , mappedBy = "bookstore"
    )
//    @JsonBackReference
//    @JoinColumn(name = "bookstore_id")
    @JsonIgnore
    private Set<Book> books = new HashSet<>();

    public Bookstore() {
    }

    public Bookstore(Long id, String name, String address, Set<Book> books) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.books = books;
    }

    public Bookstore(String name, String address) {
        this.name = name;
        this.address = address;
    }

    @Override
    public String toString() {
        return "BookStore{" + "id=" + id +
                ", name='" + name + '\'' + ", address='" +
                address + '\'' + ", books=";//+
        //  books.stream().map(Book::toString).collect(Collectors.joining(","));
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    public void addBook(Book b) {
        books.add(b);
        b.setBookStore(this);
    }
}
