package com.ims.service;

import com.ims.enums.InvoiceStatus;
import com.ims.model.Estimate;
import com.ims.model.Invoice;
import com.ims.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public Invoice generateInvoiceFromEstimate(Estimate estimate) {
        Invoice invoice = Invoice.builder()
                .invoiceNumber("INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .estimate(estimate)
                .client(estimate.getClient())
                .invoiceDate(LocalDate.now())
                .dueDate(LocalDate.now().plusDays(15))
                .totalAmount(estimate.getTotalAmount())
                .gstAmount(estimate.getGstAmount())
                .finalAmount(estimate.getGrandTotal())
                .paidAmount(0.0)
                .balanceAmount(estimate.getGrandTotal())
                .status(InvoiceStatus.UNPAID)
                .build();

        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id).orElseThrow();
    }

    public Invoice updateInvoiceAfterPayment(Invoice invoice, Double paymentAmount) {
        invoice.setPaidAmount((invoice.getPaidAmount() != null ? invoice.getPaidAmount() : 0.0) + paymentAmount);
        invoice.setBalanceAmount(invoice.getFinalAmount() - invoice.getPaidAmount());

        if (invoice.getBalanceAmount() <= 0) {
            invoice.setStatus(InvoiceStatus.PAID);
        } else if (invoice.getPaidAmount() > 0) {
            invoice.setStatus(InvoiceStatus.PARTIALLY_PAID);
        }

        return invoiceRepository.save(invoice);
    }
}
