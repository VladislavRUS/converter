import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { all, fork } from 'redux-saga/effects';
import { History } from 'history';
import { IAuthState } from 'store/auth/types';
import { authReducer } from 'store/auth/reducer';
import { authSaga } from 'store/auth/sagas';

export interface IApplicationState {
  auth: IAuthState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    auth: authReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(authSaga)]);
}
