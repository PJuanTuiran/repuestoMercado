import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDataNewModelsSuccess
} from '~/store/datanewmodels/action';

polyfill();

function* getDataNewModelsSaga({ payload }) {
    try {
        yield put( getDataNewModelsSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATANEWMODELS, getDataNewModelsSaga)]);
}