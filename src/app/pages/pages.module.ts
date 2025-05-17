import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { StoreComponent } from './store/store.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    CategoriesComponent,
    StoreComponent,
    HistoryComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    CategoriesComponent,
    StoreComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PagesModule {}
