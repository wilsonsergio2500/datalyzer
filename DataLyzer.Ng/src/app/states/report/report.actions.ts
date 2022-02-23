import { INewReport } from "./report.model";

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

