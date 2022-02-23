import { environment } from "../../environments/environment";

export class LoggerUtil {

  public static LogTable<T>(name: string, table: T[]) {
    if (!environment.production) {
      console.groupCollapsed(`[table] ${name}`);
      console.table(table);
      console.groupEnd();
    }
  }

  public static LogCurrent<T>(name: string, Id: string, current: T) {
    if (!environment.production) {
      console.groupCollapsed(`[table] ${name} [get] ${Id}`);
      console.log(`[Id]`, Id, current);
      console.groupEnd();
    }
  }

}
