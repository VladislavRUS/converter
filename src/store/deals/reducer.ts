import { DealsActionTypes, IDealsState } from 'store/deals/types';
import { ActionType, createReducer } from 'typesafe-actions';

import * as dealsActions from './actions';

type DealsActionType = ActionType<typeof dealsActions>;

const initialState: IDealsState = {
  deals: [],
  isFetchingDeals: false,
  pageSize: 10,
  requiredDealsNumber: 20,
};

export const dealsReducer = createReducer<IDealsState, DealsActionType>(initialState)
  .handleType(DealsActionTypes.GET_DEALS_REQUEST, (state): IDealsState => ({ ...state, isFetchingDeals: false }))
  .handleType(
    DealsActionTypes.GET_DEALS_SUCCESS,
    (state, action): IDealsState => ({ ...state, isFetchingDeals: false, deals: action.payload })
  )
  .handleType(DealsActionTypes.GET_DEALS_FAILURE, (state): IDealsState => ({ ...state, isFetchingDeals: false }));
