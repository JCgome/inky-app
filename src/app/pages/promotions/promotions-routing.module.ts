import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionsComponent } from './promotions.component';
import { ROUTES } from '@app/shared/constants/route-constants';
import { AddPromotionsComponent } from './add-promotions/add-promotions.component';

const routes: Routes = [
  {
    path: '',
    component: PromotionsComponent,
  },
  {
    path: ROUTES.add_promotions,
    component: AddPromotionsComponent,
  },

  /*   {
    path: `${ROUTES.add_promotions}/:id`,
    component: AddPromotionsComponent,
  }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionsRoutingModule {}
