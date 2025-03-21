import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getLeeIraSuccess
} from '~/store/leeira/action';

polyfill();

function* getLeeIraSaga({ payload }) {
    try {
        yield put( getLeeIraSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_LEEIRA, getLeeIraSaga)]);
}