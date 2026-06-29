package com.example.courseplatform.controller;

import com.example.courseplatform.dto.CourseDto;
import com.example.courseplatform.entity.Course;
import com.example.courseplatform.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    private CourseDto convertToDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setCategory(course.getCategory());
        dto.setStartDate(course.getStartDate());
        dto.setDurationWeeks(course.getDurationWeeks());
        return dto;
    }

    private Course convertToEntity(CourseDto dto) {
        return new Course(dto.getTitle(), dto.getCategory(), dto.getStartDate(), dto.getDurationWeeks());
    }

    @GetMapping
    public List<CourseDto> getAllCourses() {
        return courseService.getAllCourses().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(convertToDto(courseService.getCourseById(id)));
    }

    @HttpPost
    public CourseDto createCourse(@RequestBody CourseDto dto) {
        Course course = convertToEntity(dto);
        return convertToDto(courseService.createCourse(course));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDto> updateCourse(@PathVariable Long id, @RequestBody CourseDto dto) {
        Course course = convertToEntity(dto);
        return ResponseEntity.ok(convertToDto(courseService.updateCourse(id, course)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}