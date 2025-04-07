package com.backend.medicine_tracker.dto.response;

import lombok.Data;

@Data
public class MedicineRes {
    private int id;
    private String medicineName;
    private int dosage;
    private int frequency;
}
