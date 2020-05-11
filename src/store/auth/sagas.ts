import { all, fork, takeLeading, put, call } from 'redux-saga/effects';
import { AuthActionTypes } from 'store/auth/types';
import { login, loginAsync } from 'store/auth/actions';
import { AuthApi } from 'api/AuthApi';
import { replace } from 'connected-react-router';
import { Routes } from 'entry/Routes';

function* handleLogin(action: ReturnType<typeof login>) {
  yield put(loginAsync.request());

  try {
    const { data } = yield call(AuthApi.login, action.payload.data);
    const { error } = data;

    if (!error) {
      yield put(replace(Routes.MAIN));
      yield put(loginAsync.success());
    } else {
      yield put(loginAsync.failure(error));
    }
  } catch (e) {
    yield put(loginAsync.failure('Произошла непредвиденная ошибка'));
  }
}

function* handleLogout() {
  yield put(replace(Routes.AUTH));
}

const watchers = [
  fork(function* watchLogin() {
    yield takeLeading(AuthActionTypes.LOGIN, handleLogin);
  }),
  fork(function* watchLogout() {
    yield takeLeading(AuthActionTypes.LOGOUT, handleLogout);
  }),
];

function* authSaga() {
  yield all(watchers);
}

export { authSaga };
