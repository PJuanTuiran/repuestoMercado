import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDataWishListSuccess
} from '~/store/datawishlist/action';

polyfill();

function* getDataWishListSaga({ payload }) {
    try {
        yield put( getDataWishListSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATAWISHLIST, getDataWishListSaga)]);
}