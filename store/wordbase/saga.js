import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getWordBaseSuccess,
} from '~/store/wordbase/action';

polyfill();

function* getWordBaseSaga({ payload }) {
    try {
        yield put(getWordBaseSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_WORDBASE, getWordBaseSaga)]);
}
