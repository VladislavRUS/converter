export interface IQuotesState {
  quotes: IQuote[];
  isFetchingQuotes: boolean;
}

export enum QuotesActionTypes {
  GET_QUOTES = '@@quotes/GET_QUOTES',
  GET_QUOTES_REQUEST = '@@quotes/GET_QUOTES_REQUEST',
  GET_QUOTES_SUCCESS = '@@quotes/GET_QUOTES_SUCCESS',
  GET_QUOTES_FAILURE = '@@quotes/GET_QUOTES_FAILURE',

  TOGGLE_FAVORITE_QUOTE = '@@quotes/TOGGLE_FAVORITE_QUOTE',
}

export interface IQuoteFromServer {
  asset: string;
  startDate: string;
  quote: string;
}

export interface IQuote extends IQuoteFromServer {
  timestamp: number;
  isFavorite: boolean;
}
