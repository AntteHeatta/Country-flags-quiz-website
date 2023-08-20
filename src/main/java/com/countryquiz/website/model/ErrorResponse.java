package com.countryquiz.website.model;

import java.util.List;

/**
 * The ErrorResponse class represents an object for handling error responses.
 */
public class ErrorResponse {
    private String response;

    public ErrorResponse(String response) {
        this.response = response;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
