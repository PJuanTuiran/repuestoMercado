import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getRangosPrecioSuccess
} from '~/store/rangosprecio/action';

polyfill();

function* getRangosPrecioSaga({ payload }) {
    try {
        yield put( getRangosPrecioSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_RANGOSPRECIO, getRangosPrecioSaga)]);
}