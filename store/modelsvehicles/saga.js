import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getModelsVehiclesSuccess
} from '~/store/modelsvehicles/action';

polyfill();

function* getModelsVehiclesSaga({ payload }) {
    try {
        yield put( getModelsVehiclesSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_MODELSVEHICLES, getModelsVehiclesSaga)]);
}
