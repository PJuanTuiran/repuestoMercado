import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getSelectItemSuccess
} from '~/store/selectitem/action';

polyfill();

function* getSelectItemSaga({ payload }) {
    try {
        yield put( getSelectItemSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_SELECTITEM, getSelectItemSaga)]);
}