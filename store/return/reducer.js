import { actionTypes } from './action';

export const initialState = {
    return: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_RETURN_SUCCESS:
            return {
                ...state,
                return: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;