import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getFiltroPrdSuccess
} from '~/store/filtroprd/action';

polyfill();

function* getFiltroPrdSaga({ payload }) {
    try {
        yield put(getFiltroPrdSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_FILTROPRD, getFiltroPrdSaga)]);
}