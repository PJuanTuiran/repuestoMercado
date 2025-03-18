import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getUbicarProductoSuccess
} from '~/store/ubicarproducto/action';

polyfill();

function* getUbicarProductoSaga({ payload }) {
    try {
        yield put( getUbicarProductoSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_UBICARPRODUCTO, getUbicarProductoSaga)]);
}
