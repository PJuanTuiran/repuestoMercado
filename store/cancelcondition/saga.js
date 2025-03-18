import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCancelConditionSuccess
} from '~/store/cancelcondition/action';

polyfill();

function* getCancelConditionSaga({ payload }) {
    try {
        yield put( getCancelConditionSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CANCELCONDITION, getCancelConditionSaga)]);
}