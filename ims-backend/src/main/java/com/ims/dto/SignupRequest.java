package com.ims.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String name;
    private String email;
    private String password;
    private String role; // ADMIN or SALES
}
