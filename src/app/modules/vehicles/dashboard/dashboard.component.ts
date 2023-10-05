import { Component, OnInit } from '@angular/core';
import { globals } from 'src/app/app.component';
import { Vehicles } from 'src/app/core/models/vehicles.model';
import { VehiclesService } from 'src/app/services/vehicles.service';

declare function filterTable() : void;
declare function filterTableStatus() : void;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  vehicleList: Array<Vehicles> = new Array;
  locationList: Set<String> = new Set;
  statusList: Set<String> = new Set;
  constructor(private vehiclesService: VehiclesService) {
    filterTable();
    filterTableStatus();
  }

  ngOnInit(): void {
    console.log(1);
      this.getVehicles();
  }
  

  


  getVehicles() {

    this.vehiclesService.getVehicles().subscribe((response) => {
      console.log(response)
      for (let element of response) {
        console.log(element)
        this.vehicleList.push(new Vehicles(element.vin, element.locCode, element.status));
        this.locationList.add(element.locCode);
        this.statusList.add(element.status);
      }
    });
    
  }

  
}
