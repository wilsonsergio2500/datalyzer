import { INewDataSet } from "./dataset.model";

export class DatasetLoading {
  static type = '[Dataset] Set As Working';
}

export class DatasetDone {
  static type = '[Dataset] Set As Done';
}

export class DatasetGetElements {
  static type = '[Dataset] Get Elements';
}

export class DataSetCreate {
  static type = '[Dataset] Create';
  constructor(public request: INewDataSet) { }
}

export class DataSetGetById {
  static type = '[Dataset] Get By Id';
  constructor(public Id: string) {}
}

export class DataSetGetPayload {
  static type = '[Dataset] Get By Payload';
  constructor(public Id: string) { }
}

export class DataSetFetchApiData {
  static type = '[Dataset] Fetch Api Data';
  constructor(public Id: string) { }
}

export class DataSetGetFields {
  static type = '[Dataset] Get Fields';
}

export class DataSetFindDistinctsByPayloadField {
  static type = '[Dataset] Find Distinct By Payload Field';
  constructor(public fieldname: string) { }
}
