package com.ims.service;

import com.ims.repository.ClientRepository;
import com.ims.repository.EstimateRepository;
import com.ims.repository.InvoiceRepository;
import com.ims.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EstimateRepository estimateRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public Map<String, Object> getMisReport() {
        Map<String, Object> report = new HashMap<>();

        report.put("totalClients", clientRepository.count());
        report.put("totalEstimates", estimateRepository.count());
        report.put("totalInvoices", invoiceRepository.count());

        double totalRevenue = invoiceRepository.findAll().stream()
                .mapToDouble(i -> i.getPaidAmount())
                .sum();

        double totalOutstanding = invoiceRepository.findAll().stream()
                .mapToDouble(i -> i.getBalanceAmount())
                .sum();

        report.put("totalRevenue", totalRevenue);
        report.put("totalOutstanding", totalOutstanding);

        return report;
    }
}
