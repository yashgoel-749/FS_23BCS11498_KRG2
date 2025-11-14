package net.fernandosalas.ems.service.implementation;

import net.fernandosalas.ems.dto.JwtAuthResponse;
import net.fernandosalas.ems.dto.LoginDto;
import net.fernandosalas.ems.dto.RegisterDto;
import net.fernandosalas.ems.entity.Role;
import net.fernandosalas.ems.entity.User;
import net.fernandosalas.ems.repository.UserRepository;
import net.fernandosalas.ems.security.CustomUserDetailsService;
import net.fernandosalas.ems.security.JwtTokenProvider;
import net.fernandosalas.ems.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImplementation implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtTokenProvider.generateToken(userDetails, user.getRole().name());

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setEmail(user.getEmail());
        jwtAuthResponse.setRole(user.getRole());
        jwtAuthResponse.setName(user.getName());

        return jwtAuthResponse;
    }

    @Override
    public String register(RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(registerDto.getRole() != null ? registerDto.getRole() : Role.STUDENT);

        userRepository.save(user);
        return "User registered successfully!";
    }
}

