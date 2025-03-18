import { actionTypes } from './action';

export const initialState = {
    addedtocart: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ADDEDTOCART_SUCCESS:
            return {
                ...state,
                addedtocart: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;