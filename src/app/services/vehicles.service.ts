import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globals } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Vehicles extends Array<Vehicles> {
  id: string;
  short_vin: string;
  loc_code: string;
  end_date: Date;
}


@Injectable({
  providedIn: 'root'
})

export class VehiclesService {

  controllerUrl: string = "/v1/vehicles";

  constructor(private http: HttpClient) { }


  getVehicles(): Observable<any> {
    return this.http.get<any>(globals.baseUrl + this.controllerUrl + '/all')
      .pipe(
        map((response) => {
          console.log(response.results);
          return response.results;
        })
      );
  }

}
