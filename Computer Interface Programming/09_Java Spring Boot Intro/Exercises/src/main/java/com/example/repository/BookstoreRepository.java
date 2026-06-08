package com.example.repository;

import com.example.entity.Bookstore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookstoreRepository extends JpaRepository<Bookstore, Long> {

//    @Query(value = "select * from BOOKSTORE bs WHERE bs.id = ?1",nativeQuery = true)
//    BookStore findBookstoreById(Long id);
    Optional<Bookstore> findByName(String name);

    @Query(value = "select bs from Bookstore bs where bs.id=?1")
    Bookstore findBookstoreById(Long id);
    @Query("select bs from Bookstore bs left join bs.books b where b.id=?1")
    Bookstore findBookstoreByBooksId(Long booksId);

    List<Bookstore> findBookstoreByBooksName(String name);

    List<Bookstore> findBookstoreByNameAndAddress(String name, String address);

//    @Query("select bs from Bookstore bs left join bs.books b where b.id=?1")
    Optional<Bookstore> findByBooks_Id(Long bookId);
    Optional<Bookstore> findByBooks_Name(String bookName);
    Optional<Bookstore> findByNameAndAddress(String name, String address);

}
