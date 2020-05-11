import { action, createAsyncAction } from 'typesafe-actions';
import { DealsActionTypes, IDeal } from 'store/deals/types';

export const getDeals = () => action(DealsActionTypes.GET_DEALS);
export const getDealsAsync = createAsyncAction(
  DealsActionTypes.GET_DEALS_REQUEST,
  DealsActionTypes.GET_DEALS_SUCCESS,
  DealsActionTypes.GET_DEALS_FAILURE
)<undefined, IDeal[], undefined>();
