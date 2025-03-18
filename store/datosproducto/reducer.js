import { actionTypes } from './action';

export const initialState = {
    datosproducto: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATOSPRODUCTO_SUCCESS:
            return {
                ...state,
                datosproducto: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;