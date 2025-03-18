import { actionTypes } from './action';

export const initialState = {
    ctlrnotificacion: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CTLRNOTIFICACION_SUCCESS:
            return {
                ...state,
                ctlrnotificacion: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;