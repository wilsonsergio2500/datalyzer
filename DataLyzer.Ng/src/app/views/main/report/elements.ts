import { MainReportAddComponent } from "./add/main-report-add.component";
import { MainReportAddResolver } from "./add/main-report-add.resolver";
import { MainReportListComponent } from "./list/main-report-list.component";
import { MainReportListResolver } from "./list/main-report-list.resolver";
import { MainReportComponent } from "./main-report.component";

export function getComponents() {
  return [
    MainReportComponent,
    MainReportAddComponent,
    MainReportListComponent
  ]
}

export function getProviders() {
  return [
    MainReportAddResolver,
    MainReportListResolver
  ];
}
