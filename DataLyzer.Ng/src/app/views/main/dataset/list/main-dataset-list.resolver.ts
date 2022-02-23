import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { DatasetGetElements } from '@states/dataset/dataset.actions';

@Injectable()
export class MainDatasetListResolver implements Resolve<any>{

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new DatasetGetElements());
    return;
  }

}
