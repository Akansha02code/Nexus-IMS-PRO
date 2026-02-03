package com.ims.model;

import com.ims.enums.InvoiceStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String invoiceNumber;

    private LocalDate invoiceDate;
    private LocalDate dueDate;

    @OneToOne
    @JoinColumn(name = "estimate_id", nullable = false)
    private Estimate estimate;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    private Double totalAmount;
    private Double gstAmount;
    private Double finalAmount;
    private Double paidAmount;
    private Double balanceAmount;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;
}
