package com.countryquiz.website.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import com.countryquiz.website.model.ErrorResponse;
import com.countryquiz.website.model.SuccessfulResponse;
import com.countryquiz.website.model.User;
import com.countryquiz.website.model.UserLoginDTO;
import com.countryquiz.website.util.JwtUtil;

/**
 * The LoginController class handles HTTP requests related to user login and
 * authentication.
 * It validates user credentials, generates JWT tokens upon successful login,
 * and returns appropriate responses.
 */
@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Handles the HTTP POST request for user login.
     *
     * @param user The UserLoginDTO object containing user login credentials.
     * @return ResponseEntity containing a SuccessfulResponse with a JWT token upon
     *         successful login,
     *         or an ErrorResponse with an error message in case of login failure.
     */
    @PostMapping
    public ResponseEntity<?> login(@RequestBody @Valid UserLoginDTO user) {
        try {
            User userEntity = convertToUser(user);

            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(userEntity.getUsername(),
                            userEntity.getPassword()));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);

            SuccessfulResponse loginResponse = new SuccessfulResponse(token);
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Invalid username or password.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    private User convertToUser(UserLoginDTO userLoginDTO) {
        User user = new User();
        user.setUsername(userLoginDTO.getUsername());
        user.setPassword(userLoginDTO.getPassword());
        return user;
    }
}