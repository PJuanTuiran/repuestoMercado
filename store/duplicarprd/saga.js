import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDuplicarPrdSuccess
} from '~/store/duplicarprd/action';

polyfill();

function* getDuplicarPrdSaga({ payload }) {
    try {
        yield put( getDuplicarPrdSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DUPLICARPRD, getDuplicarPrdSaga)]);
}