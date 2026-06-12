package com.example.employeeTrial.service;

import com.example.employeeTrial.entity.Project;
import com.example.employeeTrial.entity.Task;
import com.example.employeeTrial.enums.TaskStatus;
import com.example.employeeTrial.exception.ResourceNotFoundException;
import com.example.employeeTrial.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    }

    public Project createProject(Project project) {

        if (project.getEndDate().isBefore(project.getStartDate())) {
            throw new IllegalStateException("Invalid project dates");
        }

        return projectRepository.save(project);
    }

    public double getProjectProgress(Long projectId) {

        Project project = getProjectById(projectId);

        List<Task> tasks = project.getTasks();

        if (tasks.isEmpty()) {
            return 0;
        }

        long completed = tasks.stream()
                .filter(task -> task.getStatus() == TaskStatus.DONE)
                .count();

        return (double) completed / tasks.size() * 100;
    }
}

