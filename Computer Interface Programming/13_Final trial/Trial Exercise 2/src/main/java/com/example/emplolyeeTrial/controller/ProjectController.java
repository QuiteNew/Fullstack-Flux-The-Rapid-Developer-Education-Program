package com.example.employeeTrial.controller;

import com.example.employeeTrial.entity.Project;
import com.example.employeeTrial.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {

        return ResponseEntity.ok(
                projectService.getAllProjects()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                projectService.getProjectById(id)
        );
    }


    @PostMapping
    public ResponseEntity<Project> createProject(
            @Valid @RequestBody Project project) {

        Project createdProject =
                projectService.createProject(project);

        return new ResponseEntity<>(
                createdProject,
                HttpStatus.CREATED
        );
    }

    @GetMapping("/{id}/progress")
    public double getProgress(@PathVariable Long id) {
        return projectService.getProjectProgress(id);
    }
}

