import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCitySelectSuccess
} from '~/store/cityselect/action';

polyfill();

function* getCitySelectSaga({ payload }) {
    try {
        yield put( getCitySelectSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CITYSELECT, getCitySelectSaga)]);
}