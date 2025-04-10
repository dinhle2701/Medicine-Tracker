package com.backend.medicine_tracker.service;

import com.backend.medicine_tracker.model.User;
import com.backend.medicine_tracker.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Component
@Slf4j
public class ReminderScheduler {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    // Ví dụ gửi email mỗi ngày lúc 8h sáng
    @Scheduled(cron = "0 30 * * * *", zone = "Asia/Ho_Chi_Minh")
    public void sendDailyReminder() {
        log.info("🕑 Scheduled task triggered: sendDailyReminder");

        try {
            List<User> users = userRepository.findByIsActiveTrue();
            log.info("Found {} active users", users.size());

            for (User user : users) {
                String subject = "Medicine Reminder";
                String body = "Hello " + user.getUsername() + ",\nDon't forget to take your medicine today!";
                String message = subject + ": " + body;
                emailService.sendReminderEmail(user.getEmail(), subject, body);
                notificationService.createNoti(message, user);
            }
        } catch (Exception e) {
            log.error("Error occurred in scheduled task: ", e);
        }
    }
}
