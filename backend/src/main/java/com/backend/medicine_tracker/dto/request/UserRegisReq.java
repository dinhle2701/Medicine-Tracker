package com.backend.medicine_tracker.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisReq {
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
}
