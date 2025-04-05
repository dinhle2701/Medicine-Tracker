package com.backend.medicine_tracker.controller;

import com.backend.medicine_tracker.dto.request.UserLoginReq;
import com.backend.medicine_tracker.dto.request.UserRegisReq;
import com.backend.medicine_tracker.dto.response.JwtTokenRes;
import com.backend.medicine_tracker.dto.response.UserRes;
import com.backend.medicine_tracker.model.User;
import com.backend.medicine_tracker.service.AuthService;
import com.backend.medicine_tracker.service.JwtTokenUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<UserRes> handleLogin(@RequestBody @Valid UserLoginReq request) {
        try {
            // Xác thực username/password
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Lấy thông tin user từ service dựa trên email
            User user = authService.getUserByEmail(request.getEmail());  // Đảm bảo rằng bạn có phương thức này trong authService

            // Kiểm tra nếu không tìm thấy user
            if (user == null) {
                UserRes errorRes = new UserRes();
                errorRes.setMessage("User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorRes);
            }

            // Tạo token cho user
            String token = jwtTokenUtil.generateToken(user);  // Truyền đối tượng User thay vì chỉ email
            UserRes result = new UserRes();
            result.setUsername(user.getUsername());
            result.setEmail(user.getEmail());
            result.setToken(token);
            result.setMessage("Login successful");

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            // Lỗi tổng quát
            e.printStackTrace();
            UserRes errorRes = new UserRes();
            errorRes.setMessage("Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorRes);
        }
    }




    @PostMapping("/register")
    public ResponseEntity<UserRes> register(@RequestBody UserRegisReq userReq) {
        UserRes userRes = authService.handleRegister(userReq);
        return ResponseEntity.ok(userRes);
    }
}
