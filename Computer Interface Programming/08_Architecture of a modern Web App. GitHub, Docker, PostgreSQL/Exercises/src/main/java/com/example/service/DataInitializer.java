package com.example.service;

import com.example.entity.Post;
import com.example.entity.PostComment;
import com.example.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(PostService postService, PostRepository postRepository) {
        return args -> {

            Post post1 = new Post("First post", LocalDate.of(2025, 04, 25), null);
            Post post2 = new Post("Second post", LocalDate.of(2025, 04, 15), null);

            postService.savePost(post1);
            postService.savePost(post2);

            List<PostComment> comments = List.of(
                    new PostComment("First comment for first post",LocalDate.of(2025, 04, 25),post1),
                    new PostComment("Second comment for first post",LocalDate.of(2025, 04, 25),post1),
                    new PostComment("First comment for second post",LocalDate.of(2025, 04, 25),post2),
                    new PostComment("another comment for second post",LocalDate.of(2025, 04, 25),post2)
            );

            postService.savePostComments(comments);

            postService.getAllCommentsForPostAfterDate(Long.parseLong("2"), LocalDate.of(2025, 04, 15)).forEach(comment -> System.out.println(comment.getText()));
            Post post = postRepository.findById(Long.parseLong("2")).get();
            post.getComments().forEach(comment -> System.out.println(comment.getText()));

        };
    }

}
