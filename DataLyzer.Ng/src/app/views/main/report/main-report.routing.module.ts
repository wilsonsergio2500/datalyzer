import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { MainReportAddComponent } from './add/main-report-add.component';
import { MainReportAddResolver } from './add/main-report-add.resolver';
import { MainReportListComponent } from './list/main-report-list.component';
import { MainReportListResolver } from './list/main-report-list.resolver';
import { MainReportComponent } from './main-report.component';

const routes: Routes = [
  <Route>{
    path: '', component: MainReportComponent, children: [
      <Route>{ path: 'create/:id', component: MainReportAddComponent, resolve: { action: MainReportAddResolver } },
      <Route>{ path: 'list', component: MainReportListComponent, resolve: { action: MainReportListResolver } },
      <Route>{ path: '', component: MainReportListComponent, resolve: { action: MainReportListResolver } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainReportRoutingModule { }
