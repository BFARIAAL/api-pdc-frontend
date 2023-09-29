/**
 * This class is meant to represent what a user is
 */
export class User {
    /**
     * The user ID
     */
    id?: String;
    /**
     * The description of the user
     */
    description?: String;
    /**
     * A flag to indicate if it's a scan admin
     */
    scan_admin?: String;
    /**
     * A flag to indicate if it's a scan user
     */
    scan_user?: String;
    /**
     * The role code
     */
    privilege?: Number;
    /**
     * The user's location code
     */
    defaultLocation?: String;
    /**
     * The user's default brand code
     */
    defaultBrand?: String;
    /**
     * The user's default carrier code
     */
    defaultCarrier?: Number;
    /**
     * The group to which the user belongs
     */
    userGroup?: Number;
    /**
     * The user's default Language
     */
    defaultLanguage: string;

    constructor(id: String,
        description: String,
        scan_admin: String,
        scan_user: String,
        privilege: Number,
        defaultLocation: String,
        defaultBrand: String,
        defaultCarrier: Number,
        userGroup: Number,
        defaultLanguage: string) {
        this.id = id;
        this.description = description;
        this.scan_admin = scan_admin;
        this.scan_user = scan_user;
        this.privilege = 1; // Set to 1 for testing
        this.defaultLocation = defaultLocation;
        this.defaultBrand = defaultBrand;
        this.defaultCarrier = defaultCarrier;
        this.userGroup = userGroup;
        this.defaultLanguage = defaultLanguage;
    }
}