package com.backend.medicine_tracker.controller;

import com.backend.medicine_tracker.dto.request.MedicineReq;
import com.backend.medicine_tracker.dto.response.MedicineRes;
import com.backend.medicine_tracker.exception.ResourceNotFoundException;
import com.backend.medicine_tracker.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/medicines")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    // Get all API
    @GetMapping("")
    private ResponseEntity<List<MedicineRes>> getAllMedicines() {
        List<MedicineRes> medicineResList = medicineService.getAllMedicines();
        if (medicineResList.isEmpty()) {
            throw new ResourceNotFoundException("No medicines found!");
        }
        return new ResponseEntity<>(medicineResList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<MedicineRes> getMedicineById(@PathVariable("id") int id) {
        MedicineRes medicineRes = medicineService.getMedicineById(id);
        if (medicineRes == null) {
            throw new ResourceNotFoundException("Medicine not found with id: " + id);
        }
        return new ResponseEntity<>(medicineRes, HttpStatus.OK);
    }

    @PostMapping("")
    private ResponseEntity<MedicineRes> createMedicine(@RequestBody MedicineReq medicineReq) {
        MedicineRes createdMedicine = medicineService.createMedicine(medicineReq);
        return new ResponseEntity<>(createdMedicine, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    private ResponseEntity<MedicineRes> updateMedicine(@PathVariable("id") int id, @RequestBody MedicineReq updateMedicine) {
        MedicineRes updatedMedicine = medicineService.updateMedicine(id, updateMedicine);
        if (updatedMedicine == null) {
            throw new ResourceNotFoundException("Medicine not found with id: " + id);
        }
        return new ResponseEntity<>(updatedMedicine, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> deleteMedicine(@PathVariable("id") int id) {
        medicineService.deleteMedicine(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
