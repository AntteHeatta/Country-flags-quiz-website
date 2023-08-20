package com.countryquiz.website.model;

/**
 * The UserLoginDTO class represents a Data Transfer Object (DTO) for user login
 * information.
 * It encapsulates the user's username and password.
 */
public class UserLoginDTO {

    private String username;
    private String password;

    /**
     * Default constructor for the UserLoginDTO class.
     * Initializes an empty UserLoginDTO object.
     */
    public UserLoginDTO() {

    }

    /**
     * Parameterized constructor for the UserLoginDTO class.
     *
     * @param username The user's username.
     * @param password The user's password.
     */
    public UserLoginDTO(String username, String password) {
        super();
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
