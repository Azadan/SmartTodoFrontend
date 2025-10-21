import { Routes } from '@angular/router';
import {Register} from './Component/register/register';
import {Login} from './Component/login/login';

export const routes: Routes = [
  //Nedan blir våran start url
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'register', component: Register},
  {path: 'login', component: Login},

];
