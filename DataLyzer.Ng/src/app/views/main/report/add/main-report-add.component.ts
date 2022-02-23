import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DatasetState } from '@states/dataset/dataset.state';
import { IDataSet } from '@states/dataset/dataset.model';
import { FormlyTypeGroup } from '@formlyExtended/core/FormlyTypeGroup';
import { FieldTypes } from '@formlyExtended/core/fields-types-schemas';
import { INewReport } from '@states/report/report.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DataSetFindDistinctsByPayloadField } from '@states/dataset/dataset.actions';
import { ReportCreate } from '@states/report/report.actions';

@Component({
    selector: 'main-report-add',
    templateUrl: 'main-report-add.component.html',
    styleUrls: [`main-report-add.component.scss`]
  })
  export class MainReportAddComponent implements OnInit {
   
  @Select(DatasetState.IsWorking) working$: Observable<boolean>;
  @Select(DatasetState.getCurrent) current$: Observable<IDataSet>;
  formlyGroup: FormlyTypeGroup<INewReport>;
  btnReadyLabel = "Add Report"
  btnLoadingLabel = "Addding Report";
  private pageId = 0;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {
    this.pageId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {


    const filteredFieldChanged = ({ formControl }) => this.store.dispatch(new DataSetFindDistinctsByPayloadField(formControl.value));


    const fields$ = this.store.select(DatasetState.getPayloadFieldsOfTypeStringOnly).pipe(map(el => el.map(k => ({ label: k.name, value: k.name }))));
    const filterValue$ = this.store.select(DatasetState.getFilterPayloadValues).pipe(map(el => el.map(k => ({ label: k, value: k }))));
    const numberFields = this.store.select(DatasetState.getPayloadFieldsOfTypeNumberOnly).pipe(map(el => el.map(k => ({ label: k.name, value: k.name }))));

    this.formlyGroup = new FormlyTypeGroup<INewReport>({
      datasetId: new FieldTypes.HiddenField('datasetId', true, { defaultValue: this.pageId }),
      reportName: new FieldTypes.InputField('Report Name', true),
      filterField: new FieldTypes.SelectField('Filter Field', true, 100, fields$, { templateOptions: { change: filteredFieldChanged } }),
      filterValue: new FieldTypes.SelectField('Filter Value', true, 100, filterValue$),
      categoryField: new FieldTypes.SelectField('Category Field', true, 100, fields$),
      seriesField: new FieldTypes.SelectField('Series Field', true, 100, fields$),
      valueField: new FieldTypes.SelectField('Value Field', true, 100, numberFields)
    })

  }

  formSubmit() {
    this.formlyGroup.markAsBusy();
    this.store.dispatch(new ReportCreate(this.formlyGroup.model))
  }
   
  
  } 
