import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDataSelectedExternalSuccess
} from '~/store/dataselectedexternal/action';

polyfill();

function* getDataSelectedExternalSaga({ payload }) {
    try {
        yield put( getDataSelectedExternalSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATASELECTEDEXTERNAL, getDataSelectedExternalSaga)]);
}