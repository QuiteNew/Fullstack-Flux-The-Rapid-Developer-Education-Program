package com.example.employeeTrial.controller;

import com.example.employeeTrial.entity.Task;
import com.example.employeeTrial.enums.TaskPriority;
import com.example.employeeTrial.enums.TaskStatus;
import com.example.employeeTrial.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(
            @Valid @RequestBody Task task) {

        Task createdTask =
                taskService.createTask(task);

        return new ResponseEntity<>(
                createdTask,
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(
            @PathVariable Long id,
            @RequestParam TaskStatus status) {

        Task updatedTask =
                taskService.updateTaskStatus(id, status);

        return ResponseEntity.ok(updatedTask);
    }

    @PostMapping("/{taskId}/assign/{employeeId}")
    public ResponseEntity<Task> assignTaskToEmployee(
            @PathVariable Long taskId,
            @PathVariable Long employeeId) {

        Task task =
                taskService.assignTask(taskId, employeeId);

        return ResponseEntity.ok(task);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Task>> getTasksByPriority(
            @PathVariable TaskPriority priority) {

        return ResponseEntity.ok(
                taskService.getTasksByPriority(priority)
        );
    }

    @GetMapping("/overdue")
    public List<Task> getOverdueTasks() {
        return taskService.getOverdueTasks();
    }
}
