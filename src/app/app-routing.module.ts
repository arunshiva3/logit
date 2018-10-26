import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'addUser', loadChildren: './addUser/addUser.module#AddUserPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'user', loadChildren: './user/user.module#UserPageModule' },
  { path: 'viewEntry/:key', loadChildren: './view-entry/view-entry.module#ViewEntryPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
