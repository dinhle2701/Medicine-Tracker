package com.backend.medicine_tracker.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginReq {
    @NotBlank(message = "USERNAME_REQUIRED")
    private String email;

    @NotBlank(message = "PASSWORD_REQUIRED")
    private String password;
}
