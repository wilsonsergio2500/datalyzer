
export interface ILoginRequest {
  Username: string;
  Password: string;
}

export interface AuthStateModel {
  initialized: boolean;
  isAuthenticated: boolean;
  payload?: ITokenPayload;
}

export interface ITokenPayload {
  email: string;
  nameId: string;
  exp: number
}


