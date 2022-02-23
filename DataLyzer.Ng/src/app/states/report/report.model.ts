export interface IReportStateModel {
    working: boolean;
  records: IDataSetReport[];
  
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
