import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '@app/shared/constants/route-constants';
import { ClientsComponent } from './clients.component';
import { AddClientsComponent } from './add-clients/add-clients.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
  },

  {
    path: ROUTES.ADD_CLIENTS,
    component: AddClientsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
