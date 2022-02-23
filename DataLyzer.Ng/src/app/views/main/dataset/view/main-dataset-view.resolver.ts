import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { DataSetGetById } from '@states/dataset/dataset.actions';

@Injectable()
export class MainDatasetViewResolver implements Resolve<any>{

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const pageId = route.params.id;
    this.store.dispatch(new DataSetGetById(pageId));
    return;
  }

}
