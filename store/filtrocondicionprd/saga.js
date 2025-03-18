import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getFiltroCondicionPrdSuccess
} from '~/store/filtrocondicionprd/action';

polyfill();

function* getFiltroCondicionPrdSaga({ payload }) {
    try {
        yield put(getFiltroCondicionPrdSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_FILTROCONDICIONPRD, getFiltroCondicionPrdSaga)]);
}