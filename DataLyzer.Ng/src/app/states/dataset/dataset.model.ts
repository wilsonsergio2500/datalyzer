import { IFieldDescriptor } from "@appUtils/payloadFieldUtil";

export interface IDatasetStateModel {
  working: boolean;
  records: any[];
  current: IDataSet
  currentPayload: any[];
  payloadFields: IFieldDescriptor[];
  filteredPayloadValues: string[]
}

export interface INewDataSet {
  name: string;
  geographicCoverage: string;
  source: string;
  apiPath: string;
}

export interface IDataSet extends INewDataSet {
  apiData: any[],
  update: string | number;

}
