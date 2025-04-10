package com.backend.medicine_tracker.service;

import com.backend.medicine_tracker.model.Notification;
import com.backend.medicine_tracker.model.User;
import com.backend.medicine_tracker.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getUserNotis(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Notification createNoti(String message, User user) {
        try {
            Notification notification = new Notification();
            notification.setMessage(message);
            notification.setUser(user);
            return notificationRepository.save(notification);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Notification> markAllAsReadByUserId(Long userId) {
        try {
            List<Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
            for (Notification notification : notifications) {
                notification.setRead(true);
                notificationRepository.save(notification);  // Lưu thông báo đã thay đổi
            }
            return notifications;  // Trả về danh sách thông báo đã cập nhật
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
