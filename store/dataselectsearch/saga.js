import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDataSelectSearchSuccess
} from '~/store/dataselectsearch/action';

polyfill();

function* getDataSelectSearchSaga({ payload }) {
    try {
        yield put(getDataSelectSearchSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATASELECTSEARCH, getDataSelectSearchSaga)]);
}