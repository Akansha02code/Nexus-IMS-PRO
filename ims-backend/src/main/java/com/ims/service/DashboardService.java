package com.ims.service;

import com.ims.enums.InvoiceStatus;
import com.ims.model.Invoice;
import com.ims.repository.InvoiceRepository;
import com.ims.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ClientRepository clientRepository;

    public Double getTotalRevenue() {
        return invoiceRepository.findAll().stream()
                .mapToDouble(i -> i.getPaidAmount() != null ? i.getPaidAmount() : 0.0)
                .sum();
    }

    public long getPaidInvoicesCount() {
        return invoiceRepository.findByStatus(InvoiceStatus.PAID).size();
    }

    public long getUnpaidInvoicesCount() {
        return invoiceRepository.findByStatus(InvoiceStatus.UNPAID).size();
    }

    public List<Map<String, Object>> getMonthlySalesSummary() {
        List<Invoice> allInvoices = invoiceRepository.findAll();

        Map<String, Double> grouped = allInvoices.stream()
                .filter(i -> i.getInvoiceDate() != null)
                .collect(Collectors.groupingBy(
                        i -> i.getInvoiceDate().getMonth().name() + " " + i.getInvoiceDate().getYear(),
                        Collectors.summingDouble(i -> i.getFinalAmount() != null ? i.getFinalAmount() : 0.0)));

        return grouped.entrySet().stream()
                .map(e -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("month", e.getKey());
                    item.put("total", e.getValue());
                    return item;
                })
                .collect(Collectors.toList());
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRevenue", getTotalRevenue());
        stats.put("paidInvoices", getPaidInvoicesCount());
        stats.put("unpaidInvoices", getUnpaidInvoicesCount());
        stats.put("totalClients", clientRepository.count());
        stats.put("monthlySales", getMonthlySalesSummary());
        return stats;
    }
}
