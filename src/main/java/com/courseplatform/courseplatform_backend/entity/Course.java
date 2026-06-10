package com.courseplatform.courseplatform_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Course title cannot be empty")
    private String title;

    @NotBlank(message = "Instructor name cannot be empty")
    private String instructor;

    @Positive(message = "Price must be greater than zero")
    private double price;

}
