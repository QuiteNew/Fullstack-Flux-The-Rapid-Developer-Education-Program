package com.example.employeeTrial.repository;
import com.example.employeeTrial.entity.Employee;
import com.example.employeeTrial.enums.EmployeeRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByRole(EmployeeRole role);

    List<Employee> findByActiveTrue();

    List<Employee> findBySalaryGreaterThan(Double salary);
}
