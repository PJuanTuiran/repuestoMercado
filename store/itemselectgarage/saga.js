import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getItemSelectGarageSuccess
} from '~/store/itemselectgarage/action';

polyfill();

function* getItemSelectGarageSaga({ payload }) {
    try {
        yield put( getItemSelectGarageSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_ITEMSELECTGARAGE, getItemSelectGarageSaga)]);
}