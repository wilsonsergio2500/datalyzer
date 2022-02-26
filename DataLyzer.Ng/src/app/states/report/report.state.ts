import { State, Selector, StateContext, Action } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { IChartMetaData, IDataSetReport, IReportStateModel } from './report.model';
import { ReportDone, ReportLoading, ReportGetElements, ReportCreate, ReportRemove, ReportGetById, ReportProcessPayLoad, ReportExtractChartMetaData } from './report.actions';
import { SnackbarStatusService } from '@customComponents/ux/snackbar-status/service/snackbar-status.service';
import { ConfirmationDialogService } from '@customComponents/ux/confirmation-dialog/confirmation-dialog.service';
import { tap, mergeMap, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoggerUtil } from '@appUtils/loggerUtil';
import { Navigate } from '@ngxs/router-plugin';
import { forkJoin, from } from 'rxjs';


@State<IReportStateModel>({
  name: 'report',
  defaults: <IReportStateModel>{
    working: true,
    records: [],
    current: null,
    chartOptions: null
  }
})
@Injectable()
export class ReportState {

  constructor(
    private httpClient: HttpClient,
    private snackBarStatus: SnackbarStatusService,
    private confirmationDialog: ConfirmationDialogService
  ) { }

  @Selector()
  static IsWorking(state: IReportStateModel): boolean {
    return state.working;
  }

  @Selector()
  static getItems(state: IReportStateModel): any[] {
    return state.records;
  }

  @Selector()
  static getReportChartOptions(state: IReportStateModel): IChartMetaData {
    return state.chartOptions;
  }

  @Selector()
  static getCurrent(state: IReportStateModel): IDataSetReport {
    return state.current;
  }

  @Action(ReportDone)
  onDone(ctx: StateContext<IReportStateModel>) {
    ctx.patchState({
      working: false
    });
  }
  @Action(ReportLoading)
  onLoading(ctx: StateContext<IReportStateModel>) {
    ctx.patchState({
      working: true
    });
  }

  @Action(ReportGetElements)
  getElements(ctx: StateContext<IReportStateModel>) {
    return ctx.dispatch(new ReportLoading()).pipe(
      mergeMap(() => this.httpClient.get<IDataSetReport[]>(`${environment.api.target}report`)),
      tap((records) => {
        ctx.patchState({ records });
        LoggerUtil.LogTable('report', records);
      }),
      mergeMap(() => ctx.dispatch(new ReportDone()))
    )
  }

  @Action(ReportProcessPayLoad)
  onProcessPayload(ctx: StateContext<IReportStateModel>, action: ReportProcessPayLoad) {
    const { datasetId, reportId } = action.request;
    ctx.dispatch(new ReportLoading())

    return forkJoin([
      this.httpClient.get<any[]>(`${environment.api.target}dataset/payload/${datasetId}`),
      this.httpClient.get<IDataSetReport>(`${environment.api.target}report/${reportId}`)
    ]).pipe(
      mergeMap(([payload, reportDefinition]) => ctx.dispatch(new ReportExtractChartMetaData({ payload, reportDefinition }))),
      finalize(() => ctx.dispatch(new ReportDone))
    )

  }

  @Action(ReportExtractChartMetaData)
  onExtractChartMetaData(ctx: StateContext<IReportStateModel>, action: ReportExtractChartMetaData) {
    const { payload, reportDefinition : def } = action.request;

    const distinct = (value, index, self) => self.indexOf(value) === index;
    LoggerUtil.LogCurrent('report', def.id, def);
    ctx.patchState({ current: def });

    const items = payload.filter(f => f[def.filterField] == def.filterValue);
    const categories = items.map(f => f[def.categoryField]).filter(distinct);
    LoggerUtil.LogTable('chart categories', categories);

    const series = items.map(f => f[def.seriesField]).filter(distinct);
    LoggerUtil.LogTable('chart series', series);


    let chartSeries = [];
    series.forEach(s => {

      const name = s;
      let data = [];
      categories.forEach(c => {
        const value = items.filter(f => f[def.seriesField] == s && f[def.categoryField] == c).map(g => g[def.valueField])[0];
        data = [...data, +value];
      })

      const serieItem = { name, data };
      chartSeries.push(serieItem);
    })

    LoggerUtil.LogTable('chart series data', chartSeries);

    const chartOptions = { categories, chartSeries, label: def.valueField };
    ctx.patchState({ chartOptions });

  }


  @Action(ReportGetById)
  onGetReportById(ctx: StateContext<IReportStateModel>, action: ReportGetById) {
    const { Id } = action;
    return ctx.dispatch(new ReportLoading()).pipe(
      mergeMap(() => this.httpClient.get<IDataSetReport>(`${environment.api.target}report/${Id}`)),
      tap(current => {
        ctx.patchState({ current });
        LoggerUtil.LogCurrent('report', Id, current);
      }),
      mergeMap(() => ctx.dispatch(new ReportDone()))
    )
  }

  @Action(ReportCreate)
  onReportCreate(ctx: StateContext<IReportStateModel>, action: ReportCreate) {
    const { request } = action;
    return this.httpClient.post(`${environment.api.target}report/create`, request).pipe(
      tap(() => this.snackBarStatus.OpenComplete(`Report Definition has been created`)),
      mergeMap(() => ctx.dispatch(new Navigate(['main', 'report'])))
    );
  }

  @Action(ReportRemove)
  onReportRemove(ctx: StateContext<IReportStateModel>, action: ReportRemove) {
    const { Id } = action;
    const { records : or } = ctx.getState();
    return this.confirmationDialog.OnConfirm(`Are you sure you would like to remove this report`).pipe(
      mergeMap(() => this.httpClient.delete(`${environment.api.target}report/${Id}`)),
      tap(() => this.snackBarStatus.OpenComplete(`Report has been removed`)),
      tap(() => {
        const records = or.filter(g => g.id != Id);
        ctx.patchState({ records });
      })
    )
  }

}
