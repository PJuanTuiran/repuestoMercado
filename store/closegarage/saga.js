import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCloseGarageSuccess
} from '~/store/closegarage/action';

polyfill();

function* getCloseGarageSaga({ payload }) {
    try {
        yield put( getCloseGarageSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CLOSEGARAGE, getCloseGarageSaga)]);
}