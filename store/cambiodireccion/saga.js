import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCambioDireccionSuccess
} from '~/store/cambiodireccion/action';

polyfill();

function* getCambioDireccionSaga({ payload }) {
    try {
        yield put(getCambioDireccionSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CAMBIODIRECCION, getCambioDireccionSaga)]);
}