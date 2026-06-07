package com.example.repository;

import com.example.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByDateBefore(LocalDate date);

    List<Post> findByTextContaining(String keyword);

}
