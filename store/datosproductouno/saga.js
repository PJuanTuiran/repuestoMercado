import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDatosProductoUnoSuccess
} from '~/store/datosproductouno/action';

polyfill();

function* getDatosProductoUnoSaga({ payload }) {
    try {
        yield put( getDatosProductoUnoSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATOSPRODUCTOUNO, getDatosProductoUnoSaga)]);
}
