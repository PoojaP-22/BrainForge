package com.courseplatform.courseplatform_backend.security;

import com.courseplatform.courseplatform_backend.dto.auth.AuthResponseDTO;
import com.courseplatform.courseplatform_backend.dto.auth.LoginRequestDTO;
import com.courseplatform.courseplatform_backend.dto.auth.RegisterRequestDTO;
import com.courseplatform.courseplatform_backend.entity.Role;
import com.courseplatform.courseplatform_backend.entity.User;
import com.courseplatform.courseplatform_backend.exception.DuplicateResourceException;
import com.courseplatform.courseplatform_backend.exception.ResourceNotFoundException;
import com.courseplatform.courseplatform_backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository repository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // REGISTER
    public String register(RegisterRequestDTO dto) {

        if (repository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException("User", "email", dto.getEmail());
        }

        // Create new User entity from DTO
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(Role.STUDENT);

        repository.save(user);

        return "User registered successfully";
    }

    //LOGIN
    public AuthResponseDTO login(LoginRequestDTO dto) {

        User user = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", dto.getEmail()));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponseDTO(token);
    }
}