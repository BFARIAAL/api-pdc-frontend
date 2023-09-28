package com.jlr.ttl.d42.pdp.api.Entities;

public class Location {
    private String locCode;

    public Location(String locCode) {
        this.locCode = locCode;
    }

    public Location() {
    }

    public String getLocCode() {
        return locCode;
    }

    public void setLocCode(String locCode) {
        this.locCode = locCode;
    }
}
