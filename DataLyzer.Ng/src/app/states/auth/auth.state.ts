import { NgxsOnInit, State, StateContext, Action, Selector } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Login, LoginFailed, LogoutSuccess, LoginRedirect, Logout, LoginSetPayload, LoginSuccess } from './auth.actions';
import { AuthStateModel,  ITokenPayload } from './auth.model';
import { AuthService } from '@ng2UiAuth/auth.service';
import { mergeMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { SnackbarStatusService } from '@customComponents/ux/snackbar-status/service/snackbar-status.service';
import { Injectable } from '@angular/core';

@State<AuthStateModel>({
  name: 'auth',
  defaults: <AuthStateModel>{
    initialized: false,
    isAuthenticated: false,
    payload: null
  }
})
@Injectable()
export class AuthState implements NgxsOnInit {

  constructor(
    private authService: AuthService,
    private snackBarStatus: SnackbarStatusService
  ) {
  }

  ngxsOnInit(ctx?: StateContext<AuthStateModel>) {
    ctx.dispatch(new LoginSetPayload());
  }

  @Selector()
  static getUser(state: AuthStateModel): ITokenPayload {
    if (state.isAuthenticated) {
      return state.payload;
    } else {
      return null;
    }
  }

  @Selector()
  static isUserAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.credentials).pipe(
      mergeMap(() => ctx.dispatch(new LoginSetPayload())),
      mergeMap(() => ctx.dispatch(new LoginSuccess()))
    );
  }
  @Action(LoginSuccess)
  onLoginSuccess(ctx: StateContext<AuthStateModel>) {
    const RouteTo = 'main';
    this.snackBarStatus.OpenComplete('Authenticated Successfully', 3000);
    return timer(1000).pipe(mergeMap(() => ctx.dispatch(new Navigate([RouteTo]))))
  }

  @Action(LoginSetPayload)
  setPayload(ctx: StateContext<AuthStateModel>) {
    const payload = this.authService.getPayload();
    const isAuthenticated = !!payload && this.authService.isAuthenticated();
    ctx.patchState({
      initialized: true,
      isAuthenticated,
      payload
    })
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      mergeMap(() => ctx.dispatch(new LogoutSuccess()))
    );
  }

  @Action([LogoutSuccess, LoginFailed])
  setUserStateAsLogOut(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isAuthenticated: false,
      payload: null
    })
    ctx.dispatch(new LoginRedirect());
  }

  @Action(LoginRedirect)
  onLoginRedirect(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new Navigate(['/login']));
  }
}
