import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getRefreshPageSuccess
} from '~/store/refreshpage/action';

polyfill();

function* getRefreshPageSaga({ payload }) {
    try {
        yield put(getRefreshPageSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_REFRESHPAGE, getRefreshPageSaga)]);
}