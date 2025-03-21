// pages/product/products-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ROUTES } from '@app/shared/constants/route-constants';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: ROUTES.ADD_PRODUCTS,
    component: AddProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
