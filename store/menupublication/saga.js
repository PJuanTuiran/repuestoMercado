import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getMenuPublicationSuccess
} from '~/store/menupublication/action';

polyfill();

function* getMenuPublicationSaga({ payload }) {
    try {
        yield put(getMenuPublicationSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_MENUPUBLICATION, getMenuPublicationSaga)]);
}