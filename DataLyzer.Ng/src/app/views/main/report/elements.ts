import { MainReportAddComponent } from "./add/main-report-add.component";
import { MainReportAddResolver } from "./add/main-report-add.resolver";
import { MainReportListComponent } from "./list/main-report-list.component";
import { MainReportListResolver } from "./list/main-report-list.resolver";
import { MainReportComponent } from "./main-report.component";
import { MainReportViewComponent } from "./view/main-report-view.component";
import { MainReportViewResolver } from "./view/main-report-view.resolver";

export function getComponents() {
  return [
    MainReportComponent,
    MainReportAddComponent,
    MainReportListComponent,
    MainReportViewComponent
  ]
}

export function getProviders() {
  return [
    MainReportAddResolver,
    MainReportListResolver,
    MainReportViewResolver
  ];
}
