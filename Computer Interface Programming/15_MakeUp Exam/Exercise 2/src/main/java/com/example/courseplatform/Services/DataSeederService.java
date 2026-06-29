package com.example.courseplatform.service;

import com.example.courseplatform.entity.Course;
import com.example.courseplatform.entity.Instructor;
import com.example.courseplatform.repository.CourseRepository;
import com.example.courseplatform.repository.InstructorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DataSeederService implements CommandLineRunner {

    private final InstructorRepository instructorRepository;
    private final CourseRepository courseRepository;

    public DataSeederService(InstructorRepository instructorRepository, CourseRepository courseRepository) {
        this.instructorRepository = instructorRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (instructorRepository.count() == 0) {
            instructorRepository.save(new Instructor("Alice Smith", "alice@example.com", "Java", 5));
            instructorRepository.save(new Instructor("Bob Jones", "bob@example.com", "Python", 3));
            instructorRepository.save(new Instructor("Charlie Brown", "charlie@example.com", "Web Dev", 8));
            instructorRepository.save(new Instructor("Diana Prince", "diana@example.com", "Databases", 10));
        }

        if (courseRepository.count() == 0) {
            courseRepository.save(new Course("Spring Boot Mastery", "Backend", LocalDate.now().plusDays(7), 8));
        }
    }
}