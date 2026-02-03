package com.ims.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "estimate_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstimateItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Integer quantity;
    private Double unitPrice;
    private Double amount;
}
