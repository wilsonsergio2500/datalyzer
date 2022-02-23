
import { ILoginRequest } from './auth.model';

export class Login {
  static type = '[Auth] Login User';
  constructor(public credentials: ILoginRequest) {}
}

export class LoginSuccess {
  static type = '[Auth] Login Success';
}

export class Logout {
  static type = '[Auth] Logout';
}

export class LoginRedirect {
  static type = '[Auth] Login Redirect'
}

export class LoginFailed {
  static type = '[Auth] Login Failed';
  constructor(public error: any) { }
}

export class LoginSetPayload {
  static type = '[Auth] Login Set Payload';
}

export class LogoutSuccess {
  static type = '[Auth] Logout Success';
}

