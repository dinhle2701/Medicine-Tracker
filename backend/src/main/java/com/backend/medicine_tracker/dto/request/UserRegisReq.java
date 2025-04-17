package com.backend.medicine_tracker.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisReq {
    @NotBlank(message = "USERNAME_REQUIRED")
    private String username;
    @NotBlank(message = "EMAIL_REQUIRED")
    private String email;
    @NotBlank(message = "PASSWORD_REQUIRED")
    private String password;
    private String confirmPassword;
}
