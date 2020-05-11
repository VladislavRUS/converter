import { IApplicationState } from 'store/index';
import { createSelector } from 'reselect';

export const selectQuotes = (state: IApplicationState) => state.quotes.quotes;

export const selectSortedQuotes = createSelector([selectQuotes], (quotes) => {
  return quotes.slice().sort((first, second) => {
    const favoriteCompare = Number(second.isFavorite) - Number(first.isFavorite);
    const timestampCompare = first.timestamp - second.timestamp;

    return favoriteCompare || timestampCompare;
  });
});

export const selectIsFetchingQuotes = (state: IApplicationState) => state.quotes.isFetchingQuotes;
