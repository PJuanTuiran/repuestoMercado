import { actionTypes } from './action';

export const initialState = {
    viewcategorias: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CTLRINPUT_SUCCESS:
            return {
                ...state,
                viewcategorias: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;