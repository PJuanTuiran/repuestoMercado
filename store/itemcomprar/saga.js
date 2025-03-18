import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getItemComprarSuccess
} from '~/store/itemcomprar/action';

polyfill();

function* getItemComprarSaga({ payload }) {
    try {
        yield put( getItemComprarSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_ITEMCOMPRAR, getItemComprarSaga)]);
}