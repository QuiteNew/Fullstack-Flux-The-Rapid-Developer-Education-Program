package com.example.courseplatform.controller;

import com.example.courseplatform.dto.InstructorDto;
import com.example.courseplatform.entity.Instructor;
import com.example.courseplatform.service.InstructorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    private final InstructorService instructorService;

    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    private InstructorDto convertToDto(Instructor instructor) {
        InstructorDto dto = new InstructorDto();
        dto.setId(instructor.getId());
        dto.setFullName(instructor.getFullName());
        dto.setEmail(instructor.getEmail());
        dto.setSpecialization(instructor.getSpecialization());
        dto.setYearsOfExperience(instructor.getYearsOfExperience());
        return dto;
    }

    private Instructor convertToEntity(InstructorDto dto) {
        return new Instructor(dto.getFullName(), dto.getEmail(), dto.getSpecialization(), dto.getYearsOfExperience());
    }

    @GetMapping
    public List<InstructorDto> getAllInstructors() {
        return instructorService.getAllInstructors().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorDto> getInstructorById(@PathVariable Long id) {
        return ResponseEntity.ok(convertToDto(instructorService.getInstructorById(id)));
    }

    @HttpPost
    public InstructorDto createInstructor(@RequestBody InstructorDto dto) {
        Instructor instructor = convertToEntity(dto);
        return convertToDto(instructorService.createInstructor(instructor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InstructorDto> updateInstructor(@PathVariable Long id, @RequestBody InstructorDto dto) {
        Instructor instructor = convertToEntity(dto);
        return ResponseEntity.ok(convertToDto(instructorService.updateInstructor(id, instructor)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstructor(@PathVariable Long id) {
        instructorService.deleteInstructor(id);
        return ResponseEntity.noContent().build();
    }
}