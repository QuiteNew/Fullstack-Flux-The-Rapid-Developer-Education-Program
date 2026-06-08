package com.example.repository;

import com.example.entity.Book;
import com.example.entity.Bookstore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findBookByBookstore(Bookstore bookstore);

    Optional<Book> findByName(String name);
    @Query("select b from Book b where b.author = :author")
    List<Book> findBookByAuthor(@Param("author") String author);

    @Query(value = "select * from Book b WHERE b.id = ?1",nativeQuery = true)
    Book findBookById(Long id);


}