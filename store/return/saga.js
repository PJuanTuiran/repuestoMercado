import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getReturnSuccess
} from '~/store/return/action';

polyfill();

function* getReturnSaga({ payload }) {
    try {
        yield put( getReturnSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_RETURN, getReturnSaga)]);
}