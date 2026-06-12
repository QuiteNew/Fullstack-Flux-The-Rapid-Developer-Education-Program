package com.example.employeeTrial.service;

import com.example.employeeTrial.entity.Employee;
import com.example.employeeTrial.entity.Task;
import com.example.employeeTrial.enums.TaskPriority;
import com.example.employeeTrial.enums.TaskStatus;
import com.example.employeeTrial.exception.ResourceNotFoundException;
import com.example.employeeTrial.repository.EmployeeRepository;
import com.example.employeeTrial.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;

    public TaskService(TaskRepository taskRepository,
                       EmployeeRepository employeeRepository) {
        this.taskRepository = taskRepository;
        this.employeeRepository = employeeRepository;
    }

    public Task createTask(Task task) {

        if (task.getDueDate().isBefore(LocalDate.now())) {
            throw new IllegalStateException("Due date cannot be in past");
        }

        return taskRepository.save(task);
    }

    public Task assignTask(Long taskId, Long employeeId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        if (!employee.isActive()) {
            throw new IllegalStateException("Cannot assign task to inactive employee");
        }

        task.setAssignedEmployee(employee);

        return taskRepository.save(task);
    }

    public List<Task> getTasksByPriority(TaskPriority priority) {
        return taskRepository.findByPriority(priority);
    }

    public List<Task> getOverdueTasks() {
        return taskRepository.findAll()
                .stream()
                .filter(task -> task.getDueDate().isBefore(LocalDate.now()))
                .toList();
    }

    public Task updateTaskStatus(Long id, TaskStatus status) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        task.setStatus(status);

        return taskRepository.save(task);
    }
}

