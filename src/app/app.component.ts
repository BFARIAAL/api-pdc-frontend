import { Component, OnInit } from '@angular/core';
import { Menu } from './core/models/menu.model';
import { User } from './core/models/user.model';
import { Vehicles } from './core/models/vehicles.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ds';
  public globals: GlobalVariables = globals;
}
type Nullable<T> = T | null;

export interface GlobalVariables {
  isLoading: boolean;
  baseUrl: String;
  isUserLoggedIn: boolean;
  failedLogin: boolean;
  user: Nullable<User>;
  language?: string;
  common: any;
  text: any;
  menus?: Array<Menu>,
  ongoingProcesses: Array<String>;
  resetData(): void;
  startLoading(process: String): void;
  stopLoading(process: String): void;
}
export let globals: GlobalVariables = {
  isLoading: false,
  baseUrl: "http://localhost:8080/ds",
  isUserLoggedIn: false,
  failedLogin: false,
  user: null,
  common: null,
  text: null,
  ongoingProcesses: new Array<String>(),
  resetData() {
    this.isUserLoggedIn = false;
    this.user = null;
    this.common = null;
    this.text = null;
  },
  startLoading(process: String): void {
    this.ongoingProcesses.push(process);
    console.log(process + " STARTED => Ongoing=(" + this.ongoingProcesses.length + ")::[" + this.ongoingProcesses + "]");
    this.isLoading = true;
  },
  stopLoading(process: String): void {
    if (this.ongoingProcesses.includes(process))
      this.ongoingProcesses.splice(this.ongoingProcesses.indexOf(process));
    console.log(process + " ENDED => Ongoing=(" + this.ongoingProcesses.length + ")::[" + this.ongoingProcesses + "]");
    if (this.ongoingProcesses.length == 0)
      this.isLoading = false;
  }
};
