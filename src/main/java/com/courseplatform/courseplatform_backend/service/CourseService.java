package com.courseplatform.courseplatform_backend.service;
import com.courseplatform.courseplatform_backend.dto.course.CourseRequestDTO;
import com.courseplatform.courseplatform_backend.dto.course.CourseResponseDTO;
import com.courseplatform.courseplatform_backend.entity.Course;
import com.courseplatform.courseplatform_backend.exception.ResourceNotFoundException;
import com.courseplatform.courseplatform_backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository repository;

    public List<CourseResponseDTO> getAllCourses() {

        return repository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public CourseResponseDTO getCourseById(Long id) {

        Course course =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course",
                                        "id",
                                        id
                                ));

        return convertToDTO(course);
    }

    public CourseResponseDTO addCourse(CourseRequestDTO dto) {

        Course course = new Course();

        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setPrice(dto.getPrice());
        course.setInstructor(dto.getInstructor());

        Course savedCourse =
                repository.save(course);

        return convertToDTO(savedCourse);
    }

    public CourseResponseDTO updateCourse(
            Long id,
            CourseRequestDTO dto) {

        Course existing =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course",
                                        "id",
                                        id
                                ));

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setPrice(dto.getPrice());
        existing.setInstructor(dto.getInstructor());

        Course updated = repository.save(existing);

        return convertToDTO(updated);
    }

    public void deleteCourse(Long id) {

        Course existing = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Course",
                                "id",
                                id
                        ));

        repository.delete(existing);
    }

    private CourseResponseDTO convertToDTO(Course course) {

        return new CourseResponseDTO(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getInstructor(),
                course.getPrice()
        );
    }
}
