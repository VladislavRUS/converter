import { IQuote, QuotesActionTypes } from 'store/quotes/types';
import { action, createAsyncAction } from 'typesafe-actions';

export const getQuotes = () => action(QuotesActionTypes.GET_QUOTES);
export const getQuotesAsync = createAsyncAction(
  QuotesActionTypes.GET_QUOTES_REQUEST,
  QuotesActionTypes.GET_QUOTES_SUCCESS,
  QuotesActionTypes.GET_QUOTES_FAILURE
)<undefined, IQuote[], undefined>();

export const toggleFavoriteQuote = (quote: IQuote) => action(QuotesActionTypes.TOGGLE_FAVORITE_QUOTE, { quote });
