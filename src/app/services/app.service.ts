import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { globals } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  /**
   * This method is responsible for retrieving the common atributes of the application
   */
  getCommon() {
    globals.startLoading("getCommons");
    this.http
      .get<any>('/assets/app-properties-common.json').subscribe((response) => {
        globals.common = response;
        globals.stopLoading("getCommons");
      }
      )
  }
}