import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/shared/models/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClientsRoutingModule } from './clients-routing.module';

@NgModule({
  declarations: [ClientsComponent],
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
