package com.courseplatform.courseplatform_backend.repository;

import com.courseplatform.courseplatform_backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
