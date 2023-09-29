import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { globals } from '../app.component';
import { LoginComponent } from '../core/login/login.component';
import { Menu } from '../core/models/menu.model';
import { User } from '../core/models/user.model';
import { AppService } from './app.service';
import { LanguageService } from './language.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  controllerUrl: string = "/v1/users";

  constructor(private http: HttpClient,
    private languageService: LanguageService,
    private stateService: StateService,
    private appService: AppService) { }

  /**
   * This method will make and HTTP Request to attempt to log in the user
   * @param userID The ID of the user
   * @param pass The password
   */
  logInUser(userID: string, pass: string) {
    globals.startLoading("logInUser");
    const params = { id: userID, password: pass }
    this.http.put<any>(globals.baseUrl + this.controllerUrl + "/login", params).subscribe(
      (response) => {
        this.appService.getCommon();
        let dbData = response.results;
        //Create a user object instance
        globals.user = new User(dbData.id, dbData.description, dbData.scanAdminFlag, dbData.scanUserFlag, dbData.privilege, dbData.defaultLocation, dbData.defaultBrand,
          dbData.defaultCarrier, dbData.userGroup, dbData.defaultLanguage);
        globals.language = globals.user.defaultLanguage;
        this.languageService.getLanguageText().subscribe((response) => {
          globals.text = response;
          globals.menus = this.mapMenus();
          this.stateService.updateText();
          globals.isUserLoggedIn = true;
          this.stateService.logInResponse(true);
          globals.stopLoading("logInUser");
        });
      },
      (error) => {
        this.stateService.logInResponse(false);
        globals.stopLoading("logInUser");
      }
    );
  }

  /**
   * Prepares an array of Menus with the correct text associated with the currently selected language
   * @param menusToLoop the menus that we wish to loop through. Can be null
   * @param textToLoop the text variable that we will loop through. Can be null
   * @returns An Array of type Array<Menu> with the menu information including text
   */
  mapMenus(menusToLoop?: any, textToLoop?: any): Array<Menu> {
    //If null default to main menu bar
    if (menusToLoop == null)
      menusToLoop = globals.common.menus;
    if (textToLoop == null)
      textToLoop = globals.text.menus;

    let menus: Array<Menu> = [];
    globals.startLoading("loadingMenus");
    for (let menu of menusToLoop) {
      let text;
      for (let element of textToLoop) {
        if (element.code == menu.code) {
          text = element.name;
          break;
        }
      }
      menus.push(new Menu(menu.code, text, menu.link, menu.icon));
    }
    globals.stopLoading("loadingMenus");
    return menus;
  }


}
