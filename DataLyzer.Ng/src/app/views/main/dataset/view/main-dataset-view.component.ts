import { Component} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DatasetState } from '@states/dataset/dataset.state';
import { IDataSet } from '@states/dataset/dataset.model';
import { DataSetFetchApiData } from '@states/dataset/dataset.actions';

@Component({
    selector: 'main-dataset-view',
    templateUrl: 'main-dataset-view.component.html',
    styleUrls: [`main-dataset-view.component.scss`]
  })
  export class MainDatasetViewComponent {

  title = "Dataset List";
  listPath = "/main/dataset";

  constructor(private store: Store) { }

  @Select(DatasetState.IsWorking) working$: Observable<boolean>;
  @Select(DatasetState.getCurrent) current$: Observable<IDataSet>;

  retrieveApiData(Id :string) {
    this.store.dispatch(new DataSetFetchApiData(Id))
  }
  
  } 
