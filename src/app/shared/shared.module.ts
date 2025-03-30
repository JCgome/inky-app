import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerCircleComponent } from './components/spinner-circle/spinner-circle.component';
import { SpinnerCubeComponent } from './components/spinner-cube/spinner-cube.component';
import { MaterialModule } from './models/material.module';
import { HeadComponent } from './components/head/head.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { BrowserModule } from '@angular/platform-browser';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';

@NgModule({
  declarations: [
    SpinnerCircleComponent,
    SpinnerCubeComponent,
    HeadComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    DialogDeleteComponent,
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
    BrowserModule,
    BreadcrumbModule,
  ],
})
export class SharedModule {}
