import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getVehiculosGarageSuccess
} from '~/store/vehiculosgarage/action';

polyfill();

function* getVehiculosGarageSaga({ payload }) {
    try {
        yield put( getVehiculosGarageSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VEHICULOSGARAGE, getVehiculosGarageSaga)]);
}