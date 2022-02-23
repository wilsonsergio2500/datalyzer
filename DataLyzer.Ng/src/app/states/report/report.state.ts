import { State, Selector, StateContext, Action } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { IDataSetReport, IReportStateModel } from './report.model';
import { ReportDone, ReportLoading, ReportGetElements, ReportCreate, ReportRemove } from './report.actions';
import { SnackbarStatusService } from '@customComponents/ux/snackbar-status/service/snackbar-status.service';
import { ConfirmationDialogService } from '@customComponents/ux/confirmation-dialog/confirmation-dialog.service';
import { tap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoggerUtil } from '@appUtils/loggerUtil';
import { Navigate } from '@ngxs/router-plugin';


@State<IReportStateModel>({
  name: 'report',
  defaults: <IReportStateModel>{
    working: true,
    records: [],
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
