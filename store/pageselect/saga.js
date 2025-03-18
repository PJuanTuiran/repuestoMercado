import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getPageSelectSuccess
} from '~/store/pageselect/action';

polyfill();

function* getPageSelectSaga({ payload }) {
    try {
        yield put(getPageSelectSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_PAGESELECT, getPageSelectSaga)]);
}