import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCategoriesSuccess
} from '~/store/categories/action';

polyfill();

function* getCategoriesSaga({ payload }) {
    try {
        yield put(getCategoriesSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CATEGORIES, getCategoriesSaga)]);
}
