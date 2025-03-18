import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getAddLoginSuccess
} from '~/store/addlogin/action';

polyfill();

function* getAddLoginSaga({ payload }) {
    try {
        yield put( getAddLoginSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_ADDLOGIN, getAddLoginSaga)]);
}