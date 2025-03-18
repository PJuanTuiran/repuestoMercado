import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getUserMenuSuccess
} from '~/store/usermenu/action';

polyfill();

function* getUserMenuSaga({ payload }) {
    try {
        yield put( getUserMenuSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_USERMENU, getUserMenuSaga)]);
}