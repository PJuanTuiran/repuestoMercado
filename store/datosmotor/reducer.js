import { actionTypes } from './action';

export const initialState = {
    datosmotor: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATOSMOTOR_SUCCESS:
            return {
                ...state,
                datosmotor: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;