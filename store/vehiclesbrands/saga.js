import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getVehiclesBrandsSuccess
} from '~/store/vehiclesbrands/action';

polyfill();

function* getVehiclesBrandsSaga({ payload }) {
    try {
        yield put(getVehiclesBrandsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VEHICLESBRANDS, getVehiclesBrandsSaga)]);
}
