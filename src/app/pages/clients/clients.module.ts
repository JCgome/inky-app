import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/shared/models/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClientsRoutingModule } from './clients-routing.module';
import { AddClientsComponent } from './add-clients/add-clients.component';

@NgModule({
  declarations: [ClientsComponent, AddClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [],
  providers: [],
})
export class ClientsModule {}
