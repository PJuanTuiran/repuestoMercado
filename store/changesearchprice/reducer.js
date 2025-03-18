import { actionTypes } from './action';

export const initialState = {
    changesearchprice: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CHANGESEARCHPRICE_SUCCESS:
            return {
                ...state,
                changesearchprice: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;