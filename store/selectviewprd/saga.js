import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getSelectViewPrdSuccess
} from '~/store/selectviewprd/action';

polyfill();

function* getSelectViewPrdSaga({ payload }) {
    try {
        yield put(getSelectViewPrdSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_SELECTVIEWPRD, getSelectViewPrdSaga)]);
}