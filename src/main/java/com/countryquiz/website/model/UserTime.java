package com.countryquiz.website.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The UserTime class represents a persistent entity for storing time records.
 * It is annotated with JPA annotations for mapping to a database table.
 */
@Entity
@Table(name = "time_records")
public class UserTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private double timeTaken;

    /**
     * Default constructor for the UserTime class.
     * Initializes an empty UserTime object.
     */
    public UserTime() {
    }

    /**
     * Creates a new UserTime object with the specified id, username, and timeTaken.
     *
     * @param id        The unique identifier of the time record.
     * @param username  The username associated with the time record.
     * @param timeTaken The time taken by the user to guess all the flags.
     */
    public UserTime(Long id, String username, double timeTaken) {
        this.id = id;
        this.username = username;
        this.timeTaken = timeTaken;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
