package com.example.courseplatform.controller;

import com.example.courseplatform.dto.EnrollmentRequestDto;
import com.example.courseplatform.dto.EnrollmentResponseDto;
import com.example.courseplatform.entity.Enrollment;
import com.example.courseplatform.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    private EnrollmentResponseDto convertToDto(Enrollment enrollment) {
        EnrollmentResponseDto dto = new EnrollmentResponseDto();
        dto.setId(enrollment.getId());
        dto.setEnrollmentDate(enrollment.getEnrollmentDate());
        dto.setProgressPercentage(enrollment.getProgressPercentage());
        dto.setInstructorName(enrollment.getInstructor().getFullName());
        dto.setCourseTitle(enrollment.getCourse().getTitle());
        return dto;
    }

    @PostMapping
    public EnrollmentResponseDto enrollInstructor(@RequestBody EnrollmentRequestDto dto) {
        Enrollment enrollment = enrollmentService.enrollInstructor(dto.getCourseId(), dto.getInstructorId());
        return convertToDto(enrollment);
    }

    @PutMapping("/{id}/progress")
    public ResponseEntity<EnrollmentResponseDto> updateProgress(@PathVariable Long id, @RequestParam Double progress) {
        return ResponseEntity.ok(convertToDto(enrollmentService.updateProgress(id, progress)));
    }

    @GetMapping("/course/{courseId}")
    public List<EnrollmentResponseDto> getEnrollmentsByCourse(@PathVariable Long courseId) {
        return enrollmentService.getEnrollmentsByCourse(courseId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/instructor/{instructorId}")
    public List<EnrollmentResponseDto> getInstructorCourses(@PathVariable Long instructorId) {
        return enrollmentService.getInstructorCourses(instructorId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}