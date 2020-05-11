export interface IAuthState {
  isAuthenticating: boolean;
  loginError: null | string;
}

export enum AuthActionTypes {
  LOGIN = '@@auth/LOGIN',
  LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@@auth/LOGIN_FAILURE',

  LOGOUT = '@@auth/LOGOUT',
}

export interface LoginFormData {
  login?: string;
  password?: string;
}
