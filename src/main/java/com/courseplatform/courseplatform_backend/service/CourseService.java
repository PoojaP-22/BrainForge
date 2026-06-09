package com.courseplatform.courseplatform_backend.service;
import com.courseplatform.courseplatform_backend.entity.Course;
import com.courseplatform.courseplatform_backend.exception.ResourceNotFoundException;
import com.courseplatform.courseplatform_backend.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository repository;

    public CourseService(CourseRepository repository) {

        this.repository = repository;
    }

    public List<Course> getAllCourses() {

        return repository.findAll();
    }

    public Course getCourseById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                            "Course",
                            "id",
                            id
        ));
    }

    public Course addCourse(Course course) {

        return repository.save(course);
    }

    public Course updateCourse(Long id, Course course) {
        Course existing = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Course",
                                "id",
                                id
                        ));
            existing.setTitle(course.getTitle());
            existing.setInstructor(course.getInstructor());
            existing.setPrice(course.getPrice());

            return repository.save(existing);

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
}
