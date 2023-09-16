package com.countryquiz.website.model;

/**
 * The UserTimeDTO class represents a Data Transfer Object (DTO) for
 * time-related data.
 * It includes the username and the time taken by a user to guess all the flags.
 */
public class UserTimeDTO {
    private String username;
    private double timeTaken;

    /**
     * Default constructor for the UserTimeDTO class.
     * Initializes an empty UserTimeDTO object.
     */
    public UserTimeDTO() {
    }

    /**
     * Creates a new UserTimeDTO object with the specified username and timeTaken.
     *
     * @param username  The username associated with the time record.
     * @param timeTaken The time taken by the user to guess all the flags.
     */
    public UserTimeDTO(String username, double timeTaken) {
        super();
        this.username = username;
        this.timeTaken = timeTaken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(double timeTaken) {
        this.timeTaken = timeTaken;
    }
}
