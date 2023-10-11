import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AllVehicleTableComponent } from './all-vehicle-table/all-vehicle-table.component';
import { VehicleFiltersComponent } from 'src/app/core/components/vehicle-filters/vehicle-filters.component';



@NgModule({
  declarations: [DashboardComponent, AllVehicleTableComponent, VehicleFiltersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
})
export class VehiclesModule { }
