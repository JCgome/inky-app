import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerCircleComponent } from './components/spinner-circle/spinner-circle.component';
import { SpinnerCubeComponent } from './components/spinner-cube/spinner-cube.component';
import { MaterialModule } from './models/material.module';
import { HeadComponent } from './components/head/head.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';
import { RegisterStockComponent } from './components/register-stock/register-stock.component';
import { NotificationToastComponent } from './components/notification-toast/notification-toast.component';

@NgModule({
  declarations: [
    SpinnerCircleComponent,
    SpinnerCubeComponent,
    HeadComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    DialogDeleteComponent,
    DetailsModalComponent,
    RegisterStockComponent,
    NotificationToastComponent,
  ],
  exports: [
    TranslateModule,
    SpinnerCircleComponent,
    SpinnerCubeComponent,
    HeadComponent,
    SidebarComponent,
    MaterialModule,
    BreadcrumbsComponent,
    DialogDeleteComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MaterialModule,
    BreadcrumbModule,
  ],
})
export class SharedModule {}
