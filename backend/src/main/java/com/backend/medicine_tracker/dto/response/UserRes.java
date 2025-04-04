package com.backend.medicine_tracker.dto.response;

import lombok.Data;

@Data
public class UserRes {
    private String username;
    private String email;
    private String password;
}
