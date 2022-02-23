import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginRedirect } from "@states/auth/auth.actions";
import { AuthState } from "@states/auth/auth.state";

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private store: Store) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.selectOnce(AuthState.getUser).pipe(
      map(payload => {
        if (!!payload) {
          return true;
        } else {
          this.store.dispatch(new LoginRedirect());
          return false;
        }

      })
    );
    }

}
