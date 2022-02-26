import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { DataSetGetById } from '@states/dataset/dataset.actions';
import { ReportProcessPayLoad } from '@states/report/report.actions';

@Injectable()
export class MainReportViewResolver implements Resolve<any>{

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { datasetId, reportId } = route.params;
    this.store.dispatch([new DataSetGetById(datasetId), new ReportProcessPayLoad({ datasetId, reportId })]);
    return;
  }

}
