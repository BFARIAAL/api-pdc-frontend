/**
 * This class is meant to represent what a menu is
 */
export class Menu {
    /**
     * The menu code
     */
    code?: String;
    /**
     * The text of the meny
     */
    text?: String;
    /**
     * The link for the menu
     */
    link?: String;
    /**
     * The icon of the menu
     */
    logo?: String;

    constructor(
        code: String,
        text: String,
        link: String,
        logo: String) {
        this.code = code;
        this.text = text;
        this.link = link;
        this.logo = logo;
    }
}