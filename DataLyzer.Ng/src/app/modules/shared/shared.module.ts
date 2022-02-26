import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2UiAuthModule, IPartialConfigOptions } from '@ng2UiAuth/ng2-ui-auth.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CustomComponentsModule} from '@customComponents/customComponents.module'
import { MaterialComponentsModule } from '@material/material.module';
import { ReactiveFormsTypedModule } from 'reactive-forms-typed';
import { NgxFormlyFieldExtendedModule } from '@formlyExtended/ngx-formly-fields-extended.module';
import { environment } from '../../../environments/environment';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    Ng2UiAuthModule.forRoot(<IPartialConfigOptions>{ loginUrl: `${environment.api.target}login` }),
    NgxsModule,
    NgxsRouterPluginModule,
    CustomComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsTypedModule,
    NgxFormlyFieldExtendedModule,
    ChartModule
  ],
  exports: [
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2UiAuthModule,
    CustomComponentsModule,
    ScrollingModule,
    ReactiveFormsTypedModule,
    NgxFormlyFieldExtendedModule,
    ChartModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    }
  }
}
