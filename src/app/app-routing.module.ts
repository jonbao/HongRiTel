import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerOperateComponent } from './customer/customer-operate/customer-operate.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {	path: "CustomerList", component: CustomerListComponent	},//data: {keep: true},
  {	path: "Customer/CustomerOpe/:id",	component: CustomerOperateComponent	},
  {	path: "Customer/CustomerDetail/:id",	component: CustomerDetailComponent	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
