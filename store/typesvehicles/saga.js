import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getTypesVehiclesSuccess
} from '~/store/typesvehicles/action';

polyfill();

function* getTypesVehiclesSaga({ payload }) {
    try {
        yield put(getTypesVehiclesSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_TYPESVEHICLES, getTypesVehiclesSaga)]);
}
