package com.backend.medicine_tracker.controller;

import com.backend.medicine_tracker.model.Notification;
import com.backend.medicine_tracker.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/noti")
public class NotificationController {

    @Autowired
    private NotificationService notiService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notiService.getUserNotis(userId));
    }

    @PutMapping("/user/{userId}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long userId) {
        notiService.markAllAsReadByUserId(userId);
        return ResponseEntity.ok().build();
    }
}

