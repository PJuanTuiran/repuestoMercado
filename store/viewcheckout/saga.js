import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getViewCheckoutSuccess
} from '~/store/viewcheckout/action';

polyfill();

function* getViewCheckoutSaga({ payload }) {
    try {
        yield put(getViewCheckoutSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VIEWCHECKOUT, getViewCheckoutSaga)]);
}