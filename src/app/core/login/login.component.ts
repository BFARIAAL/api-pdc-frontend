import { Component, HostListener, OnInit } from '@angular/core';
import { globals } from 'src/app/app.component';
import { LanguageService } from 'src/app/services/language.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /**
   * This variable is to indicate wether or not the error message should display
   */
  error: boolean = false;

  idForm: HTMLInputElement;
  passForm: HTMLInputElement;

  constructor(
    private stateService: StateService,
    private userService: UserService,
    private languageService: LanguageService
  ) {
    this.idForm = document.getElementById('ccsid') as HTMLInputElement;
    this.passForm = document.getElementById('password') as HTMLInputElement;
    this.stateService.logInState$.subscribe((status: any) => {
      if (status || status == null) {
        this.error = false;
      } else {
        this.formError(this.idForm, this.passForm);
      }
    });
  }

  /**
   * This method will validate the user's introduced credentials to verify if they are correct. If so, then it will log in the user
   */
  logInUser(): void {
    this.idForm = document.getElementById('ccsid') as HTMLInputElement;
    this.passForm = document.getElementById('password') as HTMLInputElement;
    //Get data from the form
    let ccsid = this.idForm.value;
    let pass = this.passForm.value;

    //Validate Input
    if (!this.validateInput(ccsid, pass)) {
      this.formError(this.idForm, this.passForm);
      return;
    }

    //Send credentials to DB
    this.userService.logInUser(ccsid, pass);
  }

  /**
   * When the user submits an incorrect log in form, this method displays the error message and resets the form
   * @param idForm the HTML Element responsible for the user ID
   * @param passForm the HTML Element responsible for the password
   */
  formError(idForm: HTMLInputElement, passForm: HTMLInputElement): void {
    this.error = true;
    idForm.value = "";
    passForm.value = "";
  }

  /**
   * This method is responsible for verifying that the log in details the user introduced are not null
   * @param id the ID introduced
   * @param ps the password introduced
   * @returns a boolean: True is none of the attributes is null, false if else
   */
  validateInput(id: string, ps: string): boolean {
    return !(id == null || id == '') && !(ps == null || ps == '');
  }

  /**
   * This method will allow us to log in by pressing the ENTER key
   * @param event The KeyboardEvent that we will analyse. It's this that allows us to detect if the key pressed was ENTER
   */
  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    if (event.key == "Enter") {
      this.logInUser();
    }
  }
}
