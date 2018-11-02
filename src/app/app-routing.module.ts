import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'viewEntry/:key', loadChildren: './view-entry/view-entry.module#ViewEntryPageModule' },
  { path: 'view-users', loadChildren: './admin/view-users/view-users.module#ViewUsersPageModule' },
  { path: 'view-locations', loadChildren: './admin/view-locations/view-locations.module#ViewLocationsPageModule' },
  { path: 'view-transporters', loadChildren: './admin/view-transporters/view-transporters.module#ViewTransportersPageModule' },
  { path: 'view-vehicles', loadChildren: './admin/view-vehicles/view-vehicles.module#ViewVehiclesPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
