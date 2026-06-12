package com.example.employeeTrial.controller;

import com.example.employeeTrial.entity.Department;
import com.example.employeeTrial.entity.Employee;
import com.example.employeeTrial.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {

        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {

        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @PostMapping
    public ResponseEntity<Department> createDepartment(
            @Valid @RequestBody Department department) {

        Department createdDepartment =
                departmentService.createDepartment(department);

        return new ResponseEntity<>(createdDepartment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody Department department) {

        Department updatedDepartment =
                departmentService.updateDepartment(id, department);

        return ResponseEntity.ok(updatedDepartment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {

        departmentService.deleteDepartment(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/employees")
    public ResponseEntity<List<Employee>> getDepartmentEmployees(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                departmentService.getDepartmentEmployees(id)
        );
    }

    @GetMapping("/{id}/budget-usage")
    public ResponseEntity<Double> getDepartmentBudgetUsage(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                departmentService.getDepartmentBudgetUsage(id)
        );
    }
}