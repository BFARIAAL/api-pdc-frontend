import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  /**
   * A variable where we store all the UI text variables
   */
  text: any;

  /**
   * Keep the UI text up to date
   * @param stateService the service responsible for live updating the language
   */
  constructor(private stateService: StateService) {
    this.stateService.text$.subscribe((text: any) => {
      this.text = text.admin;
    });
  }
}
