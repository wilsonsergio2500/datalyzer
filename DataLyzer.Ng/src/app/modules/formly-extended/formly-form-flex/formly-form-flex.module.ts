import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyFormFlexLayoutComponent } from './formly-form-flex-layout/formly-form-flex-layout.component';
import { FormlyFormFlexJsonComponent } from './formly-form-flex-json/fomly-form-flex-json.component';
import { FormlyModule } from '@ngx-formly/core';
import { CustomComponentsModule } from '@customComponents/customComponents.module'
import { MaterialComponentsModule } from '@material/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    CustomComponentsModule,
    FormlyModule
  ],
  declarations: [
    FormlyFormFlexLayoutComponent,
    FormlyFormFlexJsonComponent
  ],
  exports: [
    FormlyFormFlexLayoutComponent,
    FormlyFormFlexJsonComponent
  ]
})
export class FormlyFormsFlexModule {}
