import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDataSearchInteractiveSuccess
} from '~/store/datasearchinteractive/action';

polyfill();

function* getDataSearchInteractiveSaga({ payload }) {
    try {
        yield put( getDataSearchInteractiveSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATASEARCHINTERACTIVE, getDataSearchInteractiveSaga)]);
}