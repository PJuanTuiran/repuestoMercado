import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDataFindProductsSuccess
} from '~/store/datafindproducts/action';

polyfill();

function* getDataFindProductsSaga({ payload }) {
    try {
        yield put(getDataFindProductsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATAFINDPRODUCTS, getDataFindProductsSaga)]);
}
