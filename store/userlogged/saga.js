import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getUserLoggedSuccess
} from '~/store/userlogged/action';

polyfill();

function* getUserLoggedSaga({ payload }) {
    try {
        yield put(getUserLoggedSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_USERLOGGED, getUserLoggedSaga)]);
}
