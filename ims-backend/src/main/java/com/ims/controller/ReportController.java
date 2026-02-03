package com.ims.controller;

import com.ims.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/mis")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getMisReport() {
        return reportService.getMisReport();
    }
}
