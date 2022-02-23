
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MaterialComponentsModule } from '@material/material.module';
import { CustomComponentsModule } from '@customComponents/customComponents.module';
import { MainReportRoutingModule } from './main-report.routing.module';
import { getComponents, getProviders } from './elements';

@NgModule({
  declarations: [
    ...getComponents()
  ],
  providers: [
    ...getProviders()
  ],
  imports: [
    CommonModule,
    MainReportRoutingModule,
    SharedModule,
    MaterialComponentsModule,
    CustomComponentsModule
  ]
})
export class MainReportModule { }
