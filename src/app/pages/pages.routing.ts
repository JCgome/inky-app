import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ROUTES } from '@app/shared/constants/route-constants';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  {
    path: ROUTES.DASHBOARD,
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'SIDEBAR.DASHBOARD', icon: 'dashboard' },
      },
      {
        path: ROUTES.PRODUCTS,
        component: ProductsComponent,
        data: { title: 'SIDEBAR.PRODUCTS', icon: 'shopping_cart' },
      },
      {
        path: ROUTES.CATEGORIES,
        component: CategoriesComponent,
        data: { title: 'SIDEBAR.CATEGORIES', icon: 'category' },
      },
      {
        path: ROUTES.CLIENTS,
        component: ClientsComponent,
        data: { title: 'SIDEBAR.CLIENTS', icon: 'people' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
