import { NgxsOnInit, State, StateContext, Action, Selector } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { AuthLogin, AuthLoginFailed, AuthLogoutSuccess, AuthLoginRedirect, AuthLogout, AuthLoginSetPayload, AuthLoginSuccess, AuthSetDone, AuthLoading, AuthCreateUserWithEmailAndPassword, AuthCreateUserSetErrors } from './auth.actions';
import { AuthStateModel,  ErrorForUserResponse,  ICreatedUserResponse,  ITokenPayload } from './auth.model';
import { AuthService } from '@ng2UiAuth/auth.service';
import { filter, finalize, mergeMap, tap } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { SnackbarStatusService } from '@customComponents/ux/snackbar-status/service/snackbar-status.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@State<AuthStateModel>({
  name: 'auth',
  defaults: <AuthStateModel>{
    working: false,
    initialized: false,
    isAuthenticated: false,
    payload: null,
    errors: []
  }
})
@Injectable()
export class AuthState implements NgxsOnInit {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private snackBarStatus: SnackbarStatusService
  ) {
  }

  ngxsOnInit(ctx?: StateContext<AuthStateModel>) {
    ctx.dispatch(new AuthLoginSetPayload());
  }

  @Selector()
  static IsWorking(state: AuthStateModel): boolean {
    return state.working;
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

  @Selector()
  static getErrorMessages(state: AuthStateModel): ErrorForUserResponse[] {
    return state.errors;
  }

  @Action(AuthSetDone)
  onDone(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      working: false
    });
  }
  @Action(AuthLoading)
  onLoading(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      working: true
    });
  }

  @Action(AuthLogin)
  login(ctx: StateContext<AuthStateModel>, action: AuthLogin) {
    return this.authService.login(action.credentials).pipe(
      mergeMap(() => ctx.dispatch(new AuthLoginSetPayload())),
      mergeMap(() => ctx.dispatch(new AuthLoginSuccess()))
    );
  }
  @Action(AuthLoginSuccess)
  onLoginSuccess(ctx: StateContext<AuthStateModel>) {
    const RouteTo = 'main';
    this.snackBarStatus.OpenComplete('Authenticated Successfully', 3000);
    return timer(1000).pipe(mergeMap(() => ctx.dispatch(new Navigate([RouteTo]))))
  }

  @Action(AuthLoginSetPayload)
  setPayload(ctx: StateContext<AuthStateModel>) {
    const payload = this.authService.getPayload();
    const isAuthenticated = !!payload && this.authService.isAuthenticated();
    ctx.patchState({
      initialized: true,
      isAuthenticated,
      payload
    })
  }

  @Action(AuthCreateUserWithEmailAndPassword)
  onCreateUser(ctx: StateContext<AuthStateModel>, action: AuthCreateUserWithEmailAndPassword) {
    const { request } = action;
    const username = request.email
    return ctx.dispatch(new AuthLoading).pipe(
      mergeMap(() => this.httpClient.post<ICreatedUserResponse>(`${environment.api.target}login/create`, { ...request, username })),
      mergeMap(el => {
        if (el.succeeded) {
          this.snackBarStatus.OpenComplete('User Created succesfully');
        }
        return of(el);
      }),
      filter(g => !g.succeeded),
      mergeMap(({ errors }) => ctx.dispatch(new AuthCreateUserSetErrors(errors))),
      finalize(() => ctx.dispatch(new AuthSetDone()))
    );
  
  }

  @Action(AuthCreateUserSetErrors)
  onCreateUserErrors(ctx: StateContext<AuthStateModel>, action: AuthCreateUserSetErrors) {
    const { errors } = action;
    ctx.patchState({ errors })
  }

  @Action(AuthLogout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      mergeMap(() => ctx.dispatch(new AuthLogoutSuccess()))
    );
  }

  @Action([AuthLogoutSuccess, AuthLoginFailed])
  setUserStateAsLogOut(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      isAuthenticated: false,
      payload: null
    })
    ctx.dispatch(new AuthLoginRedirect());
  }

  @Action(AuthLoginRedirect)
  onLoginRedirect(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new Navigate(['/login']));
  }
}
