import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getLongPageSuccess
} from '~/store/longpage/action';

polyfill();

function* getLongPageSaga({ payload }) {
    try {
        yield put( getLongPageSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_LONGPAGE, getLongPageSaga)]);
}