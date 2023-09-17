package com.countryquiz.website.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.countryquiz.website.model.UserTime;

/**
 * The TimeRepository interface provides database access methods for UserTime
 * entities.
 * It extends JpaRepository to inherit common CRUD operations for UserTime
 * entities.
 */
@Repository
public interface TimeRepository extends JpaRepository<UserTime, Long> {

}
