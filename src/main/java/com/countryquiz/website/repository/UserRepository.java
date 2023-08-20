package com.countryquiz.website.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.countryquiz.website.model.User;

/**
 * The UserRepository interface extends JpaRepository for performing CRUD
 * operations on User entities.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Retrieves a user entity by their username.
     *
     * @param username The username of the user to retrieve.
     * @return The User entity associated with the given username, or null if not
     *         found.
     */
    public User findByUsername(String username);

}