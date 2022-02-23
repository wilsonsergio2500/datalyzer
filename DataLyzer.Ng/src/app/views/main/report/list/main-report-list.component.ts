import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ReportState } from '@states/report/report.state';
import { IDataSetReport } from '@states/report/report.model';
import { ReportRemove } from '@states/report/report.actions';


@Component({
  selector: 'main-report-list',
  templateUrl: 'main-report-list.component.html',
  styleUrls: [`main-report-list.component.scss`]
})
export class MainReportListComponent {

  @Select(ReportState.IsWorking) working$: Observable<boolean>;
  @Select(ReportState.getItems) items$: Observable<IDataSetReport[]>;

  constructor(private store: Store) { }

  onRemove(Id: string) {
    this.store.dispatch(new ReportRemove(Id))
  }



}
