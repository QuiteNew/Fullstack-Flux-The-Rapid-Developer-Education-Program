package com.example.employeeTrial.service;

import com.example.employeeTrial.dto.CreateEmployeeRequest;
import com.example.employeeTrial.entity.Department;
import com.example.employeeTrial.entity.Employee;
import com.example.employeeTrial.entity.Project;
import com.example.employeeTrial.exception.ResourceNotFoundException;
import com.example.employeeTrial.repository.DepartmentRepository;
import com.example.employeeTrial.repository.EmployeeRepository;
import com.example.employeeTrial.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final ProjectRepository projectRepository;

    public EmployeeService(EmployeeRepository employeeRepository,
                           DepartmentRepository departmentRepository,
                           ProjectRepository projectRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.projectRepository = projectRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
    }

    public Employee createEmployee(CreateEmployeeRequest request) {

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        Employee employee = new Employee();
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setRole(request.getRole());
        employee.setSalary(request.getSalary());
        employee.setActive(request.isActive());
        employee.setDepartment(department);

        return employeeRepository.save(employee);
    }

    public Employee assignEmployeeToProject(Long employeeId, Long projectId) {

        Employee employee = getEmployeeById(employeeId);

        if (!employee.isActive()) {
            throw new IllegalStateException("Inactive employee cannot join project");
        }

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        employee.getProjects().add(project);

        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}

