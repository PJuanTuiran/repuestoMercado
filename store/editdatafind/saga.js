import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getEditDataFindSuccess,
} from '~/store/editdatafind/action';

polyfill();

function* getEditDataFindSaga({ payload }) {
    try {
        yield put(getEditDataFindSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_EDITDATAFIND, getEditDataFindSaga)]);
}
