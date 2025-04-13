package com.backend.medicine_tracker.dto.response;

import lombok.Data;

@Data
public class JwtTokenRes {
    private String token;

    public JwtTokenRes(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
