package com.backend.medicine_tracker.dto.response;

import lombok.Data;

@Data
public class MedicineRes {
    private String medicineName;
    private int dosage;
    private int frequency;
}
