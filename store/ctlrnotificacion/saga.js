import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCtlrNotificacionSuccess
} from '~/store/ctlrnotificacion/action';

polyfill();

function* getCtlrNotificacionSaga({ payload }) {
    try {
        yield put(getCtlrNotificacionSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CTLRNOTIFICACION, getCtlrNotificacionSaga)]);
}