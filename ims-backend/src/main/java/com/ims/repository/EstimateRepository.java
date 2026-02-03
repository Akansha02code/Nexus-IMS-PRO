package com.ims.repository;

import com.ims.model.Estimate;
import com.ims.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EstimateRepository extends JpaRepository<Estimate, Long> {
    List<Estimate> findByCreatedBy(User createdBy);
}
