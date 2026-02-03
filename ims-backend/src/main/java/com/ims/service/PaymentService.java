package com.ims.service;

import com.ims.model.Invoice;
import com.ims.model.Payment;
import com.ims.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private InvoiceService invoiceService;

    @Transactional
    public Payment recordPayment(Payment payment) {
        Invoice invoice = invoiceService.getInvoiceById(payment.getInvoice().getId());
        payment.setInvoice(invoice);

        Payment savedPayment = paymentRepository.save(payment);

        // Update invoice status
        invoiceService.updateInvoiceAfterPayment(invoice, payment.getAmount());

        return savedPayment;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
