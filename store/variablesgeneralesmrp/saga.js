import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getVariablesGeneralesMrpSuccess
} from '~/store/variablesgeneralesmrp/action';

polyfill();

function* getVariablesGeneralesMrpSaga({ payload }) {
    try {
        yield put( getVariablesGeneralesMrpSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VARIABLESGENERALESMRP, getVariablesGeneralesMrpSaga)]);
}
