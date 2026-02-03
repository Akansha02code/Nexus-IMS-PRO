package com.ims.controller;

import com.ims.enums.PaymentStatus;
import com.ims.model.Invoice;
import com.ims.model.Payment;
import com.ims.repository.PaymentRepository;
import com.ims.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")

public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<Payment> recordPayment(@RequestBody Payment payment) {
        Invoice invoice = invoiceService.getInvoiceById(payment.getInvoice().getId());
        payment.setInvoice(invoice);

        // Default new payments to PENDING if not specified
        if (payment.getStatus() == null) {
            payment.setStatus(PaymentStatus.PENDING);
        }

        Payment savedPayment = paymentRepository.save(payment);

        // Auto-update invoice ONLY if status is COMPLETED immediately (e.g. recorded by
        // Admin)
        if (savedPayment.getStatus() == PaymentStatus.COMPLETED) {
            invoiceService.updateInvoiceAfterPayment(invoice, savedPayment.getAmount());
        }

        return ResponseEntity.ok(savedPayment);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SALES')")
    public ResponseEntity<?> getAllPayments() {
        return ResponseEntity.ok(paymentRepository.findAll());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Payment> verifyPayment(@PathVariable Long id, @RequestParam PaymentStatus status) {
        Payment payment = paymentRepository.findById(id).orElseThrow();

        // If transitioning to COMPLETED, update the invoice balance
        if (payment.getStatus() != PaymentStatus.COMPLETED && status == PaymentStatus.COMPLETED) {
            invoiceService.updateInvoiceAfterPayment(payment.getInvoice(), payment.getAmount());
        }

        payment.setStatus(status);
        return ResponseEntity.ok(paymentRepository.save(payment));
    }
}
