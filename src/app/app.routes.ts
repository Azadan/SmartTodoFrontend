import { Routes } from '@angular/router';
import {Register} from './Component/register/register';
import {Login} from './Component/login/login';
import {UserDashboard} from './Component/user-dashboard/user-dashboard';
import {AdminDashboard} from './Component/admin-dashboard/admin-dashboard';
import {Upgrade} from './Component/Billing/upgrade/upgrade';
import {BillingSuccess} from './Component/Billing/billing.success/billing.success';
import {BillingCancel} from './Component/Billing/billing-cancel/billing-cancel';
import {adminGuard, userGuard} from './Guards/role.guard';

export const routes: Routes = [
  //Nedan blir våran start url
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'register', component: Register},
  {path: 'login', component: Login},
  { path: 'userDashboard', component: UserDashboard, canActivate: [userGuard] },
  { path: 'adminDashboard', component: AdminDashboard, canActivate: [adminGuard] },
  { path: 'billing/upgrade', component: Upgrade },
  { path: 'payment-success', component: BillingSuccess },
  { path: 'payment-canceled', component: BillingCancel },

];
