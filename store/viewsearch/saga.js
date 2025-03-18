import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getViewSearchSuccess
} from '~/store/viewsearch/action';

polyfill();

function* getViewSearchSaga({ payload }) {
    try {
        yield put(getViewSearchSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VIEWSEARCH, getViewSearchSaga)]);
}