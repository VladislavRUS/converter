export interface IDealsState {
  deals: IDeal[];
  isFetchingDeals: boolean;
  pageSize: number;
  requiredDealsNumber: number;
}

export enum DealsActionTypes {
  GET_DEALS = '@@deals/GET_DEALS',
  GET_DEALS_REQUEST = '@@deals/GET_DEALS_REQUEST',
  GET_DEALS_SUCCESS = '@@deals/GET_DEALS_SUCCESS',
  GET_DEALS_FAILURE = '@@deals/GET_DEALS_FAILURE',
}

export interface IDealFromServer {
  asset: string;
  startDate: string;
  startQuote: string;
  finishDate: string;
  finishQuote: string;
  profit: string;
}

export interface IDeal extends IDealFromServer {
  finishDateTimestamp: number;
  profitValue: number;
}
