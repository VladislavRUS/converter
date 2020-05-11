import { IQuotesState, QuotesActionTypes } from 'store/quotes/types';
import { ActionType, createReducer } from 'typesafe-actions';
import * as quotesActions from './actions';

type QuotesActionType = ActionType<typeof quotesActions>;

const initialState: IQuotesState = {
  quotes: [],
  isFetchingQuotes: false,
};

export const quotesReducer = createReducer<IQuotesState, QuotesActionType>(initialState)
  // Get quotes
  .handleType(
    QuotesActionTypes.GET_QUOTES_REQUEST,
    (state): IQuotesState => ({
      ...state,
      isFetchingQuotes: true,
    })
  )
  .handleType(
    QuotesActionTypes.GET_QUOTES_SUCCESS,
    (state, action): IQuotesState => ({
      ...state,
      isFetchingQuotes: false,
      quotes: action.payload,
    })
  )
  .handleType(
    QuotesActionTypes.GET_QUOTES_FAILURE,
    (state): IQuotesState => ({
      ...state,
      isFetchingQuotes: false,
    })
  )

  // Toggle star quote
  .handleType(
    QuotesActionTypes.TOGGLE_FAVORITE_QUOTE,
    (state, action): IQuotesState => {
      const { asset } = action.payload.quote;

      const quotes = state.quotes.map((quote) =>
        asset === quote.asset ? { ...quote, isFavorite: !quote.isFavorite } : quote
      );

      return {
        ...state,
        quotes,
      };
    }
  );
