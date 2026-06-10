package com.courseplatform.courseplatform_backend.controller;

import com.courseplatform.courseplatform_backend.dto.enrollment.EnrollmentRequestDTO;
import com.courseplatform.courseplatform_backend.dto.enrollment.EnrollmentResponseDTO;
import com.courseplatform.courseplatform_backend.service.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {
    @Autowired
    private EnrollmentService service;

    @PostMapping
    public EnrollmentResponseDTO enrollStudent(
            @Valid
            @RequestBody EnrollmentRequestDTO request) {

        return service.enrollStudent(request);
    }

    @GetMapping
    public List<EnrollmentResponseDTO>
    getAllEnrollments() {

        return service.getAllEnrollments();
    }

    @GetMapping("/user/{userId}")
    public List<EnrollmentResponseDTO>
    getEnrollmentsByUser(
            @PathVariable Long userId) {

        return service.getEnrollmentsByUser(userId);
    }

    @DeleteMapping("/{id}")
    public String deleteEnrollment(
            @PathVariable Long id) {

        service.deleteEnrollment(id);

        return "Enrollment deleted successfully";
    }
}