package com.ims.service;

import com.ims.enums.EstimateStatus;
import com.ims.model.Estimate;
import com.ims.model.EstimateItem;
import com.ims.model.User;
import com.ims.repository.EstimateRepository;
import com.ims.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class EstimateService {

    @Autowired
    private EstimateRepository estimateRepository;

    @Autowired
    private UserRepository userRepository;

    public Estimate createEstimate(Estimate estimate, String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        estimate.setCreatedBy(user);
        estimate.setEstimateNumber("EST-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        estimate.setStatus(EstimateStatus.PENDING);

        calculateTotals(estimate);

        return estimateRepository.save(estimate);
    }

    private void calculateTotals(Estimate estimate) {
        double subTotal = 0;
        if (estimate.getItems() != null) {
            for (EstimateItem item : estimate.getItems()) {
                double amount = (item.getQuantity() != null ? item.getQuantity() : 0) *
                        (item.getUnitPrice() != null ? item.getUnitPrice() : 0);
                item.setAmount(amount);
                subTotal += amount;
            }
        }
        estimate.setTotalAmount(subTotal);
        estimate.setGstAmount(subTotal * 0.18); // 18% GST
        estimate.setGrandTotal(subTotal + estimate.getGstAmount());
    }

    public List<Estimate> getEstimatesByUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return estimateRepository.findByCreatedBy(user);
    }

    public List<Estimate> getAllEstimates() {
        return estimateRepository.findAll();
    }

    public Estimate updateStatus(Long id, EstimateStatus status) {
        Estimate estimate = estimateRepository.findById(id).orElseThrow();
        estimate.setStatus(status);
        return estimateRepository.save(estimate);
    }

    public Estimate getEstimateById(Long id) {
        return estimateRepository.findById(id).orElseThrow();
    }
}
