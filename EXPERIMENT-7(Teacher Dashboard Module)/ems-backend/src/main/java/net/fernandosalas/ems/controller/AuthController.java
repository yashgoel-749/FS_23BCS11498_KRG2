package net.fernandosalas.ems.controller;

import lombok.AllArgsConstructor;
import net.fernandosalas.ems.dto.JwtAuthResponse;
import net.fernandosalas.ems.dto.LoginDto;
import net.fernandosalas.ems.dto.RegisterDto;
import net.fernandosalas.ems.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        try {
            String response = authService.register(registerDto);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
        try {
            JwtAuthResponse jwtAuthResponse = authService.login(loginDto);
            return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
}

