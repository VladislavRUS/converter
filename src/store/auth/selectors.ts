import { IApplicationState } from 'store/index';

export const selectLoginError = (state: IApplicationState) => state.auth.loginError;

export const selectIsAuthenticating = (state: IApplicationState) => state.auth.isAuthenticating;
