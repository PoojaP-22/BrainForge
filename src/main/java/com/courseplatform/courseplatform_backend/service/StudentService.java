package com.courseplatform.courseplatform_backend.service;

import com.courseplatform.courseplatform_backend.entity.Student;
import com.courseplatform.courseplatform_backend.exception.DuplicateResourceException;
import com.courseplatform.courseplatform_backend.exception.ResourceNotFoundException;
import com.courseplatform.courseplatform_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public List<Student> getAllStudents() {

        return repository.findAll();
    }

    public Student getStudentById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student",
                                "id",
                                id

                        ));
    }

    public Student addStudent(Student student) {
        if(repository.existsByEmail(student.getEmail())) {

            throw new DuplicateResourceException(
                    "Student",
                    "email",
                    student.getEmail()
            );
        }
        return repository.save(student);
    }

    public Student updateStudent(Long id, Student student) {

        Student existingStudent =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student",
                                        "id",
                                        id
                                ));

        if(repository.existsByEmail(student.getEmail())
                &&
                !existingStudent.getEmail()
                        .equals(student.getEmail())) {

            throw new DuplicateResourceException(
                    "Student",
                    "email",
                    student.getEmail()
            );
        }

            existingStudent.setName(student.getName());
            existingStudent.setEmail(student.getEmail());
            existingStudent.setCourse(student.getCourse());

            return repository.save(existingStudent);

    }

    public void deleteStudent(Long id) {

        Student existingStudent = repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Student",
                                        "id",
                                        id
                                ));
        repository.delete(existingStudent);
    }

}