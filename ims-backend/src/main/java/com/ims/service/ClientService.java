package com.ims.service;

import com.ims.model.Client;
import com.ims.model.User;
import com.ims.repository.ClientRepository;
import com.ims.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public List<Client> getClientsByUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return clientRepository.findByCreatedBy(user);
    }

    public Client createClient(Client client, String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        client.setCreatedBy(user);
        return clientRepository.save(client);
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElseThrow();
    }
}
