package com.courseplatform.courseplatform_backend.security;

import com.courseplatform.courseplatform_backend.dto.auth.AuthResponseDTO;
import com.courseplatform.courseplatform_backend.dto.auth.LoginRequestDTO;
import com.courseplatform.courseplatform_backend.dto.auth.RegisterRequestDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    // REGISTER
    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequestDTO dto) {
        return service.register(dto);
    }

    // LOGIN
    @PostMapping("/login")
    public AuthResponseDTO login(@Valid @RequestBody LoginRequestDTO dto) {
        return service.login(dto);
    }
}
