package com.countryquiz.website.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * The GlobalExceptionHandler class is responsible for handling global
 * exceptions
 * and providing consistent error responses for MethodArgumentNotValidException.
 * It is annotated with @RestControllerAdvice to indicate that it handles
 * exceptions
 * across all REST controllers in the application.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles MethodArgumentNotValidException and returns a ResponseEntity with a
     * map of field errors and their error messages.
     *
     * @param exception The MethodArgumentNotValidException to handle.
     * @return A ResponseEntity containing a map of field errors and a BAD_REQUEST
     *         status.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}
