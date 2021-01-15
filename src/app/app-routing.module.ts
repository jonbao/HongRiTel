import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerOperateComponent } from './customer/customer-operate/customer-operate.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductOperateComponent } from './product/product-operate/product-operate.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryOperateComponent } from './category/category-operate/category-operate.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { ExchangeRateListComponent } from './exchangerate/exchangerate-list/exchangerate-list.component';
import { ExchangeRateOperateComponent } from './exchangerate/exchangerate-operate/exchangerate-operate.component';
import { ExchangeRateDetailComponent } from './exchangerate/exchangerate-detail/exchangerate-detail.component';
import { SystemDictionaryListComponent } from './systemdictionary/systemdictionary-list/systemdictionary-list.component';
import { SystemDictionaryOperateComponent } from './systemdictionary/systemdictionary-operate/systemdictionary-operate.component';
import { SystemDictionaryDetailComponent } from './systemdictionary/systemdictionary-detail/systemdictionary-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {	path: "CustomerList", component: CustomerListComponent	},//data: {keep: true},
  {	path: "Customer/CustomerOpe/:id",	component: CustomerOperateComponent	},
  {	path: "Customer/CustomerDetail/:id",	component: CustomerDetailComponent	},
  {	path: "ProductList", component: ProductListComponent	},//data: {keep: true},
  {	path: "Product/ProductOpe/:id",	component: ProductOperateComponent	},
  {	path: "Product/ProductDetail/:id",	component: ProductDetailComponent	},  
  {	path: "CategoryList", component: CategoryListComponent	},//data: {keep: true},
  {	path: "Category/CategoryOpe/:id",	component: CategoryOperateComponent	},
  {	path: "Category/CategoryDetail/:id",	component: CategoryDetailComponent	},  
  {	path: "ExchangeRateList", component: ExchangeRateListComponent	},//data: {keep: true},
  {	path: "ExchangeRate/ExchangeRateOpe/:id",	component: ExchangeRateOperateComponent	},
  {	path: "ExchangeRate/ExchangeRateDetail/:id",	component: ExchangeRateDetailComponent	},  
  {	path: "SystemDictionaryList", component: SystemDictionaryListComponent	},//data: {keep: true},
  {	path: "SystemDictionary/SystemDictionaryOpe/:id",	component: SystemDictionaryOperateComponent	},
  {	path: "SystemDictionary/SystemDictionaryDetail/:id",	component: SystemDictionaryDetailComponent	}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
