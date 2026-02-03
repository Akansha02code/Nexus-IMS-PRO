package com.ims.repository;

import com.ims.model.Client;
import com.ims.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByCreatedBy(User createdBy);
}
