import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getEditDataSuccess,
} from '~/store/editdata/action';

polyfill();

function* getEditDataSaga({ payload }) {
    try {
        yield put(getEditDataSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_EDITDATA, getEditDataSaga)]);
}
