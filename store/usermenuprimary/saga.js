import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getUserMenuPrimarySuccess
} from '~/store/usermenuprimary/action';

polyfill();

function* getUserMenuPrimarySaga({ payload }) {
    try {
        yield put( getUserMenuPrimarySuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_USERMENUPRIMARY, getUserMenuPrimarySaga)]);
}