import { actionTypes } from './action';

export const initialState = {
    duplicarprd: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_DUPLICARPRD_SUCCESS:
            return {
                ...state,
                duplicarprd: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;