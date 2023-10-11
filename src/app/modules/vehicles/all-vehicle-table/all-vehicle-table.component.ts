import { Component, OnInit } from '@angular/core';
import { Vehicles } from 'src/app/core/models/vehicles.model';
import { VehiclesService } from 'src/app/services/vehicles.service';

// declare function filterTable() : void;
// declare function filterTableStatus() : void;

@Component({
  selector: 'app-all-vehicle-table',
  templateUrl: './all-vehicle-table.component.html',
  styleUrls: ['./all-vehicle-table.component.css']
})
export class AllVehicleTableComponent implements OnInit {
  vehicleList: Array<Vehicles> = new Array;

  constructor(private vehiclesService: VehiclesService) {  

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
      }
    
    });
    
  }

}
