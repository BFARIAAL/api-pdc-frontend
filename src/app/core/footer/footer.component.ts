import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  footerMessage: any;

  /**
   * Keep the footer message in the correct language
   * @param stateService the service responsible for live updating the language
   */
  constructor(private stateService: StateService) {
    this.stateService.text$.subscribe((text: any) => {
      this.footerMessage = text.footer;
    });
  }

}
