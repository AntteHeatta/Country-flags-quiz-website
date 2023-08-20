package com.countryquiz.website.model;

/**
 * The SuccessfulResponse class represents an object for handling successful
 * responses.
 */
public class SuccessfulResponse {
    private String response;

    public SuccessfulResponse(String response) {
        this.response = response;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
