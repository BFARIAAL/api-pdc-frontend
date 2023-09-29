import { Component, OnInit } from '@angular/core';
import { globals } from 'src/app/app.component';
import { LanguageService } from 'src/app/services/language.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //UI TEXT
  roleTxt: any;
  locationTxt: any;
  logout: any;

  /**
   * A string with the user ID
   */
  userID: any;

  /**
   * A String with the description of the user role
   */
  role: any;

  /**
   * A String with the description of the user location
   */
  location: any;


  constructor(
    private stateService: StateService,
  ) {
    //Ensure the user is always seing the most up to date UI Text
    this.stateService.text$.subscribe((text: any) => {
      this.roleTxt = text.header.text1;
      this.locationTxt = text.header.text2;
      this.logout = text.header.button;
      for (let element of text.locations) {
        if (element.id == globals.user?.defaultLocation) {
          this.location = element.name;
          break;
        }
      }
      for (let element of text.roles) {
        if (element.id == globals.user?.privilege) {
          this.role = element.description;
          break;
        }
      }
    });
  }

  /**
   * This is needed as otherwise we will not get the user information in the dropdown
   */
  ngOnInit(): void {
    this.userID = globals.user?.description;
  }

  /**
   * This method gives functionality to the log out button
   */
  logoutUser(): void {
    globals.startLoading("logoutUser");
    globals.resetData();
    globals.stopLoading("logoutUser");
  }
}
