package com.countryquiz.website.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.countryquiz.website.model.User;
import com.countryquiz.website.repository.UserRepository;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * The UserService class provides user-related services, including user
 * registration,
 * authentication, and user details retrieval for the application.
 */
@Service
public class UserService implements UserDetailsService {

    private BCryptPasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    /**
     * Constructs a UserService with the necessary dependencies.
     *
     * @param userRepository  The UserRepository for accessing user data.
     * @param passwordEncoder The BCryptPasswordEncoder for hashing user passwords.
     */
    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        super();
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Retrieves a user entity by their username.
     *
     * @param username The username of the user to retrieve.
     * @return The User entity associated with the given username, or null if not
     *         found.
     */
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Registers a new user by encoding their password and saving their information.
     *
     * @param user The User entity to be registered.
     * @return The registered User entity.
     * @throws DataIntegrityViolationException if the username or email already
     *                                         exists.
     */
    public User registerUser(User user) {
        try {
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            return userRepository.save(user);
        } catch (Exception e) {
            throw new DataIntegrityViolationException("Username or email already exists!");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities);

    }
}
