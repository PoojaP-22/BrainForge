package com.courseplatform.courseplatform_backend.controller;

import com.courseplatform.courseplatform_backend.entity.Student;
import com.courseplatform.courseplatform_backend.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService service;

    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(
            @PathVariable Long id) {

        return service.getStudentById(id);
    }

    @PostMapping
    public Student addStudent(
           @Valid @RequestBody Student student) {

        return service.addStudent(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @Valid
            @RequestBody Student student) {

        return service.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id) {

        service.deleteStudent(id);
        return "Student Deleted Successfully";
    }
}