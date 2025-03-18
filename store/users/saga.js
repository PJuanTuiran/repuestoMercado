import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getUsersSuccess
} from '~/store/users/action';

polyfill();

function* getUsersSaga({ payload }) {
    try {
        yield put(getUsersSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_USERS, getUsersSaga)]);
}
