package com.backend.medicine_tracker.service.serviceimpl;

import com.backend.medicine_tracker.dto.request.MedicineReq;
import com.backend.medicine_tracker.dto.response.MedicineRes;
import com.backend.medicine_tracker.exception.ResourceNotFoundException;
import com.backend.medicine_tracker.model.Medicine;
import com.backend.medicine_tracker.model.User;
import com.backend.medicine_tracker.repository.MedicineRepository;
import com.backend.medicine_tracker.repository.UserRepository;
import com.backend.medicine_tracker.service.MedicineService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MedicineServiceImpl implements MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<MedicineRes> getAllMedicinesByUserId(Integer userId) {
        try {
            log.info("Fetching medicines for user ID: {}", userId);

            List<Medicine> medicines = medicineRepository.findByUserId(userId);

            List<MedicineRes> responses = medicines.stream()
                    .map(medicine -> modelMapper.map(medicine, MedicineRes.class))
                    .collect(Collectors.toList());

            return responses;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching medicines for user ID " + userId + ": " + e.getMessage());
        }
    }



    @Override
    public MedicineRes getMedicineById(int id) {
        try {
            Medicine medicine = medicineRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Not found medicine has id: " + id));

            MedicineRes medicineRes = modelMapper.map(medicine, MedicineRes.class);

            log.info("Fetched medicine with id: " + id + " successfully!");
            return medicineRes;
        } catch (Exception e) {
            throw new ResourceNotFoundException("Error fetching medicine: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public MedicineRes createMedicine(MedicineReq medicineReq) {
        try {
            Medicine newMedicine = new Medicine();

//            User creatUser = userRepository
//                    .findById(medicineReq.getUserId())
//                    .orElseThrow(
//                            () -> new ResourceNotFoundException("User not found with id: " + medicineReq.getUserId())
//                    );

            User user = userRepository.findById(medicineReq.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            newMedicine.setUser(user);

            newMedicine.setMedicineName(medicineReq.getMedicineName());
            newMedicine.setDosage(medicineReq.getDosage());
            newMedicine.setFrequency(medicineReq.getFrequency());
            newMedicine.setCreateDate(Timestamp.valueOf(LocalDateTime.now()));
            newMedicine.setUpdateDate(null);

            medicineRepository.save(newMedicine);

            MedicineRes medicineRes = modelMapper.map(newMedicine, MedicineRes.class);

            log.info("Created new medicine successfully!");
            return medicineRes;
        } catch (Exception e) {
            throw new ResourceNotFoundException("Error creating medicine: " + e.getMessage());
        }
    }

    @Transactional
    @Override
    public MedicineRes updateMedicine(int id, MedicineReq updateMedicine) {
        try {
            Medicine newMedicine = medicineRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Not found medicine has id: " + id));

            User updateUser = userRepository
                    .findById(updateMedicine.getUserId())
                    .orElseThrow(
                            () -> new ResourceNotFoundException("User not found with id: " + updateMedicine.getUserId())
                    );
            newMedicine.setUser(updateUser);

            newMedicine.setMedicineName(updateMedicine.getMedicineName());
            newMedicine.setDosage(updateMedicine.getDosage());
            newMedicine.setFrequency(updateMedicine.getFrequency());
            newMedicine.setCreateDate(Timestamp.valueOf(LocalDateTime.now()));
            newMedicine.setUpdateDate(null);

            medicineRepository.save(newMedicine);

            MedicineRes medicineRes = modelMapper.map(newMedicine, MedicineRes.class);

            log.info("Update new medicine successfully!");
            return medicineRes;
        } catch (Exception e) {
            throw new ResourceNotFoundException("Error update medicine: " + e.getMessage());
        }
    }



    @Override
    public void deleteMedicine(int id) {
        try {
            Medicine existingMedicine = medicineRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Not found medicine has id: " + id));

            medicineRepository.delete(existingMedicine);

            log.info("Deleted medicine with id: " + id + " successfully!");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Error deleting medicine: " + e.getMessage());
        }
    }
}
