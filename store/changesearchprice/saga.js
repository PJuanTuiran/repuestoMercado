import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getChangeSearchPriceSuccess
} from '~/store/changesearchprice/action';

polyfill();

function* getChangeSearchPriceSaga({ payload }) {
    try {
        yield put( getChangeSearchPriceSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CHANGESEARCHPRICE, getChangeSearchPriceSaga)]);
}