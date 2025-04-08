package com.backend.medicine_tracker.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity(name = "User")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username")
    @Pattern(regexp = "^[a-zA-Z ]{3,24}$",
            message = "Username must be at least 3 characters long and can contain letters, numbers, dots, underscores, and hyphens.")
    private String username;

    @Column(name = "email")
    @Pattern(regexp = "^[a-zA-Z0-9]{4,}+@[a-z]+\\.[a-z]{2,6}$",
            message = "Invalid email format. Email format is: '@gmail.com' ")
    private String email;

    @Column(name = "password")
//    @Pattern(regexp = "^[A-Z]{1}+\\.*[a-zA-Z0-9\\W]{7,16}$",
//            message = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.")
    private String password;

    @Column(name = "createDate")
    @UpdateTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy' 'HH:mm", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp createDate;

    @Column(name = "role")
    private String role;

    @Column(name = "isActive")
    private boolean isActive = true;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Medicine> medicines;
}
