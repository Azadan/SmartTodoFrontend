import { Routes } from '@angular/router';
import {Register} from './Component/register/register';
import {Login} from './Component/login/login';
import {UserDashboard} from './Component/user-dashboard/user-dashboard';
import {AdminDashboard} from './Component/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  //Nedan blir våran start url
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'register', component: Register},
  {path: 'login', component: Login},
  {path: 'userDashboard', component: UserDashboard},
  {path: 'adminDashboard', component: AdminDashboard},

];
