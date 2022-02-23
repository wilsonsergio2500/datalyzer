import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { DatasetState } from '@states/dataset/dataset.state';

@Component({
    selector: 'main-dataset-list',
    templateUrl: 'main-dataset-list.component.html',
    styleUrls: [`main-dataset-list.component.scss`]
  })
  export class MainDatasetListComponent {

  @Select(DatasetState.IsWorking) working$: Observable<boolean>;
  @Select(DatasetState.getItems) items$: Observable<boolean>;
  
  } 
