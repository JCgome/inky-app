import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ClientsComponent,
    CategoriesComponent,
    ProductsComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ClientsComponent,
    CategoriesComponent,
    ProductsComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PagesModule {}
