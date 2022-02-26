import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ReportState } from '@states/report/report.state';
import { IChartMetaData } from '@states/report/report.model';
import { IDataSet } from '@states/dataset/dataset.model';
import { DatasetState } from '@states/dataset/dataset.state';
import { filter, tap } from 'rxjs/operators';
import { Chart } from 'angular-highcharts';
import { SeriesOptionsType } from 'highcharts';


@Component({
    selector: 'main-report-view',
    templateUrl: 'main-report-view.component.html',
    styleUrls: [`main-report-view.component.scss`]
  })
  export class MainReportViewComponent implements OnInit {

  @Select(ReportState.IsWorking) working$: Observable<boolean>;
  @Select(ReportState.getReportChartOptions) chartOptions$: Observable<IChartMetaData>;
  @Select(DatasetState.getCurrent) current$: Observable<IDataSet>;
  @Select(ReportState.getCurrent) currentReport$: Observable<IDataSet>;
  chart: Chart;

  ngOnInit() {

    this.chartOptions$.pipe(
      filter(opts => !!opts),
      tap(opts => {

        const series: Array<SeriesOptionsType> = opts.chartSeries.map(({ name, data }) => ({ name, data, type: 'column' }));

        this.chart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: opts.categories,
         
          },
          yAxis: {
            min: 0,
            title: {
              text: opts.label
            }
          },
          legend: {
            reversed: true
          },
          credits: {
            enabled: false
          },
          series: series
        });


      })
    ).subscribe();

  }
  
  } 
