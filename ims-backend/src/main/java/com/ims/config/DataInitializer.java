package com.ims.config;

import com.ims.enums.Role;
import com.ims.model.User;
import com.ims.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create Admin User
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .name("IMS Admin")
                    .email("admin@ims.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("✓ Admin user created: admin / admin123");
        } else {
            System.out.println("✓ Admin user already exists");
        }

        // Create Sales User with username 'akansha'
        if (!userRepository.existsByUsername("akansha")) {
            User sales = User.builder()
                    .username("akansha")
                    .name("Akansha Sales")
                    .email("akansha-sales@ims.com")
                    .password(passwordEncoder.encode("12345678"))
                    .role(Role.SALES)
                    .build();
            userRepository.save(sales);
            System.out.println("✓ Sales user created: akansha / 12345678");
        } else {
            System.out.println("✓ Sales user already exists");
        }

        // Create second Sales User
        if (!userRepository.existsByUsername("sales-Akansha")) {
            User sales2 = User.builder()
                    .username("sales-Akansha")
                    .name("Akansha Sales Lead")
                    .email("sales-akansha@ims.com")
                    .password(passwordEncoder.encode("12345678"))
                    .role(Role.SALES)
                    .build();
            userRepository.save(sales2);
            System.out.println("✓ Sales Lead user created: sales-Akansha / 12345678");
        } else {
            System.out.println("✓ Sales Lead user already exists");
        }

        System.out.println("\n=== Available Credentials ===");
        System.out.println("Admin:      admin / admin123");
        System.out.println("Sales:      akansha / 12345678");
        System.out.println("Sales Lead: sales-Akansha / 12345678");
        System.out.println("==============================\n");
    }
}
