import { State, Selector, StateContext, Action } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { SnackbarStatusService } from '@customComponents/ux/snackbar-status/service/snackbar-status.service';
import { IDataSet, IDatasetStateModel } from './dataset.model';
import { DatasetDone, DatasetLoading, DatasetGetElements, DataSetCreate, DataSetGetById, DataSetGetPayload, DataSetGetFields, DataSetFindDistinctsByPayloadField, DataSetFetchApiData } from './dataset.actions';
import { tap, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { LoggerUtil } from '@appUtils/loggerUtil';
import { FIELD_TYPES, IFieldDescriptor, PayloadFieldUtil } from '@appUtils/payloadFieldUtil';
import { Navigate } from '@ngxs/router-plugin';


@State<IDatasetStateModel>({
  name: 'dataset',
  defaults: <IDatasetStateModel>{
    working: true,
    records: [],
    current: null,
    currentPayload: null,
    payloadFields: [],
    filteredPayloadValues: []
  }
})
@Injectable()
export class DatasetState {

  constructor(
    private httpClient: HttpClient,
    private snackBarStatus: SnackbarStatusService
  ) { }

  @Selector()
  static IsWorking(state: IDatasetStateModel): boolean {
    return state.working;
  }

  @Selector()
  static getItems(state: IDatasetStateModel): any[] {
    return state.records;
  }

  @Selector()
  static getCurrent(state: IDatasetStateModel): IDataSet {
    return state.current;
  }

  @Selector()
  static getPayload(state: IDatasetStateModel): any[] {
    return state.currentPayload;
  }

  @Selector()
  static getPayloadFields(state: IDatasetStateModel): IFieldDescriptor[] {
    return state.payloadFields;
  }

  @Selector()
  static getPayloadFieldsOfTypeStringOnly(state: IDatasetStateModel): IFieldDescriptor[] {
    const fields = state.payloadFields?.filter(g => g.type == FIELD_TYPES.string);
    return fields;
  }

  @Selector()
  static getPayloadFieldsOfTypeNumberOnly(state: IDatasetStateModel): IFieldDescriptor[] {
    const fields = state.payloadFields?.filter(g => g.type == FIELD_TYPES.number);
    return fields;
  }

  @Selector()
  static getFilterPayloadValues(state: IDatasetStateModel): string[] {
    return state.filteredPayloadValues;
  }

  @Action(DatasetDone)
  onDone(ctx: StateContext<IDatasetStateModel>) {
    ctx.patchState({
      working: false
    });
  }
  @Action(DatasetLoading)
  onLoading(ctx: StateContext<IDatasetStateModel>) {
    ctx.patchState({
      working: true
    });
  }

  @Action(DatasetGetElements)
  getElements(ctx: StateContext<IDatasetStateModel>) {
    return ctx.dispatch(new DatasetLoading()).pipe(
      mergeMap(() => this.httpClient.get(`${environment.api.target}dataset`)),
      tap((records: any[]) => {
        ctx.patchState({
          records
        });
        LoggerUtil.LogTable('dataset', records);
      }),
      mergeMap(() => ctx.dispatch(new DatasetDone()))
    )
  }

  @Action(DataSetCreate)
  onCreate(ctx: StateContext<IDatasetStateModel>, action: DataSetCreate) {
    const { request } = action;
    return this.httpClient.post(`${environment.api.target}dataset/create`, request).pipe(
      tap(() => {
        this.snackBarStatus.OpenComplete(`Dataset has been created`);
      }),
      mergeMap(() => ctx.dispatch(new Navigate(['main', 'dataset'])))
    );

  }

  @Action(DataSetGetById)
  onGetById(ctx: StateContext<IDatasetStateModel>, action: DataSetGetById) {
    const { Id } = action;
    return ctx.dispatch(new DatasetLoading()).pipe(
      mergeMap(() => this.httpClient.get<IDataSet>(`${environment.api.target}dataset/${Id}`)),
      tap(current => {
        ctx.patchState({ current });
        LoggerUtil.LogCurrent('dataset', Id, current);
      }),
      mergeMap(() => ctx.dispatch(new DatasetDone()))
    )
  }

  @Action(DataSetGetPayload)
  onGetPayload(ctx: StateContext<IDatasetStateModel>, action: DataSetGetPayload) {
    const { Id } = action;
    return ctx.dispatch(new DatasetLoading()).pipe(
      mergeMap(() => this.httpClient.get<any[]>(`${environment.api.target}dataset/payload/${Id}`)),
      tap(currentPayload => {
        ctx.patchState({ currentPayload });
        LoggerUtil.LogCurrent('dataset', Id, currentPayload);
        ctx.dispatch(new DataSetGetFields());
      }),
      mergeMap(() => ctx.dispatch(new DatasetDone()))
    )
  }

  @Action(DataSetFetchApiData)
  onFetchApiDate(ctx: StateContext<IDatasetStateModel>, action: DataSetFetchApiData) {
    const { Id } = action;
    return ctx.dispatch(new DatasetLoading()).pipe(
      mergeMap(() => this.httpClient.put<any[]>(`${environment.api.target}dataset/fetchapi/${Id}`, {})),
      mergeMap(() => ctx.dispatch(new DataSetGetById(Id))),
      mergeMap(() => ctx.dispatch(new DatasetDone()))
    )
  }

  @Action(DataSetGetFields)
  onGetFieldsInPayload(ctx: StateContext<IDatasetStateModel>) {
    const { currentPayload } = ctx.getState();
    if (currentPayload?.length) {
      const payloadFields = PayloadFieldUtil.GetFields(currentPayload[0]);
      ctx.patchState({ payloadFields })
    }
  }

  @Action(DataSetFindDistinctsByPayloadField)
  onFindDistinctByPayloadField(ctx: StateContext<IDatasetStateModel>, action: DataSetFindDistinctsByPayloadField) {
    const { fieldname } = action;
    const { currentPayload } = ctx.getState();
    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    if (currentPayload?.length) {
      const filteredPayloadValues = currentPayload.map(g => g[fieldname]).filter(distinct);
      ctx.patchState({ filteredPayloadValues });
    }
  }

}
