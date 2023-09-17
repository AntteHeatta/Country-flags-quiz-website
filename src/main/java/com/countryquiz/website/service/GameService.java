package com.countryquiz.website.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.countryquiz.website.model.UserTime;
import com.countryquiz.website.model.UserTimeDTO;
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

    /**
     * Retrieves the global top game times.
     *
     * @return A list of {@code UserTimeDTO} objects representing the global game
     *         times.
     */
    public List<UserTimeDTO> getGlobalTopTimes() {
        return timeRepository.getTopGlobalTimesInAscendingOrder();
    }
}
