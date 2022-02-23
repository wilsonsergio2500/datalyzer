import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@shared/shared.module';
import { MaterialComponentsModule } from '@material/material.module';
import { CustomComponentsModule } from '@customComponents/customComponents.module';
import { getComponents } from './element';

@NgModule({
  declarations:[
      ...getComponents()
    ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FlexLayoutModule,
    CustomComponentsModule,
    SharedModule,
    MaterialComponentsModule,
  ]
})
export class MainModule { }
