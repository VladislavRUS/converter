import { all, fork, takeEvery, put, call } from 'redux-saga/effects';
import { DealsActionTypes, IDeal, IDealFromServer } from 'store/deals/types';
import { getDealsAsync } from 'store/deals/actions';
import { DealsApi } from 'api/DealsApi';

function* handleGetDeals() {
  yield put(getDealsAsync.request());

  try {
    const { data } = yield call(DealsApi.fetchDeals);
    const { deals, error }: { deals: IDealFromServer[]; error: string } = data;

    if (!error) {
      const formattedDeals: IDeal[] = deals.map((deal) => ({
        ...deal,
        finishDateTimestamp: new Date(deal.finishDate).getTime(),
        profitValue: parseFloat(deal.profit),
      }));

      yield put(getDealsAsync.success(formattedDeals));
    } else {
      yield put(getDealsAsync.failure());
    }
  } catch (e) {
    yield put(getDealsAsync.failure());
  }
}

const watchers = [
  fork(function* () {
    yield takeEvery(DealsActionTypes.GET_DEALS, handleGetDeals);
  }),
];

function* dealsSaga() {
  yield all(watchers);
}

export { dealsSaga };
