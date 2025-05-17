import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ROUTES } from '@app/shared/constants/route-constants';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  {
    path: ROUTES.dashboard,
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'sidebar.dashboard', icon: 'dashboard' },
      },
      {
        path: ROUTES.products,
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
        data: { title: 'sidebar.products', icon: 'menu_book' },
      },
      {
        path: ROUTES.categories,
        component: CategoriesComponent,
        data: { title: 'sidebar.categories', icon: 'category' },
      },
      {
        path: ROUTES.clients,
        loadChildren: () =>
          import('./clients/clients.module').then((m) => m.ClientsModule),
        data: { title: 'sidebar.clients', icon: 'people' },
      },
      {
        path: ROUTES.promotions,
        loadChildren: () =>
          import('./promotions/promotions.module').then(
            (m) => m.PromotionsModule
          ),
        data: { title: 'sidebar.promotions', icon: 'price_change' },
      },
      {
        path: ROUTES.store,
        component: StoreComponent,
        data: { title: 'sidebar.store', icon: 'inventory' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
