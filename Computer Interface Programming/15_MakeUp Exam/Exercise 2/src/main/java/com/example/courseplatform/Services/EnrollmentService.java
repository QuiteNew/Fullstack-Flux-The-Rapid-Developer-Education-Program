package com.example.courseplatform.service;

import com.example.courseplatform.entity.Course;
import com.example.courseplatform.entity.Enrollment;
import com.example.courseplatform.entity.Instructor;
import com.example.courseplatform.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final InstructorService instructorService;
    private final CourseService courseService;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, InstructorService instructorService, CourseService courseService) {
        this.enrollmentRepository = enrollmentRepository;
        this.instructorService = instructorService;
        this.courseService = courseService;
    }

    public Enrollment enrollInstructor(Long courseId, Long instructorId) {
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByInstructorIdAndCourseId(instructorId, courseId);
        if (existingEnrollment.isPresent()) {
            throw new RuntimeException("Duplicate enrollment is not allowed");
        }

        Instructor instructor = instructorService.getInstructorById(instructorId);
        Course course = courseService.getCourseById(courseId);

        Enrollment enrollment = new Enrollment(LocalDate.now(), 0.0, instructor, course);
        return enrollmentRepository.save(enrollment);
    }

    public Enrollment updateProgress(Long enrollmentId, Double progressPercentage) {
        if (progressPercentage < 0 || progressPercentage > 100) {
            throw new RuntimeException("Progress must be between 0 and 100");
        }

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setProgressPercentage(progressPercentage);
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    public List<Enrollment> getInstructorCourses(Long instructorId) {
        return enrollmentRepository.findByInstructorId(instructorId);
    }
}