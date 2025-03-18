import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getAddEdToCartSuccess
} from '~/store/addedtocart/action';

polyfill();

function* getAddEdToCartSaga({ payload }) {
    try {
        yield put(getAddEdToCartSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_ADDEDTOCART, getAddEdToCartSaga)]);
}