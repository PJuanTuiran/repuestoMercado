import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDatosGeneralesSuccess
} from '~/store/datosgenerales/action';

polyfill();

function* getDatosGeneralesSaga({ payload }) {
    try {
        yield put( getDatosGeneralesSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DATOSGENERALES, getDatosGeneralesSaga)]);
}
