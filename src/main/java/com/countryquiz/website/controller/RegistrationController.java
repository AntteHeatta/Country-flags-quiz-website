package com.countryquiz.website.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.countryquiz.website.model.ErrorResponse;
import com.countryquiz.website.model.SuccessfulResponse;
import com.countryquiz.website.model.User;
import com.countryquiz.website.model.UserRegistrationDTO;
import com.countryquiz.website.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import com.countryquiz.website.util.JwtUtil;

/**
 * The RegistrationController class handles HTTP requests related to user
 * registration.
 * It processes user registration data, validates it, and returns appropriate
 * responses.
 */
@RestController
@RequestMapping("/api/registration")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {

    @Autowired
    private JwtUtil jwtUtil;

    private final UserService userService;

    @Autowired
    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Handles the HTTP POST request for user registration.
     *
     * @param user The UserRegistrationDTO object containing user registration data.
     * @return ResponseEntity containing a SuccessfulResponse indicating successful
     *         registration,
     *         or an ErrorResponse with an error message in case of registration
     *         failure.
     */
    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserRegistrationDTO user) {
        try {
            User userEntity = convertToUser(user);
            userEntity.setRole("user");
            userService.registerUser(userEntity);

            UserDetails userDetails = userService.loadUserByUsername(userEntity.getUsername());
            String token = jwtUtil.generateToken(userDetails);

            SuccessfulResponse response = new SuccessfulResponse(token);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (DataIntegrityViolationException e) {
            ErrorResponse errorResponse = new ErrorResponse("Username or email already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Registration failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    private User convertToUser(UserRegistrationDTO userRegistrationDTO) {
        User user = new User();
        user.setUsername(userRegistrationDTO.getUsername());
        user.setEmail(userRegistrationDTO.getEmail());
        user.setPassword(userRegistrationDTO.getPassword());
        return user;
    }
}
