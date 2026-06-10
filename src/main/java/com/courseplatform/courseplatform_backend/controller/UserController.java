package com.courseplatform.courseplatform_backend.controller;

import com.courseplatform.courseplatform_backend.dto.user.UserRequestDTO;
import com.courseplatform.courseplatform_backend.dto.user.UserResponseDTO;
import com.courseplatform.courseplatform_backend.entity.User;
import com.courseplatform.courseplatform_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(
            @PathVariable Long id) {
        return service.getUserById(id);
    }

    @PostMapping
    public UserResponseDTO addUser(
            @Valid @RequestBody UserRequestDTO dto) {

        return service.addUser(dto);
    }

    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO dto) {

        return service.updateUser(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id) {

        service.deleteUser(id);
        return "User Deleted Successfully";
    }
}