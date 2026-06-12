package com.example.employeeTrial.service;

import com.example.employeeTrial.entity.Department;
import com.example.employeeTrial.entity.Employee;
import com.example.employeeTrial.exception.ResourceNotFoundException;
import com.example.employeeTrial.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found"));
    }

    public Department createDepartment(Department department) {

        if (department.getBudget() < 0) {
            throw new IllegalStateException("Budget cannot be negative");
        }

        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department updatedDepartment) {

        Department department = getDepartmentById(id);

        department.setName(updatedDepartment.getName());
        department.setLocation(updatedDepartment.getLocation());
        department.setBudget(updatedDepartment.getBudget());

        return departmentRepository.save(department);
    }

    public void deleteDepartment(Long id) {

        Department department = getDepartmentById(id);

        departmentRepository.delete(department);
    }

    public List<Employee> getDepartmentEmployees(Long departmentId) {

        Department department = getDepartmentById(departmentId);

        return department.getEmployees();
    }

    public double getDepartmentBudgetUsage(Long departmentId) {

        Department department = getDepartmentById(departmentId);

        double totalSalaries = department.getEmployees()
                .stream()
                .mapToDouble(Employee::getSalary)
                .sum();

        if (department.getBudget() == 0) {
            return 0;
        }

        return (totalSalaries / department.getBudget()) * 100;
    }
}
