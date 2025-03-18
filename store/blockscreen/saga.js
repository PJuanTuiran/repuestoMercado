import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getBlockScreenSuccess
} from '~/store/blockscreen/action';

polyfill();

function* getBlockScreenSaga({ payload }) {
    try {
        yield put( getBlockScreenSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_BLOCKSCREEN, getBlockScreenSaga)]);
}