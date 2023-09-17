package com.countryquiz.website.model;

import java.util.List;

/**
 * The SuccessfulResponse class represents an object for handling successful
 * responses.
 */
public class SuccessfulResponse {
    private String response;
    private List<UserTimeDTO> listResponse;

    public SuccessfulResponse(String response) {
        this.response = response;
    }

    public SuccessfulResponse(List<UserTimeDTO> listResponse) {
        this.listResponse = listResponse;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public List<UserTimeDTO> getListResponse() {
        return listResponse;
    }

    public void setListResponse(List<UserTimeDTO> listResponse) {
        this.listResponse = listResponse;
    }
}
