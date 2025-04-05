package com.backend.medicine_tracker.dto.request;

import com.backend.medicine_tracker.model.User;
import lombok.Data;

import java.util.UUID;

@Data
public class MedicineReq {
    private int userId;
    private String medicineName;
    private int dosage;
    private int frequency;

}
