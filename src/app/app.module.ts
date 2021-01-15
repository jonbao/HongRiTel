import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CustomerOperateComponent } from './customer/customer-operate/customer-operate.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CustomerService } from "./customer/customer.service";
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingCache } from './app-routing.cache';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductOperateComponent } from './product/product-operate/product-operate.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductService } from "./product/product.service";
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryOperateComponent } from './category/category-operate/category-operate.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryService } from "./category/category.service";
import { ExchangeRateListComponent } from './exchangerate/exchangerate-list/exchangerate-list.component';
import { ExchangeRateOperateComponent } from './exchangerate/exchangerate-operate/exchangerate-operate.component';
import { ExchangeRateDetailComponent } from './exchangerate/exchangerate-detail/exchangerate-detail.component';
import { ExchangeRateService } from "./exchangerate/exchangerate.service";
import { SystemDictionaryListComponent } from './systemdictionary/systemdictionary-list/systemdictionary-list.component';
import { SystemDictionaryOperateComponent } from './systemdictionary/systemdictionary-operate/systemdictionary-operate.component';
import { SystemDictionaryDetailComponent } from './systemdictionary/systemdictionary-detail/systemdictionary-detail.component';
import { SystemDictionaryService } from "./systemdictionary/systemdictionary.service";

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerOperateComponent,
    CustomerDetailComponent,
    ProductListComponent,
    ProductOperateComponent,
    ProductDetailComponent,
    CategoryListComponent,
    CategoryOperateComponent,
    CategoryDetailComponent,
    ExchangeRateListComponent,
    ExchangeRateOperateComponent,
    ExchangeRateDetailComponent,
    SystemDictionaryListComponent,
    SystemDictionaryOperateComponent,
    SystemDictionaryDetailComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzTableModule,
    NzMenuModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzCheckboxModule,
    NzDescriptionsModule,
    NzBadgeModule,
    NzPopconfirmModule,
    NzMessageModule,
  ],
  providers: [
    CustomerService,
    ProductService,
    CategoryService,
    ExchangeRateService,
    SystemDictionaryService,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: RouteReuseStrategy, useClass: AppRoutingCache }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
