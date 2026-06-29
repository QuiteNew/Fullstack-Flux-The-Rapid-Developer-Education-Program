package com.example.courseplatform.repository;

import com.example.courseplatform.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    Optional<Enrollment> findByInstructorIdAndCourseId(Long instructorId, Long courseId);

    List<Enrollment> findByCourseId(Long courseId);

    List<Enrollment> findByInstructorId(Long instructorId);
}