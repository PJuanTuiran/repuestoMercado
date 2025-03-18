import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getGripSelectSuccess
} from '~/store/gripselect/action';

polyfill();

function* getGripSelectSaga({ payload }) {
    try {
        yield put( getGripSelectSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_GRIPSELECT, getGripSelectSaga)]);
}