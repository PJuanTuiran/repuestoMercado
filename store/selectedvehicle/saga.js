import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getSelectedVehicleSuccess
} from '~/store/selectedvehicle/action';

polyfill();

function* getSelectedVehicleSaga({ payload }) {
    try {
        yield put(getSelectedVehicleSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_SELECTEDVEHICLE, getSelectedVehicleSaga)]);
}
