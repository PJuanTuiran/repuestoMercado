import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDataShoppingCartSuccess
} from '~/store/datashoppingcart/action';

polyfill();

function* getDataShoppingCartSaga({ payload }) {
    try {
        yield put( getDataShoppingCartSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATASHOPPINGCART, getDataShoppingCartSaga)]);
}