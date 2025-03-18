import { actionTypes } from './action';

export const initialState = {
    datashoppingcart: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATASHOPPINGCART_SUCCESS:
            return {
                ...state,
                datashoppingcart: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;