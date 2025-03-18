import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDatosMotorSuccess
} from '~/store/datosmotor/action';

polyfill();

function* getDatosMotorSaga({ payload }) {
    try {
        yield put( getDatosMotorSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATOSMOTOR, getDatosMotorSaga)]);
}
