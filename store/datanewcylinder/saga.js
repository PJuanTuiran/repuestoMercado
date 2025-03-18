import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDataNewCylinderSuccess
} from '~/store/datanewcylinder/action';

polyfill();

function* getDataNewCylinderSaga({ payload }) {
    try {
        yield put( getDataNewCylinderSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATANEWCYLINDER, getDataNewCylinderSaga)]);
}