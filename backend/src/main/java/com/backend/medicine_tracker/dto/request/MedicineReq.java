package com.backend.medicine_tracker.dto.request;

import lombok.Data;

@Data
public class MedicineReq {
    private String medicineName;
    private int dosage;
    private int frequency;
}
