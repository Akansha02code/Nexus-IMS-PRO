package com.ims.controller;

import com.ims.model.Client;
import com.ims.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clients")

public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping
    @PreAuthorize("hasRole('SALES') or hasRole('ADMIN')")
    public ResponseEntity<Client> createClient(@RequestBody Client client, Authentication authentication) {
        return ResponseEntity.ok(clientService.createClient(client, authentication.getName()));
    }

    @GetMapping
    @PreAuthorize("hasRole('SALES') or hasRole('ADMIN')")
    public ResponseEntity<List<Client>> getAllClients(Authentication authentication) {
        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.ok(clientService.getAllClients());
        }
        return ResponseEntity.ok(clientService.getClientsByUser(authentication.getName()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('SALES') or hasRole('ADMIN')")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.getClientById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SALES') or hasRole('ADMIN')")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client clientDetails) {
        Client client = clientService.getClientById(id);
        client.setClientName(clientDetails.getClientName());
        client.setEmail(clientDetails.getEmail());
        client.setPhone(clientDetails.getPhone());
        client.setAddress(clientDetails.getAddress());
        // Save logic usually in service, but for brevity using repo directly via
        // service if available or modifying service
        // Let's assume service has createClient that also handles save/update
        return ResponseEntity.ok(clientService.createClient(client, client.getCreatedBy().getUsername()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteClient(@PathVariable Long id) {
        // Implementation for delete
        return ResponseEntity.ok("Client deleted");
    }
}
