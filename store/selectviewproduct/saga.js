import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getSelectViewProductSuccess
} from '~/store/selectviewproduct/action';

polyfill();

function* getSelectViewProductSaga({ payload }) {
    try {
        yield put( getSelectViewProductSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_SELECTVIEWPRODUCT, getSelectViewProductSaga)]);
}