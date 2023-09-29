import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { globals } from 'src/app/app.component';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private http: HttpClient) { }

  /**
   * This method is responsible for retrieving the translation
   * @returns A json object with all the necessary translation variables
   */
  getLanguageText(): Observable<any> {
    return this.http
      .get<any>('/assets/app-properties-' + globals.language + '.json')
      .pipe(
        map((response) => {
          return response.text;
        })
      );
  }
}
