package com.ims.controller;

import com.ims.enums.EstimateStatus;
import com.ims.model.Estimate;
import com.ims.service.EstimateService;
import com.ims.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/estimates")

public class EstimateController {

    @Autowired
    private EstimateService estimateService;

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    @PreAuthorize("hasRole('SALES') or hasRole('ADMIN')")
    public ResponseEntity<Estimate> createEstimate(@RequestBody Estimate estimate, Authentication authentication) {
        // GST and Total calculation is handled in EstimateService.createEstimate
        return ResponseEntity.ok(estimateService.createEstimate(estimate, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Estimate>> getAllEstimates(Authentication authentication) {
        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.ok(estimateService.getAllEstimates());
        }
        return ResponseEntity.ok(estimateService.getEstimatesByUser(authentication.getName()));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Estimate> updateEstimateStatus(@PathVariable Long id, @RequestParam EstimateStatus status) {
        Estimate estimate = estimateService.updateStatus(id, status);

        // Automation: Generate invoice ONLY if approved
        if (status == EstimateStatus.APPROVED) {
            invoiceService.generateInvoiceFromEstimate(estimate);
        }

        return ResponseEntity.ok(estimate);
    }
}
