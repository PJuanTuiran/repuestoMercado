import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDeleteItemSuccess
} from '~/store/deleteitem/action';

polyfill();

function* getDeleteItemSaga({ payload }) {
    try {
        yield put( getDeleteItemSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DELETEITEM, getDeleteItemSaga)]);
}