import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { all, fork } from 'redux-saga/effects';
import { History } from 'history';
import { IAuthState } from 'store/auth/types';
import { authReducer } from 'store/auth/reducer';
import { authSaga } from 'store/auth/sagas';
import { IQuotesState } from 'store/quotes/types';
import { quotesReducer } from 'store/quotes/reducer';
import { quotesSaga } from 'store/quotes/sagas';
import { IDealsState } from 'store/deals/types';
import { dealsReducer } from 'store/deals/reducer';
import { dealsSaga } from 'store/deals/sagas';

export interface IApplicationState {
  auth: IAuthState;
  quotes: IQuotesState;
  deals: IDealsState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    auth: authReducer,
    quotes: quotesReducer,
    deals: dealsReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(authSaga), fork(quotesSaga), fork(dealsSaga)]);
}
