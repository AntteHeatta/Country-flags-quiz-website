package com.countryquiz.website.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * The UserRegistrationDTO class represents a Data Transfer Object (DTO) for
 * user registration information.
 * It encapsulates the user's username, email, password, and role.
 */
public class UserRegistrationDTO {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    private String role;

    /**
     * Default constructor for the UserRegistrationDTO class.
     * Initializes an empty UserRegistrationDTO object.
     */
    public UserRegistrationDTO() {

    }

    /**
     * Parameterized constructor for the UserRegistrationDTO class.
     *
     * @param username The user's username.
     * @param email    The user's email address.
     * @param password The user's password.
     * @param role     The user's role.
     */
    public UserRegistrationDTO(String username, String email, String password, String role) {
        super();
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
