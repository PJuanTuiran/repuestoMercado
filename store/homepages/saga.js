import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getHomePagesSuccess
} from '~/store/homepages/action';

polyfill();

function* getHomePagesSaga({ payload }) {
    try {
        yield put(getHomePagesSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_HOMEPAGES, getHomePagesSaga)]);
}
