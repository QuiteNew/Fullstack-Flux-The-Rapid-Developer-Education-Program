package com.example.trial.service;

import com.example.trial.entity.Course;
import com.example.trial.entity.Student;
import com.example.trial.exception.ResourceNotFoundException;
import com.example.trial.repository.CourseRepository;
import com.example.trial.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private CourseRepository courseRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found"));
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {

        Student student = getStudentById(id);

        student.setFirstName(updatedStudent.getFirstName());
        student.setLastName(updatedStudent.getLastName());
        student.setEmail(updatedStudent.getEmail());

        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Student enrollStudentToCourse(Long studentId, Long courseId) {

        Student student = getStudentById(studentId);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found"));

        student.getCourses().add(course);

        return studentRepository.save(student);
    }

    public Student removeStudentFromCourse(Long studentId, Long courseId) {

        Student student = getStudentById(studentId);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found"));

        student.getCourses().remove(course);

        return studentRepository.save(student);
    }
}
