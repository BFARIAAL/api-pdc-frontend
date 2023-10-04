/**
 * This class is meant to represent what a vehicle is
 */
export class Vehicles {
    /**
     * The vehicle ID
     */
    vin: Number;

    /**
     * The vehicle current location
     */
    locCode?: String;

    /**
     * The vehicle current status
     */
    status?: String;



    constructor(vin: Number,
        locCode: String, status: String) {
        this.vin = vin;
        this.locCode = locCode;
        this.status = status;
    }
}
