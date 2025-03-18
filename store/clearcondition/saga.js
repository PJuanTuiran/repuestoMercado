import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getClearConditionSuccess
} from '~/store/clearcondition/action';

polyfill();

function* getClearConditionSaga({ payload }) {
    try {
        yield put( getClearConditionSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CLEARCONDITION, getClearConditionSaga)]);
}