import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MaterialModule } from '@app/shared/models/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddProductsComponent } from './add-products/add-products.component';

@NgModule({
  declarations: [ProductsComponent, AddProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    TranslateModule,
  ],
})
export class ProductsModule {}
