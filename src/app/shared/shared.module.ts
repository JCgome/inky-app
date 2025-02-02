import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerCircleModule } from './components/spinner-circle/spinner-circle.module';
import { SpinnerCubeModule } from './components/spinner-cube/spinner-cube.module';
import { MaterialModule } from './models/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpinnerCircleModule,
    SpinnerCubeModule,
    MaterialModule,
  ],
  exports: [SpinnerCircleModule, SpinnerCubeModule, MaterialModule],
})
export class SharedModule {}
