import { actionTypes } from './action';

export const initialState = {
    datosgenerales: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATOSGENERALES_SUCCESS:
            return {
                ...state,
                datosgenerales: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;