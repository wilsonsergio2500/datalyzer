import { IChartProcessSeriesParams, INewReport, IReportProcessPayloadRequest } from "./report.model";

export class ReportLoading {
  static type = '[Report] Set As Working';
}

export class ReportDone {
  static type = '[Report] Set As Done';
}

export class ReportGetElements {
  static type = '[Report] Get Elements';
}

export class ReportCreate {
  static type = '[Report] Create';
  constructor(public request: INewReport) { }
}

export class ReportRemove {
  static type = '[Report] Remove';
  constructor(public Id: string) { }
}

export class ReportGetById {
  static type = '[Report] Get By Id';
  constructor(public Id: string) {}
}

export class ReportProcessPayLoad {
  static type = '[Report] Process Payload';
  constructor(public request: IReportProcessPayloadRequest) { }
}

export class ReportExtractChartMetaData {
  static type = '[Report] Extract Chart Metatdata'
  constructor(public request: IChartProcessSeriesParams) { }
}

