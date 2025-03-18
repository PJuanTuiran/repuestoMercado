import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getControlAccesoSuccess
} from '~/store/controlacceso/action';

polyfill();

function* getControlAccesoSaga({ payload }) {
    try {
        yield put( getControlAccesoSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CONTROLACCESO, getControlAccesoSaga)]);
}