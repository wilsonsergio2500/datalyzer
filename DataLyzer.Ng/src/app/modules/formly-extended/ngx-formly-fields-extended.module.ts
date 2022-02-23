import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { FormlyMatToggleModule } from './types/toggle/toggle.module';
import { FormlyMatDatepickerModule } from './types/datepicker/datepicker.module';
import { FormlyMatNumberInputModule } from './types/number/number.module';
import { FormlyGroupFlexTypeModule } from './types/flex-group/flex-group.module';
import { FormlyFormsFlexModule } from './formly-form-flex/formly-form-flex.module';
import { CustomComponentsModule } from '@customComponents/customComponents.module'
import { MaterialComponentsModule } from '@material/material.module';

//wrappers
import { FomlySuffixIconWrapperModule } from './wrappers/suffix/suffix-icon.module';
import { FomlyPrefixIconWrapperModule } from './wrappers/prefix/prefix-icon.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    CustomComponentsModule,
    FormlyModule.forRoot(),
    FormlyFormsFlexModule,
    FormlyMaterialModule,
    FormlyMatSliderModule,
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    FormlyMatNumberInputModule,
    FormlyGroupFlexTypeModule,
    FomlySuffixIconWrapperModule,
    FomlyPrefixIconWrapperModule,
  ],
  exports: [
    FormlyModule,
    FormlyFormsFlexModule,
    FormlyMaterialModule,
    FormlyMatSliderModule,
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    FormlyMatNumberInputModule,
    FormlyGroupFlexTypeModule,
    FomlySuffixIconWrapperModule,
    FomlyPrefixIconWrapperModule,
  ]
})
export class NgxFormlyFieldExtendedModule { }
