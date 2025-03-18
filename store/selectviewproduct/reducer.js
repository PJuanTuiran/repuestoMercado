import { actionTypes } from './action';

export const initialState = {
    selectviewproduct: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SELECTVIEWPRODUCT_SUCCESS:
            return {
                ...state,
                selectviewproduct: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;