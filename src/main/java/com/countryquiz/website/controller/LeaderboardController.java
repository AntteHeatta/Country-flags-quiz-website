package com.countryquiz.website.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.countryquiz.website.model.UserTimeDTO;
import com.countryquiz.website.service.GameService;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaderboardController {

    @Autowired
    private GameService gameService;

    @GetMapping("/globalTop3Times")
    public ResponseEntity<?> getGlobalTop3Times() {
        try {
            List<UserTimeDTO> globalTimes = gameService.getGlobalTopTimes();

            int maxRecords = Math.min(3, globalTimes.size());
            List<UserTimeDTO> top3Times = globalTimes.subList(0, maxRecords);

            System.out.println("global times: " + top3Times);
            return ResponseEntity.ok(top3Times);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching global times");
        }
    }
}
