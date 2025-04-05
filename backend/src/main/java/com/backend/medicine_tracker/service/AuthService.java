package com.backend.medicine_tracker.service;

import com.backend.medicine_tracker.dto.request.UserLoginReq;
import com.backend.medicine_tracker.dto.request.UserRegisReq;
import com.backend.medicine_tracker.dto.response.UserRes;
import com.backend.medicine_tracker.model.User;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserRes handleLogin(UserLoginReq userReq);

    UserRes handleRegister(UserRegisReq userReq);

    User getUserByEmail(String email);
}
