import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDataCityPrdSuccess
} from '~/store/datacityprd/action';

polyfill();

function* getDataCityPrdSaga({ payload }) {
    try {
        yield put( getDataCityPrdSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATACITYPRD, getDataCityPrdSaga)]);
}