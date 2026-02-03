package com.ims.controller;

import com.ims.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")

public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/total-revenue")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<Double> getTotalRevenue() {
        return ResponseEntity.ok(dashboardService.getTotalRevenue());
    }

    @GetMapping("/paid-count")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<Long> getPaidCount() {
        return ResponseEntity.ok(dashboardService.getPaidInvoicesCount());
    }

    @GetMapping("/unpaid-count")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<Long> getUnpaidCount() {
        return ResponseEntity.ok(dashboardService.getUnpaidInvoicesCount());
    }

    @GetMapping("/monthly-summary")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<List<Map<String, Object>>> getMonthlySummary() {
        return ResponseEntity.ok(dashboardService.getMonthlySalesSummary());
    }

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<Map<String, Object>> getAllStats() {
        return ResponseEntity.ok(dashboardService.getDashboardStats());
    }
}
