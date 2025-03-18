import { actionTypes } from './action';

export const initialState = {
    datawishlist: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DATAWISHLIST_SUCCESS:
            return {
                ...state,
                datawishlist: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;