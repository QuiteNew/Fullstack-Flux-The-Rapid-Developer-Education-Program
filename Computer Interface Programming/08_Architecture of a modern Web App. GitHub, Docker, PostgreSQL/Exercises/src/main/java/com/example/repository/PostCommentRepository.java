package com.example.repository;

import com.example.entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Long> {

    List<PostComment> findByPostIdAndDateAfter(Long postId, LocalDate date);
    List<PostComment> findByTextContaining(String keyword);

}
