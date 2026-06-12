package com.example.employeeTrial.controller;

import com.example.employeeTrial.dto.CreateEmployeeRequest;
import com.example.employeeTrial.entity.Employee;
import com.example.employeeTrial.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {

        return ResponseEntity.ok(employeeService.getAllEmployees());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                employeeService.getEmployeeById(id)
        );
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(
            @Valid @RequestBody CreateEmployeeRequest request) {

        Employee createdEmployee =
                employeeService.createEmployee(request);

        return new ResponseEntity<>(
                createdEmployee,
                HttpStatus.CREATED
        );
    }

    @PostMapping("/{employeeId}/projects/{projectId}")
    public ResponseEntity<Employee> assignEmployeeToProject(
            @PathVariable Long employeeId,
            @PathVariable Long projectId) {

        Employee employee =
                employeeService.assignEmployeeToProject(
                        employeeId,
                        projectId
                );

        return ResponseEntity.ok(employee);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
}
