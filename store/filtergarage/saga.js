import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getFilterGarageSuccess
} from '~/store/filtergarage/action';

polyfill();

function* getFilterGarageSaga({ payload }) {
    try {
        yield put( getFilterGarageSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_FILTERGARAGE, getFilterGarageSaga)]);
}