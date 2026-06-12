package com.example.employeeTrial.repository;

import com.example.employeeTrial.entity.Project;
import com.example.employeeTrial.enums.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByStatus(ProjectStatus status);

    List<Project> findByNameContainingIgnoreCase(String keyword);
}

