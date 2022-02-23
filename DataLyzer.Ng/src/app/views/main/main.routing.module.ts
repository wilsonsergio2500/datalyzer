import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  <Route>{
    path: '', component: MainComponent, children: [
      <Route>{ path: '', component: DashboardComponent },
      <Route>{ path: 'dataset', loadChildren: () => import('./dataset/main-dataset.module').then(m => m.MainDatasetModule) },
      <Route>{ path: 'report', loadChildren: () => import('./report/main-report.module').then(m => m.MainReportModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
