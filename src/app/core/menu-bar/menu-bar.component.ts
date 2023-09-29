import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { globals } from 'src/app/app.component';
import { LanguageService } from 'src/app/services/language.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import { Menu } from '../models/menu.model';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent implements OnInit {
  /**
   * A list with all the menus that we need to add to the menu bar
   */
  menus?: Array<Menu> = [];

  /**
   * A list with the languages that will be added to the dropdown
   */
  languages: any;
  /** 
   * This is used to write the correct language on the dropdown
   */
  currentLanguage: any;

  constructor(
    private languageService: LanguageService,
    private stateService: StateService,
    private userService: UserService
  ) {
    this.menus = globals.menus;
    this.stateService.text$.subscribe((text: any) => {
      this.languages = text.languages;
      //Set the current language code
      this.currentLanguage = globals.common.languages.filter(function (language: {
        code: string;
      }) {
        return language.code == globals.language;
      });
    });
  }

  /**
   * When the user logs in this component gets initialised. We will thus change the language to the user default language
   */
  ngOnInit() {
    this.languages = globals.common.languages;
  }

  /**
   * This method is responsible for changing the language
   * @param newLanguage The code of the new language we're changing to
   */
  changeLanguage(newLanguage?: string) {
    if (globals.ongoingProcesses.includes("changeLanguage"))
      return
    globals.startLoading("changeLanguage");
    //Change the global code
    if (newLanguage != null)
      globals.language = newLanguage;
    this.languageService
      .getLanguageText()
      .subscribe((response: Observable<any>) => {
        //Set the global code
        globals.text = response;
        //Update text everywhere
        this.stateService.updateText();
        //Update Menus
        globals.menus = this.userService.mapMenus();
        this.menus = globals.menus;
        globals.stopLoading("changeLanguage");
      });
  }
}
