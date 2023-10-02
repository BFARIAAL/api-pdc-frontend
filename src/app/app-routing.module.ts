import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'plant',
        loadChildren: () =>
          import('./modules/plants/plants.module').then((m) => m.PlantsModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./modules/admin-area/admin-area.module').then((m) => m.AdminModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
