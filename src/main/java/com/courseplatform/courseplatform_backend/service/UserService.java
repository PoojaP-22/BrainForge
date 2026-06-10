package com.courseplatform.courseplatform_backend.service;

import com.courseplatform.courseplatform_backend.dto.user.UserRequestDTO;
import com.courseplatform.courseplatform_backend.dto.user.UserResponseDTO;
import com.courseplatform.courseplatform_backend.entity.Role;
import com.courseplatform.courseplatform_backend.entity.User;
import com.courseplatform.courseplatform_backend.exception.DuplicateResourceException;
import com.courseplatform.courseplatform_backend.exception.ResourceNotFoundException;
import com.courseplatform.courseplatform_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<UserResponseDTO> getAllUsers() {
        return repository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public UserResponseDTO getUserById(Long id) {

        User user =  repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User",
                                "id",
                                id
                        ));
        return convertToDTO(user);
    }

    public UserResponseDTO addUser(UserRequestDTO dto) {
        if(repository.existsByEmail(dto.getEmail())) {

            throw new DuplicateResourceException(
                    "User",
                    "email",
                    dto.getEmail()
            );
        }
        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());

        user.setRole(Role.STUDENT);

        User savedUser = repository.save(user);

        return convertToDTO(savedUser);
    }

    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {

        User existingUser =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User",
                                        "id",
                                        id
                                ));

        if(repository.existsByEmail(dto.getEmail())
                &&
                !existingUser.getEmail()
                        .equals(dto.getEmail())) {

            throw new DuplicateResourceException(
                    "User",
                    "email",
                    dto.getEmail()
            );
        }

        existingUser.setName(dto.getName());
        existingUser.setEmail(dto.getEmail());
        existingUser.setPassword(dto.getPassword());

        User updatedUser =
                repository.save(existingUser);

        return convertToDTO(updatedUser);
    }

    public void deleteUser(Long id) {

        User existingUser =
                repository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User",
                                        "id",
                                        id
                                ));

        repository.delete(existingUser);
    }

    private UserResponseDTO convertToDTO(User user) {

        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

}