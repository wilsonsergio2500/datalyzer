import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { MainDatasetAddComponent } from './add/main-dataset-add.component';
import { MainDatasetListComponent } from './list/main-dataset-list.component';
import { MainDatasetListResolver } from './list/main-dataset-list.resolver';
import { MainDatasetComponent } from './main-dataset.component';
import { MainDatasetViewComponent } from './view/main-dataset-view.component';
import { MainDatasetViewResolver } from './view/main-dataset-view.resolver';

const routes: Routes = [
  <Route>{
    path: '', component: MainDatasetComponent, children: [
      <Route>{ path: '', component: MainDatasetListComponent, resolve: { action: MainDatasetListResolver } },
      <Route>{ path: 'list', component: MainDatasetListComponent, resolve: { action: MainDatasetListResolver } },
      <Route>{ path: 'view/:id', component: MainDatasetViewComponent, resolve: {action: MainDatasetViewResolver}},
      <Route>{ path: 'add', component: MainDatasetAddComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDatasetRoutingModule { }
