import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { CategoriesComponent } from './categories/categories.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { StoreComponent } from './store/store.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { AddClientsComponent } from './clients/add-clients/add-clients.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    CategoriesComponent,
    StoreComponent,
    PromotionsComponent,
    AddClientsComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    CategoriesComponent,
    StoreComponent,
    PromotionsComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PagesModule {}
