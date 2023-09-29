import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { globals } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private textSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private logInStateSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  text$ = this.textSubject.asObservable();
  logInState$ = this.logInStateSubject.asObservable();

  updateText() {
    this.textSubject.next(globals.text);
  }

  logInResponse(status: any) {
    this.logInStateSubject.next(status);
  }
}
