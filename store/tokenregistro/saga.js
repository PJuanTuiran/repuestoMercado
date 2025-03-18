import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getTokenRegistroSuccess
} from '~/store/tokenregistro/action';

polyfill();

function* getTokenRegistroSaga({ payload }) {
    try {
        yield put(getTokenRegistroSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_TOKENREGISTRO, getTokenRegistroSaga)]);
}
