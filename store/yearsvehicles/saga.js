import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getYearsVehiclesSuccess
} from '~/store/yearsvehicles/action';

polyfill();

function* getYearsVehiclesSaga({ payload }) {
    try {
        yield put( getYearsVehiclesSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_YEARSVEHICLES, getYearsVehiclesSaga)]);
}
