import { actionTypes } from './action';

export const initialState = {
    filtroprd: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_FILTROPRD_SUCCESS:
            return {
                ...state,
                filtroprd: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;