export interface IReportStateModel {
  working: boolean;
  records: IDataSetReport[];
  current: IDataSetReport;
  chartOptions: IChartMetaData;
}

export interface INewReport {
  datasetId: string;

  reportName: string;
  filterField: string;
  filterValue: string;

  categoryField: string;
  seriesField: string;
  valueField: string;
}

export interface IDataSetReport {
  id: string;
  datasetId: string;

  reportName: string;
  filterField: string;
  filterValue: string;

  categoryField: string;
  seriesField: string;
  valueField: string;
}

export interface IReportProcessPayloadRequest {
  datasetId: number;
  reportId: number;
}

export interface IChartProcessSeriesParams {
  payload: any[],
  reportDefinition: IDataSetReport,
}

export interface IChartMetaData {
  categories: string[];
  chartSeries: { name: string, data: number[] }[];
  label: string;
}
