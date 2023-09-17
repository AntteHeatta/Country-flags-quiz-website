package com.countryquiz.website.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.countryquiz.website.model.UserTime;
import com.countryquiz.website.repository.TimeRepository;

/**
 * The GameService class provides services related to game data.
 */
@Service
public class GameService {

    @Autowired
    private TimeRepository timeRepository; // Inject your repository

    /**
     * Saves the user's game time.
     *
     * @param userTime The UserTime object representing the user's game time.
     */
    public void saveTime(UserTime userTime) {
        timeRepository.save(userTime);
    }
}
