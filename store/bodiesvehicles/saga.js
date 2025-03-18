import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getBodiesVehiclesSuccess
} from '~/store/bodiesvehicles/action';

polyfill();

function* getBodiesVehiclesSaga({ payload }) {
    try {
        yield put( getBodiesVehiclesSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_BODIESVEHICLES, getBodiesVehiclesSaga)]);
}
