package net.fernandosalas.ems.service;

import net.fernandosalas.ems.dto.JwtAuthResponse;
import net.fernandosalas.ems.dto.LoginDto;
import net.fernandosalas.ems.dto.RegisterDto;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
    String register(RegisterDto registerDto);
}

