import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getOpenCloseCitySuccess
} from '~/store/openclosecity/action';

polyfill();

function* getOpenCloseCitySaga({ payload }) {
    try {
        yield put( getOpenCloseCitySuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_OPENCLOSECITY, getOpenCloseCitySaga)]);
}