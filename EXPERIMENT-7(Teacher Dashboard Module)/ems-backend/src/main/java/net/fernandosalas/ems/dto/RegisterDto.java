package net.fernandosalas.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.fernandosalas.ems.entity.Role;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    private String name;
    private String email;
    private String password;
    private Role role;
}

