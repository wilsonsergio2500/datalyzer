
export interface IFieldDescriptor { name: string, type: string };
export type FieldType = "string" | "date" | "number";
export const FIELD_TYPES: { [key in FieldType]: FieldType } = { string: "string", date: "date", number: "number"}

export class PayloadFieldUtil {


  private static hasDate(value: string) : boolean {
    const regex = new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})");
    const dateOk = regex.test(value);
    if (dateOk) {
      return true;
    } else {
      return false;
    }
  }

  private static hasNumber(value: number) : boolean {
    return !isNaN(value);
  }

  private static getType(value: any): FieldType {
    if (PayloadFieldUtil.hasDate(value)) {
      return FIELD_TYPES.date;
    }
    if (PayloadFieldUtil.hasNumber(value)) {
      return FIELD_TYPES.number;
    }
    return FIELD_TYPES.string;
  }


  public static GetFields<T>(record: T): IFieldDescriptor[]  {
    let fields: IFieldDescriptor[] = [];
    for (const field in record) {
      const type = PayloadFieldUtil.getType(record[field]);
      const described = <IFieldDescriptor>{ name: field, type };
      fields.push(described);
    }
    return fields;
  }

}
