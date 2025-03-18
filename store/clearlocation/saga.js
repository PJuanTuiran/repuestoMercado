import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getClearLocationSuccess
} from '~/store/clearlocation/action';

polyfill();

function* getClearLocationSaga({ payload }) {
    try {
        yield put( getClearLocationSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CLEARLOCATION, getClearLocationSaga)]);
}