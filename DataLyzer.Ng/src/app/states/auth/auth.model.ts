


export interface AuthStateModel {
  working: boolean;
  initialized: boolean;
  isAuthenticated: boolean;
  payload?: ITokenPayload;
  errors: ErrorForUserResponse[];
}

export type ErrorForUserResponse = { code: string, description: string };

export interface ILoginRequest {
  Username: string;
  Password: string;
}

export interface ITokenPayload {
  email: string;
  nameId: string;
  exp: number
}

export interface ICreateNewUser {
  userName?: string;
  email: string;
  password: string;
}

export interface ICreatedUserResponse {
  succeeded: boolean;
  errors?: ErrorForUserResponse[];
}

