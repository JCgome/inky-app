import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { StoreComponent } from './store/store.component';
import { HistoryComponent } from './history/history.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { CategoryBooksComponent } from './categories/category-books/category-books.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    CategoriesComponent,
    StoreComponent,
    HistoryComponent,
    CategoryFormComponent,
    CategoryBooksComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    CategoriesComponent,
    StoreComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, NgChartsModule],
})
export class PagesModule {}
