package com.courseplatform.courseplatform_backend.controller;

import com.courseplatform.courseplatform_backend.dto.course.CourseRequestDTO;
import com.courseplatform.courseplatform_backend.dto.course.CourseResponseDTO;
import com.courseplatform.courseplatform_backend.entity.Course;
import com.courseplatform.courseplatform_backend.entity.Role;
import com.courseplatform.courseplatform_backend.entity.User;
import com.courseplatform.courseplatform_backend.security.JwtService;
import com.courseplatform.courseplatform_backend.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService service;

    @Autowired
    private JwtService jwtservice;

    @GetMapping
    public List<CourseResponseDTO> getAllCourses() {
        return service.getAllCourses();
    }

    @GetMapping("/{id}")
    public CourseResponseDTO getCourse(
            @PathVariable Long id) {

        return service.getCourseById(id);
    }

    @PostMapping
    public CourseResponseDTO addCourse(
            @Valid
            @RequestBody CourseRequestDTO dto) {

        return service.addCourse(dto);
    }

    @PutMapping("/{id}")
    public CourseResponseDTO updateCourse(
            @PathVariable Long id,
            @Valid
            @RequestBody CourseRequestDTO dto) {

        return service.updateCourse(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable Long id) {

        service.deleteCourse(id);
        return "Course Deleted Successfully";
    }
}
