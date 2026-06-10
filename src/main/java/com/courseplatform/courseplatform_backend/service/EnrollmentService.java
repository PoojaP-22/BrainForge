package com.courseplatform.courseplatform_backend.service;

import com.courseplatform.courseplatform_backend.dto.enrollment.EnrollmentRequestDTO;
import com.courseplatform.courseplatform_backend.dto.enrollment.EnrollmentResponseDTO;
import com.courseplatform.courseplatform_backend.entity.Course;
import com.courseplatform.courseplatform_backend.entity.Enrollment;
import com.courseplatform.courseplatform_backend.entity.User;
import com.courseplatform.courseplatform_backend.exception.DuplicateResourceException;
import com.courseplatform.courseplatform_backend.exception.ResourceNotFoundException;
import com.courseplatform.courseplatform_backend.repository.CourseRepository;
import com.courseplatform.courseplatform_backend.repository.EnrollmentRepository;
import com.courseplatform.courseplatform_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnrollmentService {
    @Autowired
    private  EnrollmentRepository enrollmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;

    public EnrollmentResponseDTO enrollStudent(
            EnrollmentRequestDTO request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User",
                                "id",
                                request.getUserId()));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Course",
                                "id",
                                request.getCourseId()));

        if (enrollmentRepository.existsByUserIdAndCourseId(
                user.getId(),
                course.getId())) {

            throw new DuplicateResourceException(
                    "Enrollment",
                    "course",
                    course.getTitle());
        }

        Enrollment enrollment = new Enrollment();

        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setEnrolledAt(LocalDateTime.now());

        Enrollment saved =
                enrollmentRepository.save(enrollment);

        return convertToDTO(saved);
    }

    public List<EnrollmentResponseDTO> getAllEnrollments() {

        return enrollmentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<EnrollmentResponseDTO> getEnrollmentsByUser(Long userId) {

        return enrollmentRepository
                .findByUserId(userId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public void deleteEnrollment(Long id) {

        Enrollment enrollment =
                enrollmentRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Enrollment",
                                        "id",
                                        id));

        enrollmentRepository.delete(enrollment);
    }

    private EnrollmentResponseDTO convertToDTO(
            Enrollment enrollment) {

        return new EnrollmentResponseDTO(
                enrollment.getId(),
                enrollment.getUser().getId(),
                enrollment.getUser().getName(),
                enrollment.getCourse().getId(),
                enrollment.getCourse().getTitle(),
                enrollment.getEnrolledAt()
        );
    }
}
