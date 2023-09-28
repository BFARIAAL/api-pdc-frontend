package com.jlr.ttl.d42.pdp.api.Entities;

public class Vehicle {


    public Vehicle(String vin, String locCode) {
        this.vin = vin;
        this.locCode = locCode;
    }

    public Vehicle() {

    }

    private String vin;
    private String locCode;

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public String getLocCode() {
        return locCode;
    }

    public void setLocCode(String locCode) {
        this.locCode = locCode;
    }
}
