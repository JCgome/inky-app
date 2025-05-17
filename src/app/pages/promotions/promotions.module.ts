import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsComponent } from './promotions.component';
import { MaterialModule } from '@app/shared/models/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { AddPromotionsComponent } from './add-promotions/add-promotions.component';

@NgModule({
  declarations: [PromotionsComponent, AddPromotionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    PromotionsRoutingModule,
  ],
})
export class PromotionsModule {}
