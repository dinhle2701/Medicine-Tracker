package com.backend.medicine_tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MedicineTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicineTrackerApplication.class, args);
	}

}
