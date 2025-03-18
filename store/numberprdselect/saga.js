import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getNumberPrdSelectSuccess
} from '~/store/numberprdselect/action';

polyfill();

function* getNumberPrdSelectSaga({ payload }) {
    try {
        yield put( getNumberPrdSelectSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_NUMBERPRDSELECT, getNumberPrdSelectSaga)]);
}