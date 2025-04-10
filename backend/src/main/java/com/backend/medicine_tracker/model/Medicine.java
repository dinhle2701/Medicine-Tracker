package com.backend.medicine_tracker.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@Entity(name = "Medicine")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Medicine {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "medicineName", nullable = false)
    @Pattern(regexp = "^[a-zA-Z ]{3,24}$",
            message = "Medicine name must be at least 3 characters long and no contain letters, numbers, dots, underscores, and hyphens.")
    private String medicineName;

    @Column(name = "dosage", nullable = false)
    @Min(value = 1, message = "Dosage must be at least 1")
    @Max(value = 7, message = "Dosage must be at most 7")
    private int dosage;

    @Column(name = "frequency", nullable = false)
    @Min(value = 1, message = "Frequency must be at least 1")
    @Max(value = 7, message = "Frequency must be at most 7")
    private int frequency;

    @Column(name = "createDate")
    @UpdateTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy' 'HH:mm", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp createDate;

    @Column(name = "updateDate")
    @UpdateTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy' 'HH:mm", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp updateDate = null;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}