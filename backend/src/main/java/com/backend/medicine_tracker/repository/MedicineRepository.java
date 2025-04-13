package com.backend.medicine_tracker.repository;

import com.backend.medicine_tracker.model.Medicine;
import com.backend.medicine_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
    List<Medicine> findByUserId(Integer userId);

}
