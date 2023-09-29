import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AdminMenuBarComponent } from './core/admin-menu-bar/admin-menu-bar.component';
import { AdminAreaComponent } from './admin-area.component';

@NgModule({
  declarations: [DashboardComponent, AdminMenuBarComponent, AdminAreaComponent],
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
// const routes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: '',
//         loadChildren: () =>
//           import('./modules/home/home.module').then((m) => m.HomeModule)
//       },
//       {
//         path: 'plant',
//         loadChildren: () =>
//           import('./modules/plants/plants.module').then((m) => m.PlantsModule)
//       },
//       {
//         path: 'admin',
//         loadChildren: () =>
//           import('./modules/admin-area/admin-area.module').then((m) => m.AdminModule)
//       },
//     ],
//   },
// ];
export class AdminModule { }
