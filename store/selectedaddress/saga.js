import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getSelectedAddressSuccess
} from '~/store/selectedaddress/action';

polyfill();

function* getSelectedAddressSaga({ payload }) {
    try {
        yield put( getSelectedAddressSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_SELECTEDADDRESS, getSelectedAddressSaga)]);
}