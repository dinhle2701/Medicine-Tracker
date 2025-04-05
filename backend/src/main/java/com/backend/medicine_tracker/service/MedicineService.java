package com.backend.medicine_tracker.service;

import com.backend.medicine_tracker.dto.request.MedicineReq;
import com.backend.medicine_tracker.dto.response.MedicineRes;
import com.backend.medicine_tracker.model.Medicine;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MedicineService {
    // Define the methods for the MedicineService interface here
    // For example:
     List<MedicineRes> getAllMedicines();
     MedicineRes getMedicineById(int id);
     MedicineRes createMedicine(MedicineReq medicineReq);
     MedicineRes updateMedicine(int id, MedicineReq updateMedicine);
     void deleteMedicine(int id);
}
