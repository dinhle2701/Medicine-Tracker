package com.backend.medicine_tracker.service.serviceimpl;

import com.backend.medicine_tracker.dto.request.UserLoginReq;
import com.backend.medicine_tracker.dto.request.UserRegisReq;
import com.backend.medicine_tracker.dto.response.UserRes;
import com.backend.medicine_tracker.exception.ResourceNotFoundException;
import com.backend.medicine_tracker.model.User;
import com.backend.medicine_tracker.repository.UserRepository;
import com.backend.medicine_tracker.service.AuthService;
import com.backend.medicine_tracker.service.JwtTokenUtil;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {
    private final static String SIGNER_KEY = "62dff4543f5521fae8c895a1838f006a6be2cfb15092f2524f6d60095be04845dfea2875789c329fc149567315afff6a19441778b6291b59eb45b701356408a0";

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserRes handleLogin(UserLoginReq userReq) {

        if (userReq.getEmail() == null || userReq.getPassword() == null) {
            throw new RuntimeException("Email or password cannot be null");
        }

        var user = userRepository.findByEmail(userReq.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found!"));

        if (!passwordEncoder.matches(userReq.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }

        // Tạo token cho user
        String token = jwtTokenUtil.generateToken(user);  // Truyền đối tượng User thay vì chỉ email
        UserRes result = new UserRes();
        result.setUserId(user.getId());
        result.setUsername(user.getUsername());
        result.setEmail(user.getEmail());
        result.setToken(token);
        result.setMessage("Login successful");

        return result;
    }


    @Override
    public UserRes handleRegister(UserRegisReq userReq) {
        User user = new User();
        if(userRepository.existsByUsername(userReq.getEmail())) {
            throw new RuntimeException("Username already exists");
        }

        user.setUsername(userReq.getUsername());
        user.setEmail(userReq.getEmail());
        user.setPassword(passwordEncoder.encode(userReq.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        UserRes userRes = modelMapper.map(user, UserRes.class);

        return userRes;
    }

    @Override
    public User getUserByEmail(String email) {
        // Sử dụng Optional để tránh NullPointerException
        Optional<User> userOptional = userRepository.findByEmail(email);

        // Kiểm tra nếu không tìm thấy user với email đó
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        return userOptional.get();  // Trả về user nếu tìm thấy
    }
}
