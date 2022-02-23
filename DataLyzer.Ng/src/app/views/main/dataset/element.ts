import { MainDatasetAddComponent } from "./add/main-dataset-add.component";
import { MainDatasetListComponent } from "./list/main-dataset-list.component";
import { MainDatasetListResolver } from "./list/main-dataset-list.resolver";
import { MainDatasetComponent } from "./main-dataset.component";
import { MainDatasetViewComponent } from "./view/main-dataset-view.component";
import { MainDatasetViewResolver } from "./view/main-dataset-view.resolver";

export function getComponents() {
  return [
    MainDatasetComponent,
    MainDatasetListComponent,
    MainDatasetAddComponent,
    MainDatasetViewComponent
  ]
}

export function getProviders() {
  return [
    MainDatasetListResolver,
    MainDatasetViewResolver
  ]
}
