package com.backend.medicine_tracker.service;

import com.backend.medicine_tracker.model.User;
import com.backend.medicine_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Component
public class ReminderScheduler {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    // Ví dụ gửi email mỗi ngày lúc 8h sáng
    @Scheduled(cron = "0 15 22 * * *")
    public void sendDailyReminder() {

        // Ví dụ giả lập danh sách người dùng
        List<User> users = userRepository.findByIsActiveTrue();

        for (User user : users) {
            String subject = "Medicine Reminder";
            String body = "Hello " + user.getUsername() + ",\nDon't forget to take your medicine today!";

            emailService.sendReminderEmail(user.getEmail(), subject, body);
        }
    }
}
