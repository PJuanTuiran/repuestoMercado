import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCtlrInputSuccess
} from '~/store/ctlrinput/action';

polyfill();

function* getCtlrInputSaga({ payload }) {
    try {
        yield put(getCtlrInputSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CTLRINPUT, getCtlrInputSaga)]);
}