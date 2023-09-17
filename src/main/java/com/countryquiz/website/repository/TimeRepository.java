package com.countryquiz.website.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.countryquiz.website.model.UserTime;
import com.countryquiz.website.model.UserTimeDTO;

/**
 * The TimeRepository interface provides database access methods for UserTime
 * entities.
 * It extends JpaRepository to inherit common CRUD operations for UserTime
 * entities.
 */
@Repository
public interface TimeRepository extends JpaRepository<UserTime, Long> {

    /**
     * Retrieves a list of the global times.
     *
     * @return A list of strings representing the global times.
     */
    @Query("SELECT NEW com.countryquiz.website.model.UserTimeDTO(u.username,u.timeTaken) FROM UserTime u ORDER BY u.timeTaken ASC")
    public List<UserTimeDTO> getTopGlobalTimesInAscendingOrder();

}
