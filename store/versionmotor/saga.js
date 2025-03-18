import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getVersionMotorSuccess
} from '~/store/versionmotor/action';

polyfill();

function* getVersionMotorSaga({ payload }) {
    try {
        yield put( getVersionMotorSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VERSIONMOTOR, getVersionMotorSaga)]);
}
