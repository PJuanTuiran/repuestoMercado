import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getNumberPagesSuccess,
} from '~/store/numberpages/action';

polyfill();

function* getNumberPagesSaga({ payload }) {
    try {
        yield put(getNumberPagesSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_NUMBERPAGES, getNumberPagesSaga)]);
}