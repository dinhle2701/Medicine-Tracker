package com.backend.medicine_tracker.dto.request;

import lombok.Data;

@Data
public class UserReq {
    private String username;
    private String email;
    private String password;
}
