package com.backend.medicine_tracker.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity(name = "Medicine")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Medicine {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "medicineName")
    private String medicineName;

    @Column(name = "dosage")
    private int dosage;

    @Column(name = "frequency")
    private int frequency;

    @Column(name = "createDate")
    @UpdateTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy' 'HH:mm", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp createDate;

    @Column(name = "updateDate")
    @UpdateTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy' 'HH:mm", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp updateDate = null;

}
