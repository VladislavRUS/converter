import { fork, all, takeEvery, put, call, select } from 'redux-saga/effects';
import { IQuote, IQuoteFromServer, QuotesActionTypes } from 'store/quotes/types';
import { getQuotes, getQuotesAsync } from 'store/quotes/actions';
import { QuoteApi } from 'api/QuoteApi';
import { selectQuotes } from 'store/quotes/selectors';

function* handleGetQuotesIfNeeded() {
  const quotes: ReturnType<typeof selectQuotes> = yield select(selectQuotes);

  if (quotes.length === 0) {
    yield put(getQuotes());
  }
}

function* handleGetQuotes() {
  yield put(getQuotesAsync.request());

  try {
    const { data } = yield call(QuoteApi.fetchQuotes);
    const { assets, error }: { assets: IQuoteFromServer[]; error: string } = data;

    if (!error) {
      const quotes: IQuote[] = assets.map((quote) => ({
        ...quote,
        isFavorite: false,
        timestamp: new Date(quote.startDate).getTime(),
      }));

      yield put(getQuotesAsync.success(quotes));
    } else {
      yield put(getQuotesAsync.failure());
    }
  } catch (e) {
    yield put(getQuotesAsync.failure());
  }
}

const watchers = [
  fork(function* watchGetQuotesIfNeeded() {
    yield takeEvery(QuotesActionTypes.GET_QUOTES_IF_NEEDED, handleGetQuotesIfNeeded);
  }),
  fork(function* watchGetQuotes() {
    yield takeEvery(QuotesActionTypes.GET_QUOTES, handleGetQuotes);
  }),
];

function* quotesSaga() {
  yield all(watchers);
}

export { quotesSaga };
