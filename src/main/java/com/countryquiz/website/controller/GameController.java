package com.countryquiz.website.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.countryquiz.website.model.UserTime;
import com.countryquiz.website.model.UserTimeDTO;
import com.countryquiz.website.service.GameService;

/**
 * The GameController class handles HTTP requests related to saving user time
 * data.
 * It is responsible for processing and validating user input and interacting
 * with the GameService.
 */
@RestController
@RequestMapping("/api/saveTimeTaken")
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    @Autowired
    private GameService gameService;

    /**
     * Handles POST requests to save user time data.
     *
     * @param userTimeDTO The user time data to be saved.
     * @return A ResponseEntity with a success message if the save operation is
     *         successful,
     *         or an error response if there is an issue.
     */
    @PostMapping
    public ResponseEntity<String> saveTime(@RequestBody UserTimeDTO userTimeDTO) {
        try {
            UserTime userTime = convertToUserTime(userTimeDTO);
            gameService.saveTime(userTime);
            return ResponseEntity.ok("Time saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving time");
        }
    }

    private UserTime convertToUserTime(UserTimeDTO userTimeDTO) {
        UserTime userTime = new UserTime();
        userTime.setUsername(userTimeDTO.getUsername());
        userTime.setTimeTaken(userTimeDTO.getTimeTaken());
        return userTime;
    }
}
