import { action, createAsyncAction } from 'typesafe-actions';
import { AuthActionTypes, LoginFormData } from 'store/auth/types';

export const login = (data: LoginFormData) =>
  action(AuthActionTypes.LOGIN, { data });
export const loginAsync = createAsyncAction(
  AuthActionTypes.LOGIN_REQUEST,
  AuthActionTypes.LOGIN_SUCCESS,
  AuthActionTypes.LOGIN_FAILURE
)<undefined, undefined, string>();
