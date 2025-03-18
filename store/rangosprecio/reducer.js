import { actionTypes } from './action';

export const initialState = {
    rangosprecio: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_RANGOSPRECIO_SUCCESS:
            return {
                ...state,
                rangosprecio: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;