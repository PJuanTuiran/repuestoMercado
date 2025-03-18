import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDatosProductoSuccess
} from '~/store/datosproducto/action';

polyfill();

function* getDatosProductoSaga({ payload }) {
    try {
        yield put( getDatosProductoSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATOSPRODUCTO, getDatosProductoSaga)]);
}
