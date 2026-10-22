import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ROUTES } from '@app/shared/constants/route-constants';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthorsComponent } from './authors/authors.component';
import { StoreComponent } from './store/store.component';
import { HistoryComponent } from './history/history.component';

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
        path: ROUTES.authors,
        component: AuthorsComponent,
        data: { title: 'sidebar.authors', icon: 'edit_note' },
      },
      {
        path: ROUTES.store,
        component: StoreComponent,
        data: { title: 'sidebar.store', icon: 'inventory' },
      },
      {
        path: ROUTES.history,
        component: HistoryComponent,
        data: { title: 'sidebar.history', icon: 'receipt_long' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
