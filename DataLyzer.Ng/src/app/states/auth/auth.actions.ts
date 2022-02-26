
import { ErrorForUserResponse, ICreateNewUser, ILoginRequest } from './auth.model';

export class AuthLoading {
  static type = '[Auth] Set As Working';
}

export class AuthSetDone {
  static type = '[Auth] Set As Done';
}

export class AuthLogin {
  static type = '[Auth] Login User';
  constructor(public credentials: ILoginRequest) {}
}

export class AuthLoginSuccess {
  static type = '[Auth] Login Success';
}

export class AuthLogout {
  static type = '[Auth] Logout';
}

export class AuthLoginRedirect {
  static type = '[Auth] Login Redirect'
}

export class AuthLoginFailed {
  static type = '[Auth] Login Failed';
  constructor(public error: any) { }
}

export class AuthLoginSetPayload {
  static type = '[Auth] Login Set Payload';
}

export class AuthLogoutSuccess {
  static type = '[Auth] Logout Success';
}

export class AuthCreateUserWithEmailAndPassword {
  static type = '[Auth] Create User';
  constructor(public request: ICreateNewUser) { }
}

export class AuthCreateUserSetErrors {
  static type = '[Auth] Create User Set Errors';
  constructor(public errors: ErrorForUserResponse[]) { }
}
