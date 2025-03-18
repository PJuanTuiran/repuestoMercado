import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getFiltroOrderByPrdSuccess
} from '~/store/filtroorderbyprd/action';

polyfill();

function* getFiltroOrderByPrdSaga({ payload }) {
    try {
        yield put(getFiltroOrderByPrdSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_FILTROORDERBYPRD, getFiltroOrderByPrdSaga)]);
}