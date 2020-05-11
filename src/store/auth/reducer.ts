import { AuthActionTypes, IAuthState } from 'store/auth/types';
import { ActionType, createReducer } from 'typesafe-actions';
import * as authActions from './actions';

type AuthActionType = ActionType<typeof authActions>;

const initialState: IAuthState = {
  isAuthenticating: false,
  loginError: null,
};

export const authReducer = createReducer<IAuthState, AuthActionType>(
  initialState
)
  // Login
  .handleType(
    AuthActionTypes.LOGIN_REQUEST,
    (state): IAuthState => ({
      ...state,
      isAuthenticating: true,
      loginError: null,
    })
  )
  .handleType(
    AuthActionTypes.LOGIN_SUCCESS,
    (state): IAuthState => ({ ...state, isAuthenticating: false })
  )
  .handleType(
    AuthActionTypes.LOGIN_FAILURE,
    (state, action): IAuthState => ({
      ...state,
      isAuthenticating: false,
      loginError: action.payload,
    })
  );
