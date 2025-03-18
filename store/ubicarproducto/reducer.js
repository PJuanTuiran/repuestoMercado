import { actionTypes } from './action';

export const initialState = {
    ubicarproducto: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_UBICARPRODUCTO_SUCCESS:
            return {
                ...state,
                ubicarproducto: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;