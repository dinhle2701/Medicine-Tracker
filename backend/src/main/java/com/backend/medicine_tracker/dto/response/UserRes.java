package com.backend.medicine_tracker.dto.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserRes {
    private int userId;
    private String username;
    private String email;
    private String password;
    private String token;
    private String message;

}
