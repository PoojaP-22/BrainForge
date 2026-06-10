package com.courseplatform.courseplatform_backend.dto.enrollment;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentRequestDTO {
    @NotNull(message = "User id is required")
    private Long userId;

    @NotNull(message = "Course id is required")
    private Long courseId;
}
