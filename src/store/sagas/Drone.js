import { takeEvery, call, put, cancel, all } from 'redux-saga/effects';
import API from '../api';
import * as actions from '../actions';

function* watchDroneUpdate(action) {
  const { data } = action;
  yield put({ type: actions.UPDATE_DRONE_DATA, data });
}

function* getDroneDataAsync() {
  const { error, data } = yield call(API.getDroneInfo);
  if (error || !data) {
    yield put({
      type: actions.API_ERROR,
      code: error.code ? error.code : null
    });
    yield cancel();
    return;
  }
  yield put({ type: actions.DRONE_DATA_RECEIVED, data });
}

function* watchAppLoad() {
  yield all([
    takeEvery(actions.UPDATE_DRONE, getDroneDataAsync),
    takeEvery(actions.DRONE_DATA_RECEIVED, watchDroneUpdate)
  ]);
}

export default [watchAppLoad];
