import { FormlyGroupFlexComponent } from './flex-group.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { FormlyModule } from '@ngx-formly/core';
import { CustomComponentsModule } from '@customComponents/customComponents.module'
import { MaterialComponentsModule } from '@material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [FormlyGroupFlexComponent],
  imports: [
    CustomComponentsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    FormlyMatFormFieldModule,
    FlexLayoutModule,
    FormlyModule.forChild({
      types: [{
        name: 'formly-group-flex',
        component: FormlyGroupFlexComponent,
        wrappers: ['form-field'],
      }],
    }),
  ],

})
export class FormlyGroupFlexTypeModule { }
