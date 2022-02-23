import { Component, OnInit } from '@angular/core';
import { FormlyTypeGroup } from '@formlyExtended/core/FormlyTypeGroup';
import { INewDataSet } from '@states/dataset/dataset.model';
import { FieldTypes } from '@formlyExtended/core/fields-types-schemas';
import { DataSetCreate } from '@states/dataset/dataset.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'main-dataset-add',
  templateUrl: 'main-dataset-add.component.html',
  styleUrls: [`main-dataset-add.component.scss`]
})
export class MainDatasetAddComponent implements OnInit {

  title = "New Dataset";
  listPath = "../";
  btnReadyLabel = 'Add';
  btnLoadingLabel = 'Adding...';
  formlyGroup: FormlyTypeGroup<INewDataSet>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.formlyGroup = new FormlyTypeGroup<INewDataSet>({
      name: new FieldTypes.InputField('Name', true, 100),
      geographicCoverage: new FieldTypes.InputField('Geographic Coverage', true, 100),
      source: new FieldTypes.InputField('Document Source', true, 100),
      apiPath: new FieldTypes.InputField('Api Path', true, 100)
    })
  }

  formSubmit() {
    this.formlyGroup.markAsBusy();
    this.store.dispatch(new DataSetCreate(this.formlyGroup.model));
  }

}
