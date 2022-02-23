import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MaterialComponentsModule } from '@material/material.module';
import { CustomComponentsModule } from '@customComponents/customComponents.module';
import { MainDatasetRoutingModule } from './main-dataset.routing.module';
import { getComponents, getProviders } from './element';

@NgModule({
  declarations: [
    ...getComponents()
  ],
  providers: [
    ...getProviders()
  ],
  imports: [
    CommonModule,
    MainDatasetRoutingModule,
    SharedModule,
    MaterialComponentsModule,
    CustomComponentsModule,
    SharedModule,
    MaterialComponentsModule,
  ],

})
export class MainDatasetModule { }
