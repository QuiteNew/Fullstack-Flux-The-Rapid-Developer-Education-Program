package com.example.employeeTrial.repository;

import com.example.employeeTrial.entity.Task;
import com.example.employeeTrial.enums.TaskPriority;
import com.example.employeeTrial.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByPriority(TaskPriority priority);

    List<Task> findByAssignedEmployeeId(Long employeeId);
}

